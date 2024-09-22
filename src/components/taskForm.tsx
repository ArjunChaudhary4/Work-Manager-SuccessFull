"use client";
import { addTask, isLoggedIn } from "@/services/taskService";
import React, { useState } from "react";
import { toast } from "react-toastify";

function TaskForm() {
  const [task, setTask] = useState({
    Title: "",
    Description: "",
    Author: "",
    user:""
  });

  // Handle change for all inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = await isLoggedIn();
      task.user = userId.userId.id;
      const result = await addTask(task);
      console.log(result);
      console.log("Task Submitted:", task);
      toast.success("Successfully added Task");
    } catch (error) {
      console.log(error);
      if (task.Title.length < 10) {
        toast.error("Title must be at least 10 characters long");
      }   
      else if (task.Description.length < 15) {
        toast.error("Description must be at least 15 characters long");
      }
      else if (task.Author.length < 6) {
        toast.error("Author name must be at least 6 characters long");
      }
      else{
        toast.error("Task not added");
      }
    }
  };

  // Clear the form fields
  const handleClear = () => {
    setTask({
      Title: "",
      Description: "",
      Author: "",
      user: "",
    });
  };

  return (
    <form id="taskForm" className="container mt-4 p-4 border rounded shadow" onSubmit={handleSubmit}>
      <h2 className="mb-4">Add New Task</h2>
      <div className="mb-3">
        <label htmlFor="Title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="Title"
          value={task.Title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="Description"
          rows={4}
          value={task.Description}
          onChange={handleChange}
          placeholder="Enter task description"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="Author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="Author"
          value={task.Author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
        >
          Clear Form
        </button>
      </div>
    </form>
  );
  
}

export default TaskForm;
