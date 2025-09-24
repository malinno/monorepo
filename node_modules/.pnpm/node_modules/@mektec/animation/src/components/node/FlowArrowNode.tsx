import { Handle, Position } from "@xyflow/react";

export default function FlowArrowNode({ data }: any) {
  const dir: "N" | "S" | "E" | "W" = data?.dir || "E";
  const rot = dir === "N" ? -90 : dir === "E" ? 0 : dir === "S" ? 90 : 180;
  return (
    <div style={{ width: 120, height: 60, position: "relative" }}>
      <svg
        width="120"
        height="60"
        viewBox="0 0 120 60"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <rect
          x="8"
          y="20"
          width="104"
          height="20"
          rx="10"
          fill="#cbd5e1"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect x="14" y="24" width="92" height="12" rx="6" fill="#e2e8f0" />
        <path d="M70 16 L98 30 L70 44 Z" fill="#16a34a" stroke="#0f172a" />
      </svg>
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        style={port("#1E90FF", { left: -2, top: 30 })}
      />
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={port("#0EAD69", { right: -2, top: 30 })}
      />
    </div>
  );
}

const port = (bg: string, extra: React.CSSProperties): React.CSSProperties => ({
  width: 10,
  height: 10,
  borderRadius: 999,
  background: bg,
  border: "2px solid #334155",
  ...extra,
});
