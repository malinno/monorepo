import { Position } from "@xyflow/react";
export const clamp01 = (v) => Math.max(0, Math.min(1, v));
export const rotSide = (side, o) => {
    const order = [Position.Top, Position.Right, Position.Bottom, Position.Left];
    const idx = order.indexOf(side);
    const turns = o === "N" ? 0 : o === "E" ? 1 : o === "S" ? 2 : 3;
    return order[(idx + turns) % 4];
};
