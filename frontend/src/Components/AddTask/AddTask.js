import axios from "axios";
import React, { useState } from "react";
import styles from "./AddTask.module.css";

const AddTask = ({ onTaskCreate }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority] = useState("Pending");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription || !dueDate) {
      alert("Please fill in all the required fields.");
      return;
    }


    const taskData = {
      taskName,
      taskDescription,
      dueDate,
      priority,
    };


    axios
      .post("http://localhost:8080/addTask", taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        alert("Task created successfully!");
        console.log(response);

        setTaskName("");
        setTaskDescription("");
        setDueDate("");


        if (onTaskCreate) onTaskCreate(response.data);
      })
      .catch((error) => {
        alert("Failed to create task. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Create Task</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="taskName">Task Name:</label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="taskDescription">Task Description:</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
                className={styles.textarea}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="priority">Priority:</label>
              <input
                type="text"
                id="priority"
                value={priority}
                readOnly
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button}>
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
