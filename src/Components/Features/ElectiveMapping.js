import React, { useEffect, useState } from "react";
import { year, department, section, rooms } from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ElectiveMapping = (props) => {
  const [course, setCourse] = useState("");
  const [professor, setProfessor] = useState("");

  const [courseList, setCoursesList] = useState(["HDH", "jfjf"]);
  const [professorList, setProfessorList] = useState(["HDH", "jfjf"]);
  //   useEffect(() => {
  //     fetch("/getCourses", {
  //       method: "GET",
  //     })
  //       .then((res) => res.json)
  //       .then((res) => setCoursesList(res.data));
  //     fetch("/getProfessors", {
  //       method: "GET",
  //     })
  //       .then((res) => res.json)
  //       .then((res) => setProfessorList(res.data));
  //   }, []);

  const [electives, setElectives] = useState([
    {
      course: 1,
      professor: "A!)!",
    },
    {
      course: 1,
      professor: "A!)!",
    },
    {
      course: 1,
      professor: "A!)!",
    },
    {
      course: 1,
      professor: "A!)!",
    },
  ]);

  const submitHandler = (e) => {
    console.log(course, professor);
    e.preventDefault();
    // fetch("/add", {
    //   method: "GET",
    //   body: JSON.stringify({
    //
    //     course,
    //     professor,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     alert(res);
    //   });
  };

  const deleteElectiveMapping = (course, professor) => {
    // fetch("/deleteLabMapping", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/Json",
    //   },
    //   body: JSON.stringify({
    //   course,professor
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
  return (
    <div className="map mt-5">
      <form>
        <div className="batches">
          <select
            className="form-select-md select-style"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value={0}>Select Course</option>
            {courseList.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
          <select
            className="form-select-md select-style"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          >
            <option value={0}>Select Professor</option>
            {professorList.map((item) => {
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
          style={{
            height: "auto",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <ul
            className=" view list-group list-group-horizontal"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <li className="list-group-item">Course</li>
            <li className="list-group-item">Professor</li>
            <li className="list-group-item">Delete Mapping</li>
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
          {electives.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{item.course}</li>
                <li className="list-group-item">{item.professor}</li>

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
export default ElectiveMapping