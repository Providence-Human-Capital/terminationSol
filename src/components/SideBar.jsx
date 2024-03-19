import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {
  const styles = {
    pageHeight: {
      height: "100%",
    },

    color: {
      backgroundColor: "#58AD46",
      color: "#FFF",
    },

    textColor: {
      color: "#58AD46",
    },
  };
  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar position-relative">
          <div className="help-bt">
            <Link
              href="tel:+263782903276"
              className="d-flex align-items-center"
            >
              <div
                className="rounded10 h-40 w-40 l-h-40 text-center me-15"
                style={styles.color}
              >
                <i
                  className="ti-microphone"
                  style={{
                    fontSize: "20px",
                  }}
                ></i>
              </div>
              <h5 className="mb-0">
                Emergency
                <br />
                help
              </h5>
            </Link>
          </div>
          <div className="multinav">
            <div className="multinav-scroll" style={styles.pageHeight}>
              <ul className="sidebar-menu" data-widget="tree">
                <li id="aside-bar">
                  <NavLink to={"/print/out"}>
                    <i
                      className="ti-unlock"
                      style={{
                        fontSize: "20px",
                      }}
                    ></i>
                    <span>Print Forms (Bulk)</span>
                  </NavLink>
                </li>
                <li id="aside-bar">
                  <NavLink to={"/print/single/print"}>
                    <i
                      className="ti-file"
                      style={{
                        fontSize: "20px",
                      }}
                    ></i>
                    <span>Print Form (Single)</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
