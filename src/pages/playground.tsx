import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Server, Clock, Power } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { createPG, pollPG, removePG } from "../utils/api-client";
import TerminalComponent from "../components/terminal"
import formatTime from "../utils/format-time";
import { Tabs, TabsList } from "../ui/tabs";
import Loading from "../components/loading";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import Sessions from "../components/sessions/sessions";
import ExposePort from "../components/expose-port";

function Playground() {
 const navigate = useNavigate();
 const updateStatus = useRef<() => void | null>(null!);
 const [timeRemaining, setTimeRemaining] = useState<number>(60 * 60);
 const [running, setRunning] = useState<boolean>(true);
 const [terminal, setTerminal] = useState<number>(0);
 const [pg, setPG] = useState(false);
 const [msg, setMsg] = useState("");
 const [query] = useSearchParams();
 const { id } = useParams();
 let lock = 0;
 const vms = Number(query.get("num")?.toString());
 let startTime: number | null = null;

 const create = async () => {
  if (!id) return navigate("/dashboard");
  const res = await createPG(id);
  startTime = res?.details?.start;
  setTimeout(() => {
   const codes: (number | undefined)[] = [200, 201];
   if (!codes.includes(res.code)) {
    navigate("/dashboard");
   }
  }, 1000);
  setMsg(res.msg);
  setPG(res.status);
 }

 const remove = async () => {
  const res = await removePG(id!);
  if (res) {
   navigate("/dashboard");
  }
 }

 useEffect(() => {
  const interval = setInterval(() => {
   pollPG(id!);
  }, 2.5 * 60 * 1000);
  return () => clearInterval(interval);
 }, []);

 useEffect(() => {
  if (!(lock)) {
   lock++;
   updateStatus.current = inactivityTime(remove);
   create();
  }
 }, []);

 useEffect(() => {
  let interval: number | undefined;

  if (running && timeRemaining > 0) {
   // setTimerActive(true);
   interval = window.setInterval(() => {
    let remaining_time: number | null = null;
    if (startTime) {
     const time_elapsed_in_um = Date.now() - startTime;
     const time_elapsed_in_s = time_elapsed_in_um / 1000;
     remaining_time = Number(((60 * 60) - time_elapsed_in_s).toFixed(0));
    }
    setTimeRemaining((prev) => {
     if (prev <= 1) {
      clearInterval(interval);
      setRunning(false);
      // setTimerActive(false);
      return 0;
     }
     return remaining_time ?? prev - 1;
    });
   }, 1000);
  } else if (!running) {
   // setTimerActive(false);
   clearInterval(interval);
  }

  return () => {
   if (interval) clearInterval(interval);
  };
 }, [running]);

 useEffect(() => {
  const resizer = document.querySelector('.resizer') as HTMLDivElement;
  const leftPane = document.querySelector('.left-pane') as HTMLDivElement;
  let isDragging = false;
  const mouseDownHandler = () => {
   isDragging = true;
   document.body.style.cursor = 'col-resize';
  }
  const mouseMoveHandler = (e: MouseEvent) => {
   if (!isDragging) return;
   const container = (document.querySelector('.pg-cards-container') as HTMLDivElement);
   const containerOffsetLeft = container.offsetLeft;
   const pointerRelativeXpos = e.clientX - containerOffsetLeft;
   const containerWidth = container.offsetWidth;
   const leftPaneMinWidth = 100;
   const leftPaneMaxWidth = containerWidth - 100;

   if (pointerRelativeXpos > leftPaneMinWidth && pointerRelativeXpos < leftPaneMaxWidth) {
    leftPane.style.width = `${pointerRelativeXpos}px`;
   }
  }
  const mouseUpHandler = () => {
   isDragging = false;
   document.body.style.cursor = 'default';
  }

  resizer.addEventListener("mousedown", mouseDownHandler);
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);

  return () => {
   resizer.removeEventListener("mousedown", mouseDownHandler);
   document.removeEventListener("mousemove", mouseMoveHandler);
   document.removeEventListener("mouseup", mouseUpHandler);
  }
 }, []);

 const templateName = "DevOps Training Environment",
  templateDescription = "A fully configured environment with multiple VMs for practicing DevOps skills";

 if (!id) {
  return (
   <h1>Playground not found</h1>
  );
 }

 return (
  <main className="flex flex-col h-screen bg-background">
   <div className="flex justify-between items-center p-4 pr-16 border-b">
    <div>
     <h1 className="text-2xl font-bold">{templateName}</h1>
     <p className="text-muted-foreground">{templateDescription}</p>
    </div>
    <div className="flex items-center gap-3">
     {/* Timer display */}
     {(running || timeRemaining < 60 * 60) && (
      <div className="flex items-center gap-1 text-sm">
       <Clock className="h-4 w-4 text-muted-foreground" />
       <span
        className={`font-mono ${timeRemaining < 300 ? "text-red-500 font-bold" : ""}`}
       >
        {formatTime(timeRemaining)}
       </span>
      </div>
     )}

     <Badge
      variant={running ? "default" : "outline"}
      className="flex gap-1 items-center"
     >
      {running ? (
       <>
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        Running
       </>
      ) : (
       <>Stopped</>
      )}
     </Badge>
     <Button
      variant="outline"
      size="sm"
      onClick={remove}
      // onClick={handleRestartVMs}
      className="gap-1"
     >
      <Power className="h-4 w-4" /> Stop VMs
     </Button>
    </div>
   </div>

   <div className="flex flex-1 p-4 pg-cards-container overflow-hidden">
    <Card className="h-full flex flex-col w-1/4 left-pane p-2">
     {pg && <Sessions vmID={terminal} />}
    </Card>
    <div className="flex items-center justify-center h-full w-4 cursor-col-resize resizer">
     <section className="flex h-6 w-3 bg-white rounded-xs py-1 px-0.5 gap-0.5">
      <aside className="bg-slate-500 h-full grow"></aside>
      <aside className="bg-slate-500 h-full grow"></aside>
      <aside className="bg-slate-500 h-full grow"></aside>
     </section>
    </div>
    <Card className="h-full flex flex-col flex-1">
     <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/50">
      <Tabs
       className="w-full"
      >
       <div className="flex justify-between items-center w-full">
        <TabsList>
         {(new Array(vms)).fill(1).map((_, i) => (
          <button
           key={i}
           onClick={() => setTerminal(i)}
           data-state={(terminal === i) ? "active" : ""}
           className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
           <Server className="h-4 w-4 mr-1" /> VM0{i + 1}
          </button>
         ))}
        </TabsList>
        <div className="flex gap-2">
         <ExposePort vmID={`vm${terminal + 1}`} />
        </div>
       </div>
      </Tabs>
     </div>
     {pg ? (timeRemaining > 0 ? <div className="flex-1">
      <Tabs className="h-full relative">
       {/* VM01 Terminal */}
       {(new Array(vms).fill(1).map((_, i) => (
        <section
         key={i}
         className="w-full h-full m-0 p-2 absolute bg-black"
         style={{ zIndex: (terminal === i) ? 1 : -1 }}
        >
         <TerminalComponent updateStatus={updateStatus.current} vmid={`vm${i + 1}`} pg={id!} />
        </section>
       )))}

       {/* VM02 Terminal */}
       {/* <section
        className="w-full h-full m-0 p-2 absolute bg-black"
        style={{ zIndex: terminal ? 1 : -1 }}
       >
        <TerminalComponent vmid={"vm2"} pg={id!} />
       </section> */}
      </Tabs>
     </div> : <main className="w-full h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold text-white">Session terminated</h1>
     </main>) : (msg ? <main className="w-full h-full flex items-center justify-center">
      <h1 className="text-2xl font-bold text-white">{msg}</h1>
     </main> : <Loading />)}
    </Card>
   </div>
  </main>
 )
}

export default memo(Playground);

function inactivityTime(remove: () => Promise<void>) {
 let time: NodeJS.Timeout;
 const maxInactivity = 10 * 60 * 1000;

 function resetTimer() {
  clearTimeout(time);
  time = setTimeout(() => {
   console.log("User is inactive");
   remove();
  }, maxInactivity);
 }

 window.onload = resetTimer;
 document.onmousemove = resetTimer;
 document.onkeydown = resetTimer;
 document.onscroll = resetTimer;
 document.onclick = resetTimer;
 document.ontouchstart = resetTimer;

 return resetTimer;
};