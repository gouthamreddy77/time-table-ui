import React, { useState, useEffect } from "react";
import { course_types } from "../../Data";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"
import {  ToastContainer, toast } from 'react-toastify';

const Course = (props) => {
  const [course_id, setCourseId] = useState("");
  const [course_name, setCourseName] = useState("");
  const [course_short_form, setCourseShortForm] = useState("");
  const [course_type, setCourseType] = useState(""); //dropdown
  const [preferred_rooms, setPreferred_Rooms] = useState(""); 
  const [rooms, setRooms] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [courses, setCourses] = useState([props.course]);
  const validate = () => {
    if(course_id === "" ||
      course_name === "" ||
      course_short_form === "" ||
      course_type === "" ||
      (course_type === "Lab" && preferred_rooms === "")){
        toast.warn("Fields Should Not be Empty")
        return false
      }
      return true
  }
  const addProf = () => {
    if(!validate()) return
    fetch("/add_course", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        course_id,
        course_name,
        course_short_form,
        course_type : course_type.toLowerCase(),
        preferred_rooms,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCourseId("")
        setCourseName("")
        setCourseShortForm("")
        setPreferred_Rooms("")
        setCourseType("")
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

  const deleteProf = (id,type) => {
    console.log(id,type);
    fetch("/delete_course", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        course_id: id,
        course_type:type
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
    fetch("/view_courses", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log("error while recieving courses");
      });

      fetch("/view_rooms")
        .then((res) => res.json())
        .then((res) => {
          setRooms(res.data);
        })
        .catch((err) => {
          console.log("error in retreiving batches");
        });
  }, [refreshKey]);

  return (
    <div>
      <ToastContainer newestOnTop={true} autoClose={1600} position="top-center  "/>
      <h3 className="appTitle text-center">Add Courses</h3>
      <form>
        <div className="batches">
          <input
            value={course_id}
            onChange={(e) => setCourseId(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Course id"
          />
          <input
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Course Name"
          />
          <input
            value={course_short_form}
            onChange={(e) => setCourseShortForm(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Course short form"
          />
          <select
            className=" form-select-md select-style "
            value={course_type}
            onChange={(e) => setCourseType(e.target.value)}
            data-testid="courseType"
          >
            <option value={""}>Select Course Type</option>
            {course_types.map((item,i) => {
              return <option value={item} key={i}>{item}</option>;
            })}
          </select>
          <select
            className=" form-select-md select-style "
            value={preferred_rooms}
            onChange={(e) => setPreferred_Rooms(e.target.value)}
            disabled = {course_type !== course_types[1]}
            data-testid="room-no"
          >
            <option value={""}>Select Room No</option>
            {rooms.map((item,i) => {
              return <option value={item.room_no} key={i}>{item.room_no}</option>;
            })}
          </select>
          {/* <input
                  value={preferred_rooms}
                  onChange={(e) => setPreferred_Rooms(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Room No"
                  disabled = {course_type !== course_types[1]}
                data-testid="room-no"
                /> */}
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
            <li className="list-group-item">Course Id</li>
            <li className="list-group-item">Course Name</li>
            <li className="list-group-item">Course Short Form</li>
            <li className="list-group-item">Course Type</li>
            <li className="list-group-item">Room No</li>
            <li className="list-group-item">Course Delete</li>
          </ul>
        </div>
        <div
          className="bottom"
          style={{
            maxHeight: "253px",
            overflow:"auto",
            marginTop: "0px",
          }}
        >
          {
            courses[0]=== undefined ? null :
            courses.map((item,i) => {
              return (
                <ul
                  className=" view list-group list-group-horizontal text-center"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  key={i}
                >
                  <li className="list-group-item">{item.course_id}</li>
                  <li className="list-group-item">{item.course_name}</li>
                  <li className="list-group-item">{item.course_short_form}</li>
                  <li className="list-group-item">{item.course_type.charAt(0).toUpperCase() + item.course_type.substring(1)}</li>
                  <li className="list-group-item">{(item.preferred_rooms === "" || item.preferred_rooms === null || item.preferred_rooms === undefined )? "-" : item.preferred_rooms }</li>
                  <li className="list-group-item">
                    <img className="delete-icon" src={deleteIcon} onClick={() => {deleteProf(item.course_id,item.course_type)}} role="delete"/>
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

export default Course;
