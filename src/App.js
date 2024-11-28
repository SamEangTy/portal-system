import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutOne from "../src/Layout/LayoutOne.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutOne />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
