import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function InstrumentNode({ data }) {
    return (_jsxs("div", { style: {
            position: "relative",
            padding: "6px 10px",
            background: "#fff",
            border: "1px solid #cad8e3",
            borderRadius: 6,
            color: "#0EAD69",
            fontWeight: 700,
        }, children: [data?.label || (data?.tag ?? "Instrument"), _jsx(Handle, { id: "in-left", type: "target", position: Position.Left, style: {
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#1E90FF",
                    border: "2px solid #334155",
                    left: -8,
                }, title: "Inlet" }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: {
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#0EAD69",
                    border: "2px solid #334155",
                } })] }));
}
