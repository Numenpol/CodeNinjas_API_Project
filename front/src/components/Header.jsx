import mobileIcon from "../assets/mobileHeaderIcon.svg";
import tabletIcon from "../assets/tabletHeaderIcon.svg";
import styles from "../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth/authenticate";
import { useEffect, useState } from "react";
import { useTheme } from "../utils/ThemeContext";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
    setUser("");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.data) {
      let name = loggedInUser.data.name;
      let role = loggedInUser.data.role;
      let avatar = loggedInUser.data.avatar;
      setUser({ name, role, avatar });
    }
  }, []);

  const {
    headerNavigation,
    headerMobileIcon,
    headerTabletIcon,
    headerRightSide,
    headerThemeButton,
    headerUserName,
    headerUserRole,
    headerLogOutButton,
    lightThemeButton,
    darkThemeButton,
    headerNavigationDark,
    headerLogOutButtonDark
  } = styles;

  return (
    <nav className={theme == "light" ? headerNavigation : headerNavigationDark}>
      <div className="w-100 d-flex justify-content-between ps-3">
        <Link to={"/Projects"}>
          <img src={mobileIcon} alt="icon" className={headerMobileIcon} />
          <img src={tabletIcon} alt="icon" className={headerTabletIcon} />
        </Link>
        <div className={headerRightSide}>
          <button
            className={theme == "light" ? lightThemeButton : darkThemeButton}
            onClick={() => toggleTheme()}
          >
            {theme == "light" ? "🌞" : "🌜"}
          </button>
          <img src={user ? user.avatar : ""} alt="avatar" />
          <div>
            <p className={headerUserName}>{user ? user.name : ""}</p>
            <p className={headerUserRole}>{user ? user.role : ""}</p>
          </div>
          <button className={theme == "light" ? headerLogOutButton : headerLogOutButtonDark} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
