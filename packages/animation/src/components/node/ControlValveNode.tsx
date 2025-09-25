import { Handle, Position } from "@xyflow/react";
// import { useFlowSim } from "../../store/useFlowSim";

const OFFSET = -7;
const CENTER = "50%";

const basePort = (bg: string) => ({
  width: 10,
  height: 10,
  borderRadius: 999,
  background: bg,
  border: "2px solid #334155",
});

const portStyle = (pos: Position, bg: string): React.CSSProperties => {
  const base = basePort(bg);
  switch (pos) {
    case Position.Left:
      return {
        ...base,
        left: OFFSET,
        top: CENTER,
        transform: "translate(-50%,-50%)",
      };
    case Position.Right:
      return {
        ...base,
        right: OFFSET,
        top: CENTER,
        transform: "translate(50%,-50%)",
      };
    case Position.Top:
      return {
        ...base,
        top: OFFSET,
        left: CENTER,
        transform: "translate(-50%,-50%)",
      };
    case Position.Bottom:
      return {
        ...base,
        bottom: OFFSET,
        left: CENTER,
        transform: "translate(-50%,50%)",
      };
    default:
      return base;
  }
};

export default function ControlValveNode({ data }: any) {
  const o: "N" | "S" | "E" | "W" = data?.orientation || "E";
  const open = Math.max(0, Math.min(1, Number(data?.open ?? 1)));
  const rot = o === "N" ? 0 : o === "E" ? 90 : o === "S" ? 180 : 270;

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

  const coverW = 24 * (1 - open) + 0.001;

  return (
    <div style={{ width: 120, height: 100, position: "relative" }}>
      <svg
        width="120"
        height="72"
        viewBox="0 0 120 72"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <circle
          cx="60"
          cy="36"
          r="22"
          fill="#fff"
          stroke="#6b7280"
          strokeWidth="3"
        />
        <rect
          x="48"
          y="24"
          width="24"
          height="24"
          rx="3"
          fill="#9ca3af"
          stroke="#374151"
        />
        {/* n?p tru?t theo % m? */}
        <rect
          x={48 + coverW}
          y="24"
          width={24 - coverW}
          height="24"
          rx="3"
          fill="#ffffff"
          stroke="#374151"
        />
        <rect
          x="8"
          y="28"
          width="20"
          height="16"
          rx="4"
          fill="#cbd5e1"
          stroke="#64748b"
        />
        <rect
          x="92"
          y="28"
          width="20"
          height="16"
          rx="4"
          fill="#cbd5e1"
          stroke="#64748b"
        />
      </svg>
      <Handle
        id="in"
        type="target"
        position={inSide}
        style={portStyle(inSide, "#1E90FF")}
      />
      <Handle
        id="out"
        type="source"
        position={outSide}
        style={portStyle(outSide, "#0EAD69")}
      />
    </div>
  );
}
