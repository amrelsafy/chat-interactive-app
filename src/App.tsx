import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Chatpage from "./pages/Chatpage/Chatpage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <section className="full-screen-container">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/users/:username" element={<Chatpage />} />
          </Route>
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
