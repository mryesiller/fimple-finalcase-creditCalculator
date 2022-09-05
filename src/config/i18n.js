import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "../assets/translations/en.json"
import tr from "../assets/translations/tr.json"

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
    },
  })

export default i18n
