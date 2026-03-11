import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Code, Terminal, Webhook, Key, Database, Search } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const slugify = (text: string) =>
  text.toLowerCase().replace(/[&]/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const docCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Install the SDK, configure your first agent, and make your first cross-agent call in under 5 minutes.",
    articles: [
      "Installation & Setup",
      "Your First Agent",
      "Making Connections",
      "Handling Settlements",
      "Error Handling",
    ],
  },
  {
    icon: Code,
    title: "SDK Reference",
    description: "Complete TypeScript/Python SDK documentation with every method, type, and configuration option.",
    articles: [
      "Synapse Class",
      "Agent Configuration",
      "Session Management",
      "Settlement API",
      "Event Listeners",
    ],
  },
  {
    icon: Webhook,
    title: "API Documentation",
    description: "RESTful API reference for direct HTTP integration. Includes authentication, rate limits, and webhooks.",
    articles: [
      "Authentication",
      "Agent Endpoints",
      "Connection Endpoints",
      "Settlement Endpoints",
      "Webhooks & Events",
    ],
  },
  {
    icon: Terminal,
    title: "CLI Tools",
    description: "Command-line interface for managing agents, monitoring transactions, and debugging connections.",
    articles: [
      "Installation",
      "Agent Management",
      "Transaction Inspector",
      "Network Diagnostics",
      "Configuration",
    ],
  },
  {
    icon: Key,
    title: "Security",
    description: "Security best practices, key management, scope definitions, and zero-knowledge proof integration.",
    articles: [
      "Key Management",
      "Scope Definitions",
      "ZK Proof Integration",
      "Audit Reports",
      "Bug Bounty Program",
    ],
  },
  {
    icon: Database,
    title: "Examples",
    description: "Production-ready code examples and templates for common agent-to-agent workflows.",
    articles: [
      "AI Agent Marketplace",
      "Multi-Agent Orchestration",
      "Streaming Payments",
      "Data Pipeline Settlement",
      "Cross-Chain Bridge",
    ],
  },
];

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredCategories = docCategories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.articles.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            Documentation
          </span>
          <h1 className="heading-xl mb-6 text-gradient-white">Docs</h1>
          <p className="body-lg max-w-2xl mb-10">
            Comprehensive guides, API references, and examples to help you
            build on Synapse.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-emerald/40 transition-all"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="grid gap-4">
          {filteredCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              className="glass rounded-xl overflow-hidden hover:border-emerald/30 transition-all duration-300"
            >
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === cat.title ? null : cat.title
                  )
                }
                className="w-full flex items-start gap-4 p-6 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                  <cat.icon className="w-5 h-5 text-emerald" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground mb-1">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <span className="text-muted-foreground text-lg mt-1">
                  {expandedCategory === cat.title ? "−" : "+"}
                </span>
              </button>

              {expandedCategory === cat.title && (
                <div className="border-t border-glass-border px-6 pb-4">
                  <ul className="divide-y divide-glass-border/50">
                    {cat.articles.map((article) => (
                      <li key={article}>
                        <Link
                          to={`/docs/${slugify(article)}`}
                          className="w-full text-left py-3 text-sm text-muted-foreground hover:text-emerald transition-colors flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-emerald/40" />
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default DocsPage;
