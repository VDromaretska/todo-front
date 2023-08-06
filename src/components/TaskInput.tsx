import "../main.css";

export interface TaskInputProps {
  tasks: string[];
  updateTasks: (st: string[]) => void;
  draft: string;
  setDraft: (st: string) => void;
  apiBaseURL: string;
}
export function TaskInput({
  tasks,
  updateTasks,
  draft,
  setDraft,
  apiBaseURL,
}: TaskInputProps): JSX.Element {
  const handleAdd = () => {
    updateTasks(
      tasks[0].length !== 0 || tasks.length == 0 ? [...tasks, draft] : [draft]
    );
    setDraft("");
  };
  return (
    <div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        type="text"
        placeholder="Type new task.."
      />
      <button className="btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
