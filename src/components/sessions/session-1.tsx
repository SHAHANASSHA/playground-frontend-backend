import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from 'remark-gfm';
import Pre from "./pre";

export default function Session1({
 data,
 vmID
}: {
 data: string,
 vmID: number
}) {

 const customComponents: Components = {
  pre: ({ node, ...props }) => <Pre vmID={`${vmID}`} {...props} />,
  h1: ({ node, ...props }) => <h1 className="text-2xl my-4 font-bold" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-xl  my-3 font-bold" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-lg  my-2 font-bold" {...props} />,
  h4: ({ node, ...props }) => <h4 className="text-md  my-1 font-bold" {...props} />,
  h5: ({ node, ...props }) => <h4 className="text-sm  my-1 font-bold" {...props} />,
  h6: ({ node, ...props }) => <h4 className="text-xs  my-1 font-bold" {...props} />,
  hr: ({ node, ...props }) => <hr className="my-4" {...props} />,
  p: ({ node, ...props }) => <p className="my-4" {...props} />,
 };

 return (
  <section className="w-full text-sm">
   <ReactMarkdown components={customComponents} remarkPlugins={[remarkGfm]}>
    {data}
   </ReactMarkdown>
  </section>
 )
}