import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Header from "../components/Header/Header";
import AddCourseModal from "../components/AddCourseModal/AddCourseModal";
import { Add } from "@mui/icons-material";
import axios from "axios";

function CourseManagement() {
  // State to store the lessons data
  const [rows, setRows] = useState([]);
  // State to control the modal visibility
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);
  // Function to close the modal
  const handleClose = () => setOpen(false);

  // Function to fetch lessons data from the API
  const getLessons = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:5000/api/lessons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mapping the API response to the format needed by the DataGrid
      const lessons = response.data.map((lesson: any) => ({
        id: lesson._id,
        professor: lesson.teacher,
        day: lesson.schedule.days.join(", "),
        time: lesson.schedule.hour,
        courseName: lesson.name,
        courseCredit: lesson.courseCredit,
      }));

      // Updating the state with the fetched lessons
      setRows(lessons);
    } catch (error: any) {
      console.error(
        "Error Getting Lessons:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Fetching the lessons data when the component mounts
  useEffect(() => {
    getLessons();
  }, []);

  // Function to handle the form submission for adding a new lesson
  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:5000/api/lessons",
        {
          name: values.courseName,
          teacher: values.professor,
          description: values.description,
          courseCredit: values.courseCredit,
          schedule: {
            days: values.days,
            hour: values.time,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Creating a new row with the response data
      const newRow = {
        id: response.data.lesson._id,
        professor: response.data.lesson.teacher,
        day: response.data.lesson.schedule.days.join(", "),
        time: response.data.lesson.schedule.hour,
        courseName: response.data.lesson.name,
        courseCredit: response.data.lesson.courseCredit,
      };

      // Adding the new row to the existing rows
      //@ts-ignore
      setRows((prevRows) => [...prevRows, newRow]);
      // Closing the modal after submission
      handleClose();
    } catch (error: any) {
      console.error(
        "Error Adding Lesson:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Function to handle the deletion of a lesson
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      //@ts-ignore
      await axios.delete(`http://127.0.0.1:5000/api/lessons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Updating the rows state to remove the deleted lesson
      //@ts-ignore
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
    } catch (error: any) {
      console.error(
        "Error Deleting Lesson:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Defining the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 280 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "courseCredit", headerName: "Course Credit", width: 150 },
    { field: "professor", headerName: "Professor", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "day", headerName: "Day", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px", padding: "0 20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          style={{ marginBottom: "20px" }}
          endIcon={<Add />}
        >
          Add New Course
        </Button>
        <div
          style={{
            height: 400,
            width: "100%",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            //@ts-ignore
            pageSize={5}
            checkboxSelection
          />
        </div>
        <AddCourseModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CourseManagement;
