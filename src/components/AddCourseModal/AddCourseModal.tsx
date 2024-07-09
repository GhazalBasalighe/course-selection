import { Modal, Box, TextField, Typography, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { SetStateAction } from "react";
import * as Yup from "yup";

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
};

const validationSchema = Yup.object({
  professor: Yup.string().required("Professor is required"),
  day: Yup.string().required("Day is required"),
  time: Yup.number()
    .required("Time is required")
    .positive("Time must be positive"),
  courseName: Yup.string().required("Course Name is required"),
});

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
            professor: "",
            day: "",
            time: "",
            courseName: "",
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
                label="Day"
                name="day"
                value={values.day}
                onChange={handleChange}
                error={touched.day && Boolean(errors.day)}
                helperText={touched.day && errors.day}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Time"
                name="time"
                type="number"
                value={values.time}
                onChange={handleChange}
                error={touched.time && Boolean(errors.time)}
                helperText={touched.time && errors.time}
              />
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ marginTop: "16px" }}
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
