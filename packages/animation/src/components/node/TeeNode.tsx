import type { CSSProperties } from "react";
import { Handle, Position } from "@xyflow/react";
import { useFlowSim } from "@/store/useFlowSim";

type Orientation = "N" | "S" | "E" | "W";

const makeHandle = (bg: string, extra: CSSProperties): CSSProperties => ({
  width: 5,
  height: 5,
  borderRadius: 999,
  background: bg,
  border: "2px solid #334155",
  ...extra,
});

const OFFSET = -7;
const CENTER = "50%";
const CENTERL = 129
const ROTATION_MAP: Record<Orientation, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

interface HandleConfig {
  inletPos: Position;
  inletStyle: CSSProperties;
  mainPos: Position;
  mainStyle: CSSProperties;
  branchPos: Position;
  branchStyle: CSSProperties;
}

const CONFIGS: Record<Orientation, HandleConfig> = {
  N: {
    inletPos: Position.Left,
    inletStyle: makeHandle("#1E90FF", {
      left: OFFSET,
      top: CENTER,
      transform: "translate(-50%, -50%)",
    }),
    mainPos: Position.Right,
    mainStyle: makeHandle("#0EAD69", {
      right: OFFSET,
      top: CENTER,
      transform: "translate(50%, -50%)",
    }),
    branchPos: Position.Bottom,
    branchStyle: makeHandle("#0EAD69", {
      bottom: OFFSET,
      left: CENTER,
      transform: "translate(-50%, 50%)",
    }),
  },
  E: {
    inletPos: Position.Bottom,
    inletStyle: makeHandle("#1E90FF", {
      bottom: OFFSET,
      left: CENTER,
      transform: "translate(-50%, 50%)",
    }),
    mainPos: Position.Top,
    mainStyle: makeHandle("#0EAD69", {
      top: OFFSET,
      left: CENTER,
      transform: "translate(-50%, -50%)",
    }),
    branchPos: Position.Right,
    branchStyle: makeHandle("#0EAD69", {
      right: OFFSET,
      top: CENTER,
      transform: "translate(50%, -50%)",
    }),
  },
  S: {
    inletPos: Position.Right,
    inletStyle: makeHandle("#1E90FF", {
      right: OFFSET,
      top: CENTER,
      transform: "translate(50%, -50%)",
    }),
    mainPos: Position.Left,
    mainStyle: makeHandle("#0EAD69", {
      left: OFFSET,
      top: CENTER,
      transform: "translate(-50%, -50%)",
    }),
    branchPos: Position.Top,
    branchStyle: makeHandle("#0EAD69", {
      top: OFFSET,
      left: CENTER,
      transform: "translate(-50%, -50%)",
    }),
  },
  W: {
    inletPos: Position.Top,
    inletStyle: makeHandle("#1E90FF", {
      top: OFFSET,
      left: CENTER,
      transform: "translate(-50%, -50%)",
    }),
    mainPos: Position.Bottom,
    mainStyle: makeHandle("#0EAD69", {
      bottom: OFFSET,
      left: CENTER,
      transform: "translate(-50%, 50%)",
    }),
    branchPos: Position.Left,
    branchStyle: makeHandle("#0EAD69", {
      left: CENTERL,
      top: CENTER,
      transform: "translate(-50%, -50%)",
    }),
  },
};

export default function TeeNode(props: any) {
  const { id, data } = props;
  const orientation = (data?.orientation ?? "N") as Orientation;
  const rotation = ROTATION_MAP[orientation] ?? 0;
  const handles = CONFIGS[orientation] ?? CONFIGS.N;

  const { flowingNodes } = useFlowSim();
  const flowing = id ? flowingNodes.has(id) : false;
  const dashColor = flowing ? "#16a34a" : "#9ca3af";
  const dashStyle: CSSProperties = flowing
    ? { animation: `pipe-dash-move 1.1s linear infinite` }
    : { animation: "none", strokeDashoffset: 0 };

  return (
    <div style={{ width: 140, height: 110, position: "relative" }}>
      <svg
        width="140"
        height="110"
        viewBox="0 0 140 110"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <defs>
          <linearGradient id="teeBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>
        <rect
          x="14"
          y="44"
          width="112"
          height="22"
          rx="11"
          fill="url(#teeBody)"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect
          x="59"
          y="44"
          width="22"
          height="52"
          rx="11"
          fill="url(#teeBody)"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect
          x="56"
          y="84"
          width="28"
          height="26"
          rx="13"
          fill="#94a3b8"
          stroke="#334155"
          strokeWidth="3"
        />
        <rect x="60" y="88" width="20" height="18" rx="9" fill="#e2e8f0" />
        <rect x="20" y="48" width="100" height="14" rx="7" fill="#e2e8f0" />
        <rect x="63" y="48" width="14" height="44" rx="7" fill="#e2e8f0" />
        <line
          x1="24"
          y1="55"
          x2="116"
          y2="55"
          stroke={dashColor}
          strokeWidth="6"
          strokeDasharray="12 10"
          style={dashStyle}
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="52"
          x2="70"
          y2="96"
          stroke={dashColor}
          strokeWidth="6"
          strokeDasharray="12 10"
          style={dashStyle}
          strokeLinecap="round"
        />
      </svg>

      <Handle id="in" type="target" position={handles.inletPos} style={handles.inletStyle} />
      <Handle id="out-main" type="source" position={handles.mainPos} style={handles.mainStyle} />
      <Handle id="out-branch" type="source" position={handles.branchPos} style={handles.branchStyle} />
    </div>
  );
}
