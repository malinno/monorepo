import { Handle, Position } from "@xyflow/react";
export default function ZoneNode({ data }: any) {
  return (
    <div
      style={{
        position: "relative",
        padding: "8px 12px",
        background: "#fff",
        border: "1px solid #cad8e3",
        borderRadius: 8,
        color: "#0EAD69",
        fontWeight: 700,
      }}
    >
      {data?.label || "Zone"}
      <Handle
        id="out"
        type="source"
        position={Position.Right}
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: "#0EAD69",
          border: "2px solid #334155",
          right: -5,
        }}
      />
    </div>
  );
}
