import axios from "axios";
import "../main.css";
import { FullTask } from "./FullTaskInterface";
import { fetchTasks } from "./TodoMainDisplayer";

interface TaskListProps {
  tasks: FullTask[];
  updateTasks: (st: FullTask[]) => void;
  updateComletedTasks: (st: FullTask[]) => void;
  apiBaseURL: string;
}

export function TaskList({
  tasks,
  updateTasks,
  updateComletedTasks,
  apiBaseURL,
}: TaskListProps): JSX.Element {
  async function handleComplete(newTaskCompleted: FullTask) {
    try {
      await axios.patch(apiBaseURL, {
        t_id: newTaskCompleted.t_id,
      });
      fetchTasks(apiBaseURL, updateTasks, updateComletedTasks);
    } catch (error) {
      console.error("Error completing the task:", newTaskCompleted, error);
    }
  }

  async function handleDelete(taskToDelete: FullTask) {
    try {
      await axios.delete(apiBaseURL, {
        data: { t_id: taskToDelete.t_id },
      });
      fetchTasks(apiBaseURL, updateTasks, updateComletedTasks);
    } catch (error) {
      console.error("Error completing the task:", taskToDelete, error);
    }
  }

  return (
    <>
      <div>
        <h2>Here's your to-do list:</h2>
        <ul>
          {tasks.map((task) => (
            <div key={task.t_id}>
              <li>{`${task.description} added by ${task.added_by} due ${task.date}`}</li>
              <button className="btn-d" onClick={() => handleDelete(task)}>
                Delete
              </button>
              <button className="btn" onClick={() => handleComplete(task)}>
                Complete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
