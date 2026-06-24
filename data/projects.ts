

export type Project = {
slug: string;
title: string;
domain: string;
subdomain: string;
mode: "Solo" | "Team";
verifiedBy: string;
artifactAlt?: string;
metrics?: { value: string; label: string }[];
whatsNext?: string;
businessQuestion?: string;
whyItMatters?: string;
keyInsight?: string;

stat: { value: string; label: string };
summary: string;
problem: string;
approach: string[];
results: string[];
tools: string[];

links: {
github?: string;
deck?: string;
demo?: string;
dashboard?: string;
report?: string;
colab?: string;
certificate?: string;
submission?: string;
};

tagline: string;
};



export const projects: Project[] = [
  {
    slug: "delhivery-network-intelligence",
    title: "Delhivery Network Intelligence & ETA Optimization",
    domain: "Analytics",
    subdomain: "Supply Chain Analytics, Graph ML",
    mode: "Team",
    verifiedBy: "Consulting & Analytics Club, IIT Guwahati",
    
    artifactAlt:
      "Network graph of 1,601 Delhivery hubs, sized by load and colored by delay severity, with the top bottleneck hub highlighted",
    metrics: [
      { value: "20+", label: "critical delay corridors flagged" },
      { value: "1,601", label: "hubs modeled as a graph" },
    ],
    stat: { value: "₹2.45 Cr", label: "estimated revenue-at-risk identified" },
    summary:
      "Modeled Delhivery's logistics network as a graph to expose hidden bottlenecks that distance-based ETA systems couldn't see, then used Node2Vec and GraphSAGE embeddings to improve delivery time prediction.",
    problem:
      "Delhivery's ETA system relied on route distance and historical averages, missing the network effects that actually drove delays — congestion at a single hub could cascade across dozens of downstream routes with no way to trace why.",
    approach: [
      "Constructed a directed graph of 1,601 hubs from 143,000+ shipment records, with hubs as nodes and shipment corridors as edges",
      "Computed degree centrality, betweenness centrality, and PageRank to rank hub importance and identify structural bottlenecks",
      "Generated Node2Vec and GraphSAGE embeddings to encode network position, then fed them into Random Forest, XGBoost, and LightGBM models for ETA prediction",
      "Built a Bottleneck Risk Score combining centrality, hub load, average delay, and SLA breach contribution",
      "Shipped a Streamlit dashboard for network overview, bottleneck detection, and delay corridor analysis",
    ],
    results: [
      "Graph-enhanced models outperformed distance-based baselines by capturing network effects baseline models ignored",
      "Identified 20+ critical delay corridors requiring operational intervention",
      "Surfaced ₹2.45 Cr in revenue-at-risk exposure tied to bottleneck hubs",
      "Gave operations teams a ranked list of hubs and corridors for capacity planning",
    ],
    businessQuestion:
      "Why do delivery delays persist even when the shortest routes are selected, and how can network-level bottlenecks be identified before they cascade across the logistics network?",

    whyItMatters:
      "Most ETA systems optimize for distance and historical averages, but logistics networks behave as interconnected systems. Congestion at one hub can trigger delays across dozens of downstream routes, making network intelligence critical for SLA reliability and capacity planning.",

    keyInsight:
      "Network structure explained delivery delays better than route distance alone. Graph embeddings and centrality metrics uncovered bottleneck hubs and 20+ critical delay corridors that traditional ETA systems could not identify.",    
    tools: ["Python", "NetworkX", "Node2Vec", "GraphSAGE", "XGBoost", "LightGBM", "Streamlit"],
    links: { github: "https://github.com/arusurya/Optimizing-Delivery-ETAs-with-Graph-Based-Network-Intelligence",
             report: "https://drive.google.com/file/d/1_yZI9c_DHS7goylv0vo-mycfELE58t42/view?usp=sharing",
             dashboard: "https://delhiverynetworkintelligence.streamlit.app/" },
    tagline:
      "Graph-based logistics intelligence platform analyzing 143K+ shipments across 1,601 hubs using Node2Vec/GraphSAGE embeddings to improve ETA prediction and uncover ₹2.45 Cr in operational risk.",
  },
  {
    slug: "dynamic-tariff-optimization",
    title: "Agentic AI-Based Dynamic Tariff Optimization",
    domain: "Analytics",
    subdomain: "AI, ML, Pricing Strategy",
    mode: "Solo",
    verifiedBy: "SocBiz, IIT Roorkee (OP'26)",
    
    artifactAlt:
      "Architecture diagram of the three-agent dynamic tariff system: forecasting, pricing, and learning agents",
    metrics: [
      { value: "R² = 0.9685", label: "forecasting model fit" },
      { value: "99.72%", label: "revenue retention" },
    ],
    stat: { value: "99.72%", label: "simulated revenue retention" },
    summary:
      "Built a three-agent pricing system for EV charging stations that forecasts demand, adjusts tariffs in real time, and learns from outcomes — improving utilization and cutting wait times without sacrificing revenue.",
    problem:
      "EV charging networks use static pricing regardless of demand, leaving ~61% of infrastructure under 30% utilization while popular stations face long queues at peak hours — a coordination failure, not a capacity one.",
    approach: [
      "Analyzed the ACN dataset (14,848 sessions) and UrbanEV dataset (2.13M observations, 247 stations) to characterize demand patterns and idle occupancy",
      "Built a Gradient Boosting forecasting engine using lag variables, rolling demand windows, and time-of-day features — util_lag1 alone contributed ~82% of predictive power",
      "Designed a three-zone dynamic tariff: discount pricing below 30% utilization, normal pricing 30–80%, surge pricing above 80%",
      "Implemented a learning agent that monitored revenue, utilization, wait times, and customer response to refine thresholds over time",
    ],
    results: [
      "Forecasting model achieved R² = 0.9685, RMSE = 0.031",
      "Average network utilization rose from 29.2% to 30.2% at network scale",
      "Average wait times dropped by 3.1 minutes",
      "Off-peak demand increased 10% in response to pricing incentives",
      "Revenue retention held at 99.72% despite the pricing shift",
    ],
    businessQuestion:
      "Can dynamic pricing redistribute EV charging demand away from peak periods without materially reducing operator revenue?",

    whyItMatters:
      "EV charging networks suffer from uneven utilization. While some stations face long queues, many remain underutilized. The challenge is not infrastructure capacity but demand distribution.",

    keyInsight:
      "Pricing acted as a coordination mechanism rather than a revenue lever. Small tariff adjustments successfully shifted demand toward underutilized periods while preserving revenue performance.",
    tools: ["Python", "Gradient Boosting", "Pandas", "Feature Engineering"],
    links: { 
      colab: "https://colab.research.google.com/drive/1IdP4D59fHsduGqeJwJhZQ_NbdxNSwkfI?usp=sharing",
      deck: "https://drive.google.com/file/d/1Yps9IZ6iaNAjLQFlkEjNrwJYBjAGchHX/view?usp=sharing",
    }, 
    tagline:
      "Agentic AI pricing platform that forecasted EV charging demand, dynamically optimized tariffs, reduced congestion, and maintained 99.72% revenue retention through adaptive decision-making.",
  },
  {
    slug: "loyalty-intelligence-platform",
    title: "Airline Loyalty Intelligence Platform",
    domain: "Analytics, Data Science",
    subdomain: "Customer Analytics, BI",
    mode: "Team",
    verifiedBy: "Consulting & Analytics Club, IIT Guwahati",
    
    artifactAlt:
      "SHAP waterfall plot explaining the churn risk score for a high-risk loyalty member",
    metrics: [
      { value: "4", label: "risk-value tiers (Low/Med/High/Critical)" },
      { value: "3", label: "models: XGBoost, LightGBM, SHAP" },
    ],
    stat: { value: "4", label: "risk-value segments with SHAP explainability" },
    summary:
      "An explainable churn and customer-lifetime-value platform for airline loyalty programs that flags high-value members before they silently disengage, and tells you exactly why.",
    problem:
      "Airlines lose loyalty members to silent churn long before they formally leave, while broad tier segments (Silver/Gold/Platinum) fail to capture actual churn risk or future value — and even when churn scores exist, business teams don't trust them without an explanation.",
    approach: [
      "Engineered behavioral features beyond standard RFM: booking momentum, recency ratio, engagement trend, and point-expiration sensitivity",
      "Built a churn prediction engine using XGBoost, LightGBM, and Scikit-Learn to generate per-member churn probability",
      "Developed a Behavioral CLV framework combining historical spend with forward-looking churn risk and engagement trajectory",
      "Layered in SHAP explainability so business teams could see exactly which behaviors drove each risk score",
      "Shipped a Streamlit dashboard with executive overview, member lookup, segment explorer, and a retention recommendation engine",
    ],
    results: [
      "Identified at-risk customers before they became fully inactive",
      "Segmented members into Low / Medium / High / Critical risk tiers tied to both value and engagement",
      "Behavioral CLV let the airline distinguish high-value at-risk members from low-value ones for resourcing",
      "SHAP outputs improved business-team trust and adoption of the risk scores",
    ],
    businessQuestion:
      "Which loyalty members are most likely to churn, and how should airlines prioritize retention efforts toward customers with the highest future value?",

    whyItMatters:
      "Traditional loyalty tiers capture status but fail to identify silent churn. Airlines often spend retention budgets inefficiently because they cannot distinguish high-value at-risk members from low-value customers.",

    keyInsight:
      "Churn prediction became significantly more actionable when combined with Behavioral CLV and SHAP explainability, revealing not only who was at risk but why they were at risk and how valuable they were to retain.",
    tools: ["Python", "XGBoost", "LightGBM", "SHAP", "Streamlit"],
    links: { github: "https://github.com/arusurya/summer_project_iitg", 
             dashboard: "https://airlineloyaltyprediction.streamlit.app"
    },
    tagline:
      "AI-powered loyalty intelligence platform combining churn prediction, Behavioral CLV modeling, SHAP explainability, and automated retention recommendations to identify high-value at-risk customers.",
  },
  {
    slug: "smart-campus-intelligence",
    title: "Smart Campus Intelligence System",
    domain: "Analytics",
    subdomain: "Forecasting, BI, Operations",
    mode: "Team",
    verifiedBy: "Shrishti, IIT Roorkee (Tech GC)",
    
    artifactAlt:
      "Anomaly detection chart flagging unexpected attendance spikes and drops in campus mess hall usage",
    metrics: [
      { value: "113,528+", label: "records processed" },
      { value: "3rd / 30+", label: "competition rank" },
    ],
    stat: { value: "3rd / 30+", label: "rank in campus intelligence challenge" },
    summary:
      "A forecasting and anomaly-detection platform that turned 113K+ campus attendance records into real-time staffing and resource recommendations — placed 3rd among 30+ competing teams.",
    problem:
      "Campus mess halls and common spaces face unpredictable crowd surges that administrators can't anticipate, since operational decisions are based on historical averages rather than forecasts, and anomalies go unnoticed until they've already disrupted operations.",
    approach: [
      "Analyzed 113,528+ records covering attendance, mess usage, and meal-slot activity across daily, weekly, and seasonal cycles",
      "Built a demand forecasting module using historical attendance, lag variables, and temporal features",
      "Applied Isolation Forest for anomaly detection to flag attendance spikes and unexpected drops in real time",
      "Designed a recommendation engine translating forecasts directly into staffing actions (e.g. increase capacity ahead of predicted peak demand)",
      "Built a Streamlit decision-support dashboard with forecast, anomaly monitoring, and recommendation views",
    ],
    results: [
      "Processed 113,528+ campus records into actionable forecasts",
      "Forecasting engine captured attendance trends accurately enough to support proactive planning",
      "Secured 3rd rank among approximately 30+ participating teams",
      "Judges specifically cited product thinking and real-world implementation potential",
    ],
    businessQuestion:
      "How can campus administrators predict crowd surges before they occur and convert attendance data into proactive operational decisions?",

    whyItMatters:
      "Campus operations are typically reactive. Unexpected spikes create congestion, poor student experience, and inefficient resource allocation. Forecasting demand enables proactive staffing and capacity planning.",

    keyInsight:
      "Combining forecasting with anomaly detection transformed attendance records into an operational intelligence layer, allowing administrators to act before disruption occurred rather than after.",
    tools: ["Python", "Isolation Forest", "Streamlit", "Time Series Forecasting"],
    links: { github: "https://github.com/arusurya/Shristhi",
             dashboard: "https://shristhi-rkcn3oudpxwfstuafbbgrv.streamlit.app",
             report: "https://drive.google.com/file/d/1h64mOMJaqxXAmoudYI0_WWKARkPSpcct/view?usp=sharing"
    },
    tagline:
      "Award-winning campus intelligence platform that analyzed 113K+ operational records, forecasted demand, detected anomalies via Isolation Forest, and generated actionable recommendations — 3rd place among 30+ teams.",
  },
  {
    slug: "digital-lending-intelligence",
    title: "Digital Lending Portfolio Optimization",
    domain: "Finance",
    subdomain: "Risk Analytics, FinTech",
    mode: "Team",
    verifiedBy: "Consulting & Analytics Club, IIT Guwahati",
    stat: { value: "₹1,51,768", label: "optimal risk-adjusted return per loan" },
    summary:
      "A portfolio intelligence framework for digital lenders that segments borrowers by risk and profitability, ranks acquisition channels by quality, and flags financial stress before default occurs.",
    problem:
      "Digital lenders approve loans quickly but largely ignore portfolio-level intelligence afterward — borrowers are treated uniformly despite very different risk profiles, acquisition channels vary wildly in quality, and risk teams typically find out about trouble only after delinquencies have already started rising.",
    approach: [
      "Analyzed 10,000 borrower records across 41 portfolio variables spanning demographics, repayment behavior, and acquisition source",
      "Built a composite Portfolio Score combining risk factors (delinquency, repayment history) with profitability factors (loan size, interest revenue, CLV)",
      "Segmented borrowers into Growth, Standard, Watchlist, and Decline tiers, each with distinct lending recommendations",
      "Evaluated acquisition channels (referral, partner, direct marketing, social media) on default rate and risk-adjusted value",
      "Designed an Early Warning Alert System monitoring missed payments, spending volatility, and cash-flow deterioration",
    ],
    results: [
      "Segmented the portfolio: Growth 5.9%, Standard 39.7%, Watchlist 30.4%, Decline 24.0%",
      "Referral acquisition emerged as the highest-quality channel; social media the weakest",
      "Identified an optimal lending structure (large loan size, 25+ month tenure) generating ₹1,51,768 in risk-adjusted return",
      "Early Warning System flagged financial stress indicators ahead of actual default events",
    ],
    tools: ["Python", "Scikit-learn", "Pandas", "Risk Scoring Models"],
    links: { github: "#",
            report: "https://docs.google.com/document/d/1FbZHUib89i501r9xSG6BhBhiYOsj5saf/edit?usp=sharing&ouid=111975557227457565722&rtpof=true&sd=true", 
            deck: "https://drive.google.com/file/d/1mNbNcxsnXcvu4DvAC5ovRqDOkeiAvMpn/view?usp=sharing" },
    tagline:
      "Portfolio intelligence framework analyzing 10,000 borrowers across 41 variables, with risk-based segmentation, acquisition channel optimization, and an Early Warning Alert System for sustainable lending growth.",
  },
  {
    slug: "cir-yield-curve-modeling",
    title: "CIR Interest Rate Modelling & Yield Curve Prediction",
    domain: "Finance",
    subdomain: "Financial Intelligence",
    mode: "Solo",
    verifiedBy: "Finance Club, IIT Roorkee",
    artifactAlt:
      "Chart comparing CIR-model predicted vs. actual Treasury yields across 9-month and 1-year horizons",
    metrics: [
      { value: "AR(1) ≈ 0.998", label: "short-rate persistence" },
      { value: "1", label: "input rate required" },
    ],
    stat: { value: "AR(1) ≈ 0.998", label: "short-rate persistence handled via cross-sectional calibration" },
    summary:
      "Implemented the Cox-Ingersoll-Ross short-rate model from scratch and reconstructed the full Treasury yield curve from a single observed input: the 3-month yield.",
    problem:
      "Could the entire Treasury yield curve — from 6 months out to 30 years — be reconstructed using only the 3-month yield and a theoretical short-rate model, despite the short rate behaving almost like a random walk in practice?",
    approach: [
      "Trained on ~1,976 daily Treasury observations (May 2016–April 2024) across 10 maturities, then tested reconstruction using only the 3-month yield",
      "Implemented CIR short-rate dynamics, closed-form bond pricing, and yield curve generation from scratch",
      "Attempted standard Maximum Likelihood calibration first; found it produced κ → 0 due to extreme short-rate persistence (AR(1) ≈ 0.998), making mean reversion uninterpretable",
      "Pivoted to a cross-sectional calibration approach — fitting κ, θ, and σ to the shape of the full yield curve rather than time-series history alone",
      "Built multi-start optimization with weighted error functions to avoid local minima during calibration",
    ],
    results: [
      "Successfully reconstructed the overall slope and regime structure of the Treasury curve from the 3-month yield alone",
      "Cross-sectional calibration meaningfully outperformed pure time-series MLE estimation",
      "Demonstrated that yield curve shape carries more usable information for calibration than short-rate history alone",
      "Identified residual term-structure effects motivating further work with CIR++ or multi-factor models",
    ],
    businessQuestion:
      "Can the entire Treasury yield curve be reconstructed using only the 3-month yield and a theoretical short-rate model?",

    whyItMatters:
      "Yield curve reconstruction sits at the center of fixed-income valuation, risk management, and macroeconomic forecasting. Traditional calibration methods often fail when interest rates exhibit near-random-walk behavior.",

    keyInsight:
      "Standard maximum-likelihood calibration collapsed because short-rate persistence approached AR(1)=0.998. Cross-sectional calibration recovered economically meaningful parameters and significantly improved yield-curve reconstruction.",
    tools: ["Python", "NumPy", "SciPy", "Numerical Optimization", "Stochastic Calculus"],
    links: { github: "https://github.com/arusurya/Stochastic_Interest_Rate_Modelling_and_Prediction" },
    tagline:
      "Implemented and calibrated the Cox–Ingersoll–Ross model from scratch to reconstruct Treasury yield curves, building a cross-sectional calibration framework that outperformed standard MLE on highly persistent short-rate data.",
  },
  {
    slug: "spotify-pochimu",
    title: "Spotify Pochimu — AI Music Companion",
    domain: "Product",
    subdomain: "GenAI Product Strategy",
    mode: "Solo",
    verifiedBy: "SocBiz, IIT Roorkee",
    
    artifactAlt:
      "Pochimu AI music companion prototype showing mood-based playlist recommendations",
    metrics: [
      { value: "3", label: "intelligence layers" },
      { value: "1", label: "working prototype" },
    ],
    stat: { value: "3", label: "intelligence layers: context, memory, recommendation" },
    summary:
      "A product concept and working prototype reimagining Spotify around emotional companionship rather than recommendation accuracy — pairing mood-awareness with persistent memory.",
    problem:
      "Spotify already excels at recommending songs, but it answers 'what should I listen to' rather than 'how am I feeling' — leaving engagement transactional rather than relational, with no persistent memory of a user's emotional context across sessions.",
    approach: [
      "Researched how users form emotional attachments to AI companions and virtual characters, and why Gen Z increasingly prefers personalized over purely functional experiences",
      "Designed a four-layer architecture: context (recent activity), memory (long-term preferences and moments), recommendation, and conversational interaction",
      "Mapped end-to-end user journeys for emotional states (stressed, nostalgic, exploratory) into concrete recommendation behaviors",
      "Built a functional prototype demonstrating the companion interface, mood-based recommendations, and personalized flows — going beyond a slide deck",
    ],
    results: [
      "Validated key product journeys through a working prototype rather than strategy alone",
      "Articulated a differentiation thesis: companionship over recommendation accuracy as Spotify's next moat",
      "Outlined monetization paths: premium companion features, AI-curated soundtracks, memory-driven music journeys",
    ],
    businessQuestion:
      "What if Spotify optimized for emotional companionship rather than recommendation accuracy alone?",

    whyItMatters:
      "Music platforms compete heavily on recommendation algorithms, creating functional but transactional experiences. Emotional engagement and memory remain largely unexplored opportunities for long-term retention.",

    keyInsight:
      "The next competitive moat may not be recommending better songs, but remembering meaningful moments. Persistent memory, emotional context, and conversational interaction create deeper engagement than recommendation quality alone.",
    tools: ["Product Strategy", "UX Flows", "Prototyping", "GenAI Design"],
    links: { deck: "https://drive.google.com/file/d/1fXoNmYC0aHxaJXfjoUJKhTvVSbpV5WJn/view?usp=sharing",
             demo: "https://spotify-pochimu-app-jdcl.bolt.host/" },
    tagline:
      "Designed and prototyped Pochimu, an AI emotional music companion for Spotify combining memory, mood-awareness, and conversational AI to move music streaming beyond recommendation into companionship.",
  },
  {
    slug: "divaine-gtm-strategy",
    title: "divAIne — Go-To-Market Strategy for Enterprise AI",
    domain: "Strategy, Consulting",
    subdomain: "AI Business Strategy",
    mode: "Team",
    verifiedBy: "Shrishti, IIT Roorkee (Tech GC)",
    stat: { value: "3", label: "phased GTM stages from pilot to scaled adoption" },
    summary:
      "A go-to-market strategy positioning an enterprise AI platform around trust, memory, and explainability — deliberately avoiding a head-on fight with foundation model providers on raw capability.",
    problem:
      "Enterprises are experimenting heavily with AI but rarely deploying it in high-stakes workflows, because hallucination risk, poor explainability, fragmented memory, and compliance gaps stop most pilots from scaling — adoption, not intelligence, is the real bottleneck.",
    approach: [
      "Analyzed enterprise AI adoption barriers across healthcare, finance, legal, and consulting",
      "Identified that competing on model intelligence is a losing position against foundation labs; trust and governance are the open lane",
      "Selected healthcare, financial services, legal, and consulting/knowledge work as beachhead markets based on trust intensity",
      "Designed a three-phase GTM funnel: early high-trust pilots, expansion via reference customers, then ecosystem-led scaling",
      "Built a competitive map identifying gaps in persistent memory, explainability, and governance among existing copilots",
    ],
    results: [
      "Produced a market positioning framework differentiated on trust rather than model performance",
      "Prioritized target segments by AI maturity and governance need",
      "Delivered a phased adoption roadmap from pilot to scaled enterprise deployment",
    ],
    tools: ["Market Research", "Competitive Analysis", "GTM Strategy", "Positioning Frameworks"],
    links: { deck: "https://drive.google.com/file/d/1h46qWCPBU9QNCzkbEmA7o1w6Onm5wBrn/view?usp=sharing" },
    tagline:
      "Developed a go-to-market strategy for divAIne, an enterprise AI platform built around trust, memory continuity, and explainability, with a phased adoption roadmap for high-trust industries.",
  },
  {
    slug: "roastery-expansion-strategy",
    title: "Roastery Coffee House Expansion & Procurement Strategy",
    domain: "Consulting",
    subdomain: "Operations, Finance",
    mode: "Team",
    verifiedBy: "Case Submission – IIM Lucknow Case Competition",
    stat: { value: "5–10%", label: "targeted COGS reduction" },
    summary:
      "An operational and financial readiness framework for a specialty coffee chain's multi-location expansion, built around procurement standardization and working capital discipline.",
    problem:
      "Roastery Coffee House was scaling aggressively, but reactive procurement, inconsistent vendor performance, and rising working capital needs threatened to turn growth into margin erosion if left unaddressed.",
    approach: [
      "Mapped existing purchasing workflows, vendor relationships, and financial controls across locations",
      "Designed an end-to-end Procure-to-Pay pipeline from demand planning through payment processing",
      "Built a vendor performance framework scoring delivery reliability, quality, cost competitiveness, and responsiveness",
      "Developed inventory optimization recommendations addressing demand forecasting, safety stock, and freshness constraints specific to specialty coffee",
      "Proposed a working capital improvement plan covering inventory reduction, procurement scheduling, and supplier payment terms",
    ],
    results: [
      "Targeted reducing emergency purchases from over 25% of orders to under 10%",
      "Estimated a 5–10% reduction in COGS through procurement and vendor optimization",
      "Established KPI-based monitoring across vendors, procurement, and inventory",
      "Delivered an expansion playbook of standardized processes for future store rollouts",
    ],
    tools: ["Procurement Strategy", "Financial Modeling", "Vendor KPI Design"],
    links: { deck: "https://drive.google.com/file/d/1XOwodaBeDBo6ak0GL278XOk6X2-ptGvH/view?usp=sharing" },
    tagline:
      "Designed a procurement and expansion strategy for Roastery Coffee House — a Procure-to-Pay framework, vendor governance system, and working-capital roadmap targeting a 5–10% reduction in operating costs.",
  },
  {
    slug: "urban-food-court-revenue",
    title: "Urban Food Court Revenue Optimization Strategy",
    domain: "Consulting",
    subdomain: "Growth Strategy",
    mode: "Solo",
    verifiedBy: "Internal Strategy Project",
    stat: { value: "4", label: "customer segments mapped to targeted interventions" },
    summary:
      "A conversion-focused growth strategy for urban food courts, reframing the core metric from footfall to conversion rate and designing interventions across the customer journey.",
    problem:
      "Urban food courts in Tier-2 markets drew strong footfall but converted it poorly — many visitors left without purchasing, or bought only from a single vendor — while operators kept optimizing for occupancy rather than the customer journey.",
    approach: [
      "Mapped the full customer journey from entry through vendor discovery, purchase, dining, and exit to find friction points",
      "Segmented visitors into Quick Buyers, Explorers, Social Visitors, and Value Seekers, each warranting different interventions",
      "Designed bundle promotions and QR-based campaigns to lift basket size and multi-vendor purchases",
      "Proposed loyalty programs and experience-design changes (signage, discovery zones, micro-experience areas) to extend dwell time",
      "Recommended a vendor-level KPI framework tracking revenue per visitor and repeat purchase rate",
    ],
    results: [
      "Reframed the core success metric from traffic volume to conversion rate",
      "Identified high-impact, low-capex interventions to lift conversion and basket size",
      "Proposed a phased rollout: short-term promotions, medium-term loyalty and experience zones, long-term revenue intelligence tracking",
    ],
    tools: ["Customer Journey Mapping", "Segmentation", "Revenue Strategy"],
    links: { deck: "https://drive.google.com/file/d/1OLAU4Q4iigK13kr46awMZAe5H6QkcrWj/view?usp=sharing" },
    tagline:
      "Developed a revenue optimization strategy for urban food courts — customer journey mapping, conversion bottleneck analysis, and loyalty/promotional frameworks to lift spend, retention, and vendor performance.",
  },
  {
    slug: "vietnam-energy-landscape",
    title: "Vietnam Energy Landscape",
    domain: "Case Study",
    subdomain: "Energy Economics",
    mode: "Team",
    verifiedBy: "Departmental Project",
    stat: { value: "1", label: "strategic transition assessment" },
    summary:
      "A strategic assessment of Vietnam's energy transition, examining its generation mix, renewable adoption, and fossil fuel dependence against rapid industrialization-driven demand growth.",
    problem:
      "Vietnam's rapid industrialization has raised energy demand sharply, raising questions about energy security and the pace of its transition toward sustainable generation.",
    approach: [
      "Studied Vietnam's energy mix and generation capacity across fuel sources",
      "Analyzed trends in renewable energy adoption relative to regional peers",
      "Evaluated the country's dependence on fossil fuel imports and generation",
      "Assessed policy initiatives supporting the energy transition",
    ],
    results: [
      "Produced a strategic assessment of Vietnam's evolving energy landscape",
      "Identified key opportunities and risks in the transition toward sustainable energy",
    ],
    tools: ["Research", "Energy Economics", "Policy Analysis"],
    links: {},
    tagline:
      "Strategic assessment of Vietnam's energy transition, evaluating generation mix, renewable adoption, and policy support amid rapidly rising industrial demand.",
  },
  {
    slug: "oil-crisis-india-impact",
    title: "Impact of Ongoing Oil Crisis on India's Economic Development",
    domain: "Case Study",
    subdomain: "Development Economics",
    mode: "Team",
    verifiedBy: "Departmental Project",
    stat: { value: "3", label: "sectors examined: transport, manufacturing, energy" },
    summary:
      "An analysis of how global oil price volatility transmits through India's import-dependent economy into inflation, trade balance, and sectoral growth.",
    problem:
      "India's heavy reliance on imported crude makes its economy structurally exposed to global oil price shocks, with consequences that ripple well beyond fuel prices alone.",
    approach: [
      "Analyzed oil price fluctuations and their transmission mechanisms into the domestic economy",
      "Studied impacts on inflation, trade balance, and fiscal stability",
      "Examined sectoral effects across transportation, manufacturing, and energy-intensive industries",
    ],
    results: [
      "Demonstrated how sustained oil price volatility affects India's broader economic development",
      "Highlighted policy measures for mitigating energy-related macroeconomic risk",
    ],
    tools: ["Macroeconomic Analysis", "Policy Evaluation"],
    links: {},
    tagline:
      "Examined how sustained oil price volatility transmits into India's inflation, trade balance, and sectoral growth, highlighting policy measures to mitigate energy-related macro risk.",
  },
];

export const featuredSlugs = [
"smart-campus-intelligence",
"delhivery-network-intelligence",
"cir-yield-curve-modeling",
"loyalty-intelligence-platform",
"dynamic-tariff-optimization",
"spotify-pochimu",
];


export const featuredProjects = projects.filter((p) => featuredSlugs.includes(p.slug));
export const otherProjects = projects.filter((p) => !featuredSlugs.includes(p.slug));
