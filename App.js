import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Table from "./components/Table";
import { SelectColumnFilter } from "./components/GlobalFilter";
import Navbar from "./components/navBar";

const statusButtonMap = {
  SUCCESS: "btn btn-success btn-xm ",
  FAILURE: "btn btn-danger btn-xm ",
  ABORTED: "btn btn-warning btn-xm",
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9696/jenkinsPipelineData")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Sequence No",
        accessor: "ID",
      },
      {
        Header: "Build Number",
        accessor: "Build_Number",
      },
      {
        Header: "Created Date",
        accessor: "timestamp",
        Cell: (props) => {
          const created_date = Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(props.row.original.timestamp);
          return <>{created_date}</>;
        },
      },
      {
        Header: "Completed Date",
        accessor: "duration",
        Cell: (props) => {
          const Completed = Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(props.row.original.duration + props.row.original.timestamp);
          return <>{Completed}</>;
        },
      },
      {
        Header: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Version",
        accessor: "product_version",
      },
      {
        Header: "Job Name",
        accessor: "Job_Name",
      },
      {
        Header: "Team Name",
        accessor: "Branch",
      },
      {
        Header: "Job URL",
        accessor: "Job_Url",
        Cell: (props) => {
          return (
            <a
              href={props.row.original.Job_Url}
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: "#01A982" }}
            >
              {props.row.original.Job_Name +
                "/" +
                props.row.original.Build_Number}
            </a>
          );
        },
      },
      {
        Header: "Artifacts URL",
        accessor: "artifacts_Url",
        Cell: (props) => {
          return (
            <a
              href={props.row.original.artifacts_Url}
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: "#01A982" }}
            >
              {"artifacts/" + props.row.original.Build_Number}
            </a>
          );
        },
      },
      {
        Header: "Logs",
        accessor: "logs",
        Cell: (props) => {
          return (
            <a
              href={props.row.original.logs}
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: "#01A982" }}
            >
              {"Testresults/" + props.row.original.Build_Number}
            </a>
          );
        },
      },
      {
        Header: "Job Status",
        accessor: "result",
        Cell: (props) => {
          return (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                fontSize: "10px",
              }}
              className={statusButtonMap[props.row.original.result]}
            >
              {props.row.original.result}
            </div>
          );
        },
        Filter: SelectColumnFilter,
      },
    ],
    []
  );
  return (
    <>
      <div className="d-grid gap-3">
        <Navbar></Navbar>
        <div className="p-2 bg-light border p-3 mb-2 bg-dark text-white ">
          <h4>Data</h4>
          <div
            className="p-2 bg-light border "
            style={{ backgroundColor: "#01A982" }}
          >
           
            <Table columns={columns} data={data} />
            
          </div>
        </div>
      </div>
    </>
  );
}
