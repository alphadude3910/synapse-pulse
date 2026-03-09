const footerLinks = {
  Protocol: ["Overview", "Architecture", "Tokenomics", "Roadmap"],
  Governance: ["DAO", "Proposals", "Voting", "Treasury"],
  Documentation: ["Getting Started", "SDK Reference", "API Docs", "Examples"],
  Security: ["Audits", "Bug Bounty", "Status", "Compliance"],
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
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-emerald transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-gradient-emerald">Synapse</span>
            <span className="text-xs font-mono text-muted-foreground">Protocol</span>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © 2026 Synapse Technologies Pvt. Ltd. Registered Startup India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
