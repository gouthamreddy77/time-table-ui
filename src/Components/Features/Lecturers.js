import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faTrashAlt,
  faEdit,
  faWindowClose,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Lecturers = () => {
  const [prof_id, setProfId] = useState("");
  const [prof_name, setProfName] = useState("");
  const [prof_dept, setProfDept] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [professors, setProfessors] = useState([
    { prof_id: "1", prof_name: "Professor-1", prof_dept: "Department-1" },
    { prof_id: "2", prof_name: "Professor-2", prof_dept: "Department-2" },
    { prof_id: "3", prof_name: "Professor-3", prof_dept: "Department-3" },
    { prof_id: "3", prof_name: "Professor-3", prof_dept: "Department-3" },
    { prof_id: "3", prof_name: "Professor-3", prof_dept: "Department-3" },
  ]);
  const addProf = () => {
    // if (prof_id == "" || prof_name == "" || prof_dept == "") {
    //   alert("Enter detailes Correctly");
    //   return;
    // }
    // fetch("/addProf", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/Json",
    //   },
    //   body: JSON.stringify({
    //     prof_id,
    //     prof_name,
    //     prof_dept,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (refreshKey == 0) setRefreshKey(1);
    //     else setRefreshKey(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const deleteProf = (id) => {
    // console.log(id);
    // fetch("/deleteProf", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/Json",
    //   },
    //   body: JSON.stringify({
    //     prof_id: id,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (refreshKey == 0) setRefreshKey(1);
    //     else setRefreshKey(0);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    // fetch("/getProf", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res.data);
    //     setProfessors(res.data);
    //   })
    //   .catch((err) => {
    //     // notify("Something went wrong !!", "error");
    //     alert("some thing went wrong");
    //   });
  }, [refreshKey]);

  return (
    <div>
      <h1 className="appTitle text-center">Add Professors</h1>
      <form>
        <div className="batches">
          <input
            value={prof_id}
            onChange={(e) => setProfId(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Professor id"
          />
          <input
            value={prof_name}
            onChange={(e) => setProfName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Professor Name"
          />
          <input
            value={prof_dept}
            onChange={(e) => setProfDept(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Department"
          />
          <button
            onClick={() => {
              addProf();
            }}
            className="btn btn-md btn-info"
          >
            Add
          </button>
        </div>
      </form>
      <div className="data-list">
        <div
          className="top-header"
          style={{ height: "auto", overflowY: "scroll", overflowX: "hidden" }}
        >
          <ul
            className=" view list-group list-group-horizontal"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <li className="list-group-item">Professor Id</li>

            <li className="list-group-item">Professor Name</li>
            <li className="list-group-item">Professor Department</li>
            <li className="list-group-item">Delete Professor</li>
          </ul>
        </div>
        <div
          className="bottom"
          style={{
            height: "220px",
            overflowY: "scroll",
            overflowX: "hidden",
            marginTop: "0px",
          }}
        >
          {professors.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.prof_id}</li>

                <li className="list-group-item">{item.prof_name}</li>
                <li className="list-group-item">{item.prof_dept}</li>
                <li className="list-group-item">
                  <button onClick={() => {}}>delete</button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
