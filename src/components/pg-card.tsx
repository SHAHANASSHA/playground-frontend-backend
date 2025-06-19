export default function PGCard({ onClick }: { onClick: () => void }) {
 return (
  <article
   className="bg-slate-700 aspect-[5/6] rounded-md overflow-hidden flex flex-col">
   <header className="w-full bg-blue-400 p-2 ">
    Playground on linux
   </header>
   <section className="p-2 grow">
    <h2 className="text-xl font-bold">Ubuntu 24.04</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, eligendi. Excepturi dolorum placeat sed possimus. Est assumenda delectus, excepturi dolores quaerat veritatis magnam porro, laborum aliquam esse velit iure accusamus.</p>
   </section>
   <footer className="p-2">
    <button
     onClick={onClick}
     className="px-4 py-1 border-2 border-black rounded-lg hover:bg-black hover:text-white text-lg">
     start
    </button>
   </footer>
  </article>
 );
}