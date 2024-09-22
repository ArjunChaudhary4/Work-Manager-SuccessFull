"use client"; 
import React, { useState, useEffect } from "react";
import { isLoggedIn, log_Out } from "@/services/taskService";
import { useRouter } from "next/navigation";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const logOut = async () => {
    await log_Out();
    router.push('/')
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      const result = await isLoggedIn();
      setLoggedIn(result.isLoggedIn);
      setLoading(false);
    };
    checkLoginStatus(); 
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand fw-bold text-light" href="/">
          Work Manager
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex flex-row gap-4 mx-auto">
            <li className="nav-item">
              <a className="nav-link text-light hover-text-light" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light hover-text-light" href="/showtask">
                Show Task
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light hover-text-light" href="/addtask">
                Add Task
              </a>
            </li>
          </ul>

          <div className="d-flex">
            {loading ? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                disabled
              >
                Fetching...
              </button>
            ) : loggedIn ? (
              <button
                type="button"
                onClick={logOut}
                className="btn btn-danger me-2"
              >
                Log Out
              </button>
            ) : (
              <>
                <a href="/login" className="me-2">
                  <button type="button" className="btn btn-outline-light">
                    Login
                  </button>
                </a>
                <a href="/sign-up">
                  <button type="button" className="btn btn-light">
                    Sign Up
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
