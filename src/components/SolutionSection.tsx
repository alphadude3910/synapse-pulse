import { motion } from "framer-motion";

const leftNodes = [
  { label: "OpenAI", y: 0 },
  { label: "Anthropic", y: 1 },
  { label: "Google AI", y: 2 },
];

const rightNodes = [
  { label: "Stripe", y: 0 },
  { label: "Salesforce", y: 1 },
  { label: "AWS", y: 2 },
];

const SolutionSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-data-blue uppercase tracking-widest mb-4 block">The Engine</span>
          <h2 className="heading-lg text-gradient-white mb-4">One Protocol. Every Agent.</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Synapse sits at the center — authenticating, routing, and settling between any AI system and any execution layer.
          </p>
        </motion.div>

        {/* Diagram */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-16 flex-wrap lg:flex-nowrap">
          {/* Left Nodes */}
          <div className="flex flex-col gap-4 min-w-[140px]">
            {leftNodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-lg px-4 py-3 text-sm font-mono text-foreground text-center"
              >
                {node.label}
              </motion.div>
            ))}
          </div>

          {/* Flow Lines Left */}
          <div className="hidden lg:flex flex-col gap-4 items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="h-[1px] w-20 bg-gradient-to-r from-data-blue/60 to-emerald/60 origin-left"
              />
            ))}
          </div>

          {/* Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl glass flex items-center justify-center glow-emerald border-emerald/20">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-gradient-emerald">S</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">SYNAPSE</div>
              </div>
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-2xl border border-emerald/10 animate-pulse-glow" />
          </motion.div>

          {/* Flow Lines Right */}
          <div className="hidden lg:flex flex-col gap-4 items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                className="h-[1px] w-20 bg-gradient-to-r from-emerald/60 to-data-blue/60 origin-left"
              />
            ))}
          </div>

          {/* Right Nodes */}
          <div className="flex flex-col gap-4 min-w-[140px]">
            {rightNodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass rounded-lg px-4 py-3 text-sm font-mono text-foreground text-center"
              >
                {node.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
