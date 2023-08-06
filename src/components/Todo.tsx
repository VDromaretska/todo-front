import { useState } from "react";
import { TaskList } from "./TaskList";
import { TaskInput } from "./TaskInput";
import { CompletedTaskList } from "./CompletedTaskList";
import "../main.css";
import axios from "axios";

interface JsonTask {
  taskBody: string;
  AddedBy: string;
  DueDate: string;
}

export function Todo(): JSX.Element {
  const [tasks, setTasks] = useState<string[]>([""]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([""]);
  const [draft, setDraft] = useState("");
  //   useEffect;
  const apiBaseURL = "http://localhost:4000";
  async function fetchNewTasks() {
    const response = await axios.get(apiBaseURL);
    const taskData: JsonTask[] = response.data;
    setTasks(
      taskData.map(
        (t) => `${t.taskBody} added by ${t.AddedBy} due ${t.DueDate}`
      )
    );
  }
  return (
    <div>
      <button className="btn" onClick={fetchNewTasks}>
        Fetch tasks
      </button>
      <TaskInput
        tasks={tasks}
        updateTasks={setTasks}
        draft={draft}
        setDraft={setDraft}
        apiBaseURL={apiBaseURL}
      />
      <TaskList
        tasks={tasks}
        updateComletedTasks={setCompletedTasks}
        completedTasks={completedTasks}
        updateTasks={setTasks}
      />
      <CompletedTaskList completedTasks={completedTasks} />
    </div>
  );
}
