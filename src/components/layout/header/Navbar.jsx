import React from "react"
import { useTranslation } from "react-i18next"
import { eventStore } from "../../../context/eventContext"
import lightLogo from "../../../assets/images/light-logo.png"
import darkLogo from "../../../assets/images/dark-logo.png"

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const { darkMode } = eventStore()

  const handleLanguage = (e) => {
    e.preventDefault()
    i18n.changeLanguage(e.target.value)
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
          onClick={() => {
            eventStore.setState({ darkMode: !darkMode })
            if (darkMode) {
              document.body.classList.remove("dark-theme")
            } else {
              document.body.classList.add("dark-theme")
            }
          }}
        ></i>
        <select className="nav__language" onChange={handleLanguage}>
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </select>
      </div>
    </nav>
  )
}

export default Navbar
