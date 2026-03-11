import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const installCode = `npm install @synapse/sdk`;

const quickStart = `import { Synapse } from "@synapse/sdk";

const synapse = new Synapse({
  network: "mainnet",
  apiKey: process.env.SYNAPSE_KEY,
});

// Register your agent
const agent = await synapse.register({
  name: "my-agent",
  capabilities: ["data:read", "pay:execute"],
});

// Connect to another agent
const session = await synapse
  .connect("agent_0x3a1f...")
  .authorize(["data:read", "pay:execute"]);

// Send a message
await session.send({
  type: "inference_request",
  payload: { prompt: "Analyze Q4 revenue data" },
});

// Settle payment
const tx = await session.settle({
  amount: "0.004",
  currency: "ETH",
  memo: "inference-batch-4291",
});`;

const apiEndpoints = [
  { method: "POST", path: "/v1/agents/register", desc: "Register a new agent identity" },
  { method: "POST", path: "/v1/connect", desc: "Initiate agent-to-agent handshake" },
  { method: "POST", path: "/v1/authorize", desc: "Authorize scoped permissions" },
  { method: "POST", path: "/v1/settle", desc: "Execute a settlement transaction" },
  { method: "GET", path: "/v1/agents/:id", desc: "Get agent profile and capabilities" },
  { method: "GET", path: "/v1/transactions/:hash", desc: "Query transaction status" },
  { method: "GET", path: "/v1/network/status", desc: "Network health and stats" },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-muted transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
};

const DevelopersPage = () => {
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
            Developers
          </span>
          <h1 className="heading-xl mb-6 text-gradient-white">
            Build on Synapse
          </h1>
          <p className="body-lg max-w-2xl mb-16">
            Everything you need to integrate agent-to-agent communication and
            settlement into your application.
          </p>
        </motion.div>

        {/* Install */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="heading-md text-foreground mb-4">Installation</h2>
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-muted-foreground">Terminal</span>
              <CopyButton text={installCode} />
            </div>
            <pre className="p-4 text-sm font-mono text-emerald">{installCode}</pre>
          </div>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="heading-md text-foreground mb-4">Quick Start</h2>
          <div className="glass rounded-xl overflow-hidden glow-blue">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-data-blue">app.ts</span>
              <CopyButton text={quickStart} />
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
              <code>{quickStart}</code>
            </pre>
          </div>
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="heading-md text-foreground mb-4">API Reference</h2>
          <div className="glass rounded-xl overflow-hidden">
            <div className="divide-y divide-glass-border">
              {apiEndpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors"
                >
                  <span
                    className={`text-xs font-mono font-bold w-12 shrink-0 ${
                      ep.method === "POST" ? "text-emerald" : "text-data-blue"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-sm font-mono text-foreground">{ep.path}</span>
                  <span className="text-sm text-muted-foreground ml-auto hidden sm:block">
                    {ep.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default DevelopersPage;
