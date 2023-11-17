import "./leftBar.scss";
import Resolved from "../../assets/2.png";
import email from "../../assets/gmail.png";
import phone from "../../assets/phone.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";


const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">

            <img
              src={"/upload/" +currentUser.profilePic}
              alt=""
            />
            <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
            <span style={{ textDecoration: "none", color:"grey"}}>{currentUser.name}</span></Link>
          </div>
          <div className="item">
            <img src={Resolved} alt="" />
            <Link to="/resolved" style={{ textDecoration: "none", color:"grey"}}>
              <span>Resolved Issues</span>
            </Link>
          </div>
          {/* <div className="item">
            <img src={email} alt="" />
            <Link to="/emailus" style={{ textDecoration: "none", color:"grey"}}>
              <span>Email Us</span>
            </Link>
          </div> */}

          <div className="item">
            <img src={phone} alt="" />
            <Link to="/contacts" style={{ textDecoration: "none", color:"grey"}}>
              <span>Contacts</span>
            </Link>
          </div>
          
        </div>
        
        
      </div>
    </div>
  );
};

export default LeftBar;
