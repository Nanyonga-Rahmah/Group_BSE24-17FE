// import { useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
// const options = [
//   "bold",
//   "italic",
//   "|",
//   "ul",
//   "ol",
//   "image",
//   "|",
//   "font",
//   "fontsize",
//   "|",
//   "outdent",
//   "indent",
//   "align",
//   "|",
//   "hr",
//   "|",
//   "fullsize",
//   "brush",
//   "|",
//   "table",
//   "link",
//   "|",
//   "undo",
//   "redo",
// ];

// export const RichTextEditor = () => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");

//   const config = useMemo(
//     () => ({
//       readonly: false,

//       buttons: options,
//       buttonsMD: options,
//       buttonsSM: options,
//       buttonsXS: options,
//       statusbar: false,
//       sizeLG: 900,
//       sizeMD: 700,
//       sizeSM: 400,
//       toolbarAdaptive: false,
//     }),
//     []
//   );

//   return (
//     <JoditEditor
//       ref={editor}
//       value={content}
//       config={config}
//       onBlur={(newContent) => setContent(newContent)}
//       onChange={(htmlString) => setContent(htmlString)}
//     />
//   );
// };


import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const options = [
  "bold",
  "italic",
  "|",
  "ul",
  "ol",
  "image",
  "|",
  "font",
  "fontsize",
  "|",
  "outdent",
  "indent",
  "align",
  "|",
  "hr",
  "|",
  "fullsize",
  "brush",
  "|",
  "table",
  "link",
  "|",
  "undo",
  "redo",
];

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      toolbarAdaptive: false,
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)} // Call onChange with the new content
      onChange={(htmlString) => onChange(htmlString)} // Ensure content is updated
    />
  );
};
