import { BrowserRouter, Routes, Route } from "react-router-dom";

import Zone3 from "./components/zones/Zone3/Zone3";
import TechnologyPage from "./components/zones/Zone3/Technologypage";
import LabPage from "./components/zones/Zone3/LabPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Zone3 />} />

        <Route
          path="/technology/:slug"
          element={<TechnologyPage />}
        />

        <Route
          path="/technology/:slug/lab/:labId"
          element={<LabPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;