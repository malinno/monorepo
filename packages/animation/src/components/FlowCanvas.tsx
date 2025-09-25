import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { nodeTypes } from "../flow/nodeTypes";
import { edgeTypes } from "../flow/edgeTypes";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import KeyboardShortcuts from "./KeyboardShortcuts";
import FlowDebug from "./FlowDebug";
import AnimationTest from "./AnimationTest";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "pump",
    position: { x: 100, y: 100 },
    data: { label: "Pump 1", power: 1, orientation: "E" },
  },
  {
    id: "2",
    type: "tank",
    position: { x: 400, y: 100 },
    data: { label: "Tank 1", level: 60 },
  },
  {
    id: "3",
    type: "pump",
    position: { x: 100, y: 300 },
    data: { label: "Pump 2", power: 0.8, orientation: "E" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "pipe",
  },
  {
    id: "e3-2",
    source: "3",
    target: "2",
    type: "pipe",
  },
];

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Get selected nodes and edges with stable references
  const selectedNodes = useMemo(
    () => nodes.filter((node) => node.selected),
    [nodes]
  );
  const selectedEdges = useMemo(
    () => edges.filter((edge) => edge.selected),
    [edges]
  );

  // Stable callback references
  const stableOnNodesChange = useCallback(onNodesChange, []);
  const stableOnEdgesChange = useCallback(onEdgesChange, []);

  // Initialize keyboard controls
  useKeyboardControls(
    selectedNodes,
    selectedEdges,
    stableOnNodesChange,
    stableOnEdgesChange
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = {
        x: event.clientX - 200, // Offset for sidebar width
        y: event.clientY - 50, // Offset for header
      };

      const newNode: Node = {
        id: `${Date.now()}`,
        type: JSON.parse(type).type,
        position,
        data: JSON.parse(type).data || {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  return (
    <div className="canvas" style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="bottom-left"
        multiSelectionKeyCode="Control"
        deleteKeyCode="Delete"
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
      <KeyboardShortcuts />
      <FlowDebug />
      <AnimationTest />
    </div>
  );
}

export default function FlowCanvasWithProvider() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
