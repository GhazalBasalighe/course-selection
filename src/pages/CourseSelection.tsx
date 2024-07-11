import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Button, Box, Typography } from "@mui/material";
import Header from "../components/Header/Header";
import axios from "axios";

interface Course {
  schedule: {
    days: string[];
    hour: string;
  };
  id: string;
  name: string;
  teacher: string;
  description: string;
  courseCredit: number;
  __v: number;
}

function CourseSelection() {
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [selectionModel, setSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
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
        const res = await axios.get(
          "http://127.0.0.1:5000/api/students/lessons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedCourses = response.data.map((lesson: any) => ({
          id: lesson._id,
          courseName: lesson.name,
          courseCredit: lesson.courseCredit,
          professor: lesson.teacher,
          time: lesson.schedule.hour,
          day: lesson.schedule.days.join(", "),
        }));
        const formattedSelectedCourses = res.data.map((lesson: any) => ({
          id: lesson._id,
          courseName: lesson.name,
          courseCredit: lesson.courseCredit,
          professor: lesson.teacher,
          time: lesson.schedule.hour,
          day: lesson.schedule.days.join(", "),
        }));
        setAvailableCourses(formattedCourses);
        setSelectedCourses(formattedSelectedCourses);
      } catch (error: any) {
        console.error(
          "Error Getting Lessons:",
          error.response?.data?.message || error.message
        );
      }
    };

    getLessons();
  }, []);

  const handleAddCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      for (const id of selectionModel) {
        const courseToAdd = availableCourses.find(
          (course) => course.id === id
        );
        console.log(courseToAdd);
        if (!courseToAdd) {
          console.error(
            `Course with ID ${id} not found in availableCourses`
          );
          continue;
        }

        await axios.post(
          "http://127.0.0.1:5000/api/students/lessons",
          { lessonId: courseToAdd.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedCourses((prevCourses) => [...prevCourses, courseToAdd]);
        setSelectionModel((prevSelection) =>
          prevSelection.filter((selectedId) => selectedId !== id)
        );
      }
    } catch (error) {
      console.error(
        "Error adding courses:",
        //@ts-ignore
        error.response?.data?.message || error.message
      );
    }
  };

  const handleRemoveCourse = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://127.0.0.1:5000/api/students/lessons", {
        data: { lessonId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const removedCourse = selectedCourses.find(
        (course) => course.id === id
      );
      if (removedCourse) {
        setSelectedCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== id)
        );
      }
    } catch (error) {
      console.error(
        "Error removing course:",
        //@ts-ignore
        error.response?.data?.message || error.message
      );
    }
  };

  const availableColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 280 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "courseCredit", headerName: "Course Credit", width: 150 },
    { field: "professor", headerName: "Professor", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "day", headerName: "Day", width: 150 },
  ];

  const selectedColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 280 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "courseCredit", headerName: "Course Credit", width: 150 },
    { field: "professor", headerName: "Professor", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "day", headerName: "Day", width: 150 },
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
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "90%",
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
            onRowSelectionModelChange={(newSelectionModel: any): any => {
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
            Add
          </Button>
        </Box>
        <Box
          sx={{
            width: "90%",
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
