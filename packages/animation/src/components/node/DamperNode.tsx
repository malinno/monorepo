import { Handle, Position } from "@xyflow/react";

export default function DamperNode({ data }: any) {
  const o: "N" | "S" | "E" | "W" = data?.orientation || "E";
  const rot = o === "N" ? 0 : o === "E" ? 90 : o === "S" ? 180 : 270;
  const open = Math.max(0, Math.min(1, Number(data?.open ?? 1)));

  const inSide =
    o === "E"
      ? Position.Left
      : o === "W"
        ? Position.Right
        : o === "N"
          ? Position.Bottom
          : Position.Top;
  const outSide =
    o === "E"
      ? Position.Right
      : o === "W"
        ? Position.Left
        : o === "N"
          ? Position.Top
          : Position.Bottom;

  const bladeW = 40 * (1 - open) + 1;

  return (
    <div style={{ width: 140, height: 100, position: "relative" }}>
      <svg
        width="140"
        height="72"
        viewBox="0 0 140 72"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <rect
          x="10"
          y="24"
          width="120"
          height="24"
          rx="12"
          fill="#cbd5e1"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect x="16" y="28" width="108" height="16" rx="8" fill="#e2e8f0" />
        {/* cánh damper đóng mở */}
        <rect
          x={52}
          y={26}
          width={bladeW}
          height={20}
          rx="3"
          fill="#94a3b8"
          stroke="#334155"
        />
      </svg>
      <Handle
        id="in"
        type="target"
        position={inSide}
        style={portAt(inSide, "#1E90FF")}
      />
      <Handle
        id="out"
        type="source"
        position={outSide}
        style={portAt(outSide, "#0EAD69")}
      />
    </div>
  );
}

const basePort = (bg: string) => ({
  width: 10,
  height: 10,
  borderRadius: 999,
  background: bg,
  border: "2px solid #334155",
});

function portAt(pos: Position, bg: string): React.CSSProperties {
  const s = basePort(bg);
  switch (pos) {
    case Position.Left:
      return { ...s, left: -2 };
    case Position.Right:
      return { ...s, right: -2 };
    case Position.Top:
      return { ...s, top: -2 };
    case Position.Bottom:
      return { ...s, bottom: -2 };
    default:
      return s;
  }
}
