import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Header from "../components/Header/Header";
import AddCourseModal from "../components/AddCourseModal/AddCourseModal";
import { Add } from "@mui/icons-material";

const initialRows = [
  {
    id: 1,
    professor: "Snow",
    day: "Monday",
    time: 10,
    courseName: "Math 101",
  },
  // ... other initial rows
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

  const handleDelete = (id: any) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "professor", headerName: "Professor", width: 200 },
    {
      field: "time",
      headerName: "Time",
    },
    { field: "day", headerName: "Day" },
    { field: "courseName", headerName: "Course Name", width: 150 },
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
