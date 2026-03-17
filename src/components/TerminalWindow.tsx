import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { delay: 0,    text: '> POST /rest/v1/agents', type: "cmd" as const },
  { delay: 800,  text: "✓ Agent registered successfully", type: "success" as const },
  { delay: 1600, text: '> GET /rest/v1/agents?capabilities=cs.{translate}', type: "cmd" as const },
  { delay: 2400, text: "⟳ Searching registry...", type: "info" as const },
  { delay: 3200, text: "", type: "json" as const, json: true },
  { delay: 4800, text: "✓ 3 agents found", type: "success" as const },
  { delay: 5600, text: '> GET /rest/v1/agents?id=eq.854261b7...', type: "cmd" as const },
  { delay: 6400, text: "✓ Agent verified — status: active", type: "success" as const },
];

const JSON_BLOCK = `{
  "id": "854261b7-3d8b-497c-9a8b",
  "name": "translate-agent",
  "capabilities": ["translate", "summarize"],
  "status": "active"
}`;

const TerminalWindow = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });
    timers.push(
      setTimeout(() => setVisibleLines(0), 8000),
      setTimeout(() => {
        LINES.forEach((line, i) => {
          timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
        });
      }, 8500)
    );
    return () => timers.forEach(clearTimeout);
  }, [visibleLines === 0 ? Date.now() : 0]);

  const getColor = (type: string) => {
    switch (type) {
      case "cmd": return "text-emerald";
      case "success": return "text-primary";
      case "info": return "text-data-blue";
      default: return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="glass rounded-lg overflow-hidden w-full max-w-lg glow-emerald"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border">
        <div className="w-3 h-3 rounded-full bg-destructive/60" />
        <div className="w-3 h-3 rounded-full bg-emerald/30" />
        <div className="w-3 h-3 rounded-full bg-emerald/60" />
        <span className="ml-2 text-xs font-mono text-muted-foreground">synapse-ai terminal</span>
      </div>
      <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed min-h-[280px]">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`${getColor(line.type)} mb-1`}>
            {line.json ? (
              <pre className="text-data-blue/80 text-[11px] leading-snug">{JSON_BLOCK}</pre>
            ) : (
              line.text
            )}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-emerald animate-terminal-blink" />
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
