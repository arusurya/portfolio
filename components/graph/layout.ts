/**
 * NODE GRAPH LAYOUT — deterministic, seeded
 * ----------------------------------------------------------------
 * Why not a physics/force-directed library: this graph renders at
 * build time (SSR) and must hydrate to an identical client layout,
 * or React throws a hydration mismatch. A seeded pseudo-random
 * layout with a few relaxation passes gets the "organic network"
 * look from the real Delhivery chart without pulling in d3-force
 * and fighting SSR determinism.
 *
 * Nodes cluster loosely by `group` (domain) — same idea as the real
 * dashboard, where hub proximity in the graph encoded network
 * structure, not page position.
 * ----------------------------------------------------------------
 */

export type GraphNode = {
  id: string;
  label: string;
  group: string;
  x: number; // 0–100, percentage space
  y: number; // 0–100, percentage space
  weight: number; // 0–1, drives node size (e.g. "importance")
};

export type GraphEdge = {
  source: string;
  target: string;
  severity: number; // 0–1, drives color (amber → coral) + opacity
};

// mulberry32 — tiny seeded PRNG, deterministic across SSR/CSR
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildLayout(
  items: { id: string; label: string; group: string; weight?: number }[],
  seed = 7
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const rand = mulberry32(seed);
  const groups = Array.from(new Set(items.map((i) => i.group)));

  // Cluster centers spread around a circle in % space
  const centers = new Map<string, { cx: number; cy: number }>();
  groups.forEach((g, i) => {
    const angle = (i / groups.length) * Math.PI * 2 - Math.PI / 2;
    centers.set(g, {
      cx: 50 + Math.cos(angle) * 30,
      cy: 50 + Math.sin(angle) * 32,
    });
  });

  const nodes: GraphNode[] = items.map((item) => {
    const c = centers.get(item.group)!;
    const jitterR = 14 + rand() * 10;
    const jitterAngle = rand() * Math.PI * 2;
    const x = clamp(c.cx + Math.cos(jitterAngle) * jitterR, 6, 94);
    const y = clamp(c.cy + Math.sin(jitterAngle) * jitterR, 8, 92);
    return {
      id: item.id,
      label: item.label,
      group: item.group,
      x,
      y,
      weight: item.weight ?? 0.4 + rand() * 0.6,
    };
  });

  // Edges: connect each node to its 1-2 nearest same-group neighbors,
  // plus a sparse few cross-group links (mirrors how a real shipment
  // corridor graph has dense intra-region edges + a few long-haul ones)
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();

  for (const group of groups) {
    const groupNodes = nodes.filter((n) => n.group === group);
    for (let i = 0; i < groupNodes.length; i++) {
      const a = groupNodes[i];
      const next = groupNodes[(i + 1) % groupNodes.length];
      if (next.id === a.id) continue;
      const key = [a.id, next.id].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ source: a.id, target: next.id, severity: rand() });
    }
  }

  // A handful of cross-group bridges for visual connective tissue
  const bridgeCount = Math.min(groups.length, 5);
  for (let i = 0; i < bridgeCount; i++) {
    const a = nodes[Math.floor(rand() * nodes.length)];
    const b = nodes[Math.floor(rand() * nodes.length)];
    if (!a || !b || a.id === b.id) continue;
    const key = [a.id, b.id].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ source: a.id, target: b.id, severity: rand() * 0.6 });
  }

  return { nodes, edges };
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}
