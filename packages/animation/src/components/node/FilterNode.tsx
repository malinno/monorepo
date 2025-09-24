import { Handle, Position } from "@xyflow/react";

export default function FilterNode({ data }: any) {
  return (
    <div style={{ width: 160, height: 90, position: "relative" }}>
      <svg width="160" height="90" viewBox="0 0 160 90">
        {/* housing */}
        <rect
          x="14"
          y="28"
          width="132"
          height="34"
          rx="17"
          fill="#cbd5e1"
          stroke="#334155"
          strokeWidth="3"
        />
        {/* core */}
        <rect x="22" y="32" width="116" height="26" rx="13" fill="#e2e8f0" />
        {/* mesh */}
        <g stroke="#94a3b8" opacity="0.8">
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={i} x1={28 + i * 16} y1={34} x2={28 + i * 16} y2={56} />
          ))}
        </g>
        <text x="80" y="24" textAnchor="middle" fontSize="12" fill="#334155">
          {data?.label || "Filter"}
        </text>
      </svg>

      {/* Ports */}
      <Handle
        id="in"
        type="target"
        position={Position.Left}
        style={port("#1E90FF", { left: -2, top: 45 })}
        title="Inlet"
      />
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={port("#0EAD69", { right: -2, top: 45 })}
        title="Outlet"
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
