import React, { useEffect, useState } from "react";
import { elective_types } from "../../Data";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"

const ElectiveMapping = (props) => {
  const [course, setCourse] = useState("");
  const [professor, setProfessor] = useState("");
  const [electiveType,setElectiveType]=useState("")

  const [courseList, setCoursesList] = useState([]);
  const [professorList, setProfessorList] = useState([]);
  const [electives, setElectives] = useState([]);
  const [refreshKey,setRefreshKey] = useState(0)

  useEffect(() => {
    fetch("/view_elective_courses", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data);
        setCoursesList(res.data);
      })
      .catch((err) => {
        console.log("error while recieving courses");
      });
      fetch("/view_faculty", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data);
          setProfessorList(res.data);
        })
        .catch((err) => {
          console.log("error in getting all lecturers");
        });
      fetch('/view_elective_mapping')
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setElectives(res.data);
      })
      .catch((err) => {
        console.log("error while recieving lecture mapping");
      });
  }, [refreshKey]);

  const submitHandler = (e) => {
    console.log(course, professor);
    e.preventDefault();
    fetch("/add_mapping", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        course_name :course,
        professor_name:professor,
        elective_type:electiveType
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCourse("")
        setElectiveType("")
        setProfessor("")
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      });
  };

  const deleteElectiveMapping = (item) => {
    fetch("/delete_elective_mapping", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        course_name:getCourseName(item.course_id),
        professor_name:getProfessorName(item.professor_id)
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

  const getCourseName = (id) =>{
    let name = ''
    courseList.map(item => {
      if(item.course_id === id){
        name =  item.course_name
        return
      }
    })
    return name
  }

  const getProfessorName = (id) =>{
    let name = ''
    professorList.map(item => {
      if(item.professor_id === id.toString()){
        name =  item.professor_name
        return
      }
    })
    return name
  }

  return (
    <div className="map mt-5">
      <form>
        <div className="batches">
          <select
            className="form-select-md select-style"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value={0}>Select Elective</option>
            {courseList.map((item) => {
              return <option value={item.course_name}>{item.course_name}</option>;
            })}
          </select>
          <select
            className="form-select-md select-style"
            value={electiveType}
            onChange={(e) => setElectiveType(e.target.value)}
          >
            <option value={0}>Select Elective Type</option>
            {elective_types.map((item) => {
              console.log(item)
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
              return <option value={item.professor_name}>{item.professor_name}</option>;
            })}
          </select>
          <img src={addIcon} onClick={(e) => submitHandler(e)} className="add-icon"/>
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
            <li className="list-group-item">Course</li>
            <li className="list-group-item">Course Type</li>
            <li className="list-group-item">Professor</li>
            <li className="list-group-item">Delete Mapping</li>
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
          {electives.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal text-center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{getCourseName(item.course_id)}</li>
                <li className="list-group-item">{item.elective_type}</li>
                <li className="list-group-item">{getProfessorName(item.professor_id)}</li>

                <li className="list-group-item">
                  <img className="delete-icon" src={deleteIcon} onClick={() => {deleteElectiveMapping(item)}}/>
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