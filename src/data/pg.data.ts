export const templates = [
 {
  id: "1",
  name: "2 VM playground",
  pgname: "2vmpg",
  numofvms: 2,
  description: "A comprehensive playground with 2 ubuntu 24.04 virtual machines",
  image: "/img/2vm-pg-img.jpg",
  tags: ["Ubuntu", "Networking", "VMs"],
  resources: {
   cpu: "2 cores",
   memory: "4 GB",
   storage: "10 GB",
  },
 },
 {
  id: "2",
  name: "4 VM playground",
  pgname: "4vmpg",
  numofvms: 4,
  description: "A comprehensive playground with 4 ubuntu 24.04 virtual machines",
  image:
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  tags: ["Ubuntu", "Docker", "VMs"],
  resources: {
   cpu: "2 cores",
   memory: "4 GB",
   storage: "10 GB",
  },
 },
 {
  id: "3",
  name: "5 VM playground",
  pgname: "5vmpg",
  numofvms: 5,
  description: "A comprehensive playground with 5 ubuntu 24.04 virtual machines",
  image:
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  tags: ["Docker", "Kubernets", "linux"],
  resources: {
   cpu: "4 cores",
   memory: "8 GB",
   storage: "20 GB",
  },
 },
 {
  id: "4",
  name: "2 VM playground",
  pgname: "2almavms",
  numofvms: 2,
  description: "A comprehensive playground with 2 Almalinux OS 9 virtual machines",
  image:
   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  tags: ["Server", "Almalinux", "Advanced"],
  resources: {
   cpu: "4 cores",
   memory: "16 GB",
   storage: "30 GB",
  },
 },
];

export const usageHistory = [
 {
  id: "1",
  templateName: "Python Development",
  startTime: "2023-06-15 09:30",
  duration: "2h 15m",
  status: "completed" as const,
 },
 {
  id: "2",
  templateName: "Web Development",
  startTime: "2023-06-14 14:00",
  duration: "1h 45m",
  status: "completed" as const,
 },
 {
  id: "3",
  templateName: "Data Science",
  startTime: "2023-06-13 10:15",
  duration: "3h 20m",
  status: "completed" as const,
 },
 {
  id: "4",
  templateName: "Python Development",
  startTime: "Now",
  duration: "0h 45m",
  status: "active" as const,
 },
];