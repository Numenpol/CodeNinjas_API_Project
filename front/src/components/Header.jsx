import mobileIcon from "../assets/mobileHeaderIcon.svg";
import tabletIcon from "../assets/tabletHeaderIcon.svg";
import avatar from "../assets/avatar.svg";
import styles from "../styles/Header.module.css";

function Header() {
    const { headerNavigation, headerMobileIcon, headerTabletIcon, headerRightSide, headerThemeButton,  headerUserName, headerUserRole, headerLogOutButton} = styles;
    return (
        <nav className={headerNavigation} >
            <div className="w-100 d-flex justify-content-between ps-3">
                <img src={mobileIcon} alt="icon" className={headerMobileIcon} />
                <img src={tabletIcon} alt="icon" className={headerTabletIcon} />
                    <div className={headerRightSide}>
                    <button className={headerThemeButton}>🌞</button>
                    <img src={avatar} alt="avatar" />
                    <div>
                        <p className={headerUserName}>Name</p>
                        <p className={headerUserRole}>Role</p>
                    </div>
                    <button className={headerLogOutButton}>Log Out</button>
                </div>
            </div>
        </nav>
    );
}

export default Header;