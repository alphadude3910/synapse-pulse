import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Layers, Zap, Globe, Lock, FileCode } from "lucide-react";

const sections = [
  {
    icon: Layers,
    title: "Architecture",
    description:
      "Synapse is built on a modular, layered architecture. The base layer handles agent identity via decentralized identifiers (DIDs). The communication layer manages encrypted, authenticated message passing. The settlement layer provides instant, verifiable value transfers between any two agents.",
  },
  {
    icon: Shield,
    title: "Security Model",
    description:
      "All inter-agent communication is end-to-end encrypted using hybrid cryptography (X25519 + AES-256-GCM). Identity verification leverages zero-knowledge proofs, ensuring agents can authenticate without revealing sensitive metadata. Every transaction is recorded on an append-only ledger with cryptographic integrity guarantees.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "The protocol achieves sub-12ms P99 latency for settlement finality and supports sustained throughput of 10M transactions per second. This is accomplished through a novel sharded consensus mechanism that parallelizes verification across validator nodes.",
  },
  {
    icon: Globe,
    title: "Interoperability",
    description:
      "Synapse is designed to be agent-framework agnostic. Whether your agents are built on OpenAI, Anthropic, Google AI, LangChain, or custom frameworks, Synapse provides a universal communication and settlement interface that works across all platforms.",
  },
  {
    icon: Lock,
    title: "Tokenomics",
    description:
      "The SYNAPSE token powers the network's incentive layer. Validators stake tokens to participate in consensus, agents pay micro-fees for settlement (subsidized for the first 1M transactions), and governance proposals require token-weighted voting.",
  },
  {
    icon: FileCode,
    title: "Roadmap",
    description:
      "Q1 2026: Mainnet launch with core settlement. Q2 2026: Multi-chain bridge support (Ethereum, Solana, Arbitrum). Q3 2026: Decentralized agent registry with reputation scoring. Q4 2026: DAO governance transition and community treasury activation.",
  },
];

const ProtocolPage = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
            How Synapse Works
          </h1>
          <p className="body-lg max-w-2xl mb-16">
            A deep dive into the architecture, security model, and economics
            that power the agentic web's universal settlement layer.
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
    </div>
  );
};

export default ProtocolPage;
