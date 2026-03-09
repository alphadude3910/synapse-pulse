import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Vote, Shield, Users, Landmark } from "lucide-react";

const proposals = [
  {
    id: "SYN-042",
    title: "Increase validator stake minimum to 50,000 SYN",
    status: "Active",
    votesFor: 847293,
    votesAgainst: 231044,
    deadline: "Mar 15, 2026",
  },
  {
    id: "SYN-041",
    title: "Allocate 2% treasury to developer grants program",
    status: "Passed",
    votesFor: 1203948,
    votesAgainst: 89012,
    deadline: "Mar 01, 2026",
  },
  {
    id: "SYN-040",
    title: "Reduce settlement fee from 0.001% to 0.0005%",
    status: "Passed",
    votesFor: 993210,
    votesAgainst: 412039,
    deadline: "Feb 18, 2026",
  },
  {
    id: "SYN-039",
    title: "Add Solana bridge support to cross-chain module",
    status: "Rejected",
    votesFor: 342910,
    votesAgainst: 678031,
    deadline: "Feb 05, 2026",
  },
];

const stats = [
  { icon: Users, label: "Token Holders", value: "48,291" },
  { icon: Vote, label: "Proposals Voted", value: "42" },
  { icon: Landmark, label: "Treasury", value: "$12.4M" },
  { icon: Shield, label: "Validators", value: "1,247" },
];

const GovernancePage = () => {
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
            Governance
          </span>
          <h1 className="heading-xl mb-6 text-gradient-white">
            Community-Led Protocol
          </h1>
          <p className="body-lg max-w-2xl mb-16">
            Synapse is governed by its community through on-chain proposals and
            token-weighted voting. Every protocol upgrade is decided
            transparently.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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

        {/* Proposals */}
        <h2 className="heading-md text-foreground mb-6">Recent Proposals</h2>
        <div className="space-y-4">
          {proposals.map((proposal, i) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="glass rounded-xl p-5 sm:p-6 hover:border-emerald/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <span className="text-xs font-mono text-data-blue">{proposal.id}</span>
                <h3 className="text-sm font-semibold text-foreground flex-1">
                  {proposal.title}
                </h3>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded-full shrink-0 ${
                    proposal.status === "Active"
                      ? "bg-emerald/10 text-emerald"
                      : proposal.status === "Passed"
                      ? "bg-data-blue/10 text-data-blue"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span>
                  For:{" "}
                  <span className="text-emerald font-mono">
                    {proposal.votesFor.toLocaleString()}
                  </span>
                </span>
                <span>
                  Against:{" "}
                  <span className="text-destructive font-mono">
                    {proposal.votesAgainst.toLocaleString()}
                  </span>
                </span>
                <span className="ml-auto">Deadline: {proposal.deadline}</span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald"
                  style={{
                    width: `${
                      (proposal.votesFor /
                        (proposal.votesFor + proposal.votesAgainst)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;
