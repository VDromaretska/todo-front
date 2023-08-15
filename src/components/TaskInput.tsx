import "../main.css";
import axios from "axios";
import { FullTask } from "./FullTaskInterface";
import { useRef } from "react";

interface JsonTaskAddProps {
  description: string;
  added_by: string;
  date: string;
  completed: "Y" | "N";
}

export interface TaskInputProps {
  tasks: FullTask[];
  updateTasks: (st: FullTask[]) => void;
  draft: string;
  setDraft: (st: string) => void;
  apiBaseURL: string;
  addedBy: string;
  setAddedBy: (st: string) => void;
  dueDate: string;
  setDueDate: (st: string) => void;
}
export function TaskInput({
  tasks,
  updateTasks,
  draft,
  setDraft,
  apiBaseURL,
  addedBy,
  setAddedBy,
  dueDate,
  setDueDate,
}: TaskInputProps): JSX.Element {
  const dateInputRef = useRef(null);
  async function handleAddTask() {
    const newTaskData: JsonTaskAddProps = {
      description: draft,
      added_by: addedBy,
      date: dueDate,
      completed: "N",
    };
    try {
      await axios.post(apiBaseURL, newTaskData);
      setDraft("");
      setAddedBy("");
      setDueDate("");
      const response = await axios.get(apiBaseURL);
      const taskData = response.data;
      const newTasksData: FullTask[] = [];
      for (const task of taskData) {
        if (task.completed === "N") {
          newTasksData.push(task);
        }
      }
      updateTasks(newTasksData);
    } catch (error) {
      console.error("Error with adding task: ", error);
    }
  }

  return (
    <div>
      <div>
        <input
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          type="text"
          placeholder="Type new task.."
        />
      </div>
      <div>
        <input
          className="input"
          value={addedBy}
          onChange={(e) => setAddedBy(e.target.value)}
          type="text"
          placeholder="Type who added.."
        />
      </div>
      <div>
        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          ref={dateInputRef}
        />
      </div>
      <p>Select Date: {dueDate}</p>
      {dueDate !== "" && addedBy !== "" && draft !== "" && (
        <button className="btn" onClick={handleAddTask}>
          Add
        </button>
      )}
    </div>
  );
}
