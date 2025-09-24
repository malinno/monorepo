import { ReactFlowProvider } from "@xyflow/react";
import Palette from "@mektec/animation/components/palette/Palette";
import PumpNode from "@mektec/animation/components/node/PumpNode";
import TankNode from "@mektec/animation/components/node/TankNode";

function App() {
  return (
    <ReactFlowProvider>
      <div className="app">
        <div className="sidebar">
          <h1>Demo SCADA Lib</h1>
          <Palette />
        </div>
        <div className="canvas">
          <PumpNode />
          <TankNode />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
