import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/Authcontext";
import Login from "./components/login";
import Signup from "./components/signup";
import Header from "./components/header";
import Home from "./components/home";
import Teacher from "./components/teacher";
import AddCourse from "./components/add_course";
import UpdateCourse from "./components/update_course";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/teacher" element={<Teacher />} />
            <Route exact path="/addcourse" element={<AddCourse />} />
            <Route exact path="/updatecourse/:id" element={<UpdateCourse />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
