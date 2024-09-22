"use client";
import {
  deleteTask,
  getUserTask,
  isLoggedIn,
  updatedTask,
} from "@/services/taskService";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AddTask from "@/Assests/Add Task.svg";

interface Task {
  _id: string;
  Title: string;
  Description: string;
  Author: string;
  status: boolean;
}

function ShowTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const userId = await isLoggedIn();
    const allTasks = await getUserTask(userId.userId.id);
    setTasks(allTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Not Deleted", error);
    }
  };

  const handleCompletion = async (workId: string, status: boolean) => {
    try {
      await updatedTask(workId, !status);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === workId ? { ...task, status: !status } : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-4">You have no Task to do</h1>
          <h1 className="mb-4">Start adding tasks</h1>
          <div className="col-md-5 mb-4">
            <div className="card shadow-sm">
              <Image
                src={AddTask}
                alt="Show Tasks"
                className="card-img-top p-4"
                height={400}
              />
              <div className="card-body">
                <h5 className="card-title">Add Task</h5>
                <p className="card-text">Quickly add new tasks to your list.</p>
                <a href="/addtask" className="btn btn-success">
                  Add New Task
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        [...tasks].reverse().map((task) => (
          <div
            key={task._id} // Added key for proper list rendering
            className={`card m-4 shadow-sm ${
              task.status
                ? "bg-success text-dark bg-opacity-25"
                : "bg-warning bg-opacity-25"
            }`}
          >
            <div className="card-body">
              <h5 className="card-title">{task.Title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{task.Author}</h6>
              <p className="card-text">{task.Description}</p>
              <div className="d-flex justify-content-between">
                {task.status ? (
                  <button
                    type="button"
                    onClick={() => handleCompletion(task._id, task.status)}
                    className="btn btn-warning m-1"
                  >
                    Do it Again
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCompletion(task._id, task.status)}
                    className="btn btn-outline-success m-1"
                  >
                    Done
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-outline-danger m-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default ShowTask;
