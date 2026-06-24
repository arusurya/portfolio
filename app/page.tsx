import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { FeaturedProject, type FeaturedProjectData } from "@/components/FeaturedProject";
import HowIThink from "@/components/HowIThink";
import Background from "@/components/Background";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProjectGraph, { type GraphProject } from "@/components/graph/ProjectGraph";
import { projects } from "@/data/projects";

/**
 * HOMEPAGE — v2
 * ----------------------------------------------------------------
 * Pulls from data/projects.ts (the real 12-project dataset) instead
 * of inline arrays whose slugs didn't actually match the data file
 * (e.g. old "dynamic-tariff-optimization" vs. the real
 * "agentic-tariff-optimization" — those links were 404ing).
 *
 * Featured = 3 projects with real artifact images in /public.
 * Everything else routes through the node-graph nav, replacing the
 * old plain <Link> list entirely.
 * ----------------------------------------------------------------
 */

const FEATURED_ON_HOME = [
  "delhivery-network-intelligence",
  "dynamic-tariff-optimization",
  "cir-yield-curve-modeling",
];

const featured: FeaturedProjectData[] = FEATURED_ON_HOME.map((slug) => {
  const p = projects.find((proj) => proj.slug === slug)!;
  return {
    slug: p.slug,
    domain: `${p.domain} · ${p.subdomain.split(",")[0].trim()}`,
    question: p.businessQuestion ?? p.summary,
    description: p.summary,
    artifactAlt: p.artifactAlt ?? `${p.title} artifact`,
    metrics: p.metrics ?? [{ value: p.stat.value, label: p.stat.label }],
  };
});

const graphProjects: GraphProject[] = [
  {
    slug: "smart-campus-intelligence",
    title: "Smart Campus Intelligence System",
    shortTitle: "Smart Campus",
    domain: "Analytics",
    tags: "Forecasting, BI, Operations",
    importance: "flagship",
    description: "Forecasting and anomaly-detection platform that turned 113K+ campus attendance records into proactive operational decisions.",
    metrics: ["113,528+ records analyzed", "Isolation Forest anomaly detection", "Random Forest forecasting", "3rd / 30+ teams"],
    tools: ["Python", "Pandas", "Scikit-learn", "Streamlit"],
  },
  {
    slug: "delhivery-network-intelligence",
    title: "Delhivery Network Intelligence & ETA Optimization",
    shortTitle: "Delhivery Graph ML",
    domain: "Analytics",
    tags: "Supply Chain, Graph ML",
    importance: "flagship",
    description: "Modeled 1,601 logistics hubs as a graph — Node2Vec and GraphSAGE surfaced 20+ bottleneck corridors a distance-only model couldn't see.",
    metrics: ["1,601 hubs modeled", "143,000+ shipment records", "20+ critical corridors flagged", "+14% ETA accuracy"],
    tools: ["Python", "NetworkX", "Node2Vec", "XGBoost", "Streamlit"],
  },
  {
    slug: "dynamic-tariff-optimization",
    title: "Agentic AI-Based Dynamic Tariff Optimization",
    shortTitle: "Tariff Optimization",
    domain: "Analytics",
    tags: "AI, ML, Pricing Strategy",
    importance: "flagship",
    description: "Three-agent system that forecasts EV charging demand, adjusts tariffs dynamically, and retains 99.72% revenue while cutting wait times.",
    metrics: ["R² = 0.9685 forecasting model", "99.72% revenue retention", "−3.1 min average wait time", "+10% off-peak demand"],
    tools: ["Python", "Gradient Boosting", "Pandas", "Feature Engineering"],
  },
  {
    slug: "loyalty-intelligence-platform",
    title: "Airline Loyalty Intelligence Platform",
    shortTitle: "Loyalty & CLV",
    domain: "Analytics",
    tags: "Customer Analytics, BI",
    importance: "strong",
    description: "Explainable churn and CLV platform for airline loyalty programs — SHAP outputs let business teams trust and act on the risk scores.",
    metrics: ["4 risk tiers (Low/Med/High/Critical)", "XGBoost + LightGBM ensemble", "SHAP explainability layer", "Behavioral CLV framework"],
    tools: ["Python", "XGBoost", "LightGBM", "SHAP", "Streamlit"],
  },
  {
    slug: "digital-lending-intelligence",
    title: "Digital Lending Portfolio Optimization",
    shortTitle: "Lending Portfolio",
    domain: "Finance",
    tags: "Risk Analytics, Fintech",
    importance: "strong",
    description: "Portfolio intelligence framework that segments 10,000 borrowers by risk and profitability, and flags financial stress before default.",
    metrics: ["10,000 borrower records", "4 portfolio tiers", "₹1,51,768 risk-adjusted return identified", "Early Warning Alert System"],
    tools: ["Python", "Scikit-learn", "Pandas", "Risk Scoring Models"],
  },
  {
    slug: "cir-yield-curve-modeling",
    title: "CIR Interest Rate Modelling & Yield Curve Prediction",
    shortTitle: "CIR Yield Curve",
    domain: "Finance",
    tags: "Financial Intelligence",
    importance: "strong",
    description: "Reconstructed the full Treasury yield curve from a single 3-month input using the Cox-Ingersoll-Ross model, cross-sectional calibration outperforming MLE.",
    metrics: ["AR(1) ≈ 0.998 short-rate persistence", "1 input rate required", "10 maturities reconstructed", "1,976 daily observations trained"],
    tools: ["Python", "NumPy", "SciPy", "Stochastic Calculus"],
  },
  {
    slug: "spotify-pochimu",
    title: "Spotify Pochimu — AI Music Companion",
    shortTitle: "Spotify Aura",
    domain: "Product",
    tags: "GenAI Product Strategy",
    importance: "strong",
    description: "Working prototype reimagining Spotify around emotional companionship — 3 intelligence layers (context, memory, recommendation) instead of pure click-through.",
    metrics: ["3 intelligence layers", "1 working prototype", "4 emotional states mapped", "Monetization roadmap included"],
    tools: ["Product Strategy", "UX Flows", "Prototyping", "GenAI Design"],
  },
  {
    slug: "divaine-gtm-strategy",
    title: "divAIne — Go-To-Market Strategy for Enterprise AI",
    shortTitle: "Enterprise AI GTM",
    domain: "Strategy",
    tags: "AI Business Strategy",
    importance: "supporting",
    description: "GTM strategy for an enterprise AI platform positioning around trust and explainability — deliberately avoiding a head-on fight with foundation model providers.",
    metrics: ["4 beachhead markets identified", "3-phase GTM funnel", "Competitive gap map built", "Phased adoption roadmap"],
    tools: ["Market Research", "Competitive Analysis", "GTM Strategy", "Positioning Frameworks"],
  },
  {
    slug: "roastery-expansion-strategy",
    title: "Roastery Coffee House Expansion & Procurement Strategy",
    shortTitle: "Roastery Ops",
    domain: "Consulting",
    tags: "Operations, Finance",
    importance: "supporting",
    description: "Operational and financial readiness framework for a specialty coffee chain's multi-location expansion — procurement standardization and working capital discipline.",
    metrics: ["Emergency purchases targeted: >25% → <10%", "5–10% COGS reduction estimated", "End-to-end P2P pipeline designed", "KPI monitoring across all vendors"],
    tools: ["Procurement Strategy", "Financial Modeling", "Vendor KPI Design"],
  },
  {
    slug: "urban-food-court-revenue",
    title: "Urban Food Court Revenue Optimization Strategy",
    shortTitle: "Food Court Revenue",
    domain: "Consulting",
    tags: "Growth Strategy",
    importance: "supporting",
    description: "Conversion-focused growth strategy for urban food courts — reframed the core metric from footfall to conversion rate across 4 visitor segments.",
    metrics: ["4 visitor segments mapped", "QR + bundle promotions designed", "Loyalty program proposed", "KPI: revenue per visitor"],
    tools: ["Customer Journey Mapping", "Segmentation", "Revenue Strategy"],
  },
  {
    slug: "vietnam-energy-landscape",
    title: "Vietnam Energy Landscape",
    shortTitle: "Vietnam Energy",
    domain: "Case Study",
    tags: "Energy Economics",
    importance: "supporting",
    description: "Strategic assessment of Vietnam's energy transition — generation mix, renewable adoption, and fossil fuel dependence against rapid industrialization-driven demand.",
    metrics: ["Full generation mix analyzed", "Regional peer benchmarking", "Policy initiatives evaluated", "Transition risks identified"],
    tools: ["Research", "Energy Economics", "Policy Analysis"],
  },
  {
    slug: "oil-crisis-india-impact",
    title: "Impact of Ongoing Oil Crisis on India's Economic Development",
    shortTitle: "India Oil Crisis",
    domain: "Case Study",
    tags: "Development Economics",
    importance: "supporting",
    description: "Analysis of how global oil price volatility transmits through India's import-dependent economy into inflation, trade balance, and sectoral growth.",
    metrics: ["3 transmission channels analyzed", "Sectoral effects: transport, manufacturing, energy", "Policy mitigation measures identified"],
    tools: ["Macroeconomic Analysis", "Policy Evaluation"],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ink">
        <Hero />

        <section id="work" className="bg-ink">
          <div className="container-page pt-20 md:pt-28">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
              / Selected work
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-tight text-paper text-balance md:text-4xl">
              Three deep dives. Nine more if you want the range.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Each one starts from a real operational question and ends in
              something someone could actually act on — a dashboard, a
              pricing rule, or a memo.
            </p>
          </div>

          <div className="container-page divide-y divide-line">
            {featured.map((p, i) => (
              <FeaturedProject key={p.slug} project={p} reversed={i % 2 === 1} />
            ))}
          </div>

          <div className="container-page pb-20 pt-4 md:pb-28">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Also shipped — click a node to open the case
            </p>
            <div className="mt-6">
              <ProjectGraph projects={graphProjects} />
            </div>
          </div>
        </section>

        <HowIThink />
        <Background />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
