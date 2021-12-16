import { mutate } from "swr";

interface Data {
  id: number;
  content: string;
  isComplete: boolean;
}

export const setIsComplete = async (
  taskIndex: number,
  taskId: number,
  newIsComplete: boolean,
  data: Data[]
) => {
  const newData: Data[] = JSON.parse(JSON.stringify(data));
  newData[taskIndex].isComplete = newIsComplete;

  mutate(
    `/api/tasks/${taskId}/setIsComplete`,
    data!.map((task) =>
      task.id === taskId
        ? (task.isComplete = !task.isComplete)
        : task.isComplete
    ),
    false
  );

  await fetch(`/api/tasks/${taskId}/setIsComplete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newIsComplete }),
  });

  mutate(`/api/tasks/${taskId}/setIsComplete`);
};