import { useEffect, useState } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import "../main.css";
import axios from "axios";

export interface JsonTask {
  t_id: number;
  description: string;
  added_by: string;
  date: string;
  completed: "Y" | "N";
}

export function Todo(): JSX.Element {
  const [tasks, setTasks] = useState<JsonTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<JsonTask[]>([]);
  const [draft, setDraft] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [dueDate, setDueDate] = useState("");

  const apiBaseURL = "https://to-do-list-gqr6.onrender.com";
  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get(apiBaseURL);
      const taskData: JsonTask[] = response.data;
      const newTasks: JsonTask[] = [];
      const newCompletedTasks: JsonTask[] = [];
      for (const task of taskData) {
        if (task.completed === "N") {
          newTasks.push(task);
        } else {
          newCompletedTasks.push(task);
        }
      }
      setTasks((prevTasks) => [...prevTasks, ...newTasks]);
      setCompletedTasks((prevCompletedTasks) => [
        ...prevCompletedTasks,
        ...newCompletedTasks,
      ]);
    }
    fetchTasks();
  }, [completedTasks, tasks]);

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
        apiBaseURL={apiBaseURL}
      />
    </div>
  );
}
