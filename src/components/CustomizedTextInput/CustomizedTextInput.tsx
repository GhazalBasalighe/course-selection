import { TextField, styled } from "@mui/material";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#60656b",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderRadius: "2rem",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderRadius: "2rem",
      borderWidth: "2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
function CustomizedTextInput(props: any) {
  return <CssTextField {...props}>{props.children}</CssTextField>;
}

export default CustomizedTextInput;
