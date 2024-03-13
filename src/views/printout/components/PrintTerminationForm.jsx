import React, { forwardRef, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

const TerminationFormPrint = forwardRef(({ company, clients }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      {clients &&
        clients.map((client, index) => (
          <div
            key={index}
            style={{
              height: "1025px",
              marginTop: index >= 1 ? "6rem" : "0",
            }}
          >
            <h1>Termination Form</h1>
          </div>
        ))}
    </div>
  );
});

const BeneficiaryFormPrint = forwardRef(({ company, clients }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        margin: "0",
      }}
    >
      {clients &&
        clients.map((client, index) => (
          <div
            key={index}
            style={{
              height: "1025px",
              marginTop: index >= 1 ? "6rem" : "0",
            }}
          >
            <h1>Beneficiary Form</h1>
          </div>
        ))}
    </div>
  );
});

const PrintTerminationForm = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [examData, setExamData] = useState({});
  const [csvData, setCsvData] = useState([]);

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("Please  Enter The Company Name"),
    fileInput: Yup.mixed().required(
      "Select The CSV File With All The Employee Information"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setIsPrinting(true);
    setExamData(values);
    Papa.parse(values.fileInput, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnData = [];
        const namesData = [];

        result.data.map((d) => {
          columnData.push(Object.keys(d));
          namesData.push(Object.values(d));
        });

        const convertedData = namesData.map((dataItem) => {
          return {
            date_of_termination: dataItem[0],
            first_name: dataItem[1],
            surname: dataItem[2],
            company: dataItem[3],
          };
        });
        setColumnArray(columnData[0]);
        setCsvData(convertedData);
        console.log(convertedData);
      },
    });
  };
  const PrintCertificates = () => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: `Are you sure you are ready to print all ${csvData.length} termination forms}`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePrintTerminationPrint();
      } else {
      }
    });
  };

  const terminationRef = useRef();
  const handlePrintTerminationPrint = useReactToPrint({
    content: terminationRef.current,
  });

  return (
    <>
      <div
        className="row"
        style={{
          display: "none",
        }}
      >
        <TerminationFormPrint
          ref={terminationRef}
          company={company}
          clients={clients}
        />
      </div>
      <div className="row">
        <Formik
          initialValues={{
            company: "",
            fileInput: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            {({ }) => (
                <Form>
                    
                </Form>
            )}
        </Formik>
      </div>
    </>
  );
};

export default PrintTerminationForm;
