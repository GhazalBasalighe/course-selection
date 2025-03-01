import { Check } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import { SetStateAction } from "react";
import * as Yup from "yup";

// Style object for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "scroll",
};

// Validation schema for the form
const validationSchema = Yup.object({
  professor: Yup.string().required("Professor is required"),
  day: Yup.string().required("Day is required"),
  time: Yup.string().required("Time is required"),
  courseName: Yup.string().required("Course Name is required"),
  courseCredit: Yup.string().required("Course Credit is required"),
});

// List of weekdays for the dropdown
const weekdays = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

// Component for the Add Course Modal
const AddCourseModal = ({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: React.Dispatch<SetStateAction<boolean>>;
  handleSubmit: (values: any) => void;
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Add New Course
        </Typography>
        <Formik
          initialValues={{
            courseName: "",
            professor: "",
            courseCredit: "",
            day: "",
            time: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                label="Course Name"
                name="courseName"
                value={values.courseName}
                onChange={handleChange}
                error={touched.courseName && Boolean(errors.courseName)}
                helperText={touched.courseName && errors.courseName}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Professor"
                name="professor"
                value={values.professor}
                onChange={handleChange}
                error={touched.professor && Boolean(errors.professor)}
                helperText={touched.professor && errors.professor}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Course Credit"
                name="courseCredit"
                value={values.courseCredit}
                onChange={handleChange}
                error={
                  touched.courseCredit && Boolean(errors.courseCredit)
                }
                helperText={touched.courseCredit && errors.courseCredit}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="day-label">Day</InputLabel>
                <Select
                  labelId="day-label"
                  id="day"
                  label="day"
                  name="day"
                  value={values.day}
                  onChange={handleChange}
                  error={touched.day && Boolean(errors.day)}
                >
                  <MenuItem value="">
                    <em>Select Day</em>
                  </MenuItem>
                  {weekdays.map((day) => (
                    <MenuItem key={day.value} value={day.value}>
                      {day.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Time"
                name="time"
                type="time"
                value={values.time}
                onChange={handleChange}
                error={touched.time && Boolean(errors.time)}
                helperText={touched.time && errors.time}
              />
              <TextField
                fullWidth
                multiline
                margin="normal"
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <Button
                variant="contained"
                color="success"
                type="submit"
                style={{ marginTop: "16px" }}
                endIcon={<Check />}
              >
                Add Course
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCourseModal;
