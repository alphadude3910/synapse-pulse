import { motion } from "framer-motion";

const partners = [
  "OpenAI", "Anthropic", "Google AI", "AWS", "Stripe", "Ethereum Foundation",
];

const PartnersSection = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center mb-10"
        >
          Trusted by teams building the agentic future
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {partners.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-sm sm:text-base font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-300 tracking-wide"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
