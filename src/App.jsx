import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomeInit from "./HomeInit";

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
        <Route exact path="/" element={<HomeInit />}></Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
