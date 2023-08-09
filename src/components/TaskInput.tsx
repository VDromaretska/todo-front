import "../main.css";
import axios from "axios";
import { JsonTask } from "./Todo";
import { useRef } from "react";

export interface TaskInputProps {
  tasks: string[];
  updateTasks: (st: string[]) => void;
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
    const newTaskData: JsonTask = {
      taskBody: draft,
      AddedBy: addedBy,
      DueDate: dueDate,
    };
    axios.post(apiBaseURL, newTaskData);
    setDraft("");
    setAddedBy("");
    setDueDate("");
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
