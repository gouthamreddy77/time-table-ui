import React, { useState, useEffect } from "react";
import { course_types } from "../../Data";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
  const [course_id, setCourseId] = useState("");
  const [course_name, setCourseName] = useState("");
  const [course_short_form, setCourseShortForm] = useState("");
  const [course_type, setCourseType] = useState(""); //dropdown
  const [preferred_rooms, setPreferred_Rooms] = useState(""); 
  const [refreshKey, setRefreshKey] = useState(0);

  const [courses, setCourses] = useState([]);
  const addProf = () => {
    fetch("/add_course", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        course_id,
        course_name,
        course_short_form,
        course_type,
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
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        console.log(err);
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
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      })
      .catch((err) => {
        console.log(err);
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
  }, [refreshKey]);

  return (
    <div>
      <h1 className="appTitle text-center">Add Courses</h1>
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
          >
            <option value={0}>Select CourseType</option>
            {course_types.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <input
                  value={preferred_rooms}
                  onChange={(e) => setPreferred_Rooms(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Room No"
                  disabled = {course_type !== course_types[1]}
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
            height: "220px",
            overflowY: "scroll",
            overflowX: "hidden",
            marginTop: "0px",
          }}
        >
          {courses.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal text-center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.course_id}</li>
                <li className="list-group-item">{item.course_name}</li>
                <li className="list-group-item">{item.course_short_form}</li>
                <li className="list-group-item">{item.course_type}</li>
                <li className="list-group-item">{(item.preferred_rooms === "" || item.preferred_rooms === null || item.preferred_rooms === undefined )? "-" : item.preferred_rooms }</li>
                <li className="list-group-item">
                  <img className="delete-icon" src={deleteIcon} onClick={() => {deleteProf(item.course_id,item.course_type)}}/>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Course;
