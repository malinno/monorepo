import type { CSSProperties } from "react";
import { Handle, Position } from "@xyflow/react";

const NODE_WIDTH = 170;
const PORT_SIZE = 10;
const PORT_RADIUS = PORT_SIZE / 2;

const portStyle = (bg: string, extra: CSSProperties): CSSProperties => ({
  width: PORT_SIZE,
  height: PORT_SIZE,
  borderRadius: 999,
  background: bg,
  border: "2px solid #334155",
  boxSizing: "border-box",
  ...extra,
});

export default function TankNode({ data }: any) {
  const level = Math.max(0, Math.min(100, Number(data?.level ?? 60)));
  const fillY = 18 + (104 * (100 - level)) / 100;
  const fillH = (104 * level) / 100;

  const bodyX = 18;
  const bodyWidth = 134;
  const windowX = bodyX + 16;
  const windowWidth = bodyWidth - 32;
  const legWidth = 20;
  const legLeftX = bodyX - 5;
  const legRightX = bodyX + bodyWidth - (legWidth - 5);
  const legBottomY = 126 + 8;
  const gaugeLineX1 = bodyX + bodyWidth - 12;
  const gaugeLineX2 = gaugeLineX1 + 10;

  const leftHandleOffset = bodyX - PORT_RADIUS;
  const rightHandleOffset = NODE_WIDTH - (bodyX + bodyWidth) - PORT_RADIUS;
  const bottomHandleLeft = bodyX + bodyWidth / 2;
  const bottomHandleTop = legBottomY + PORT_RADIUS;

  const waveSegment = 26;
  const waveStart = windowX;

  return (
    <div style={{ width: NODE_WIDTH, height: 170, position: "relative" }}>
      <svg width={NODE_WIDTH} height={140} viewBox={`0 0 ${NODE_WIDTH} 140`}>
        <defs>
          <linearGradient id="tankBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <filter id="soft">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.18"
            />
          </filter>
          <clipPath id="gauge">
            <rect x={windowX} y="18" width={windowWidth} height="104" rx="6" />
          </clipPath>
        </defs>

        {/* legs */}
        <rect x={legLeftX} y="126" width={legWidth} height="8" rx="2" fill="#475569" />
        <rect x={legRightX} y="126" width={legWidth} height="8" rx="2" fill="#475569" />

        {/* body */}
        <rect
          x={bodyX}
          y="10"
          width={bodyWidth}
          height="120"
          rx="12"
          fill="url(#tankBody)"
          stroke="#64748b"
          strokeWidth="3"
          filter="url(#soft)"
        />

        {/* window */}
        <rect
          x={windowX}
          y="18"
          width={windowWidth}
          height="104"
          rx="6"
          fill="#e2e8f0"
          stroke="#94a3b8"
        />

        {/* liquid + glow */}
        <g clipPath="url(#gauge)">
          <rect
            x={windowX}
            y={fillY}
            width={windowWidth}
            height={fillH}
            fill="url(#liquid)"
          />
          <g opacity="0.35">
            <path
              d={`M${waveStart} 70 q13 -6 ${waveSegment} 0 t${waveSegment} 0 t${waveSegment} 0 t${waveSegment} 0`}
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to={`${waveSegment} 0`}
                dur="1.4s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>

        {/* gauge marks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={gaugeLineX1}
            x2={gaugeLineX2}
            y1={22 + i * 20}
            y2={22 + i * 20}
            stroke="#334155"
            strokeWidth="1.5"
          />
        ))}

        <text x="85" y="125" textAnchor="middle" fontSize="12" fill="#334155">
          {data?.label || "Tank"}
        </text>
      </svg>

      {/* level label */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          top: 10,
          textAlign: "center",
          fontSize: 12,
          fontWeight: 700,
          color: "#0f172a",
        }}
      >
        {Math.round(level)}%
      </div>

      {/* ports */}
      <Handle
        id="in-left"
        type="target"
        position={Position.Left}
        style={portStyle("#1E90FF", { left: leftHandleOffset })}
        title="Inlet"
      />
      <Handle
        id="out-a"
        type="source"
        position={Position.Right}
        style={portStyle("#0EAD69", { right: rightHandleOffset })}
        title="Outlet A"
      />
      <Handle
        id="out-b"
        type="source"
        position={Position.Bottom}
        style={portStyle("#0EAD69", {
          top: bottomHandleTop,
          left: bottomHandleLeft,
          transform: "translate(-50%, -50%)",
        })}
        title="Outlet B"
      />
    </div>
  );
}
