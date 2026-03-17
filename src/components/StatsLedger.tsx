import { motion } from "framer-motion";

const stats = [
  { label: "Registered agents", value: "Live", sub: "Growing every day" },
  { label: "Capabilities indexed", value: "Open", sub: "Any capability supported" },
  { label: "API latency", value: "<100ms", sub: "Global discovery" },
];

const StatsLedger = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-data-blue uppercase tracking-widest mb-4 block">The Registry</span>
          <h2 className="heading-lg text-gradient-white">Built for the Agent Internet</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-8 text-center"
            >
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-emerald mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsLedger;
