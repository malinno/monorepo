import { Handle, Position } from "@xyflow/react";

export default function JoinNode({ data }: any) {
  return (
    <div
      style={{
        position: "relative",
        padding: "12px 16px",
        background: "#fff",
        border: "1px solid #cad8e3",
        borderRadius: 8,
        color: "#0EAD69",
        fontWeight: 700,
        minWidth: 160,
        minHeight: 80,
      }}
    >
      {data?.label || "Join"}

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
          left: -5,
        }}
        title="Inlet"
      />

      {/* OUT (source) bên phải */}
      <Handle
        id="out-a"
        type="source"
        position={Position.Right}
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: "#0EAD69",
          border: "2px solid #334155",
          right: -5,
        }}
        title="Outlet A"
      />

      {/* OUT (source) bên dưới — tùy chọn */}
      <Handle
        id="out-b"
        type="source"
        position={Position.Bottom}
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: "#0EAD69",
          border: "2px solid #334155",
          bottom: -5,
        }}
        title="Outlet B"
      />
    </div>
  );
}
