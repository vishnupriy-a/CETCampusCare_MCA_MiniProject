import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { colors } from "@mui/material";
import { red } from "@mui/material/colors";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CET CampusCare</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon /> */}
        <div className="user">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
          <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
          <span>{currentUser.name}</span></Link>
        </div>
        <Link to="/login" style={{ color: "red" , fontSize: "30x", fontWeight: "bold" }}>
        <PowerSettingsNewIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
