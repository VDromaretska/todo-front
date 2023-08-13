import axios from "axios";
import "../main.css";
import { JsonTask } from "./Todo";

interface CompletedTaskListProps {
  completedTasks: JsonTask[];
  updateComletedTasks: (st: JsonTask[]) => void;
  apiBaseURL: string;
}

export function CompletedTaskList({
  completedTasks,
  updateComletedTasks,
  apiBaseURL,
}: CompletedTaskListProps): JSX.Element {
  async function handleDelete(taskToDelete: JsonTask) {
    try {
      await axios.delete(apiBaseURL, { data: taskToDelete.description });
      //Update states
      const newCompletedTasks = completedTasks.filter(
        (t) => t.t_id !== taskToDelete.t_id
      );
      updateComletedTasks(newCompletedTasks);
    } catch (error) {
      console.error("Error deleting task from completed list", error);
    }
  }

  return (
    <>
      <h2>Here's tasks you completed</h2>
      <ul>
        {completedTasks.map((task) => (
          <div key={task.t_id}>
            <li>{`${task.description} added by ${task.added_by} due ${task.date}`}</li>
            <button className="btn-d" onClick={() => handleDelete(task)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}
