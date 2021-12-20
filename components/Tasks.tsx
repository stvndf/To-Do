import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faSquareCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import Background from "./Background";
import useDataFetcher from "../hooks/useDataFetcher";
import { useRef, useState } from "react";
import Modal from "./Modal";

export default function Tasks() {
  const { data, error, adjustIsComplete, deleteTask } = useDataFetcher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const taskToEdit = useRef<{
    id: undefined | number;
    content: undefined | string;
  }>({ id: undefined, content: undefined });

  if (error || !data)
    return (
      <div className="flex justify-center self-center flex-grow w-[90%] max-w-5xl pt-5">
        {error ? (
          <Background dataStatus="error" />
        ) : (
          !data && <Background dataStatus="unavailable" />
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center self-center flex-grow w-[90%] max-w-5xl pt-5">
      <Background dataStatus="available" />
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          taskId={taskToEdit.current.id!}
          taskContent={taskToEdit.current.content!}
        />
      )}

      {data!.map((task) => (
        <div
          className="z-10 flex items-center w-full min-h-[4rem] px-4 mb-5 bg-white rounded-lg"
          key={task.id}
        >
          {task.isComplete ? (
            <div
              className="cursor-pointer text-secondary"
              onClick={() => adjustIsComplete(task.id, false)}
            >
              <FontAwesomeIcon icon={faSquareCheck} size="2x" />
            </div>
          ) : (
            <div
              className="cursor-pointer text-primary"
              onClick={() => adjustIsComplete(task.id, true)}
            >
              <FontAwesomeIcon icon={faSquare} size="2x" />
            </div>
          )}
          <div
            className={`flex-1 ml-3 my-1 ${
              task.isComplete ? "text-secondary line-through" : "text-primary"
            }`}
          >
            {task.content}
          </div>
          <button
            className="ml-3 w-7 h-7 btn-icon"
            onClick={() => {
              taskToEdit.current = { id: task.id, content: task.content };
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            className="ml-3 w-7 h-7 btn-icon"
            onClick={() => deleteTask(task.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      ))}
    </div>
  );
}
