import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { checkTest } from "../../utils/api-client";

export const TesterContext = createContext<boolean>(null!);

export default function TestCode({
 children,
 vmID,
 test,
 args
}: {
 children: ReactNode,
 vmID: string,
 test: string,
 args?: string[],
}) {
 const vm = `vm${Number(vmID) + 1}`;
 const { id } = useParams();
 const isMountedRef = useRef(true);
 const [pass, setPass] = useState<boolean>(false);

 const check = async (test: string, ...args: string[]) => {
  if (!id) return toast.error("Playground ID not found");
  const status = await checkTest(id, vm, test, ...args);
  return status.success;
 }

 const waitUntilTrue = (interval: number = 1000, isMountedRef: RefObject<boolean>) => {
  (async () => {
   while (isMountedRef.current) {
    const isSuccess = await check(test, ...(args ?? []));
    if (isSuccess) {
     setPass(true);
     return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
   }
  })();
 }

 useEffect(() => {
  isMountedRef.current = true;
  waitUntilTrue(1000, isMountedRef);
  return () => {
   isMountedRef.current = false;
  }
 }, []);

 return (
   <TesterContext.Provider value={pass}>
    {children}
   </TesterContext.Provider>
 );
}