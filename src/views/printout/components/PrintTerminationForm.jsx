import React, { forwardRef, useRef, useState } from "react";
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
  const [columnArray, setColumnArray] = useState([]);

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
  const PrintTerminationForms = () => {
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
        <TerminationFormPrint ref={terminationRef} />
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
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="card p-4 mt-5">
                <div className="row g-3">
                  <div className="col-12 mb-4">
                    <h2
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Printing Termination Forms{" "}
                    </h2>
                    <span className="text-muted">
                      Please make sure that you upload the csv files containing
                      all the names and don't forget the company and any
                      neccessary information as per template
                    </span>
                    <h4>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        NB:
                      </span>{" "}
                      Please make sure the file that you are uploading is a CSV
                      file{" "}
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12">
                      <div className="form-floating">
                        <Field
                          type="text"
                          className="form-control"
                          id="company"
                          name="company"
                        />
                        <label htmlFor="company">COMPANY</label>
                        <ErrorMessage
                          name="company"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-floating">
                        <input
                          type="file"
                          className="form-control"
                          id="fileInput"
                          name="fileInput"
                          accept=".csv"
                          onChange={(event) => {
                            setFieldValue(
                              "fileInput",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        <label for="fileInput">
                          EMPLOYEE CSV (Make sure the file is a csv file)
                        </label>
                        <ErrorMessage
                          name="fileInput"
                          component="div"
                          style={{
                            color: "red",
                          }}
                          className="error-message"
                        />
                      </div>
                    </div>
                    <div className="space"></div>
                    <div className="col-12 mt-4">
                      <button
                        className="btn btn-primary text-uppercase"
                        disabled={isPrinting}
                        style={{
                          borderRadius: "10px",
                        }}
                        type="submit"
                      >
                        LOAD EMPLOYEES {"  "}
                        <i className="fa fa-print"></i>
                      </button>
                    </div>
                    <div className="space"></div>
                    <h4>
                      {" "}
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        NB:
                      </span>{" "}
                      Note that you can only print the forms if you have
                      successfully loaded the names{" "}
                    </h4>
                    <div>
                      <button
                        className="btn btn-primary text-uppercase"
                        onClick={PrintTerminationForms}
                        disabled={csvData.length <= 0}
                        style={{
                          borderRadius: "10px",
                        }}
                      >
                        PRINT CERTIFICATES NOW
                        <i className="fa fa-print"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="box">
          <div className="box-header no-border">
            <h4
              className="box-title"
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Certificates Awaiting Printing
            </h4>
          </div>
          <div className="box-body pt-0">
            <div className="row mt-25">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="bb-2">DATE OF TERMINATION</th>
                      <th className="bb-2">FIRST NAME</th>
                      <th className="bb-2">SURNAME</th>
                      <th className="bb-2">COMPANY</th>
                      <th className="bb-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* date_of_termination */}
                    {csvData &&
                      csvData.map((client, index) => (
                        <tr key={index}>
                          <td>{client.date_of_termination}</td>
                          <td>{client.first_name}</td>
                          <td>{client.surname}</td>
                          <td>{client.company}</td>
                          <td>
                            <button className="btn btn-primary" style={{
                                borderRadius: "10px"
                            }}>BCF PRINT</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintTerminationForm;
