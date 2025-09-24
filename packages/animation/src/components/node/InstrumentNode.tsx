import { Handle, Position } from "@xyflow/react";

export default function InstrumentNode({ data }: any) {
  return (
    <div
      style={{
        position: "relative",
        padding: "6px 10px",
        background: "#fff",
        border: "1px solid #cad8e3",
        borderRadius: 6,
        color: "#0EAD69",
        fontWeight: 700,
      }}
    >
      {data?.label || (data?.tag ?? "Instrument")}
      {/* IN (target) bên trái */}
      <Handle
        id="in-left"
        type="target"
        position={Position.Left}
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: "#1E90FF",
          border: "2px solid #334155",
          left: -8,
        }}
        title="Inlet"
      />
      {/* chỉ có cổng out bên phải để bơm nước vào */}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: "#0EAD69",
          border: "2px solid #334155",
        }}
      />
    </div>
  );
}
