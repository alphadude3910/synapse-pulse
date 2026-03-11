import { Link } from "react-router-dom";

const footerLinks = {
  Protocol: [
    { label: "Overview", href: "/protocol" },
    { label: "Architecture", href: "/protocol" },
    { label: "Tokenomics", href: "/protocol" },
    { label: "Roadmap", href: "/protocol" },
  ],
  Governance: [
    { label: "DAO", href: "/governance" },
    { label: "Proposals", href: "/governance" },
    { label: "Voting", href: "/governance" },
    { label: "Treasury", href: "/governance" },
  ],
  Documentation: [
    { label: "Getting Started", href: "/docs/installation-and-setup" },
    { label: "SDK Reference", href: "/docs/synapse-class" },
    { label: "API Docs", href: "/docs/authentication" },
    { label: "Examples", href: "/docs/ai-agent-marketplace" },
  ],
  Security: [
    { label: "Audits", href: "/docs/audit-reports" },
    { label: "Bug Bounty", href: "/docs/bug-bounty-program" },
    { label: "Key Management", href: "/docs/key-management" },
    { label: "ZK Proofs", href: "/docs/zk-proof-integration" },
  ],
};

const FooterSection = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-emerald transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-gradient-emerald tracking-tight">SYNAPSE</span>
          </Link>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © 2026 Synapse Technologies Pvt. Ltd. Registered Startup India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
