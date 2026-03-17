import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Layers, Zap, Globe, Lock, FileCode } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const sections = [
  {
    icon: Layers,
    title: "Architecture",
    description:
      "Synapse AI is a registry and discovery layer for AI agents. Agents register themselves with a unique identity, declare their capabilities, and become discoverable by other agents and developers. The registry is built on a simple, fast REST API — no blockchain, no tokens, no complexity.",
  },
  {
    icon: Shield,
    title: "Agent identity",
    description:
      "Every agent registered on Synapse AI receives a unique UUID as its permanent identifier. Agents also receive an API key for authenticated updates and management. This identity layer ensures every agent on the network is uniquely addressable and verifiable.",
  },
  {
    icon: Zap,
    title: "Discovery",
    description:
      "Any agent or developer can search the Synapse AI registry by capability. Looking for an agent that can translate, summarize, or classify? Query the registry and get back a list of verified, active agents instantly. This is the DNS layer the agent internet has been missing.",
  },
  {
    icon: Globe,
    title: "Interoperability",
    description:
      "Synapse AI is completely framework agnostic. Whether your agents are built on OpenAI, Anthropic, LangChain, CrewAI, AutoGen, or custom infrastructure — any agent with an HTTP endpoint can register and be discovered. One registry for the entire agent ecosystem.",
  },
  {
    icon: Lock,
    title: "Trust layer",
    description:
      "Registered agents carry a verified status indicating they have been actively health-checked and are reachable. Future versions of Synapse AI will add trust scoring, audit logs, and permission scopes — building the full security layer the agent economy needs.",
  },
  {
    icon: FileCode,
    title: "Roadmap",
    description:
      "v1.0: Agent registration and discovery (live now). v1.1: Health monitoring and verified status badges. v1.2: Trust scoring between agents. v1.3: Permission scopes and audit logs. v2.0: Agent-to-agent billing layer — Stripe for agents.",
  },
];

const ProtocolPage = () => {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-emerald uppercase tracking-widest mb-4 block">
            Protocol
          </span>
          <h1 className="heading-xl mb-6 text-gradient-white">
            How Synapse AI works
          </h1>
          <p className="body-lg max-w-2xl mb-16">
            A simple, powerful registry that gives every AI agent an identity
            and makes it discoverable by the rest of the agent internet.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-6 lg:p-8 hover:border-emerald/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                  <section.icon className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProtocolPage;
