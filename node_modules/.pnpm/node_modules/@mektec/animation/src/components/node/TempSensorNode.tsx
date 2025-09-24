import { Handle, Position } from "@xyflow/react";

export default function TempSensorNode({ data }: any) {
  const value = Number(data?.value ?? 25);
  return (
    <div style={{ width: 120, height: 80, position: "relative" }}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        <rect
          x="18"
          y="18"
          width="84"
          height="44"
          rx="10"
          fill="#fff"
          stroke="#64748b"
          strokeWidth="3"
        />
        {/* bulb */}
        <circle cx="36" cy="56" r="10" fill="#94a3b8" stroke="#334155" />
        {/* tube */}
        <rect x="34" y="24" width="4" height="28" rx="2" fill="#94a3b8" />
        <text x="70" y="47" textAnchor="middle" fontSize="16" fill="#334155">
          {value}°C
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
