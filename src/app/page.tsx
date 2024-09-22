"use client"
import React , {useState , useEffect} from 'react';
import { getUserData, isLoggedIn } from '@/services/taskService';
import Image from 'next/image';
import ShowTask from '@/Assests/ShowTask.svg';
import AddTask from '@/Assests/Add Task.svg';
import LoginImage from '@/Assests/Login.svg';
import SignUpImage from '@/Assests/Sign-Up.svg';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId , setUserId] = useState<string>();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result.isLoggedIn);
      if(result.isLoggedIn){
        setUserId(result.userId.id);
      }     
      setLoading(false);
    };
    checkLoginStatus(); 
  }, []);

  useEffect(() => {
    const getUserName = async () => {
      if (userId) {
        const result = await getUserData(userId);
        setUserName(result.userName);
      }
     }
     getUserName();
  },[userId]);

   
  
    return (
        <div className="container text-center my-5">
            <h1 className="mb-4"> Hi { userName }</h1>
            <h1 className="mb-4"> Welcome to Task Manager</h1>
            <p className="lead mb-4">Manage your daily tasks efficiently and effortlessly.</p>
            
            <div className="row justify-content-center">
              { loading ? <> <div className="col-md-5 mb-4">
                    <div className="card shadow-sm">
                        {/* <img src="/images/show-tasks.jpg" className="card-img-top" alt="Show Tasks" /> */}
                        <div className="card-body">
                            <h5 className="card-title">Fetching....</h5>
                            <p className="card-text">Fetching....</p>
                            <a href="/tasks" className="btn btn-primary">Fetching....</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mb-4">
                    <div className="card shadow-sm">
                        {/* <img src="/images/add-task.jpg" className="card-img-top" alt="Add Task" /> */}
                        <div className="card-body">
                            <h5 className="card-title">Fetching....</h5>
                            <p className="card-text">Fetching....</p>
                            <a href="/add-task" className="btn btn-success">Fetching....</a>
                        </div>
                    </div>
                </div> </> : loggedIn ? <> <div className="col-md-5 mb-4">
                    <div className="card shadow-sm">
                        <Image src={ShowTask} alt='Show Tasks' className="card-img-top p-4" height={400} />
                        <div className="card-body">
                            <h5 className="card-title">Show Tasks</h5>
                            <p className="card-text">View all your tasks in one place.</p>
                            <a href="/showtask" className="btn btn-primary">View Tasks</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 mb-4">
                    <div className="card shadow-sm">
                    <Image src={AddTask} alt='Show Tasks' className="card-img-top p-4" height={400} />
                        <div className="card-body">
                            <h5 className="card-title">Add Task</h5>
                            <p className="card-text">Quickly add new tasks to your list.</p>
                            <a href="/addtask" className="btn btn-success">Add New Task</a>
                        </div>
                    </div>
                </div> </> : <> <div className="col-md-5 mb-4">
                    <div className="card shadow-sm">
                    <Image src={LoginImage} alt='Show Tasks' className="card-img-top p-4" height={400} />
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <p className="card-text">Access your account to manage your tasks.</p>
                            <a href="/login" className="btn btn-success">Login</a>
                        </div>
                    </div>
                </div>
                 <div className="col-md-5 mb-4">
                 <div className="card shadow-sm">
                 <Image src={SignUpImage} alt='Show Tasks' className="card-img-top p-4" height={400} />
                     <div className="card-body">
                         <h5 className="card-title">Sign Up</h5>
                         <p className="card-text">Create your account to manage your tasks.</p>
                         <a href="/sign-up" className="btn btn-primary">Sign Up</a>
                     </div>
                 </div>
             </div> </> }
                
               
            </div>

            <footer className="mt-5">
                <p className="text-muted">&copy; 2024 Task Manager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
