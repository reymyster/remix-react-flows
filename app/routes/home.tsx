import type { Route } from "./+types/home";

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
              <div className="h-[calc(100svh_-_162px)] w-full bg-red-500">
                hi
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
