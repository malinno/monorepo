import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getSmoothStepPath, useStore, } from "@xyflow/react";
import { useFlowSim, getNodeFlowFactor } from "@/store/useFlowSim";
import "@/styles/pipe.css";
/** Quy d?nh data c?a node:
 * - Hand valve:   n.type === "valve"        && n.data.isOpen: boolean
 * - ControlValve: n.type === "controlValve" && n.data.open:   0..1
 * - Pump:         n.type === "pump"         && n.data.power?: 0..1
 */
const DASH_ON = 12;
const DASH_OFF = 10;
export default function PipeEdge(props) {
    const { id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, } = props;
    // Subscribe to nodes so this edge re-renders when node data changes
    const sNode = useStore((s) => s.nodes.find((n) => n.id === source));
    const tNode = useStore((s) => s.nodes.find((n) => n.id === target));
    const { reachableEdges, flowingNodes } = useFlowSim();
    // �u?ng cong mu?t
    const [path] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        borderRadius: 10,
    });
    const reachable = reachableEdges.has(id);
    const sourceFlowing = source ? flowingNodes.has(source) : false;
    const targetFlowing = target ? flowingNodes.has(target) : false;
    const blocked = !reachable || !sourceFlowing || !targetFlowing;
    const flowing = !blocked;
    const sFactor = getNodeFlowFactor(sNode);
    const tFactor = getNodeFlowFactor(tNode);
    const idealSpeed = Math.max(0, Math.min(2.5, sFactor * tFactor));
    const speed = flowing ? idealSpeed : 0;
    const dashColor = flowing ? "#16a34a" : "#9ca3af";
    // Khi blocked, d?ng animation ho�n to�n d? th? hi?n kh�ng c�n d�ng ch?y
    const dashStyle = flowing
        ? {
            animation: `pipe-dash-move ${1.1 / Math.max(speed, 0.1)}s linear infinite`,
        }
        : { animation: "none", strokeDashoffset: 0 };
    return (_jsxs("g", { children: [_jsx("path", { d: path, stroke: "#334155", strokeWidth: 16, fill: "none", strokeLinecap: "round" }), _jsx("path", { d: path, stroke: "#94a3b8", strokeWidth: 14, fill: "none", strokeLinecap: "round" }), _jsx("path", { d: path, stroke: "#e2e8f0", strokeWidth: 8, fill: "none", strokeLinecap: "round" }), _jsx("path", { d: path, stroke: dashColor, strokeWidth: 6, fill: "none", strokeDasharray: `${DASH_ON} ${DASH_OFF}`, style: dashStyle }), _jsx("path", { d: path, stroke: "#0f172a", strokeWidth: 1.4, opacity: 0.6, fill: "none" })] }));
}
