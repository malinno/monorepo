export default function AnimationTest() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        left: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 1000,
        fontFamily: "monospace",
      }}
    >
      <div>Animation Test:</div>
      <svg width="200" height="20" style={{ marginTop: "5px" }}>
        <path
          d="M10,10 L190,10"
          stroke="#16a34a"
          strokeWidth="6"
          fill="none"
          strokeDasharray="12 10"
          style={{
            animation: "pipe-dash-move 1s linear infinite",
          }}
        />
      </svg>
    </div>
  );
}
