import axios from "axios";
import "../main.css";
import { FullTask } from "./FullTaskInterface";
import { fetchTasksAndUpdateStates } from "./TodoMainDisplayer";

interface CompletedTaskListProps {
  completedTasks: FullTask[];
  updateTasks: (st: FullTask[]) => void;
  updateComletedTasks: (st: FullTask[]) => void;
  apiBaseURL: string;
}

export function CompletedTaskList({
  completedTasks,
  updateTasks,
  updateComletedTasks,
  apiBaseURL,
}: CompletedTaskListProps): JSX.Element {
  async function handleDelete(taskToDelete: FullTask) {
    try {
      await axios.delete(apiBaseURL, { data: { t_id: taskToDelete.t_id } });
      fetchTasksAndUpdateStates(apiBaseURL, updateTasks, updateComletedTasks);
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
