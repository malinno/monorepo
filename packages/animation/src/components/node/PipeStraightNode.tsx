import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useFlowSim } from "@/store/useFlowSim";

export default function PipeStraightNode(props: any) {
  const { data, id } = props;
  const { flowingNodes } = useFlowSim();

  const flowing = id ? flowingNodes.has(id) : false;
  // data.orientation: "H" | "V"
  const ori = (data?.orientation ?? "H") as "H" | "V";
  const w = ori === "H" ? 160 : 24;
  const h = ori === "H" ? 24 : 160;

  const dashColor = flowing ? "#16a34a" : "#9ca3af";
  const dashStyle: React.CSSProperties = flowing
    ? { animation: `pipe-dash-move 1.1s linear infinite` }
    : { animation: "none", strokeDashoffset: 0 };

  return (
    <div style={{ width: w, height: h, position: "relative" }}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: "block" }}
      >
        {/* outline */}
        <rect
          x="1"
          y="1"
          width={w - 2}
          height={h - 2}
          rx="12"
          fill="#94a3b8"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* l?p ?ng xám */}
        <rect x="3" y="3" width={w - 6} height={h - 6} rx="10" fill="#cbd5e1" />
        {/* l?p sáng */}
        <rect
          x="6"
          y="6"
          width={w - 12}
          height={h - 12}
          rx="8"
          fill="#e2e8f0"
        />
        {/* dòng ch?y n?u active */}
        {ori === "H" ? (
          <line
            x1={10}
            y1={h / 2}
            x2={w - 10}
            y2={h / 2}
            stroke={dashColor}
            strokeWidth={6}
            strokeDasharray="12 10"
            style={dashStyle as any}
            strokeLinecap="round"
          />
        ) : (
          <line
            x1={w / 2}
            y1={10}
            x2={w / 2}
            y2={h - 10}
            stroke={dashColor}
            strokeWidth={6}
            strokeDasharray="12 10"
            style={dashStyle as any}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* handles sát thành ?ng */}
      {ori === "H" ? (
        <>
          <Handle
            id="in"
            type="target"
            position={Position.Left}
            style={{
              left: -7,
              top: "50%",
              transform: "translate(-50%,-50%)",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#1E90FF",
              border: "2px solid #334155",
            }}
            title="Inlet"
          />
          <Handle
            id="out"
            type="source"
            position={Position.Right}
            style={{
              right: -7,
              top: "50%",
              transform: "translate(50%,-50%)",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#0EAD69",
              border: "2px solid #334155",
            }}
            title="Outlet"
          />
        </>
      ) : (
        <>
          <Handle
            id="in"
            type="target"
            position={Position.Top}
            style={{
              top: -7,
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#1E90FF",
              border: "2px solid #334155",
            }}
            title="Inlet"
          />
          <Handle
            id="out"
            type="source"
            position={Position.Bottom}
            style={{
              bottom: -7,
              left: "50%",
              transform: "translate(-50%,50%)",
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#0EAD69",
              border: "2px solid #334155",
            }}
            title="Outlet"
          />
        </>
      )}
    </div>
  );
}
