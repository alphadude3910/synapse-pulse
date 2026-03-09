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
    { label: "Getting Started", href: "/docs" },
    { label: "SDK Reference", href: "/developers" },
    { label: "API Docs", href: "/developers" },
    { label: "Examples", href: "/docs" },
  ],
  Security: [
    { label: "Audits", href: "/protocol" },
    { label: "Bug Bounty", href: "/docs" },
    { label: "Status", href: "/protocol" },
    { label: "Compliance", href: "/protocol" },
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
