import { useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 40;
const NODE_RADIUS = 1.5;

interface Node {
  x: number;
  y: number;
  active: boolean;
  brightness: number;
  targetBrightness: number;
}

const PulseCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[][]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const connectionsRef = useRef<{ from: [number, number]; to: [number, number]; progress: number; life: number }[]>([]);

  const initGrid = useCallback((w: number, h: number) => {
    const cols = Math.ceil(w / GRID_SIZE) + 1;
    const rows = Math.ceil(h / GRID_SIZE) + 1;
    const grid: Node[][] = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = {
          x: c * GRID_SIZE,
          y: r * GRID_SIZE,
          active: false,
          brightness: 0.06,
          targetBrightness: 0.06,
        };
      }
    }
    nodesRef.current = grid;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initGrid(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    // Periodically activate random connections
    const interval = setInterval(() => {
      const grid = nodesRef.current;
      if (grid.length === 0) return;
      const r1 = Math.floor(Math.random() * grid.length);
      const c1 = Math.floor(Math.random() * (grid[0]?.length || 0));
      const r2 = Math.min(grid.length - 1, r1 + Math.floor(Math.random() * 6) - 3);
      const c2 = Math.min((grid[0]?.length || 1) - 1, Math.max(0, c1 + Math.floor(Math.random() * 8) - 4));
      if (r1 !== r2 || c1 !== c2) {
        connectionsRef.current.push({ from: [r1, c1], to: [r2, c2], progress: 0, life: 1 });
        if (grid[r1]?.[c1]) grid[r1][c1].targetBrightness = 1;
        if (grid[r2]?.[c2]) grid[r2][c2].targetBrightness = 1;
      }
    }, 400);

    const draw = () => {
      const grid = nodesRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      for (const row of grid) {
        for (const node of row) {
          const dx = node.x - mx;
          const dy = node.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            node.targetBrightness = Math.max(node.targetBrightness, 0.3 + (1 - dist / 150) * 0.5);
          }
          node.brightness += (node.targetBrightness - node.brightness) * 0.08;
          node.targetBrightness += (0.06 - node.targetBrightness) * 0.02;

          // Draw grid lines near cursor
          if (dist < 200) {
            const lineAlpha = (1 - dist / 200) * 0.08;
            ctx.strokeStyle = `rgba(0,255,136,${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x - GRID_SIZE / 2, node.y);
            ctx.lineTo(node.x + GRID_SIZE / 2, node.y);
            ctx.moveTo(node.x, node.y - GRID_SIZE / 2);
            ctx.lineTo(node.x, node.y + GRID_SIZE / 2);
            ctx.stroke();
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,136,${node.brightness})`;
          ctx.fill();
        }
      }

      // Draw connections
      const conns = connectionsRef.current;
      for (let i = conns.length - 1; i >= 0; i--) {
        const conn = conns[i];
        conn.progress = Math.min(1, conn.progress + 0.02);
        conn.life -= 0.008;
        if (conn.life <= 0) {
          conns.splice(i, 1);
          continue;
        }
        const fromNode = grid[conn.from[0]]?.[conn.from[1]];
        const toNode = grid[conn.to[0]]?.[conn.to[1]];
        if (!fromNode || !toNode) continue;

        const alpha = conn.life * 0.3;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        const cx = (fromNode.x + toNode.x) / 2 + (Math.random() - 0.5) * 2;
        const cy = (fromNode.y + toNode.y) / 2 + (Math.random() - 0.5) * 2;
        ctx.quadraticCurveTo(cx, cy, fromNode.x + (toNode.x - fromNode.x) * conn.progress, fromNode.y + (toNode.y - fromNode.y) * conn.progress);
        ctx.strokeStyle = `rgba(0,163,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(animRef.current);
      clearInterval(interval);
    };
  }, [initGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default PulseCanvas;
