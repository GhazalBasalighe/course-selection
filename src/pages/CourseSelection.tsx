import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import Header from "../components/Header/Header";

interface Course {
  id: number;
  professor: string;
  day: string;
  time: number;
  courseName: string;
}
const initialCourses = [
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

function CourseSelection() {
  const [availableCourses, setAvailableCourses] =
    useState<Course[]>(initialCourses);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [selectionModel, setSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const handleAddCourses = () => {
    const coursesToAdd = availableCourses.filter((course) =>
      selectionModel.includes(course.id)
    );
    setAvailableCourses(
      availableCourses.filter(
        (course) => !selectionModel.includes(course.id)
      )
    );
    setSelectedCourses([...selectedCourses, ...coursesToAdd]);
    setSelectionModel([]);
  };

  const handleRemoveCourse = (id: number) => {
    const courseToRemove = selectedCourses.find(
      (course) => course.id === id
    );
    if (courseToRemove) {
      setSelectedCourses(
        selectedCourses.filter((course) => course.id !== id)
      );
      setAvailableCourses([...availableCourses, courseToRemove]);
    }
  };

  const availableColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "professor", headerName: "Professor", width: 130 },
    { field: "time", headerName: "Time", type: "number", width: 130 },
    { field: "day", headerName: "Day", width: 90 },
    { field: "courseName", headerName: "Course Name", width: 160 },
  ];

  const selectedColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "professor", headerName: "Professor", width: 130 },
    { field: "time", headerName: "Time", type: "number", width: 130 },
    { field: "day", headerName: "Day", width: 90 },
    { field: "courseName", headerName: "Course Name", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleRemoveCourse(params.row.id)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Box
        sx={{
          marginTop: "80px",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "45%",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Available Courses
          </Typography>
          <DataGrid
            rows={availableCourses}
            columns={availableColumns}
            //@ts-ignore
            pageSize={5}
            checkboxSelection
            autoHeight
            onSelectionModelChange={(newSelectionModel: any): any => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCourses}
            disabled={selectionModel.length === 0}
          >
            Add &gt;&gt;
          </Button>
        </Box>
        <Box
          sx={{
            width: "45%",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Selected Courses
          </Typography>
          <DataGrid
            rows={selectedCourses}
            columns={selectedColumns}
            //@ts-ignore
            pageSize={5}
            checkboxSelection
            autoHeight
          />
        </Box>
      </Box>
    </div>
  );
}

export default CourseSelection;
