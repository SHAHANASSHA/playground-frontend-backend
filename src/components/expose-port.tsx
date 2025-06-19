import axios from "axios";
import { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ExposePort({ vmID }: { vmID: string }) {
 const [popup, setPopup] = useState(false);
 const [ports, setPorts] = useState<{ [key: string]: string }[]>([]);
 const [port, setPort] = useState<number | null>(null);
 const { id } = useParams();

 const updatePortList = () => {
  axios.get(`/api/v1/port/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(res => {
   setPorts(res.data.list);
  }).catch(console.log);
 }
 useEffect(() => {
  updatePortList();
 }, [vmID]);

 const exposeHandler = () => {
  axios.post(`/api/v1/port/${id}/${vmID}/${port}`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
   .then(() => {
    toast.success("Port added");
    updatePortList();
   }).catch(console.log);
 }

 const deleteHandler = (id: string) => {
  axios.delete(`/api/v1/port/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
   .then(() => {
    toast.success("Port deleted");
    updatePortList();
   }).catch(console.log);
 }

 return (
  <>
   <button
    className="text-2xl"
    onClick={() => setPopup(!popup)}
   >
    ⌘
   </button>
   {popup && <main className="fixed inset-0 z-30 bg-[#2226] flex items-center justify-center">
    <section className="max-w-full min-w-[40rem] bg-blue-950 rounded-lg relative shadow-2xl p-4">
     <aside onClick={() => setPopup(!popup)} className="absolute top-2 right-4 text-2xl">
      ×
     </aside>
     <section>
      <h2 className="text-3xl text-center">Expose ports</h2>
      <aside className="flex w-full px-20 py-10 gap-6">
       <input
        placeholder="eg: 8000"
        className="bg-white text-black h-8 rounded-sm w-4/5 px-2"
        type="number"
        onInput={e => setPort(Number((e.target as HTMLInputElement).value))} />
       <button
        className="bg-blue-700 h-8 px-4 rounded-sm w-1/5"
        onClick={exposeHandler}>
        expose
       </button>
      </aside>
      <aside>
       <table className="table-auto w-full rounded-sm mb-4">
        <thead>
         <tr>
          <th>No</th>
          <th>VM</th>
          <th>URL</th>
          <th>port</th>
          <th>Action</th>
         </tr>
        </thead>
        <tbody>
         {ports.map((e, i) => (
          <tr key={i}>
           <td>{i + 1}</td>
           <td>{e.vm}</td>
           <td>
            <a
             target="_blank"
             className="text-blue-500 underline"
             href={`https://${e.subdomain.slice(0, e.subdomain.length - 1)}`}
            >
             {`https://${e.subdomain.slice(0, e.subdomain.length - 1)}`}
            </a>
           </td>
           <td>{e.port}</td>
           <td>
            <button className="text-xl" onClick={() => deleteHandler(e._id)}>
             🗑
            </button>
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </aside>
     </section>
    </section>
   </main>}
  </>
 );
}

export default memo(ExposePort);