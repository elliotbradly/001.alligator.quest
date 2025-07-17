"use client"

import { useState, useCallback } from "react"
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

const initialNodes: Node[] = [
  // Natural Resource Group
  {
    id: "natural-resource",
    type: "group",
    data: { label: "Natural Resource" },
    position: { x: 0, y: 0 },
    style: {
      width: 200,
      height: 150,
      backgroundColor: "rgba(255, 240, 240, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "iron-vein",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Iron-Vein</div>
          <div className="text-sm">stack_size: 50</div>
        </div>
      )
    },
    position: { x: 20, y: 20 },
    parentNode: "natural-resource",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },
  {
    id: "cobblestone-resource",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Cobblestone</div>
          <div className="text-sm">stack_size: 50</div>
        </div>
      )
    },
    position: { x: 20, y: 80 },
    parentNode: "natural-resource",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },

  // Landscape Group
  {
    id: "landscape",
    type: "group",
    data: { label: "Landscape" },
    position: { x: 250, y: 0 },
    style: {
      width: 400,
      height: 150,
      backgroundColor: "rgba(255, 240, 240, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "masonry",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Masonry</div>
          <div className="text-sm">stack_size: 100</div>
        </div>
      )
    },
    position: { x: 20, y: 50 },
    parentNode: "landscape",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },
  {
    id: "stone-paving",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Stone Paving</div>
          <div className="text-sm">stack_size: 100</div>
        </div>
      )
    },
    position: { x: 220, y: 50 },
    parentNode: "landscape",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },

  // Results Group
  {
    id: "results",
    type: "group",
    data: { label: "Results" },
    position: { x: 700, y: 0 },
    style: {
      width: 600,
      height: 150,
      backgroundColor: "rgba(255, 240, 240, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "cobblestone-result",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Cobblestone</div>
          <div className="text-sm">stack_size: 100</div>
        </div>
      )
    },
    position: { x: 20, y: 50 },
    parentNode: "results",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },
  {
    id: "polished-stone",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Polished Stone Floor</div>
          <div className="text-sm">stack_size: 100</div>
        </div>
      )
    },
    position: { x: 220, y: 50 },
    parentNode: "results",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },
  {
    id: "fortified-wall",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Fortified Wall</div>
          <div className="text-sm">stack_size: 100</div>
        </div>
      )
    },
    position: { x: 420, y: 50 },
    parentNode: "results",
    style: {
      background: "#ffb4b4",
      borderRadius: "8px",
      width: 160,
    },
  },

  // Special Items Groups
  {
    id: "celestial",
    type: "group",
    data: { label: "Celestial-Artifacts" },
    position: { x: 700, y: 200 },
    style: {
      width: 200,
      height: 100,
      backgroundColor: "rgba(230, 230, 250, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "astrolabe",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Astrolabe</div>
          <div className="text-sm">stack_size: 1</div>
        </div>
      )
    },
    position: { x: 20, y: 30 },
    parentNode: "celestial",
    style: {
      background: "#e6b4ff",
      borderRadius: "8px",
      width: 160,
    },
  },

  {
    id: "alchemy",
    type: "group",
    data: { label: "Alchemy" },
    position: { x: 700, y: 350 },
    style: {
      width: 200,
      height: 100,
      backgroundColor: "rgba(230, 230, 250, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "forge",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Forge</div>
          <div className="text-sm">stack_size: 10</div>
        </div>
      )
    },
    position: { x: 20, y: 30 },
    parentNode: "alchemy",
    style: {
      background: "#b4b4ff",
      borderRadius: "8px",
      width: 160,
    },
  },

  {
    id: "craftsmanship",
    type: "group",
    data: { label: "Craftsmanship" },
    position: { x: 700, y: 500 },
    style: {
      width: 200,
      height: 100,
      backgroundColor: "rgba(230, 230, 250, 0.5)",
      borderRadius: "8px",
      padding: "8px",
    },
  },
  {
    id: "rotary-sieve",
    data: {
      label: (
        <div className="p-2">
          <div className="font-semibold">Rotary Sieve</div>
          <div className="text-sm">stack_size: 50</div>
        </div>
      )
    },
    position: { x: 20, y: 30 },
    parentNode: "craftsmanship",
    style: {
      background: "#e6b4ff",
      borderRadius: "8px",
      width: 160,
    },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "iron-vein",
    target: "masonry",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e2",
    source: "cobblestone-resource",
    target: "masonry",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e3",
    source: "masonry",
    target: "stone-paving",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e4",
    source: "stone-paving",
    target: "cobblestone-result",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e5",
    source: "stone-paving",
    target: "polished-stone",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e6",
    source: "polished-stone",
    target: "fortified-wall",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e7",
    source: "stone-paving",
    target: "astrolabe",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e8",
    source: "stone-paving",
    target: "forge",
    markerEnd: { type: MarkerType.Arrow },
  },
  {
    id: "e9",
    source: "stone-paving",
    target: "rotary-sieve",
    markerEnd: { type: MarkerType.Arrow },
  },
]

export default function Component() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[800px] bg-white">
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
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  )
}