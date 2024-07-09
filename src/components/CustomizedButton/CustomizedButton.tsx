import { Button, styled } from "@mui/material";

function CustomizedButton(props: any) {
  const CssButton = styled(Button)({
    backgroundColor: "white",
    color: "black",
    padding: "0.8rem 0",
    borderRadius: "2rem",
    textTransform: "none",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "2rem",
    border: "none",
    outline: "none",
    width: "98%",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#f4f4f4",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#f4f4f4",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(147, 150, 154, 0.5)",
    },
  });
  return <CssButton {...props}>{props.children}</CssButton>;
}

export default CustomizedButton;
