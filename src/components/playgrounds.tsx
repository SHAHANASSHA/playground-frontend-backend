import { useNavigate } from "react-router-dom";
import { genIDClient } from "../utils/api-client";
import PGCard from "./pg-card";
import { useEffect } from "react";

export default function Playgrounds() {
 const pgs = [1, 2];
 const navigate = useNavigate();
 const generate = async (index: number) => {
  const { id, status } = await genIDClient(`ubuntupg${index}`, "");
  if (status) {
   navigate(`/playground/${id}`);
  }
 }
 useEffect(() => {
  // inactivityTime();
 }, []);
 return (
  <main className="p-2">
   <section className="grid gap-2 grid-cols-4">
    {pgs.map((e, i) => (
     <PGCard key={i} onClick={() => generate(e)} />
    ))}
   </section>
  </main>
 );
}