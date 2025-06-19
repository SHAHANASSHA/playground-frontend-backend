import { Server } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { templates } from "../data/pg.data";
import ListItem from "./list-item";

export default function List() {
 const [activeTab, setActiveTab] = useState("templates");
 // const [usageProgress] = useState(65);
 return (
  <Tabs
   defaultValue="templates"
   value={activeTab}
   onValueChange={setActiveTab}
   className="w-full"
  >
   <TabsList className="mb-6">
    <TabsTrigger value="templates" className="flex items-center gap-2">
     <Server className="h-4 w-4" />
     <span>Templates</span>
    </TabsTrigger>
    {/* <TabsTrigger value="history" className="flex items-center gap-2">
     <Clock className="h-4 w-4" />
     <span>Usage History</span>
    </TabsTrigger> */}
   </TabsList>

   <TabsContent value="templates" className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     {templates.filter((_, i) => i === 0).map((template) => (
      <ListItem key={template.id} template={template} />
     ))}
    </div>
   </TabsContent>

   {/* <TabsContent value="history" className="space-y-6">
    <Card>
     <CardHeader>
      <CardTitle>Recent Playground Sessions</CardTitle>
      <CardDescription>Your recent playground activity</CardDescription>
     </CardHeader>
     <CardContent>
      <div className="space-y-4">
       {usageHistory.map((session) => (
        <div
         key={session.id}
         className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
        >
         <div className="flex items-center gap-4">
          <div className="p-2 rounded-full bg-primary/10">
           {session.templateName.includes("Python") ? (
            <Terminal className="h-5 w-5 text-primary" />
           ) : session.templateName.includes("Web") ? (
            <Code className="h-5 w-5 text-primary" />
           ) : (
            <Database className="h-5 w-5 text-primary" />
           )}
          </div>
          <div>
           <h4 className="text-sm font-medium">
            {session.templateName}
           </h4>
           <p className="text-xs text-muted-foreground">
            {session.startTime}
           </p>
          </div>
         </div>
         <div className="flex items-center gap-4">
          <div className="text-right">
           <p className="text-sm">{session.duration}</p>
           <Badge
            variant={
             session.status === "active" ? "default" : "outline"
            }
            className="text-xs"
           >
            {session.status === "active" ? "Active" : "Completed"}
           </Badge>
          </div>
          {session.status === "active" && (
           <Button
            size="sm"
            variant="outline"
            onClick={() =>
             (window.location.href = `/playground/${session.id}`)
            }
           >
            Resume
           </Button>
          )}
         </div>
        </div>
       ))}
      </div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader>
      <CardTitle>Usage Statistics</CardTitle>
      <CardDescription>
       Your playground usage this month
      </CardDescription>
     </CardHeader>
     <CardContent>
      <div className="space-y-4">
       <div>
        <div className="flex justify-between mb-2">
         <span className="text-sm font-medium">Total Usage</span>
         <span className="text-sm font-bold">{usageProgress}%</span>
        </div>
        <Progress value={usageProgress} className="h-2" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-lg border bg-card">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
           <Clock className="h-4 w-4 text-muted-foreground" />
           <span className="text-sm font-medium">Total Hours</span>
          </div>
          <span className="text-lg font-bold">8.5</span>
         </div>
        </div>

        <div className="p-4 rounded-lg border bg-card">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
           <Terminal className="h-4 w-4 text-muted-foreground" />
           <span className="text-sm font-medium">Sessions</span>
          </div>
          <span className="text-lg font-bold">12</span>
         </div>
        </div>

        <div className="p-4 rounded-lg border bg-card">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
           <User className="h-4 w-4 text-muted-foreground" />
           <span className="text-sm font-medium">Active Now</span>
          </div>
          <span className="text-lg font-bold">1</span>
         </div>
        </div>
       </div>
      </div>
     </CardContent>
    </Card>
   </TabsContent> */}
  </Tabs>
 );
}