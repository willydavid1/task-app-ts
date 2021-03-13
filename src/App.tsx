import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

const App = (): JSX.Element => {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i] = { ...newTasks[i], done: !newTasks[i].done };
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  const handleSubmit = (e: FormElement): void | any => {
    e.preventDefault();
    if (!newTask) return;
    addTask(newTask);
    setNewTask("");
    inputRef.current?.focus();
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  autoFocus
                  className="form-control"
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Type here"
                  ref={inputRef}
                  type="text"
                  value={newTask}
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          <div>
            {tasks.map((task: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: task.done ? "line-through" : "" }}>
                  {task.name}
                </h2>
                <p>State: {`${task.done}`}</p>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {task.done ? "✗" : "✓"}
                  </button>
                  <button
                    className="btn btn-danger ml-4"
                    onClick={() => removeTask(i)}
                  >
                    Delete 🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
