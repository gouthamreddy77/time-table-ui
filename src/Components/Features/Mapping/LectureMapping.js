import React, { useEffect, useState } from "react";
import deleteIcon from "../../../delete-logo.png"
import addIcon from "../../../add-logo.png"

const LectureMapping = (props) => {
  const [course, setCourse] = useState("");
  const [professor, setProfessor] = useState("");
  const [batch, setBatch] = useState("");

  const [courseList, setCoursesList] = useState([]);
  const [professorList, setProfessorList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [lectures, setlectures] = useState([]);
  const [refreshKey,setRefreshKey] = useState(0)
    useEffect(() => {
      fetch("/view_lecture_courses", {
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
      fetch("/view_batch")
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data);
          setBatchList(res.data);
        })
        .catch((err) => {
          console.log("error in retreiving batches");
        });
        fetch('/view_lecture_mapping')
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.data);
          setlectures(res.data);
        })
        .catch((err) => {
          console.log("error while recieving lecture mapping");
        });
    }, [refreshKey]);


  const submitHandler = (e) => {
    console.log(batch,course,professor);
    e.preventDefault();
    fetch("/add_mapping", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        batch: batch,
        course_name :course,
        professor_name:professor,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setBatch("")
        setCourse("")
        setProfessor("")
        if (refreshKey == 0) setRefreshKey(1);
        else setRefreshKey(0);
      });
  };

  const deleteLectureMapping = (item) => {
    fetch("/delete_lecture_mapping", {
      method: "post",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        batch:getBatchName(item.batch_id),
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

  const getBatchName = (id) =>{
    let name = ''
    batchList.map(item => {
      if(item.batch_id === id){
        name =  item.year+" "+item.dept_name+" "+item.section
        return
      }
    })
    return name
  }

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
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value={0}>Select Batch</option>
            {batchList.map((item) => {
              return <option value={item.year+" "+item.dept_name+" "+item.section}>{item.year+" "+item.dept_name+" "+item.section}</option>;
            })}
          </select>
          <select
            className="form-select-md select-style"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value={0}>Select Lecture</option>
            {courseList.map((item) => {
              return <option value={item.course_name}>{item.course_name}</option>;
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
            <li className="list-group-item">Batch</li>
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
          {lectures.map((item) => {
            return (
              <ul
                className=" view list-group list-group-horizontal text-center"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <li className="list-group-item">{getBatchName(item.batch_id)}</li>
                <li className="list-group-item">{getCourseName(item.course_id)}</li>
                <li className="list-group-item">{getProfessorName(item.professor_id)}</li>
                <li className="list-group-item">
                  <img className="delete-icon" src={deleteIcon} onClick={() => {deleteLectureMapping(item)}}/>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default LectureMapping