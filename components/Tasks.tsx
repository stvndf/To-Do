import styles from "../styles/Tasks.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faSquareCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useSWR, { useSWRConfig } from "swr";

interface Props {}
interface Data {
  id: number;
  content: string;
  isComplete: boolean;
}

export default function Tasks() {
  // const { mutate } = useSWRConfig();
  const { data, error, mutate } = useSWR<Data[]>(
    "/api/tasks",
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => res.json())
  );

  const setIsComplete = async (
    taskId: number,
    newIsComplete: boolean
  ) => {
    const newData: Data[] = data!.map((task) =>
      task.id === taskId ? { ...task, isComplete: newIsComplete } : task
    );

    mutate(newData, false);

    await fetch(`/api/tasks/${taskId}/setIsComplete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newIsComplete }),
    });

    mutate(newData)
  };

  const deleteTask = async (taskId: number) => {
    const newData = data!.filter(task => task.id !== taskId)

    mutate(newData, false);

    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(newData)
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <FontAwesomeIcon icon={faSpinner} spin />;

  return (
    <div className={styles.container}>
      {data.map((task) => (
        <div className={styles.task} key={task.id}>
          {task.isComplete ? (
            <div
              className={styles.status}
              onClick={() => setIsComplete(task.id, false)}
            >
              <FontAwesomeIcon icon={faSquareCheck} size="2x" />
            </div>
          ) : (
            <div
              className={styles.status}
              onClick={() => setIsComplete(task.id, true)}
            >
              <FontAwesomeIcon icon={faSquare} size="2x" />
            </div>
          )}
          <div className={styles.text}>{task.content}</div>
          <button className={styles["edit-button"]}>
            <FontAwesomeIcon icon={faPenToSquare} size="1x" />
          </button>
          <button
            className={styles["delete-button"]}
            onClick={() => deleteTask(task.id)}
          >
            <FontAwesomeIcon icon={faTrashCan} size="1x" />
          </button>
        </div>
      ))}
    </div>
  );
}
