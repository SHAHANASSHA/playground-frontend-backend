import { useEffect, useState } from "react";
import AdminHeader from "../components/admin-header"
import { Button } from "../ui/button";
import { deleteToken, getToken, listToken } from "../utils/admin.client";
import formatTimestamp from "../utils/date-time-format";

export default function Admin() {
 const [tokens, setTokens] = useState<{
  _id: string,
  createdAt: string,
  status: string
 }[]>([]);
 const generator = async () => {
  const token = await getToken();
  (document.querySelector("#token") as HTMLInputElement).value = token;
  setTokens(p => [{ _id: token, createdAt: Date.now().toString(), status: "inactive" }, ...p])
 }

 const remove = async (id: string) => {
  if (await deleteToken(id)) {
   setTokens(p => [...p.filter(e => e._id !== id)])
  }
 }
 useEffect(() => {
  (async () => {
   setTokens(await listToken());
  })()
 }, []);
 return (
  <main className="min-h-screen bg-background px-8 py-2 md:px-8 md:py-2">
   <AdminHeader />
   <section className="w-full flex flex-col items-center pb-8">
    <section className="w-80 flex flex-col gap-8">
     <h3>Generate new token</h3>
     <input
      className="bg-foreground h-10 rounded-sm text-background px-4 shrink-0"
      type="text"
      name="token"
      id="token"
      placeholder="Token"
      readOnly
     />
     <Button
      className="w-full"
      onClick={generator}
     >
      Generate token
     </Button>
    </section>
   </section>
   <section className="w-full flex flex-col items-center">
    <table className="w-9/12">
     <thead>
      <tr>
       <th>Key</th>
       <th>Status</th>
       <th>Created at</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {tokens.map((e, i) => (
       <tr key={i}>
        <td className="text-center">{e._id}</td>
        <td className="text-center">{e.status}</td>
        <td className="text-center">{formatTimestamp(Number(e.createdAt.toString()))}</td>
        <td className="text-center">
         <Button
          className="w-full"
          onClick={() => remove(e._id)}
         >
          Delete
         </Button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </section>
  </main>
 );
}