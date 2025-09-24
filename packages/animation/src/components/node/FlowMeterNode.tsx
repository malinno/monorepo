import { Handle, Position } from "@xyflow/react";

export default function FlowMeterNode({ data }: any) {
  const value = Number(data?.value ?? 0);
  return (
    <div style={{ width: 140, height: 80, position: "relative" }}>
      <svg width="140" height="80" viewBox="0 0 140 80">
        <rect
          x="10"
          y="22"
          width="120"
          height="36"
          rx="18"
          fill="#e5e7eb"
          stroke="#64748b"
          strokeWidth="3"
        />
        <text x="70" y="48" textAnchor="middle" fontSize="16" fill="#334155">
          {value}
        </text>
      </svg>
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        style={port("#1E90FF", { left: -2, top: 40 })}
      />
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={port("#0EAD69", { right: -2, top: 40 })}
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
