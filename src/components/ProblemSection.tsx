import { motion } from "framer-motion";
import { Lock, AlertTriangle, Banknote } from "lucide-react";

const problems = [
  {
    icon: Lock,
    title: "Siloed Intelligence",
    description: "AI agents are trapped in walled gardens. No interoperability, no shared context, no composability across platforms.",
    accent: "emerald" as const,
  },
  {
    icon: AlertTriangle,
    title: "Trust Deficit",
    description: "No cryptographic verification of agent identity or intent. Every cross-agent interaction is a leap of faith.",
    accent: "data-blue" as const,
  },
  {
    icon: Banknote,
    title: "Settlement Gap",
    description: "No native mechanism for AI-to-AI value transfer. Agents can't pay, invoice, or settle autonomously.",
    accent: "emerald" as const,
  },
];

const ProblemSection = () => {
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
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">The Bottleneck</span>
          <h2 className="heading-lg text-gradient-white">The Agentic Web is Broken</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-xl p-6 lg:p-8 group hover:border-emerald/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-5 ${
                problem.accent === "emerald" ? "bg-emerald/10" : "bg-data-blue/10"
              }`}>
                <problem.icon className={`w-5 h-5 ${
                  problem.accent === "emerald" ? "text-emerald" : "text-data-blue"
                }`} />
              </div>
              <h3 className="heading-md text-foreground mb-3 text-lg">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
