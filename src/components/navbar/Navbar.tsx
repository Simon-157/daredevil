// libraries
import { NavLink } from "react-router-dom";
import { MouseEvent, useState } from "react";

//components

// styles
import NavbarStyles from "./Navbar.module.css";

//utils
import { PAGES, EXTRA_MENU } from "./pages";
import { Logo } from "../../assets/icons/Icons";
import { useFirebaseAuth } from "../../bass/auth/auth";
const Navbar = () => {
  const { signOut: logout } = useFirebaseAuth()
  const [toggleClass, setToggleClass] = useState("extra__menu");
  const [currentPageName, setCurrentPage] = useState("home");
  const toggleExtraMenu = () => {
    toggleClass === "extra__menu"
      ? setToggleClass("extra__menu__float")
      : setToggleClass("extra__menu");
  };
  return (
    <nav className={NavbarStyles.navbar}>
      <div className={NavbarStyles.navbar__logo}>
        <Logo />
      </div>
      <div className={NavbarStyles.navbar__menu}>
        {PAGES.map((page, index) => (
          <div
            key={index}
            className={
              NavbarStyles[
              `${page.name === currentPageName
                ? "navbar__menu__item__active"
                : "navbar__menu__item"
              }`
              ]
            }
            onClick={() => setCurrentPage(page.name)}
          >
            {index == PAGES.length - 1 ? (
              <NavLink
                to={page.path}
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  toggleExtraMenu();
                }}
              >
                <div className={NavbarStyles.navbar__menu__item__icon}>
                  {page.icon}
                </div>
                <small className={NavbarStyles.navbar__menu__item__text}>
                  {page.name}
                </small>
              </NavLink>
            ) : (
              <NavLink to={page.path}>
                <div className={NavbarStyles.navbar__menu__item__icon}>
                  {page.icon}
                </div>
                <small className={NavbarStyles.navbar__menu__item__text}>
                  {page.name}
                </small>
              </NavLink>
            )}
          </div>
        ))}
      </div>
      <div className={NavbarStyles[toggleClass]}>
        {EXTRA_MENU.map((page, index) => (
          <div
            className={
              NavbarStyles[
              `${page.name === currentPageName
                ? "navbar__menu__item__active"
                : "navbar__menu__item"
              }`
              ]
            }
            onClick={() => setCurrentPage(page.name)}
            key={index}
          >
            {index === EXTRA_MENU.length - 1 ? (

              <div onClick={logout}>
                <NavLink to="#">
                  <div className={NavbarStyles.navbar__menu__item__icon} >
                    {page.icon}
                  </div>
                  <small className={NavbarStyles.navbar__menu__item__text}>
                    {page.name}
                  </small>
                </NavLink>
              </div>

            ) : (
              <NavLink to={page.path}>
                <div className={NavbarStyles.navbar__menu__item__icon}>
                  {page.icon}
                </div>
                <small className={NavbarStyles.navbar__menu__item__text}>
                  {page.name}
                </small>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
