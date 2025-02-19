import type { Route } from "./+types/home";

import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
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

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
              <div className="h-[calc(100svh_-_162px)] w-full bg-red-500">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  colorMode="dark"
                  fitView
                >
                  <Controls />
                  <MiniMap />
                  <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                  />
                </ReactFlow>
              </div>
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
