import { useEffect, useState } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import { FullTask } from "./FullTaskInterface";
import "../main.css";
import axios from "axios";

export function TodoMainDisplayer(): JSX.Element {
  const [tasks, setTasks] = useState<FullTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<FullTask[]>([]);
  const [draft, setDraft] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [dueDate, setDueDate] = useState("");

  const apiBaseURL = "https://to-do-list-gqr6.onrender.com";

  useEffect(() => {
    fetchTasks(apiBaseURL, setTasks, setCompletedTasks, tasks, completedTasks);
  }, [tasks, completedTasks]);

  return (
    <div>
      <TaskInput
        tasks={tasks}
        updateTasks={setTasks}
        draft={draft}
        setDraft={setDraft}
        apiBaseURL={apiBaseURL}
        addedBy={addedBy}
        setAddedBy={setAddedBy}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
      <TaskList
        tasks={tasks}
        updateComletedTasks={setCompletedTasks}
        completedTasks={completedTasks}
        updateTasks={setTasks}
        apiBaseURL={apiBaseURL}
      />
      <CompletedTaskList
        completedTasks={completedTasks}
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
  setCompletedTasks: (st: FullTask[]) => void,
  prevTasks: FullTask[],
  prevCompletedTasks: FullTask[]
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
    setTasks(updateTasksState(prevTasks, newTasks));
    setCompletedTasks(updateTasksState(prevCompletedTasks, newCompletedTasks));
  } catch (error) {
    console.error(error);
  }
}
//needed to create this function to calm down typescript
export function updateTasksState(prev: FullTask[], updated: FullTask[]) {
  return [...prev, ...updated];
}
