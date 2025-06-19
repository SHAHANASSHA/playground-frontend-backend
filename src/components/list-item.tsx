import { useNavigate } from "react-router-dom";
import {
 Cpu,
 Database,
 Server
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { genIDClient } from "../utils/api-client";
import TemplateType from "../types/pg";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function ListItem({ template }: { template: TemplateType }) {
 const navigate = useNavigate();
 const generate = async (index: string, pgname: string) => {
  const { id, status } = await genIDClient(`ubuntupg${index}`, pgname);
  if (status) {
   navigate(`/playground/${id}?num=${template.numofvms}`);
  }
 }
 return (
  <Card
   className="overflow-hidden hover:shadow-md transition-shadow"
  >
   <div className="aspect-video w-full overflow-hidden bg-muted">
    <img
     src={template.image}
     alt={template.name}
     className="h-full w-full object-cover transition-transform hover:scale-105"
    />
   </div>
   <CardHeader>
    <CardTitle>{template.name}</CardTitle>
    <CardDescription>{template.description}</CardDescription>
   </CardHeader>
   <CardContent>
    <div className="flex flex-wrap gap-2 mb-4">
     {template.tags.map((tag) => (
      <Badge key={tag} variant="secondary">
       {tag}
      </Badge>
     ))}
    </div>
    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
     <div className="flex items-center gap-1">
      <Cpu className="h-3 w-3" />
      <span>{template.resources.cpu}</span>
     </div>
     <div className="flex items-center gap-1">
      <Database className="h-3 w-3" />
      <span>{template.resources.memory}</span>
     </div>
     <div className="flex items-center gap-1">
      <Server className="h-3 w-3" />
      <span>{template.resources.storage}</span>
     </div>
    </div>
   </CardContent>
   <CardFooter>
    <Button
     onClick={() => generate(template.id, template.pgname)}
     className="w-full"
    >
     Launch Playground
    </Button>
   </CardFooter>
  </Card>
 );
}