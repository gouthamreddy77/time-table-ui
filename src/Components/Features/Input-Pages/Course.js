import React, { useState, useEffect } from "react";
import { course_types } from "../../Data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
  const [course_id, setCourseId] = useState("");
  const [course_name, setCourseName] = useState("");
  const [course_short_form, setCourseShortForm] = useState("");
  const [course_type, setCourseType] = useState(""); //dropdown
  const [preferred_rooms, setPreferred_Rooms] = useState(""); // will be active for only lab
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
          {
            course_type === course_types[1]
            ?
              <>
                <input
                  value={preferred_rooms}
                  onChange={(e) => setPreferred_Rooms(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Enter Rooms"
                />
              </>
            :
              null
          }
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
            <li className="list-group-item">Course Id</li>
            <li className="list-group-item">Course Name</li>
            <li className="list-group-item">Course Short Form</li>
            <li className="list-group-item">Course Type</li>
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
                className=" view list-group list-group-horizontal"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.course_id}</li>
                <li className="list-group-item">{item.course_name}</li>
                <li className="list-group-item">{item.course_short_form}</li>
                <li className="list-group-item">{item.course_type}</li>
                <li className="list-group-item">
                  <button onClick={() => {deleteProf(item.course_id,item.course_type)}}>delete</button>
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
