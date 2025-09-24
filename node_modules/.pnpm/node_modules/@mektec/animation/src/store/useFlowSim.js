import { useMemo } from "react";
import { useStore } from "@xyflow/react";
import { shallow } from "zustand/shallow";
const EPS = 1e-6;
let cacheNodes = null;
let cacheEdges = null;
let cacheResult = {
    reachableEdges: new Set(),
    flowingNodes: new Set(),
};
export function getNodeFlowFactor(node) {
    if (!node)
        return 1;
    if (node.type === "valve")
        return node.data?.isOpen === false ? 0 : 1;
    if (node.type === "controlValve") {
        const raw = Number(node.data?.open ?? 1);
        if (!Number.isFinite(raw))
            return 1;
        return Math.max(0, Math.min(1, raw));
    }
    if (node.type === "tank") {
        const level = Number(node.data?.level ?? 0);
        if (!Number.isFinite(level))
            return 0;
        return level <= EPS ? 0 : Math.min(1, level / 100);
    }
    if (node.type === "pump") {
        const power = Number(node.data?.power ?? 0);
        const safePower = Number.isFinite(power) ? Math.max(0, power) : 0;
        return 1 + 1.5 * safePower;
    }
    return 1;
}
function computeFlowSnapshot(nodes, edges) {
    const nodeMap = new Map();
    for (const node of nodes) {
        nodeMap.set(node.id, node);
    }
    const incoming = new Map();
    for (const edge of edges) {
        if (!edge.source || !edge.target)
            continue;
        if (!nodeMap.has(edge.source) || !nodeMap.has(edge.target))
            continue;
        const bucket = incoming.get(edge.target);
        if (bucket) {
            bucket.push(edge);
        }
        else {
            incoming.set(edge.target, [edge]);
        }
    }
    const memo = new Map();
    const visiting = new Set();
    const upstreamAllows = (nodeId) => {
        if (memo.has(nodeId))
            return memo.get(nodeId);
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
            if (!nodeMap.has(edge.source))
                continue;
            if (upstreamAllows(edge.source)) {
                result = true;
                break;
            }
        }
        visiting.delete(nodeId);
        memo.set(nodeId, result);
        return result;
    };
    const reachableEdges = new Set();
    const flowingNodes = new Set();
    for (const node of nodes) {
        if (getNodeFlowFactor(node) <= EPS)
            continue;
        if (upstreamAllows(node.id)) {
            flowingNodes.add(node.id);
        }
    }
    for (const edge of edges) {
        if (!edge.source || !edge.target)
            continue;
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (!sourceNode || !targetNode)
            continue;
        if (getNodeFlowFactor(targetNode) <= EPS)
            continue;
        if (flowingNodes.has(edge.source)) {
            reachableEdges.add(edge.id);
        }
    }
    return { reachableEdges, flowingNodes };
}
export function useFlowSim() {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);
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
