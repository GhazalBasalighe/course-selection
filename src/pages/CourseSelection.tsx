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
  // State to store the list of available courses
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  // State to store the list of selected courses
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  // State to manage the selection model in the DataGrid
  const [selectionModel, setSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    // Function to fetch lessons data from the API
    const getLessons = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetching available lessons
        const response = await axios.get(
          "http://127.0.0.1:5000/api/lessons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetching selected lessons for the student
        const res = await axios.get(
          "http://127.0.0.1:5000/api/students/lessons",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Formatting the data to be used in the DataGrid
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

        // Updating the state with fetched lessons
        setAvailableCourses(formattedCourses);
        setSelectedCourses(formattedSelectedCourses);
      } catch (error: any) {
        console.error(
          "Error Getting Lessons:",
          error.response?.data?.message || error.message
        );
      }
    };

    // Fetching lessons when the component mounts
    getLessons();
  }, []);

  // Function to handle adding selected courses
  const handleAddCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      for (const id of selectionModel) {
        const courseToAdd = availableCourses.find(
          (course) => course.id === id
        );

        if (!courseToAdd) {
          console.error(
            `Course with ID ${id} not found in availableCourses`
          );
          continue;
        }

        // Adding the selected course for the student
        await axios.post(
          "http://127.0.0.1:5000/api/students/lessons",
          { lessonId: courseToAdd.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Updating the selected courses and clearing the selection model
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

  // Function to handle removing a selected course
  const handleRemoveCourse = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      // Removing the selected course for the student
      await axios.delete("http://127.0.0.1:5000/api/students/lessons", {
        data: { lessonId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Updating the state to remove the course from selected courses
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

  // Columns definition for the available courses DataGrid
  const availableColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 280 },
    { field: "courseName", headerName: "Course Name", width: 150 },
    { field: "courseCredit", headerName: "Course Credit", width: 150 },
    { field: "professor", headerName: "Professor", width: 200 },
    { field: "time", headerName: "Time", width: 200 },
    { field: "day", headerName: "Day", width: 150 },
  ];

  // Columns definition for the selected courses DataGrid
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
