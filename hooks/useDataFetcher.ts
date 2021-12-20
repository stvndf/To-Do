import useSWR from "swr";

interface Data {
  id: number;
  content: string;
  isComplete: boolean;
}

export default function useDataFetcher() {
  const { data, error, mutate } = useSWR<Data[]>(
    "/api/getTasks",
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => res.json())
  );

  const adjustIsComplete = async (taskId: number, newIsComplete: boolean) => {
    const newData: Data[] = data!.map((task) =>
      task.id === taskId ? { ...task, isComplete: newIsComplete } : task
    );

    mutate(newData, false);

    await fetch(`/api/tasks/${taskId}/adjustIsComplete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newIsComplete }),
    });

    mutate(newData);
  };

  const deleteTask = async (taskId: number) => {
    const newData = data!.filter((task) => task.id !== taskId);

    mutate(newData, false);

    await fetch(`/api/tasks/${taskId}/deleteTask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate(newData);
  };

  const addTask = async (newTask: string) => {
    if (data) {
      const response = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const id = (await response.json()).id;
      const updatedTasks = [
        ...data,
        { id, content: newTask, isComplete: false },
      ];

      mutate(updatedTasks);
    }
  };

  const editTask = async (taskId: number, newContent: string) => {
    const newData: Data[] = data!.map((task) =>
      task.id === taskId ? { ...task, content: newContent } : task
    );

    mutate(newData, false);

    await fetch(`/api/tasks/${taskId}/editTask`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newContent }),
    });

    mutate(newData);
  };

  return {
    data,
    error,
    adjustIsComplete: adjustIsComplete,
    deleteTask,
    addTask,
    editTask,
  };
}
