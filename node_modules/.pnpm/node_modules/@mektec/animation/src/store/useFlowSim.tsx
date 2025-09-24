import { useMemo } from "react";
import { useStore } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import { shallow } from "zustand/shallow";

export type FlowSnapshot = {
  reachableEdges: Set<string>;
  flowingNodes: Set<string>;
};

const EPS = 1e-6;

let cacheNodes: Node[] | null = null;
let cacheEdges: Edge[] | null = null;
let cacheResult: FlowSnapshot = {
  reachableEdges: new Set(),
  flowingNodes: new Set(),
};

export function getNodeFlowFactor(node: Node | undefined): number {
  if (!node) return 1;
  if (node.type === "valve") return node.data?.isOpen === false ? 0 : 1;
  if (node.type === "controlValve") {
    const raw = Number(node.data?.open ?? 1);
    if (!Number.isFinite(raw)) return 1;
    return Math.max(0, Math.min(1, raw));
  }
  if (node.type === "tank") {
    const level = Number(node.data?.level ?? 0);
    if (!Number.isFinite(level)) return 0;
    return level <= EPS ? 0 : Math.min(1, level / 100);
  }
  if (node.type === "pump") {
    const power = Number(node.data?.power ?? 0);
    const safePower = Number.isFinite(power) ? Math.max(0, power) : 0;
    return 1 + 1.5 * safePower;
  }
  return 1;
}

type FlowComputation = {
  reachableEdges: Set<string>;
  flowingNodes: Set<string>;
};

function computeFlowSnapshot(nodes: Node[], edges: Edge[]): FlowComputation {
  const nodeMap = new Map<string, Node>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  const incoming = new Map<string, Edge[]>();
  for (const edge of edges) {
    if (!edge.source || !edge.target) continue;
    if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target)) continue;
    const bucket = incoming.get(edge.target);
    if (bucket) {
      bucket.push(edge);
    } else {
      incoming.set(edge.target, [edge]);
    }
  }

  const memo = new Map<string, boolean>();
  const visiting = new Set<string>();

  const upstreamAllows = (nodeId: string): boolean => {
    if (memo.has(nodeId)) return memo.get(nodeId)!;

    const node = nodeMap.get(nodeId);
    if (!node) {
      memo.set(nodeId, false);
      return false;
    }

    if (node.type === "tank") {
      const level = Number(node.data?.level ?? 0);
      const hasWater = level > EPS;
      memo.set(nodeId, hasWater);
      return hasWater;
    }

    const factor = getNodeFlowFactor(node);
    if (factor <= EPS) {
      memo.set(nodeId, false);
      return false;
    }

    const upstream = incoming.get(nodeId);
    if (!upstream || upstream.length === 0) {
      memo.set(nodeId, true);
      return true;
    }

    if (visiting.has(nodeId)) {
      memo.set(nodeId, true);
      return true;
    }

    visiting.add(nodeId);
    let result = false;
    for (const edge of upstream) {
      if (!nodeMap.has(edge.source)) continue;
      if (upstreamAllows(edge.source)) {
        result = true;
        break;
      }
    }
    visiting.delete(nodeId);
    memo.set(nodeId, result);
    return result;
  };

  const reachableEdges = new Set<string>();
  const flowingNodes = new Set<string>();

  for (const node of nodes) {
    if (getNodeFlowFactor(node) <= EPS) continue;
    if (upstreamAllows(node.id)) {
      flowingNodes.add(node.id);
    }
  }

  for (const edge of edges) {
    if (!edge.source || !edge.target) continue;
    const sourceNode = nodeMap.get(edge.source);
    const targetNode = nodeMap.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    if (getNodeFlowFactor(targetNode) <= EPS) continue;

    if (flowingNodes.has(edge.source)) {
      reachableEdges.add(edge.id);
    }
  }

  return { reachableEdges, flowingNodes };
}

export function useFlowSim(): FlowSnapshot {
  const { nodes, edges } = useStore(
    (state: any) => ({
      nodes: state.nodes as Node[],
      edges: state.edges as Edge[],
    }),
    shallow
  );

  return useMemo(() => {
    if (cacheNodes === nodes && cacheEdges === edges && cacheResult) {
      return cacheResult;
    }

    const { reachableEdges, flowingNodes } = computeFlowSnapshot(nodes, edges);
    cacheNodes = nodes;
    cacheEdges = edges;
    cacheResult = { reachableEdges, flowingNodes };
    return cacheResult;
  }, [nodes, edges]);
}

