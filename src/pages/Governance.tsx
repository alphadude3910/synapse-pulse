import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, GitPullRequest, MessageSquare, Users, Rocket } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const roadmap = [
  {
    id: "v1.0",
    title: "Agent registration and discovery",
    status: "Live",
    description: "Register any agent with a name, endpoint, and capabilities. Discover agents by capability via REST API.",
  },
  {
    id: "v1.1",
    title: "Health monitoring and verified badges",
    status: "Building",
    description: "Synapse AI pings every registered agent regularly. Active agents get a verified badge. Offline agents are flagged automatically.",
  },
  {
    id: "v1.2",
    title: "Trust scoring between agents",
    status: "Planned",
    description: "Agents build reputation scores based on uptime, response quality, and peer reviews. Discover only the most trusted agents.",
  },
  {
    id: "v1.3",
    title: "Permission scopes and audit logs",
    status: "Planned",
    description: "Agents declare what they can and cannot do. Every interaction is logged for compliance and enterprise use cases.",
  },
  {
    id: "v2.0",
    title: "Agent billing layer",
    status: "Planned",
    description: "When Agent A uses Agent B's service, Synapse AI handles the billing. Stripe for agents — automated, transparent, instant.",
  },
];

const stats = [
  { icon: Users, label: "Registered agents", value: "Growing" },
  { icon: GitPullRequest, label: "API version", value: "v1.0" },
  { icon: MessageSquare, label: "Community", value: "Open" },
  { icon: Rocket, label: "Status", value: "Live" },
];

const GovernancePage = () => {
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
            Roadmap
          </span>
          <h1 className="heading-xl mb-6 text-gradient-white">
            Where we are going
          </h1>
          <p className="body-lg max-w-2xl mb-16">
            Synapse AI is building the trust and identity layer for the agent
            internet. Here is exactly what we are building and when.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-xl p-5 text-center"
            >
              <stat.icon className="w-5 h-5 text-emerald mx-auto mb-2" />
              <div className="text-xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="heading-md text-foreground mb-6">Product roadmap</h2>
        <div className="space-y-4">
          {roadmap.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="glass rounded-xl p-5 sm:p-6 hover:border-emerald/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <span className="text-xs font-mono text-data-blue">{item.id}</span>
                <h3 className="text-sm font-semibold text-foreground flex-1">
                  {item.title}
                </h3>
                <span className={`text-xs font-mono px-2 py-1 rounded-full shrink-0 ${
                  item.status === "Live"
                    ? "bg-emerald/10 text-emerald"
                    : item.status === "Building"
                    ? "bg-data-blue/10 text-data-blue"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 glass rounded-xl p-8 text-center border border-emerald/20"
        >
          <h2 className="heading-md text-gradient-emerald mb-3">Have a feature request?</h2>
          <p className="text-muted-foreground mb-6">
            Synapse AI is built for developers. Tell us what you need and we will build it.
          </p>
          
            href="mailto:hello@synapseai.dev"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald text-background text-sm font-bold hover:brightness-110 transition-all duration-200"
          >
            Share feedback →
          </a>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default GovernancePage;
