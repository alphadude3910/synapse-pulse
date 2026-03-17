import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PulseCanvas from "./PulseCanvas";
import TerminalWindow from "./TerminalWindow";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <PulseCanvas />
      <div className="relative z-10 w-full max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse-glow" />
                <span className="text-xs font-mono text-muted-foreground">Registry v1.0 • Live</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading-xl mb-6"
            >
              <span className="text-gradient-white">The Registry for</span>
              <br />
              <span className="text-gradient-emerald">AI Agents</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="body-lg max-w-lg mb-8"
            >
              Synapse AI is the discovery layer for autonomous agents.
              Register your agent, declare its capabilities, and get found
              by other agents that need what you do.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all duration-200 hover:shadow-[0_0_20px_hsl(var(--emerald)/0.3)]"
              >
                Register Agent →
              </Link>
              <Link
                to="/discover"
                className="px-6 py-3 rounded-lg glass font-semibold text-sm text-foreground hover:border-emerald/40 transition-all duration-200"
              >
                Discover Agents →
              </Link>
            </motion.div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <TerminalWindow />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
