import React, { useState, useEffect } from "react";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"
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
  const [refreshKey, setRefreshKey] = useState(0);

  const [professors, setProfessors] = useState([
    { professor_id: "1", professor_name: "Professor-1"},
    { professor_id: "2", professor_name: "Professor-2"},
    { professor_id: "3", professor_name: "Professor-3"},
    { professor_id: "3", professor_name: "Professor-3"},
    { professor_id: "3", professor_name: "Professor-3"},
  ]);
  const addProf = () => {
    if (prof_id == "" || prof_name == "") {
      alert("Enter details ");
      return;
    }
    fetch("/add_faculty", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        professor_id:prof_id,
        professor_name:prof_name,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setProfId("")
        setProfName("")
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProf = (id) => {
    console.log(id);
    fetch("/delete_faculty", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        professor_id: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/view_faculty", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setProfessors(res.data);
      })
      .catch((err) => {
        console.log("error in getting all lecturers");
      });
  }, [refreshKey]);

  return (
    <div>
      <h3 className="appTitle text-center">Add Professors</h3>
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
          <img src={addIcon} onClick={() => { addProf(); }} className="add-icon"/>
        </div>
      </form>
      <div className="data-list">
        <div
          className="top-header"
        >
          <ul
            className=" view list-group list-group-horizontal text-center"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <li className="list-group-item">Professor Id</li>

            <li className="list-group-item">Professor Name</li>
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
                className=" view list-group list-group-horizontal text-center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.professor_id}</li>
                <li className="list-group-item">{item.professor_name}</li>
                <li className="list-group-item">
                  <img className="delete-icon" src={deleteIcon} onClick={() => {deleteProf(item.professor_id)}}/>
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
