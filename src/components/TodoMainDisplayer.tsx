import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import { FullTask } from "./FullTaskInterface";
import "../main.css";
import axios from "axios";

export function TodoMainDisplayer(): JSX.Element {
  const [tasks, setTasks] = useState<FullTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<FullTask[]>([]);

  const apiBaseURL = "https://to-do-list-gqr6.onrender.com";

  useEffect(() => {
    fetchTasks(apiBaseURL, setTasks, setCompletedTasks);
  }, []);

  return (
    <div>
      <TaskInput
        tasks={tasks}
        updateTasks={setTasks}
        updateComletedTasks={setCompletedTasks}
        apiBaseURL={apiBaseURL}
      />
      <TaskList
        tasks={tasks}
        updateTasks={setTasks}
        updateComletedTasks={setCompletedTasks}
        apiBaseURL={apiBaseURL}
      />
      <CompletedTaskList
        completedTasks={completedTasks}
        updateTasks={setTasks}
        updateComletedTasks={setCompletedTasks}
        apiBaseURL={apiBaseURL}
      />
    </div>
  );
}
// here we export fetch task function as we will use it across different components

export async function fetchTasks(
  apiBaseURL: string,
  setTasks: (st: FullTask[]) => void,
  setCompletedTasks: (st: FullTask[]) => void
) {
  try {
    const response = await axios.get(apiBaseURL);
    const taskData: FullTask[] = response.data;
    const newTasks: FullTask[] = [];
    const newCompletedTasks: FullTask[] = [];
    for (const task of taskData) {
      if (task.completed === "N") {
        newTasks.push(task);
      } else {
        newCompletedTasks.push(task);
      }
    }
    setTasks(newTasks);
    setCompletedTasks(newCompletedTasks);
  } catch (error) {
    console.error(error);
  }
}
