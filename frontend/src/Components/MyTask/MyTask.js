import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyTask.module.css";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    const fetchTasks = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        axios
          .get("http://localhost:8080/myTask", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setTasks(response.data.tasks);
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      }
    };

    fetchTasks();
  }, []);

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, priority: newStatus } : task
    );

    const updatedTask = updatedTasks.find((task) => task._id === taskId);
    setTasks(updatedTasks);

    axios
      .post("http://localhost:8080/updateTask/", {
        id: updatedTask._id,
        priority: updatedTask.priority,
      })
      .then((success) => {
        console.log(success.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDeleteTask = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8080/deteteTask/${id}`)
        .then((response) => {
          console.log(response.data.message);
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };


  const filterTasksByStatus = (status) => tasks.filter((task) => task.priority === status);

  return (
    <main className={styles.main}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div
              className={`${styles.column} ${styles.pending}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Pending")}
            >
              <h2>Pending</h2>
              {filterTasksByStatus("Pending").map((task) => (
                <div
                  key={task._id}
                  className={styles.task}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <h3>{task.taskName}</h3>
                  <p>{task.taskDescription}</p>
                  <p><strong>Deadline:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-4">
            <div
              className={`${styles.column} ${styles.completed}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Completed")}
            >
              <h2>Completed</h2>
              {filterTasksByStatus("Completed").map((task) => (
                <div
                  key={task._id}
                  className={styles.task}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <h3>{task.taskName}</h3>
                  <p>{task.taskDescription}</p>
                  <p><strong>Deadline:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-4">
            <div
              className={`${styles.column} ${styles.done}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, "Done")}
            >
              <h2>Done</h2>
              {filterTasksByStatus("Done").map((task) => (
                <div
                  key={task._id}
                  className={styles.task}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <h3>{task.taskName}</h3>
                  <p>{task.taskDescription}</p>
                  <p><strong>Deadline:</strong> {task.dueDate}</p>
                  <p><strong>Priority:</strong> {task.priority}</p>
                  <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyTask;
