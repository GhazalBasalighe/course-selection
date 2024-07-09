import { ExitToApp } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar>
      <Toolbar className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
        {/* LOGO AND TITLE */}
        <NavLink to="/">
          <div className="flex items-center gap-3">
            <img
              className="h-auto w-14 bg-white rounded-full"
              src="/uniLogo.png"
              alt="University Logo"
            />
            <Typography
              variant="h5"
              noWrap
              component="h1"
              className="font-bold"
            >
              University of Massachusets
            </Typography>
          </div>
        </NavLink>
        <div className="flex gap-6 items-center">
          <span className="text-lg text-slate-300">
            Hello {"Ghazal"} !
          </span>
          <Link to="/">
            <Button
              variant="outlined"
              color="inherit"
              className="header-btn"
              endIcon={<ExitToApp />}
            >
              Log Out
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
