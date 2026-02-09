import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
