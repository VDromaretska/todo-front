export type TaskElementProps = {
  task: string;
  setStatus: (st: string) => void;
  status: string;
};

export function TaskElement({
  task,
  setStatus,
  status,
}: TaskElementProps): JSX.Element {
  const handleDone = () => {
    setStatus("done");
  };
  return (
    <div className={status}>
      <li onClick={handleDone}>{task}</li>
    </div>
  );
}
