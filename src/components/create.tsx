export default function Create({ onClick }: { onClick?: () => void }) {
 return (
  <nav className="bg-white border-gray-200 dark:bg-gray-900">
   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
     <button
      onClick={onClick}
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      Create playground
     </button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    </div>
   </div>
  </nav>
 );
}