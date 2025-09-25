import { useFlowSim } from "../store/useFlowSim";

export default function FlowDebug() {
  const { reachableEdges, flowingNodes } = useFlowSim();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 1000,
        fontFamily: "monospace",
      }}
    >
      <div>Flowing Nodes: {Array.from(flowingNodes).join(", ") || "None"}</div>
      <div>
        Reachable Edges: {Array.from(reachableEdges).join(", ") || "None"}
      </div>
    </div>
  );
}

