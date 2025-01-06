import { BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom'
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import Login from './components/Auth/login';
import UserHome from './components/User/UserHome';
import Register from './components/Auth/register';
import ManageUsers from './components/Admin/ManageUser/ManageUsers';
import UpdateProfile from './components/User/Profile';
import ManageBlogs from './components/card/ManageBlog';
import Predict from './components/User/predict/Predict';
import Home from './components/User/Home';
import ManageFeedback from './components/Admin/ManageUser/ManageFeedback';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />

      {/* Admin area */}
      <Route
        path="Admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard/>
          </ProtectedRoute>
        }
      />

      <Route
        path="Admin/Manage/Users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="Admin/Manage/Blogs"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageBlogs />
          </ProtectedRoute>
        }
      />

      <Route
        path="Admin/Manage/Feedback"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageFeedback />
          </ProtectedRoute>
        }
      />

      {/* User Area */}
      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/Profile/setting"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/Predict"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <Predict />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  );
}

export default App;
