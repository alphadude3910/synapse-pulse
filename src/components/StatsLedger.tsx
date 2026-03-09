import { motion } from "framer-motion";

const tickerItems = [
  "0x8b3f...a2c1 settled",
  "0x4f9e...d7b2 verified",
  "0xa1c3...f8e0 authorized",
  "0x2d7b...c4a9 settled",
  "0x6e2f...b1d3 verified",
  "0xf4a8...e2c7 settled",
  "0x9c1d...a3f6 authorized",
  "0x3b7e...d9c2 settled",
  "0x7f4a...c6b1 verified",
  "0xe8d2...f5a4 settled",
];

const stats = [
  { label: "Latency", value: "<12ms", sub: "P99 finality" },
  { label: "Security", value: "ZK Proofs", sub: "Zero-knowledge verified" },
  { label: "Capacity", value: "10M TPS", sub: "Sustained throughput" },
];

const StatsLedger = () => {
  const doubled = [...tickerItems, ...tickerItems];

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
          <span className="text-xs font-mono text-data-blue uppercase tracking-widest mb-4 block">The Ledger</span>
          <h2 className="heading-lg text-gradient-white">Built for Scale</h2>
        </motion.div>

        {/* Ticker */}
        <div className="glass rounded-lg overflow-hidden mb-12">
          <div className="py-3 overflow-hidden">
            <div className="flex gap-8 animate-ticker-scroll whitespace-nowrap">
              {doubled.map((item, i) => (
                <span key={i} className="text-xs font-mono text-emerald/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald/40" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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
