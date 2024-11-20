import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import koHeader from "@/i18n/ko/header.json";
import enHeader from "@/i18n/en/header.json";
import koHome from "@/i18n/ko/home.json";
import enHome from "@/i18n/en/home.json";

const resources = {
    ko: {
        header: koHeader,
        home: koHome,
    },
    en: {
        header: enHeader,
        home: enHome,
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
