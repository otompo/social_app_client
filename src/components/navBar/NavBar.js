import "./navBar.scss";
import { Link } from "react-router-dom";
import {
  SearchOutlined,
  PersonOutline,
  HomeOutlined,
  DarkModeOutlined,
  GridViewOutlined,
  EmailOutlined,
  NotificationAddOutlined,
  WbSunny,
} from "@mui/icons-material";
import { DarkModeContext } from "../../context/derkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function NavBar(props) {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Lamasocial</span>
        </Link>
        <HomeOutlined />
        {darkMode ? (
          <WbSunny onClick={toggle} />
        ) : (
          <DarkModeOutlined onClick={toggle} />
        )}
        <GridViewOutlined />
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutline />
        <EmailOutlined />
        <NotificationAddOutlined />
        <div className="user">
          <Link to={`/profile/${currentUser?.id}`}>
            <img src={"/upload/" + currentUser.profilepicture} alt="" />
          </Link>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
