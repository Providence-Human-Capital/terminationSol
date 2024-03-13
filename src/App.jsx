import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeInit from "./HomeInit";
import PrintOutPage from "./views/printout/PrintOutPage";

function App() {
  return (
    <HashRouter>
      <WrapperComponent />
    </HashRouter>
  );
}

const WrapperComponent = () => {
  useEffect(() => {
    document.body.style.zoom = 0.67;
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to={"/print/out"} />} />
        <Route exact path="/" element={<HomeInit />}>
          <Route exact path="/print/out" element={<PrintOutPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
