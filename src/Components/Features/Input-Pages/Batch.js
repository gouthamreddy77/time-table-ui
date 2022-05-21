import React, { useState,useEffect } from "react";
import { year, section } from "../../Data";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"

const Batch = (props) => {
  const [batch_year, setBatchYear] = useState("");
  const [batch_dept, setBatchDept] = useState("");
  const [batch_section, setBatchSection] = useState("");
  const [batch_room, setBatchRoom] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);
  const [batches, setBatches] = useState([props.batch]);
  const [Department,setDepartments] = useState([])
  const [Rooms,setRooms] = useState([])

  const deleteBatch = (year, section,dept) => {
        fetch("/delete_batch", {
          method: "post",
          headers: {
            "Content-Type": "application/Json",
          },
          body: JSON.stringify({
            year:year,
            dept_name:dept,
            section: section,
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

  //   getting the batches list

    useEffect( () => {
      fetch("/view_batch")
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setBatches(res.data);
        })
        .catch((err) => {
          console.log("error in retreiving batches");
        });

        fetch("/view_departments")
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setDepartments(res.data);
        })
        .catch((err) => {
          console.log("error in retreiving batches");
        });

        fetch("/view_rooms")
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          setRooms(res.data);
        })
        .catch((err) => {
          console.log("error in retreiving batches");
        });
    }, [refreshKey]);

  const submitHandler = (e) => {
    console.log(batch_year, batch_dept, batch_section, batch_room);
    e.preventDefault();
    fetch("/add_batch", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        year:batch_year,
        dept_name:batch_dept,
        section:batch_section,
        room_no:batch_room,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
          setBatchYear("")
          setBatchDept("")
          setBatchSection("")
          setBatchRoom("")
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
  };
  return (
    <div>
      <h3 className="appTitle text-center">Add Batches</h3>
      <form>
        <div className="batches">
          <select
            className=" form-select-md select-style"
            value={batch_year}
            onChange={(e) => setBatchYear(e.target.value)}
          >
            <option value={0}>Select Year</option>
            {year.map((item,i) => {
              return <option value={item} key={i}>{item}</option>;
            })}
          </select>
          <select
            className=" form-select-md select-style"
            value={batch_dept}
            onChange={(e) => setBatchDept(e.target.value)}
          >
            <option value={0}>Select Department</option>
            {Department.map((item,i) => {
              return <option value={item.dept_name} key={i}>{item.dept_name}</option>;
            })}
          </select>
          <select
            className=" form-select-md select-style"
            value={batch_section}
            onChange={(e) => setBatchSection(e.target.value)}
          >
            <option value={0}>Select Section</option>
            {section.map((item,i) => {
              return <option value={item} key={i}>{item}</option>;
            })}
          </select>
          <select
            className="form-select-md select-style"
            value={batch_room}
            onChange={(e) => setBatchRoom(e.target.value)}
          >
            <option value={0}>Select a Room</option>
            {Rooms.map((item,i) => {
              return <option value={item.room_no} key={i}>{item.room_no}</option>;
            })}
          </select>
          <img className="add-icon" src={addIcon} onClick={(e) => submitHandler(e)} role="add"/>
        </div>
      </form>
      <div className="data-list">
        <div
          className="top-header">
          <ul
            className=" view list-group list-group-horizontal text-center"
            style={{ marginLeft: "auto", marginRight: "auto"}}
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
            maxHeight: "253px",
            overflow:"auto"
          }}
        >
          {
            batches[0] === undefined ? null :
            batches.map((item) => {
              return (
                <ul
                  className=" view list-group list-group-horizontal text-center"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  <li className="list-group-item">{item.year}</li>
                  <li className="list-group-item">{item.dept_name}</li>
                  <li className="list-group-item">{item.section}</li>
                  <li className="list-group-item">{item.room_no}</li>
                  <li className="list-group-item ">
                    <img className="delete-icon" src={deleteIcon} onClick={() => {deleteBatch(item.year,item.section,item.dept_name)}} role="delete"/>
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
export default Batch