export default interface TemplateType {
 id: string;
 name: string;
 pgname: string;
 numofvms: number;
 description: string;
 image: string;
 tags: string[];
 resources: {
   cpu: string;
   memory: string;
   storage: string;
 };
}