const Task = require("../Model/userTask");

exports.addTask = (req, res) => {
  const { taskName, taskDescription, dueDate, priority } = req.body;
  const userId = req.userId; 

  if (!taskName || !taskDescription || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }


  const newTask = new Task({
    taskName,
    taskDescription,
    dueDate,
    priority,
    userId,
  });


  newTask
    .save()
    .then((task) => {
      res.status(201).json({ message: "Task created successfully", task });
    })
    .catch((error) => {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Server error while creating task" });
    });
};
