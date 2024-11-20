import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import koHeader from "@/i18n/ko/header.json";
import enHeader from "@/i18n/en/header.json";
import koHome from "@/i18n/ko/home.json";
import enHome from "@/i18n/en/home.json";
import koAbout from "@/i18n/ko/about.json";
import enAbout from "@/i18n/en/about.json";
import koFooter from "@/i18n/ko/footer.json";
import enFooter from "@/i18n/en/footer.json";

const resources = {
    ko: {
        header: koHeader,
        home: koHome,
        about: koAbout,
        footer: koFooter,
    },
    en: {
        header: enHeader,
        home: enHome,
        about: enAbout,
        footer: enFooter,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    ns: ["header"],
    defaultNS: "header",
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
