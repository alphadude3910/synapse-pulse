import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Initialize",
    desc: "Connect to the Synapse network with a single line. Auto-discovery of agent registries.",
  },
  {
    num: "02",
    title: "Connect",
    desc: "Establish authenticated, scoped connections between any two agents. Zero-knowledge identity proofs built in.",
  },
  {
    num: "03",
    title: "Settle",
    desc: "Execute instant, verifiable value transfers. Sub-12ms finality with full audit trail.",
  },
];

const CODE = `import { Synapse } from "@synapse/sdk";

// Initialize the protocol
const synapse = new Synapse({
  network: "mainnet",
  apiKey: process.env.SYNAPSE_KEY,
});

// Connect to a target agent
const session = await synapse
  .connect("agent_0x3a1f...")
  .authorize(["data:read", "pay:execute"]);

// Execute settlement
const tx = await session.settle({
  amount: "0.004",
  currency: "ETH",
  memo: "inference-batch-4291",
});

console.log(tx.hash); // 0x8b3f...a2c1
console.log(tx.latency); // 11ms`;

const SDKSection = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">Dev-First</span>
          <h2 className="heading-lg text-gradient-white mb-4">Three Lines to Production</h2>
          <p className="body-lg max-w-xl mx-auto">
            Ship agent-to-agent infrastructure in minutes, not months.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-xl p-6 group hover:border-emerald/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-extrabold text-emerald/30 font-mono">{step.num}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl overflow-hidden glow-blue"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-data-blue">synapse.ts</span>
              <span className="ml-auto text-[10px] font-mono text-muted-foreground">TypeScript</span>
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
              <code>{CODE}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SDKSection;
