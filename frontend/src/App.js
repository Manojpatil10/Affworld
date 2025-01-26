import './App.css';
import AddTask from './Components/AddTask/AddTask'
import AddPost from './Components/AddPost/AddPost'
import ForgetPass from './Pages/ForgetPass/ForgetPass';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import UpdatePass from './Pages/UpdatePass/UpdatePass';
import Feed from './Components/Feed/Feed';
import MyTask from './Components/MyTask/MyTask';
function App() {
 const myRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        path:'',
        element:<Feed/>
      },
      {
        path:'addPost',
        element:<AddPost/>
      },
      {
        path:'addTask',
        element:<AddTask/>
      },
      {
        path:'myTask',
        element:<MyTask/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signUp',
    element:<Signup/>
  },
  {
    path:'/forgetPassword',
    element:<ForgetPass/>
  },
  {
    path:'/updatePassword',
    element:<UpdatePass/>
  }
 ])
  return (
    <div className="App">
      <RouterProvider router={myRouter}/>
    </div>
  );
}

export default App;
