import { memo, useState } from "react";
import sessions from "../../data/docker/sessions";
import Session1 from "./session-1";

function Sessions({ vmID }: { vmID: number }) {
 // const vm = `vm${vmID + 1}`;
 // const { id } = useParams();
 const [page, setpage] = useState(0);

 // const check = async (test: string, ...args: string[]) => {
 //  if (!id) return toast.error("Playground ID not found");
 //  const status = await checkTest(id, vm, test, ...args);
 //  return status.success;
 // }

 const next = () => {
  if (page >= (sessions.body.length - 1)) return;
  setpage(p => ++p);
 }

 const prev = () => {
  if (page <= 0) return;
  setpage(p => --p);
 }

 return (
  <main className="h-full w-full overflow-y-auto sesstion-carrier">
   <Session1 vmID={vmID} data={sessions.body[page]} />
   <footer className="h-16 flex py-4">
    <button
     onClick={prev}
     className={`${page === 0 ? "bg-slate-500" : "bg-white"} text-black px-4 rounded-md`}
    >
     Previous
    </button>
    <div className="grow"></div>
    <button
     onClick={next}
     className={`${page < (sessions.body.length - 1) ? "bg-white" : "bg-slate-500"} text-black px-4 rounded-md`}
    >
     next
    </button>
   </footer>
  </main>
 );
}

export default memo(Sessions);