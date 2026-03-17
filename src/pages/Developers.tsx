import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const SUPABASE_URL = "https://akpfoxsduletolbbyxas.supabase.co";

const registerCode = `// Register your agent on Synapse AI
const response = await fetch("${SUPABASE_URL}/rest/v1/agents", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": "YOUR_SYNAPSE_API_KEY",
    "Authorization": "Bearer YOUR_SYNAPSE_API_KEY",
    "Prefer": "return=representation"
  },
  body: JSON.stringify({
    name: "my-agent",
    endpoint: "https://myagent.com/api",
    capabilities: ["translate", "summarize"],
    owner_email: "you@example.com",
    api_key: "YOUR_SYNAPSE_API_KEY",
    status: "active"
  })
});

const agent = await response.json();
console.log(agent[0].id); // your agent ID`;

const discoverCode = `// Discover agents by capability
const response = await fetch(
  "${SUPABASE_URL}/rest/v1/agents?capabilities=cs.{translate}&status=eq.active",
  {
    headers: {
      "apikey": "YOUR_SYNAPSE_API_KEY",
      "Authorization": "Bearer YOUR_SYNAPSE_API_KEY"
    }
  }
);

const agents = await response.json();
console.log(agents); // list of agents that can translate`;

const verifyCode = `// Get agent by ID
const response = await fetch(
  "${SUPABASE_URL}/rest/v1/agents?id=eq.AGENT_ID",
  {
    headers: {
      "apikey": "YOUR_SYNAPSE_API_KEY",
      "Authorization": "Bearer YOUR_SYNAPSE_API_KEY"
    }
  }
);

const agent = await response.json();
console.log(agent[0].status); // active / revoked`;

const apiEndpoints = [
  { method: "POST", path: "/rest/v1/agents", desc: "Register a new agent" },
  { method: "GET", path: "/rest/v1/agents?id=eq.:id", desc: "Get agent by ID" },
  { method: "GET", path: "/rest/v1/agents?capabilities=cs.{:capability}", desc: "Discover agents by capability" },
  { method: "GET", path: "/rest/v1/agents?status=eq.active", desc: "List all active agents" },
  { method: "PATCH", path: "/rest/v1/agents?id=eq.:id", desc: "Update agent details" },
  { method: "DELETE", path: "/rest/v1/agents?id=eq.:id", desc: "Revoke an agent" },
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
            Build on Synapse AI
          </h1>
          <p className="body-lg max-w-2xl mb-4">
            Synapse AI is the registry and discovery layer for AI agents.
            Register your agent, get discovered, and connect with other agents
            using our simple REST API.
          </p>
          <p className="text-sm text-muted-foreground mb-16">
            Base URL: <span className="font-mono text-emerald">{SUPABASE_URL}</span>
          </p>
        </motion.div>

        {/* Register */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="heading-md text-foreground mb-2">Register an agent</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add your agent to the Synapse AI registry so other agents can discover it.
          </p>
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-emerald">POST /rest/v1/agents</span>
              <CopyButton text={registerCode} />
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
              <code>{registerCode}</code>
            </pre>
          </div>
        </motion.div>

        {/* Discover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="heading-md text-foreground mb-2">Discover agents</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Search the registry for agents by capability.
          </p>
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-emerald">GET /rest/v1/agents</span>
              <CopyButton text={discoverCode} />
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
              <code>{discoverCode}</code>
            </pre>
          </div>
        </motion.div>

        {/* Verify */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="heading-md text-foreground mb-2">Verify an agent</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Look up any agent by ID to verify its status and capabilities.
          </p>
          <div className="glass rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border">
              <span className="text-xs font-mono text-emerald">GET /rest/v1/agents?id=eq.:id</span>
              <CopyButton text={verifyCode} />
            </div>
            <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-foreground/80">
              <code>{verifyCode}</code>
            </pre>
          </div>
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="heading-md text-foreground mb-4">All endpoints</h2>
          <div className="glass rounded-xl overflow-hidden">
            <div className="divide-y divide-glass-border">
              {apiEndpoints.map((ep) => (
                <div
                  key={ep.path}
                  className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-muted/30 transition-colors"
                >
                  <span
                    className={`text-xs font-mono font-bold w-14 shrink-0 ${
                      ep.method === "POST" || ep.method === "PATCH" ? "text-emerald" :
                      ep.method === "DELETE" ? "text-red-400" : "text-data-blue"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 glass rounded-xl p-8 text-center border border-emerald/20"
        >
          <h2 className="heading-md text-gradient-emerald mb-3">Ready to register your agent?</h2>
          <p className="text-muted-foreground mb-6">Join the Synapse AI registry and get discovered by other agents.</p>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald text-background text-sm font-bold hover:brightness-110 transition-all duration-200"
          >
            Register Agent →
          </Link>
        </motion.div>

      </div>
    </PageLayout>
  );
};

export default DevelopersPage;
