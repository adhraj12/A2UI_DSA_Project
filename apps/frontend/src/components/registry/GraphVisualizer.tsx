'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GraphVisualizerData } from '@/lib/a2ui-schema';
import { Network } from 'lucide-react';

interface Props {
  data: GraphVisualizerData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function GraphVisualizer({ data, onInteract }: Props) {
  const { nodes, edges, directed, title } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-layout nodes in a circle if no positions given
  const layoutNodes = nodes.map((node, i) => {
    if (node.x !== undefined && node.y !== undefined) return node;
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    const radius = Math.min(200, 80 + nodes.length * 15);
    return {
      ...node,
      x: 250 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle),
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 500 * dpr;
    canvas.height = 400 * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, 500, 400);

    // Get theme colors from CSS vars
    const style = getComputedStyle(canvas);
    const primaryColor = style.getPropertyValue('--np-primary').trim() || '#00f0ff';
    const secondaryColor = style.getPropertyValue('--np-secondary').trim() || '#ff00ea';
    const textColor = style.getPropertyValue('--np-text').trim() || '#e0e0ff';
    const mutedColor = style.getPropertyValue('--np-textMuted').trim() || '#7878a0';

    const nodeMap = new Map(layoutNodes.map(n => [n.id, n]));

    // Draw edges
    edges.forEach((edge) => {
      const from = nodeMap.get(edge.from);
      const to = nodeMap.get(edge.to);
      if (!from || !to || from.x == null || from.y == null || to.x == null || to.y == null) return;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = edge.highlighted ? primaryColor : mutedColor;
      ctx.lineWidth = edge.highlighted ? 3 : 1.5;
      ctx.globalAlpha = edge.highlighted ? 1 : 0.4;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Weight label
      if (edge.weight !== undefined) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        ctx.font = '11px monospace';
        ctx.fillStyle = edge.highlighted ? primaryColor : mutedColor;
        ctx.textAlign = 'center';
        ctx.fillText(String(edge.weight), mx, my - 6);
      }

      // Arrow for directed graphs
      if (directed) {
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const arrowLen = 10;
        const ax = to.x - 22 * Math.cos(angle);
        const ay = to.y - 22 * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - arrowLen * Math.cos(angle - 0.4), ay - arrowLen * Math.sin(angle - 0.4));
        ctx.lineTo(ax - arrowLen * Math.cos(angle + 0.4), ay - arrowLen * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = edge.highlighted ? primaryColor : mutedColor;
        ctx.fill();
      }
    });

    // Draw nodes
    layoutNodes.forEach((node) => {
      if (node.x == null || node.y == null) return;
      const radius = 20;

      // Glow
      if (node.highlighted) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 6, 0, 2 * Math.PI);
        ctx.fillStyle = `${primaryColor}33`;
        ctx.fill();
      }

      // Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
      if (node.highlighted) {
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
      } else {
        gradient.addColorStop(0, 'rgba(255,255,255,0.12)');
        gradient.addColorStop(1, 'rgba(255,255,255,0.04)');
      }
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = node.highlighted ? primaryColor : 'rgba(255,255,255,0.15)';
      ctx.lineWidth = node.highlighted ? 2 : 1;
      ctx.stroke();

      // Label
      ctx.font = `bold 12px monospace`;
      ctx.fillStyle = node.highlighted ? '#000' : textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  }, [layoutNodes, edges, directed]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = layoutNodes.find(
      (n) => n.x != null && n.y != null && Math.hypot(n.x - x, n.y - y) < 22
    );
    if (clicked) {
      onInteract?.({ action: 'node_click', payload: { nodeId: clicked.id } });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
      }}
    >
      {title && (
        <div className="flex items-center gap-2 mb-1">
          <Network size={16} style={{ color: 'var(--np-primary)' }} />
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-primary)' }}>
            {title}
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        onClick={handleCanvasClick}
        className="w-full rounded-lg cursor-crosshair"
        style={{ maxHeight: '400px', aspectRatio: '5/4' }}
      />
    </motion.div>
  );
}
