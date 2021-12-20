import { FormEvent, useState, useRef, useEffect } from "react";
import useDataFetcher from "../hooks/useDataFetcher";

interface Props {
  setIsModalOpen: (modalType: false) => void;
  taskId: number;
  taskContent: string;
}

export default function Modal({
  setIsModalOpen: setIsModalOpen,
  taskId,
  taskContent,
}: Props) {
  const taskInput = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState(taskContent);
  const { editTask } = useDataFetcher();

  const submitEditedTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(taskId, text);
    setIsModalOpen(false);
  };

  useEffect(() => {
    taskInput.current?.focus();
  }, []);

  return (
    <div
      onClick={() => {
        setIsModalOpen(false);
      }}
      className="fixed top-0 z-20 flex items-center justify-center w-full h-full overflow-auto bg-[rgba(26,32,46,0.3)]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-50 mb-12 flex flex-col items-center w-[90%] max-w-4xl p-8 bg-white rounded-lg opacity-100"
      >
        <h3 className="text-xl">Edit Task</h3>
        <form onSubmit={(e) => submitEditedTask(e)} className="w-[90%] mt-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex items-stretch w-full max-w-5xl px-4 text-lg border-2 rounded-lg border-background focus-visible:outline-none focus:ring-primary focus:ring h-14"
            ref={taskInput}
          />
          <div className="flex items-center justify-around max-w-md mx-auto mt-6">
            <button
              type="submit"
              className="w-20 h-10 border-2 rounded-lg hover:bg-primary hover:text-white text-primary border-background focus:ring-primary focus:ring"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="w-20 h-10 border-2 rounded-lg hover:bg-primary hover:text-white text-primary border-background focus:ring-primary focus:ring"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
