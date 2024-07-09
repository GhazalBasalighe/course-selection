import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Header from "../components/Header/Header";
import AddCourseModal from "../components/AddCourseModal/AddCourseModal";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "professor", headerName: "Professor", width: 130 },
  { field: "time", headerName: "Time", type: "number", width: 130 },
  { field: "day", headerName: "Day", width: 90 },
  { field: "courseName", headerName: "Course Name", width: 160 },
];

const initialRows = [
  {
    id: 1,
    professor: "Snow",
    day: "Monday",
    time: 10,
    courseName: "Math 101",
  },
  {
    id: 2,
    professor: "Lannister",
    day: "Tuesday",
    time: 11,
    courseName: "History 201",
  },
  {
    id: 3,
    professor: "Stark",
    day: "Wednesday",
    time: 12,
    courseName: "Biology 301",
  },
  {
    id: 4,
    professor: "Targaryen",
    day: "Thursday",
    time: 9,
    courseName: "Chemistry 101",
  },
  {
    id: 5,
    professor: "Melisandre",
    day: "Friday",
    time: 13,
    courseName: "Physics 201",
  },
  {
    id: 6,
    professor: "Clifford",
    day: "Monday",
    time: 14,
    courseName: "Literature 301",
  },
  {
    id: 7,
    professor: "Frances",
    day: "Tuesday",
    time: 15,
    courseName: "Philosophy 101",
  },
  {
    id: 8,
    professor: "Roxie",
    day: "Wednesday",
    time: 16,
    courseName: "Computer Science 201",
  },
  {
    id: 9,
    professor: "Tyrell",
    day: "Thursday",
    time: 8,
    courseName: "Art History 301",
  },
];

function CourseManagement() {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values: any) => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const newRow = {
      id: newId,
      ...values,
      time: Number(values.time),
    };
    setRows([...rows, newRow]);
    handleClose();
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: "80px", padding: "0 20px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          style={{ marginBottom: "20px" }}
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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
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
