import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomeInit from "./HomeInit";
import PrintOutPage from "./views/printout/PrintOutPage";
import PrintBeneficiaryForm from "./views/printout/components/PrintBeneficiaryForm";
import SingleFormPrint from "./views/prints/SingleFormPrint";

function App() {
  return (
    <HashRouter>
      <WrapperComponent />
    </HashRouter>
    // <BrowserRouter basename="/terminations">
    //   <WrapperComponent />
    // </BrowserRouter>
    // "homepage": "http://localhost/terminations/",
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
          <Route
            exact
            path="/print/single/print"
            element={<SingleFormPrint />}
          />
          <Route
            exact
            path="/print/beneficiary/document/:clientId"
            element={<PrintBeneficiaryForm />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

export { WrapperComponent };
