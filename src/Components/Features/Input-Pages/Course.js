import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
  const [course_id, setCourseId] = useState("");
  const [course_name, setCourseName] = useState("");
  const [course_short_form, setCourseShortForm] = useState("");
  const [course_type, setCourseType] = useState(""); //dropdown
  const [course_rooms, setCourseRooms] = useState(""); // will be active for only lab
  const [refreshKey, setRefreshKey] = useState(0);

  const [courses, setCourses] = useState([
    {
      course_id: "1",
      course_name: "Course-1",
      course_short_form: "C1",
      course_type: "Theory",
      course_duration: "1",
      course_frequency: "4",
      course_rooms: "A101",
    },
    {
      course_id: "2",
      course_name: "Course-2",
      course_short_form: "C2",
      course_type: "Lab",
      course_duration: "3",
      course_frequency: "1",
      course_rooms: "A102",
    },
    {
      course_id: "3",
      course_name: "Course-3",
      course_short_form: "C3",
      course_type: "Elective",
      course_duration: "2",
      course_frequency: "2",
      course_rooms: "A103",
    },
    {
      course_id: "3",
      course_name: "Course-3",
      course_short_form: "C3",
      course_type: "Elective",
      course_duration: "2",
      course_frequency: "2",
      course_rooms: "A103",
    },
    {
      course_id: "3",
      course_name: "Course-3",
      course_short_form: "C3",
      course_type: "Elective",
      course_duration: "2",
      course_frequency: "2",
      course_rooms: "A103",
    },
  ]);
  const addProf = () => {
    // fetch("/addCourse", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/Json",
    //   },
    //   body: JSON.stringify({
    //     course_id,
    //     course_name,
    //     course_short_form,
    //     course_type,
    //     course_duration,
    //     course_frequency,
    //     course_rooms,
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
    // fetch("/deleteCourse", {
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
    // fetch("/getCourse", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log(res.data);
    //     setCourses(res.data);
    //   })
    //   .catch((err) => {
    //     // notify("Something went wrong !!", "error");
    //     alert("some thing went wrong");
    //   });
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
          <input
            value={course_type}
            onChange={(e) => setCourseType(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Course Type"
          />

          <input
            value={course_rooms}
            onChange={(e) => setCourseRooms(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Rooms"
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

export default Course;
