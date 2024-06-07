import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar>
      <Toolbar className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        {/* LOGO AND TITLE */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <img
              className="h-auto w-14 bg-white rounded-full"
              src="uniLogo.png"
              alt="University Logo"
            />
            <Typography
              variant="h6"
              noWrap
              component="h1"
              className="text-2xl font-bold"
            >
              دانشگاه هاروارد
            </Typography>
          </div>
          <InputBase
            className="px-3 py-2 rounded-md w-[25rem] bg-gray-700 focus:outline-none "
            placeholder="جستجو ..."
            sx={{
              color: "white",
            }}
          />
        </div>
        {/* Search and Actions */}
        <div className="flex gap-2">
          <Button
            variant="contained"
            color="primary"
            className="focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            ورود
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            className="focus:outline-none focus:ring-2 focus:ring-white"
          >
            ثبت نام
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
