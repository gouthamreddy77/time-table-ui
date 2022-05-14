import React, { useState } from "react";
import { year, department, section, rooms } from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Batch = (props) => {
  const [batch_year, setBatchYear] = useState("");
  const [batch_dept, setBatchDept] = useState("");
  const [batch_section, setBatchSection] = useState("");
  const [batch_room, setBatchRoom] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);
  const [batches, setBatches] = useState([
    {
      batch_year: 1,
      batch_dept: "CSE",
      batch_section: 1,
      batch_room: "A!)!",
    },
    {
      batch_year: 1,
      batch_dept: "CSE",
      batch_section: 1,
      batch_room: "A!)!",
    },
    {
      batch_year: 1,
      batch_dept: "CSE",
      batch_section: 1,
      batch_room: "A!)!",
    },
    {
      batch_year: 1,
      batch_dept: "CSE",
      batch_section: 1,
      batch_room: "A!)!",
    },
  ]);

  //   deleting the batch

  const deleteBatch = (year, section) => {
    //     console.log(id);
    //     fetch("/deleteCourse", {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/Json",
    //       },
    //       body: JSON.stringify({
    //         batch_year: year,
    //         batch_section: section,
    //       }),
    //     })
    //       .then((res) => res.json())
    //       .then((res) => {
    //         if (refreshKey == 0) setRefreshKey(1);
    //         else setRefreshKey(0);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
  };

  //   getting the batches list

  //   useEffect(() => {
  //     fetch("/getBatches", {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res.data);
  //         setBatches(res.data);
  //       })
  //       .catch((err) => {
  //         // notify("Something went wrong !!", "error");
  //         alert("some thing went wrong");
  //       });
  //   }, [refreshKey]);

  const submitHandler = (e) => {
    console.log(batch_year, batch_dept, batch_section, batch_room);
    e.preventDefault();
    // fetch("/addBatch", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     batch_year,
    //     batch_dept,
    //     batch_section,
    //     batch_room,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     alert(res);
    //   });
  };
  return (
    <div>
      <h1 className="appTitle text-center">Add Batches</h1>
      <form>
        <div className="batches">
          <select
            className=" form-select-md select-style"
            value={batch_year}
            onChange={(e) => setBatchYear(e.target.value)}
          >
            <option value={0}>Select a year</option>
            {year.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            className=" form-select-md select-style"
            value={batch_dept}
            onChange={(e) => setBatchDept(e.target.value)}
          >
            <option value={0}>Select Department</option>
            {department.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            className=" form-select-md select-style"
            value={batch_section}
            onChange={(e) => setBatchSection(e.target.value)}
          >
            <option value={0}>Select Section</option>
            {section.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            className="form-select-md select-style"
            value={batch_room}
            onChange={(e) => setBatchRoom(e.target.value)}
          >
            <option value={0}>Select a Room</option>
            {rooms.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <button
            onClick={(e) => submitHandler(e)}
            style={{ width: "80px", height: "40px", padding: "5px" }}
            className="add-button btn  btn-success"
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
            <li className="list-group-item">Year</li>
            <li className="list-group-item">Department</li>
            <li className="list-group-item">Section</li>
            <li className="list-group-item">Room</li>
            <li className="list-group-item">Delete Batch</li>
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
          {batches.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.batch_year}</li>
                <li className="list-group-item">{item.batch_dept}</li>
                <li className="list-group-item">{item.batch_section}</li>
                <li className="list-group-item">{item.batch_room}</li>
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
export default Batch