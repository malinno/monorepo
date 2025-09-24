// src/App.tsx
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
  useReactFlow,
  type Connection,
  type Edge as RFEdge,
  type Node as RFNode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useRef } from "react";
import { nodeTypes } from "@/flow/nodeTypes";
import { edgeTypes } from "@/flow/edgeTypes";
import { nextId } from "@/utils/id";
import { isValidConnection } from "@/utils/ports";
import Palette from "@/components/palette/Palette";
import "./styles/index.css";
import { idbGet, idbSet } from "@/utils/db";
import { useFlowSim } from "@/store/useFlowSim";

// type CanvasNode = RFNode & { data?: any };

type Orientation = "N" | "E" | "S" | "W";

const ROTATABLE_TYPES = new Set([
  "valve",
  "controlValve",
  "tee",
  "elbow",
  "ballValve",
  "butterflyValve",
  "checkValve",
  "reducer",
  "flange",
  "filter",
  "heatExchanger",
  "ft",
  "pt",
  "tt",
  "lt",
  "pump",
]);

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<RFNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<RFEdge>([]);
  const flow = useFlowSim();
  const edgesRef = useRef(edges);
  const flowRef = useRef(flow);
  const rf = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);

  useEffect(() => {
    flowRef.current = flow;
  }, [flow]);

  // ====== persistence ======
  const STORAGE_KEY = "flow:snapshot:v1";

  useEffect(() => {
    (async () => {
      try {
        const snap: any = await idbGet(STORAGE_KEY);
        if (Array.isArray(snap?.nodes)) setNodes(snap.nodes as any);
        if (Array.isArray(snap?.edges)) setEdges(snap.edges as any);
        if (snap?.viewport) rf.setViewport(snap.viewport);
      } catch {
        /* ignore */
      }
      loadedRef.current = true;
    })();
  }, [rf, setNodes, setEdges]);

  useEffect(() => {
    if (!loadedRef.current) return;
    (async () => {
      try {
        const obj = rf.toObject?.() ? rf.toObject() : { nodes, edges };
        await idbSet(STORAGE_KEY, obj);
      } catch {
        /* ignore */
      }
    })();
  }, [nodes, edges, rf]);

  useEffect(() => {
    const onUnload = () => {
      try {
        const obj = rf.toObject?.() ? rf.toObject() : { nodes, edges };
        void idbSet(STORAGE_KEY, obj);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, [nodes, edges, rf]);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  // ====== tank auto level update ======
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.type !== "tank") return node;
          const level = Number(node.data?.level ?? 0);
          const hasInflow = edgesRef.current.some(
            (edge) =>
              edge.target === node.id &&
              flowRef.current.reachableEdges.has(edge.id)
          );
          const hasOutflow = edgesRef.current.some(
            (edge) =>
              edge.source === node.id &&
              flowRef.current.reachableEdges.has(edge.id)
          );
          let next = level;
          if (hasInflow && !hasOutflow) {
            next = Math.min(100, level + 1);
          } else if (!hasInflow && hasOutflow) {
            next = Math.max(0, level - 1);
          } else if (hasInflow && hasOutflow) {
            const target = 50;
            if (level > target) next = Math.max(target, level - 1);
            else if (level < target) next = Math.min(target, level + 1);
          }
          if (next !== level) {
            return {
              ...node,
              data: { ...node.data, level: Number(next.toFixed(2)) },
            };
          }
          return node;
        })
      );
    }, 600);
    return () => window.clearInterval(timer);
  }, [setNodes]);

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) return;
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "pipe",
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (ev: React.DragEvent) => {
      ev.preventDefault();
      const raw = ev.dataTransfer.getData("application/reactflow");
      if (!raw) return;
      const { type, data } = JSON.parse(raw);
      const pos = rf.screenToFlowPosition({ x: ev.clientX, y: ev.clientY });
      const newNode: RFNode = {
        id: nextId(type || "n"),
        type,
        position: pos,
        data,
      };
      setNodes((ns) => ns.concat(newNode));
    },
    [rf, setNodes]
  );

  const onDragOver = useCallback((ev: React.DragEvent) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }, []);

  const deleteSelected = useCallback(() => {
    const selectedNodes = nodes.filter((n) => n.selected);
    const selectedEdges = edges.filter((e) => e.selected);
    if (selectedNodes.length || selectedEdges.length) {
      rf.deleteElements({
        nodes: selectedNodes as any,
        edges: selectedEdges as any,
      });
    }
  }, [nodes, edges, rf]);

  const rotateOrientation = (current: Orientation, reverse: boolean) => {
    const order: Orientation[] = ["N", "E", "S", "W"];
    const idx = order.indexOf(current);
    if (idx === -1) return reverse ? "W" : "N";
    return order[(idx + (reverse ? -1 : 1) + order.length) % order.length];
  };

  const nudge = useCallback(
    (dx: number, dy: number) => {
      setNodes((ns) =>
        ns.map((n) =>
          n.selected
            ? {
                ...n,
                position: {
                  x: n.position.x + dx,
                  y: n.position.y + dy,
                },
              }
            : n
        )
      );
    },
    [setNodes]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key, shiftKey } = e;
      if (key === "Delete" || key === "Backspace") {
        e.preventDefault();
        deleteSelected();
        return;
      }

      if (key === "r" || key === "R") {
        e.preventDefault();
        setNodes((ns) =>
          ns.map((node) => {
            if (!node.selected || !ROTATABLE_TYPES.has(node.type as string))
              return node;
            const current = (node.data?.orientation ?? "N") as Orientation;
            const next = rotateOrientation(current, shiftKey);
            return { ...node, data: { ...node.data, orientation: next } };
          })
        );
        return;
      }

      if (key === "v" || key === "V") {
        e.preventDefault();
        setNodes((ns) =>
          ns.map((node) => {
            if (!node.selected) return node;
            if (node.type === "valve") {
              return {
                ...node,
                data: { ...node.data, isOpen: !(node.data?.isOpen ?? true) },
              };
            }
            if (node.type === "controlValve") {
              const open = Number(node.data?.open ?? 1);
              return {
                ...node,
                data: {
                  ...node.data,
                  open: Number((open > 0 ? 0 : 1).toFixed(2)),
                },
              };
            }
            return node;
          })
        );
        return;
      }

      const step = shiftKey ? 20 : 5;
      if (key === "ArrowLeft") {
        e.preventDefault();
        nudge(-step, 0);
        return;
      }
      if (key === "ArrowRight") {
        e.preventDefault();
        nudge(step, 0);
        return;
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        nudge(0, -step);
        return;
      }
      if (key === "ArrowDown") {
        e.preventDefault();
        nudge(0, step);
        return;
      }

      if (key === "+" || key === "=" || key === "-") {
        e.preventDefault();
        const delta = key === "-" ? -5 : 5;
        setNodes((ns) =>
          ns.map((node) => {
            if (!node.selected || node.type !== "tank") return node;
            const level = Number(node.data?.level ?? 0);
            const next = Math.max(0, Math.min(100, level + delta));
            if (next === level) return node;
            return { ...node, data: { ...node.data, level: next } };
          })
        );
      }
    },
    [deleteSelected, nudge, setNodes]
  );

  return (
    <div className="app">
      <div className="sidebar">
        <Palette />
      </div>
      <div
        className="canvas"
        ref={wrapperRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ outline: "none" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          isValidConnection={isValidConnection}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={4}
            size={1}
            color="#2b3240"
          />
          <MiniMap pannable zoomable />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
