import React, { useEffect, useState } from "react";
import { useCreateVakansiyaMutation } from "../../../context/vakansiyalarApi";
import { ToastContainer, toast } from "react-toastify";
import "./CreateVakansiya.scss";
import { Editor } from "@tinymce/tinymce-react";

const languages = [
  { code: "uz_UZ", label: "O'zbek" },
  { code: "ru_RU", label: "Русский" },
  { code: "en_US", label: "English" },
];

const CreateVakansiya = () => {
  const [createVakansiya, { data, error }] = useCreateVakansiyaMutation();

  const [activeLang, setActiveLang] = useState("uz_UZ");

  const [titles, setTitles] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });

  const [descriptions, setDescriptions] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATION: check if all fields are filled
    const allFilled = languages.every(
      (lang) =>
        titles[lang.code].trim() !== "" && descriptions[lang.code].trim() !== ""
    );

    if (!allFilled) {
      toast.error("Iltimos, barcha tillarda title va description kiriting!");
      return;
    }

    const newVakansiya = {
      translations: {
        title: titles,
        description: descriptions,
      },
    };

    createVakansiya(newVakansiya);

    setTitles({ uz_UZ: "", ru_RU: "", en_US: "" });
    setDescriptions({ uz_UZ: "", ru_RU: "", en_US: "" });
    setActiveLang("uz_UZ");
  };

  useEffect(() => {
    if (data) {
      toast.success("Vakansiya muvaffaqiyatli yaratildi!");
    }
    if (error) {
      toast.error("Xatolik yuz berdi. Vakansiya yaratilmadi.");
    }
  }, [data, error]);

  return (
    <div id="create-categorys">
      <div className="container">
        <h1 className="create__category__title">Vakansiya yaratish</h1>

        {/* Language switch buttons */}
        <div className="language-switch">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveLang(lang.code)}
              className={`language-btn ${
                activeLang === lang.code ? "selected" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="create__vakansiya__form">
          <input
            type="text"
            placeholder={
              activeLang === "uz_UZ"
                ? "Sarlavha"
                : activeLang === "ru_RU"
                ? "Заголовок"
                : "Title"
            }
            value={titles[activeLang]}
            onChange={(e) =>
              setTitles({ ...titles, [activeLang]: e.target.value })
            }
          />

          <br />

          <Editor
            apiKey="flr80jlxssqfjw026fdc86sev8hfw302kqwwldzhtak20ciy"
            value={descriptions[activeLang]}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(newValue) =>
              setDescriptions({ ...descriptions, [activeLang]: newValue })
            }
          />

          <button type="submit">Saqlash</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateVakansiya;
