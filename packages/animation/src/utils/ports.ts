import type { Connection, Edge } from "@xyflow/react";

/** OUT* -> IN* mới hợp lệ */
export function isValidConnection(c: Edge | Connection) {
    const s = ("sourceHandle" in c ? c.sourceHandle : undefined) || "";
    const t = ("targetHandle" in c ? c.targetHandle : undefined) || "";
    return s.startsWith("out") && t.startsWith("in");
}
