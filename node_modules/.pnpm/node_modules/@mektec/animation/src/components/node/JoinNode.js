import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function JoinNode({ data }) {
    return (_jsxs("div", { style: {
            position: "relative",
            padding: "12px 16px",
            background: "#fff",
            border: "1px solid #cad8e3",
            borderRadius: 8,
            color: "#0EAD69",
            fontWeight: 700,
            minWidth: 160,
            minHeight: 80,
        }, children: [data?.label || "Join", _jsx(Handle, { id: "in-left", type: "target", position: Position.Left, style: {
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#1E90FF",
                    border: "2px solid #334155",
                    left: -5,
                }, title: "Inlet" }), _jsx(Handle, { id: "out-a", type: "source", position: Position.Right, style: {
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#0EAD69",
                    border: "2px solid #334155",
                    right: -5,
                }, title: "Outlet A" }), _jsx(Handle, { id: "out-b", type: "source", position: Position.Bottom, style: {
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#0EAD69",
                    border: "2px solid #334155",
                    bottom: -5,
                }, title: "Outlet B" })] }));
}
