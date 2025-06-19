interface ListType {
 _id: string
 nid: string
 cid: string
 ip: string
 gateway: string
 subnet: string
 message: string
 post_name: string
 createdAt: string
 instance: {
  id: string
  cid: string
  name: string
  cname: string
  status: string
  driver: string
 }
}