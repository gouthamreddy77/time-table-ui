import React, { useState, useEffect } from "react";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"
import {  ToastContainer, toast } from 'react-toastify';


const Lecturers = (props) => {
  const [prof_id, setProfId] = useState("");
  const [prof_name, setProfName] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [professors, setProfessors] = useState([props.Lecturers]);

 
  const addProf = () => {
    if (prof_id == "" || prof_name == "") {
      toast.warn("Fields Should Not be Empty")
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
        if(res.status === "SUCCESS"){
          toast.success("Added Successfully")
        }
        else if(res.status === "FAILURE"){
          toast.warn(res.message)
        }
        else{
          throw new Error("Error happend")
        }
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        toast.error(err)
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
        if(res.status === "SUCCESS"){
          toast.success(res.message)
        }
        else if(res.status === "FAILURE"){
          toast.warn(res.message)
        }
        else{
          throw new Error("Error happend")
        }
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        toast.error(err)
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
      <ToastContainer newestOnTop={true} autoClose={1600} position="top-center  "/>
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
          <img src={addIcon} onClick={() => { addProf(); }} className="add-icon" role="add"/>
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
            maxHeight: "240px",
            overflow:"auto",
            marginTop: "0px",
          }}
        >
          {
            professors[0] === undefined ? null
            : professors.map((item,i) => {
              return (
                <ul
                  className=" view list-group list-group-horizontal text-center"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  key={i}
                >
                  <li className="list-group-item">{item.professor_id}</li>
                  <li className="list-group-item">{item.professor_name}</li>
                  <li className="list-group-item">
                    <img className="delete-icon" src={deleteIcon} onClick={() => {deleteProf(item.professor_id)}} role="delete"/>
                  </li>
                </ul>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
