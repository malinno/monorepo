import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@iconify/react";
const SECTIONS = [
    {
        title: "Pipes",
        items: [
            { label: "Pipe", type: "pipeStraight", icon: "mdi:pipe" },
            { label: "Elbow", type: "elbow", icon: "mdi:angle-acute" },
            { label: "Tee", type: "tee", icon: "mdi:pipe-valve" }, // icon gần giống
            {
                label: "Reducer",
                type: "reducer",
                icon: "mdi:arrow-collapse-horizontal",
            },
            { label: "Flange", type: "flange", icon: "mdi:circle-double" },
        ],
    },
    {
        title: "Valves & Dampers",
        items: [
            {
                label: "Valve (On/Off)",
                type: "valve",
                data: { isOpen: true },
                icon: "mdi:valve",
            },
            {
                label: "Control Valve",
                type: "controlValve",
                data: { open: 1 },
                icon: "mdi:valve-outline",
            },
            {
                label: "Check Valve",
                type: "checkValve",
                icon: "mdi:check-circle-outline",
            },
            {
                label: "Damper/Fan Valve",
                type: "damper",
                data: { open: 1 },
                icon: "mdi:damper",
            },
        ],
    },
    {
        title: "Machines",
        items: [
            { label: "Fan", type: "fan", data: { speed: 0.8 }, icon: "mdi:fan" },
            { label: "Pump", type: "pump", data: { power: 1 }, icon: "mdi:pump" },
            { label: "Heat Exchanger", type: "heatExchanger", icon: "mdi:radiator" },
            { label: "Filter", type: "filter", icon: "mdi:filter" },
        ],
    },
    {
        title: "Instruments",
        items: [
            {
                label: "Gauge Dial",
                type: "gaugeDial",
                data: { value: 45, min: 0, max: 100 },
                icon: "mdi:speedometer",
            },
            {
                label: "Flow Meter",
                type: "flowMeter",
                data: { value: 45 },
                icon: "mdi:gauge",
            },
            {
                label: "Temp Sensor",
                type: "tempSensor",
                data: { value: 25 },
                icon: "mdi:thermometer",
            },
            {
                label: "Flow Arrow",
                type: "flowArrow",
                data: { dir: "E" },
                icon: "mdi:arrow-right-bold",
            },
        ],
    },
    {
        title: "Process",
        items: [
            {
                label: "Tank / Vessel",
                type: "tank",
                data: { level: 60 },
                icon: "mdi:water-boiler",
            },
            { label: "Zone / Source", type: "zone", icon: "mdi:shape-outline" },
            { label: "Join / Node", type: "join", icon: "mdi:circle-small" },
        ],
    },
];
function Item({ label, type, data, icon }) {
    return (_jsxs("div", { className: "palette-btn palette-item", draggable: true, onDragStart: (ev) => {
            ev.dataTransfer.setData("application/reactflow", JSON.stringify({ type, data }));
            ev.dataTransfer.effectAllowed = "copy";
        }, title: `Kéo "${label}" vào canvas`, children: [_jsx("div", { className: "icon-wrap", children: _jsx(Icon, { icon: icon, width: 20 }) }), _jsx("span", { children: label })] }));
}
export default function Palette() {
    return (_jsx("div", { className: "palette", children: SECTIONS.map((sec) => (_jsxs("div", { className: "palette-section", children: [_jsx("div", { className: "palette-title", children: sec.title }), sec.items.map((it) => (_jsx(Item, { ...it }, it.label)))] }, sec.title))) }));
}
