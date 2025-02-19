import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// const initialNodes = [
//   { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
//   { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
// ];
// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Home() {
  return (
    <div className="h-screen w-screen p-2">
      <Tabs defaultValue="one" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">
          <Card>
            <CardHeader>
              <CardTitle>First Test</CardTitle>
            </CardHeader>
            <CardContent>
              <TestContent testCase={1} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="two">
          <Card>
            <CardHeader>
              <CardTitle>Second Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div>hi</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const testCases = [
  {
    testCase: 1,
    nodes: [
      {
        id: "caller",
        type: "funcCall",
        position: { x: 0, y: 0 },
        data: {
          fields: [{ value: "Me!fJEPeriod" }, { value: 0 }],
        },
      },
      {
        id: "callee",
        type: "funcDef",
        position: { x: 250, y: 0 },
        data: {
          fields: [{ name: "dDate" }, { name: "lSourceTypeID" }],
        },
      },
    ],
    edges: [
      {
        id: "edge-0",
        source: "caller",
        sourceHandle: "source_0",
        target: "callee",
        targetHandle: "target_0",
        style: {
          stroke: "#4A90E2",
          strokeWidth: 2,
        },
      },
      {
        id: "edge-1",
        source: "caller",
        sourceHandle: "source_1",
        target: "callee",
        targetHandle: "target_1",
        style: {
          stroke: "#4A90E2",
          strokeWidth: 2,
        },
      },
    ],
  },
];

const nodeTypes = {
  funcCall: FuncCallNode,
  funcDef: FuncDefNode,
};

function TestContent({ testCase }: { testCase: number }) {
  const dataSet = testCases.find((t) => t.testCase === testCase);
  if (!dataSet) return;

  const { nodes: initialNodes, edges: initialEdges } = dataSet;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  const handleEdgeMouseEnter = (event: React.MouseEvent, edge: any) => {
    setHoveredEdge(edge.id);
  };

  const handleEdgeMouseLeave = (event: React.MouseEvent, edge: any) => {
    setHoveredEdge(null);
  };

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === hoveredEdge) {
          return {
            ...edge,
            animated: true,
            style: { ...edge.style, stroke: "red", strokeWidth: 4 },
          };
        }
        return {
          ...edge,
          animated: false,
          style: { ...edge.style, stroke: "#4A90E2", strokeWidth: 2 },
        };
      })
    );
  }, [hoveredEdge, setEdges]);

  return (
    <div className="h-[calc(100svh_-_162px)] w-full bg-red-500">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeMouseEnter={handleEdgeMouseEnter}
        onEdgeMouseLeave={handleEdgeMouseLeave}
        colorMode="dark"
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

function FuncCallNode({ data }: NodeProps) {
  const fields = data.fields as any[];

  return (
    <Card className="w-56 shadow border border-orange-600/50">
      <CardHeader>
        <CardTitle>Func Call</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ul className="space-y-1 text-sm">
          {fields?.map((field: any, _index: number) => {
            return (
              <li key={_index} className="flex items-center relative h-6 px-2">
                <span>{field.value}</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`source_${_index}`}
                  className="border-2 border-white size-2.5 bg-muted-foreground"
                />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

function FuncDefNode({ data }: NodeProps) {
  const fields = data.fields as any[];

  return (
    <Card className="w-56 shadow border border-blue-600/50">
      <CardHeader>
        <CardTitle>Func Definition</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ul className="space-y-1 text-sm">
          {fields?.map((field: any, _index: number) => {
            return (
              <li key={_index} className="flex items-center h-6 relative px-2">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`target_${_index}`}
                  className="border-2 border-white size-2.5 bg-muted-foreground"
                />
                <span>{field.name}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
