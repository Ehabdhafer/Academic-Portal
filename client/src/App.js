import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/Authcontext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>{/* <Route exact path="/" element={<Home />} /> */}</Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
