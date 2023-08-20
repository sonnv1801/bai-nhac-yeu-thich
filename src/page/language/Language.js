import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "vi"
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  }, [selectedLanguage, i18n]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="vi">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
      </select>
      <h1>{t("greeting")}</h1>
      <p>{t("content")}</p>
    </div>
  );
};

export default Language;
