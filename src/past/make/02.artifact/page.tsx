"use client"

import { useCallback } from "react"
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"

const brutalNodeStyle = {
  background: "#000",
  color: "#fff",
  border: "2px solid #fff",
  borderRadius: "0",
  fontFamily: "monospace",
  fontSize: "12px",
  padding: "10px",
  width: 180,
}

const brutalGroupStyle = {
  background: "#333",
  border: "2px solid #fff",
  borderRadius: "0",
  color: "#fff",
  fontFamily: "monospace",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "5px",
}

const initialNodes: Node[] = [
  // Natural Resource Group
  {
    id: "natural-resource",
    type: "group",
    data: { label: "NATURAL RESOURCE" },
    position: { x: 0, y: 0 },
    style: { ...brutalGroupStyle, width: 200, height: 180 },
  },
  {
    id: "iron-vein",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>IRON-VEIN</div>
          <div>NAME: IRON-VEIN</div>
          <div>STACK_SIZE: 50</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "natural-resource",
    style: brutalNodeStyle,
  },
  {
    id: "cobblestone-resource",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>COBBLESTONE</div>
          <div>NAME: COBBLESTONE</div>
          <div>STACK_SIZE: 50</div>
        </>
      )
    },
    position: { x: 10, y: 110 },
    parentNode: "natural-resource",
    style: brutalNodeStyle,
  },

  // Landscape Group
  {
    id: "landscape",
    type: "group",
    data: { label: "LANDSCAPE" },
    position: { x: 220, y: 0 },
    style: { ...brutalGroupStyle, width: 400, height: 180 },
  },
  {
    id: "masonry",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>MASONRY</div>
          <div>NAME: MASONRY</div>
          <div>STACK_SIZE: 100</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "landscape",
    style: brutalNodeStyle,
  },
  {
    id: "stone-paving",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>STONE PAVING</div>
          <div>NAME: STONE PAVING</div>
          <div>STACK_SIZE: 100</div>
        </>
      )
    },
    position: { x: 210, y: 40 },
    parentNode: "landscape",
    style: brutalNodeStyle,
  },

  // Results Group
  {
    id: "results",
    type: "group",
    data: { label: "LANDSCAPE" },
    position: { x: 640, y: 0 },
    style: { ...brutalGroupStyle, width: 600, height: 180 },
  },
  {
    id: "cobblestone-result",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>COBBLESTONE</div>
          <div>NAME: COBBLESTONE</div>
          <div>STACK_SIZE: 100</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "results",
    style: brutalNodeStyle,
  },
  {
    id: "polished-stone",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>POLISHED STONE FLOOR</div>
          <div>NAME: POLISHED STONE FLOOR</div>
          <div>STACK_SIZE: 100</div>
        </>
      )
    },
    position: { x: 210, y: 40 },
    parentNode: "results",
    style: brutalNodeStyle,
  },
  {
    id: "fortified-wall",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>FORTIFIED WALL</div>
          <div>NAME: FORTIFIED WALL</div>
          <div>STACK_SIZE: 100</div>
        </>
      )
    },
    position: { x: 410, y: 40 },
    parentNode: "results",
    style: brutalNodeStyle,
  },

  // Special Items Groups
  {
    id: "celestial",
    type: "group",
    data: { label: "CELESTIAL-ARTIFACTS" },
    position: { x: 640, y: 200 },
    style: { ...brutalGroupStyle, width: 200, height: 120 },
  },
  {
    id: "astrolabe",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>ASTROLABE</div>
          <div>NAME: ASTROLABE</div>
          <div>STACK_SIZE: 1</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "celestial",
    style: brutalNodeStyle,
  },

  {
    id: "alchemy",
    type: "group",
    data: { label: "ALCHEMY" },
    position: { x: 640, y: 340 },
    style: { ...brutalGroupStyle, width: 200, height: 120 },
  },
  {
    id: "forge",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>FORGE</div>
          <div>NAME: FORGE</div>
          <div>STACK_SIZE: 10</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "alchemy",
    style: brutalNodeStyle,
  },

  {
    id: "craftsmanship",
    type: "group",
    data: { label: "CRAFTSMANSHIP" },
    position: { x: 640, y: 480 },
    style: { ...brutalGroupStyle, width: 200, height: 120 },
  },
  {
    id: "rotary-sieve",
    data: {
      label: (
        <>
          <div style={{ borderBottom: "1px solid #fff", marginBottom: "5px", paddingBottom: "5px" }}>ROTARY SIEVE</div>
          <div>NAME: ROTARY SIEVE</div>
          <div>STACK_SIZE: 50</div>
        </>
      )
    },
    position: { x: 10, y: 40 },
    parentNode: "craftsmanship",
    style: brutalNodeStyle,
  },
]

const initialEdges: Edge[] = [
  { id: "e1", source: "iron-vein", target: "masonry", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e2", source: "cobblestone-resource", target: "masonry", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e3", source: "masonry", target: "stone-paving", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e4", source: "stone-paving", target: "cobblestone-result", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e5", source: "stone-paving", target: "polished-stone", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e6", source: "polished-stone", target: "fortified-wall", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e7", source: "stone-paving", target: "astrolabe", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e8", source: "stone-paving", target: "forge", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
  { id: "e9", source: "stone-paving", target: "rotary-sieve", type: "straight", style: { stroke: "#fff" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#fff" } },
]

export default function Component() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[800px] bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        nodesFocusable={false}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Controls style={{ background: "#000", color: "#fff", border: "2px solid #fff" }} />
        <Background color="#fff" gap={20} size={1} />
      </ReactFlow>
    </div>
  )
}