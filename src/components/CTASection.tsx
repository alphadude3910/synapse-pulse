import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're on the list! We'll be in touch soon.");
      setEmail("");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-emerald/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">
            Get Early Access
          </span>
          <h2 className="heading-lg text-gradient-white mb-4">
            Ready to Build the Future?
          </h2>
          <p className="body-lg max-w-xl mx-auto mb-10">
            Join hundreds of developers already building on Synapse. Get SDK access,
            priority support, and early protocol updates.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald/40 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-200 hover:shadow-[0_0_20px_hsl(var(--emerald)/0.3)] flex items-center justify-center gap-2"
          >
            Join Waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            Free tier available
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            SOC 2 compliant
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Link
            to="/developers"
            className="px-6 py-3 rounded-lg glass font-semibold text-sm text-foreground hover:border-emerald/40 transition-all duration-200"
          >
            View SDK Docs →
          </Link>
          <Link
            to="/protocol"
            className="px-6 py-3 rounded-lg glass font-semibold text-sm text-foreground hover:border-data-blue/40 transition-all duration-200"
          >
            Read Whitepaper →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
