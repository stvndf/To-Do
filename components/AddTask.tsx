import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FormEvent, useState } from "react";
import useDataFetcher from "../hooks/useDataFetcher";

export default function AddTask() {
  const [text, setText] = useState("");
  const { addTask } = useDataFetcher();

  const submitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(text);
    setText("");
  };

  return (
    <div className="flex items-center justify-center h-24 bg-primary">
      <form
        onSubmit={(e) => submitNewTask(e)}
        className="w-[90%] max-w-5xl h-14 rounded-lg flex items-stretch text-xl"
      >
        <input
          type="text"
          placeholder="New Task"
          className="pl-4 rounded-l-lg grow focus-visible:outline-none"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button type="submit" className="px-4 bg-white rounded-r-lg btn-icon">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  );
}
