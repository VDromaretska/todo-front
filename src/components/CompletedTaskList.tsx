import axios from "axios";
import "../main.css";
import { FullTask } from "./FullTaskInterface";

interface CompletedTaskListProps {
  completedTasks: FullTask[];
  updateComletedTasks: (st: FullTask[]) => void;
  apiBaseURL: string;
}

export function CompletedTaskList({
  completedTasks,
  updateComletedTasks,
  apiBaseURL,
}: CompletedTaskListProps): JSX.Element {
  async function handleDelete(taskToDelete: FullTask) {
    try {
      await axios.delete(apiBaseURL, { data: { t_id: taskToDelete.t_id } });
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
