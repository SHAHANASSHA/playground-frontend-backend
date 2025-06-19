import React, { JSX, memo, ReactNode, useContext } from "react";
import TestCode, { TesterContext } from "./test-code";

interface PreProps extends JSX.IntrinsicAttributes {
 children?: ReactNode;
 vmID?: string
}


function Pre(props: PreProps) {
 const testFields = ["name", "title", "args", "timeout", "retries", "delay"];
 const array = React.Children.toArray(props.children);
 const content = array.map(child => extractText(child)).join('');
 const lines = content.split("\n");
 const fieldsPresent = lines.reduce((a, b) => {
  if (testFields.includes(b.split(":")[0])) ++a;
  return a;
 }, 0);
 const isTest = fieldsPresent > 4;
 const { vmID, ...restProps } = props;

 if (isTest && vmID) {
  const test = lines.find(e => e.split(":")[0] === "name")?.split(":")[1].trim();
  const title = lines.find(e => e.split(":")[0] === "title")?.split(":")[1].trim();
  const argIndex = lines.findIndex(e => e.split(":")[0] === "args");
  const arg = lines[argIndex + 1].split("-")[1]?.trim()!;

  // console.log("vmID:", vmID, "\ntest: ", test, "\ntitle: ", title, "\narg: ", arg);
  return (
   <TestCode vmID={vmID} test={test!} args={[arg]}>
    <TestComponent title={title!} props={restProps} />
   </TestCode>
  );
 }

 return (
  <pre
   style={{
    boxSizing: "border-box",
    border: "1px solid #9999",
    margin: "4px",
    borderRadius: "4px",
    padding: "6px",
    backgroundColor: "#242a39"
   }}
   {...restProps} />
 );
}

export default memo(Pre);

function TestComponent({ props, title }: { props: PreProps, title: string }) {
 const isValid = useContext(TesterContext);
 return (
  <>
   <header
    style={{
     border: "1px solid #9999",
     borderRadius: "5px 5px 0px 0px",
     borderBottom: "none"
    }}
    className={`p-1 mx-1 mt-4 box-border flex ${isValid ? "bg-green-950" : ""}`}>
    {isValid ? "Verified!" : "Checking..."}
    <div className="grow"></div>
    {isValid ?
     <span className="text-green-500">✓</span>
     :
     <span className="animate-spin text-amber-500">⚙</span>}
   </header>
   <pre
    className={`${isValid ? "bg-green-800" : "bg-[#242a39]"}`}
    style={{
     boxSizing: "border-box",
     border: "1px solid #9999",
     margin: "0px 4px 4px 4px",
     borderRadius: "0px 0px 5px 5px",
     padding: "6px"
    }}
    {...props}>
    {title}
   </pre>
  </>
 );
}

function extractText(node: ReactNode): string {
 if (typeof node === 'string' || typeof node === 'number') {
  return node.toString();
 }

 if (Array.isArray(node)) {
  return node.map(extractText).join('');
 }

 if (React.isValidElement(node)) {
  return extractText((node.props as PreProps).children);
 }

 return '';
}
