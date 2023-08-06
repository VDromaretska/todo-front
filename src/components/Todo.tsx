import { useEffect, useState } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import "../main.css";
import axios from "axios";

export interface JsonTask {
  taskBody: string;
  AddedBy: string;
  DueDate: string;
}
export interface ResponseDataProps {
  toDoTasks: JsonTask[];
  completeTasks: JsonTask[];
}
export function Todo(): JSX.Element {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([""]);
  const [draft, setDraft] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [dueDate, setDueDate] = useState("");

  const apiBaseURL = "https://to-do-list-gqr6.onrender.com";
  useEffect(() => {
    async function fetchTasks() {
      const response = await axios.get(apiBaseURL);
      const taskData: ResponseDataProps = response.data;

      setTasks(
        taskData.toDoTasks.map(
          (t) => `${t.taskBody} added by ${t.AddedBy} due ${t.DueDate}`
        )
      );
      setCompletedTasks(
        taskData.completeTasks.map(
          (t) => `${t.taskBody} added by ${t.AddedBy} due ${t.DueDate}`
        )
      );
    }
    fetchTasks();
  });

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
