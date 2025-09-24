import InstrumentNode from "@/components/node/InstrumentNode";
import PumpNode from "@/components/node/PumpNode";
import TeeNode from "@/components/node/TeeNode";
import ReducerNode from "@/components/node/ReducerNode";
import TankNode from "@/components/node/TankNode";
import ValveNode from "@/components/node/ValveNode";
import ZoneNode from "@/components/node/ZoneNode";
import type { NodeTypes } from "@xyflow/react";
import FilterNode from "@/components/node/FilterNode";
import ElbowNode from "@/components/node/ElbowNode";
import FlangeNode from "@/components/node/FlangeNode";
import ControlValveNode from "@/components/node/ControlValveNode";
import PipeStraightNode from "@/components/node/PipeStraightNode";
import HeatExchangerNode from "@/components/node/HeatExchangerNode";
import CheckValveNode from "@/components/node/CheckValveNode";
import DamperNode from "@/components/node/DamperNode";
import FanNode from "@/components/node/FanNode";
import GaugeDialNode from "@/components/node/GaugeDialNode";
import FlowMeterNode from "@/components/node/FlowMeterNode";
import TempSensorNode from "@/components/node/TempSensorNode";
import FlowArrowNode from "@/components/node/FlowArrowNode";

export const nodeTypes: NodeTypes = {
  zone: ZoneNode,
  tank: TankNode,
  valve: ValveNode,
  controlValve: ControlValveNode,
  pump: PumpNode,
  tee: TeeNode,
  elbow: ElbowNode,
  reducer: ReducerNode,
  flange: FlangeNode,
  filter: FilterNode,
  heatExchanger: HeatExchangerNode,
  ft: InstrumentNode,
  pipeStraight: PipeStraightNode,
  checkValve: CheckValveNode,
  damper: DamperNode,
  fan: FanNode,
  gaugeDial: GaugeDialNode,
  flowMeter: FlowMeterNode,
  tempSensor: TempSensorNode,
  flowArrow: FlowArrowNode,
};
