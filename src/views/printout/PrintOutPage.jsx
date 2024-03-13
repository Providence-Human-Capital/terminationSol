import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PrintTerminationForm from "./components/PrintTerminationForm";

const PrintOutPage = () => {
  return (
    <>
      <BreadCrumb
        activeTab={"PRINTING PAGE"}
        title={"TERMINATION FORMS PRINTING"}
      />
      <section className="content">
        <div className="row">
          <PrintTerminationForm />
        </div>
      </section>
    </>
  );
};

export default PrintOutPage;
