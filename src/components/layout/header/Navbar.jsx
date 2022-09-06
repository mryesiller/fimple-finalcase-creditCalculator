import React from "react"
import { useTranslation } from "react-i18next"
import { eventStore } from "../../../context/eventContext"
import lightLogo from "../../../assets/images/light-logo.png"
import darkLogo from "../../../assets/images/dark-logo.png"

const Navbar = () => {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation()

  const { darkMode, toggleTheme } = eventStore()

  const handleChangeLanguage = (e) => {
    e.preventDefault()
    changeLanguage(e.target.value)
  }

  return (
    <nav className="nav container">
      <a href="#home" className="nav__logo">
        <img src={darkMode ? lightLogo : darkLogo} alt="logo" />
      </a>
      <h1 className="nav__title">{t("main-title")}</h1>
      <div className="nav__button">
        <i
          className={
            darkMode ? "ri-sun-line change-theme" : "ri-moon-line change-theme"
          }
          id="theme-button"
          onClick={toggleTheme}
        ></i>
        <select
          className="nav__language"
          onChange={handleChangeLanguage}
          defaultValue={language}
        >
          {["tr", "en"].map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </nav>
  )
}

export default Navbar
