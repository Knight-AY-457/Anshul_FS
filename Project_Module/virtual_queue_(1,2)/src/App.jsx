import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JoinQueue from "./pages/JoinQueue";
import MyQueue from "./pages/MyQueue";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QueueStatus from "./pages/QueueStatus";
import Notifications from "./pages/Notifications";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinQueue />} />
          <Route path="/myqueue" element={<MyQueue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status" element={<QueueStatus />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
