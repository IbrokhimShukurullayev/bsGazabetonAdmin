import React, { useEffect, useState } from "react";
import "./CreateCategory.scss";
import { useCreateCategoryMutation } from "../../../context/categoryApi";
import Loading from "../../../components/loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const languages = [
  { code: "uz_UZ", label: "O'zbek" },
  { code: "ru_RU", label: "Русский" },
  { code: "en_US", label: "English" },
];

const CreateCategory = () => {
  const [activeLang, setActiveLang] = useState("uz_UZ");

  const [names, setNames] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });

  const [descriptions, setDescriptions] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });

  const [imageUrls, setImageUrls] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });

  const [createCategory, { data: dataCreateCategory, isLoading, error }] =
    useCreateCategoryMutation();

  const handleCreateCategory = (e) => {
    e.preventDefault();

    // Hammasi to‘ldirilganmi?
    const allFilled = languages.every(
      (lang) =>
        names[lang.code].trim() &&
        descriptions[lang.code].trim() &&
        imageUrls[lang.code].trim()
    );

    if (!allFilled) {
      toast.error("Iltimos, barcha tillarda ma'lumotlarni kiriting!");
      return;
    }

    const newCategory = {
      translations: {
        name: names,
        description: descriptions,
        imageUrl: imageUrls,
      },
    };

    createCategory(newCategory);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (dataCreateCategory) {
      toast.success("Category successfully created!");
      setNames({ uz_UZ: "", ru_RU: "", en_US: "" });
      setDescriptions({ uz_UZ: "", ru_RU: "", en_US: "" });
      setImageUrls({ uz_UZ: "", ru_RU: "", en_US: "" });
      setActiveLang("uz_UZ");
    }

    if (error) {
      toast.error("Category could not be created.");
    }
  }, [dataCreateCategory, error]);

  return (
    <>
      <section id="create-category">
        <div className="create__category">
          <h2 className="create__category__title">Create Category</h2>

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

          <form
            onSubmit={handleCreateCategory}
            className="create__category__form"
          >
            <input
              required
              onChange={(e) =>
                setNames({ ...names, [activeLang]: e.target.value })
              }
              value={names[activeLang]}
              type="text"
              placeholder={
                activeLang === "uz_UZ"
                  ? "Kategoriya nomi"
                  : activeLang === "ru_RU"
                  ? "Название категории"
                  : "Category name"
              }
            />

            <input
              required
              onChange={(e) =>
                setDescriptions({
                  ...descriptions,
                  [activeLang]: e.target.value,
                })
              }
              value={descriptions[activeLang]}
              type="text"
              placeholder={
                activeLang === "uz_UZ"
                  ? "Kategoriya tavsifi"
                  : activeLang === "ru_RU"
                  ? "Описание категории"
                  : "Category description"
              }
            />

            <input
              required
              onChange={(e) =>
                setImageUrls({ ...imageUrls, [activeLang]: e.target.value })
              }
              value={imageUrls[activeLang]}
              type="text"
              placeholder={
                activeLang === "uz_UZ"
                  ? "Rasm URL manzili"
                  : activeLang === "ru_RU"
                  ? "Ссылка на изображение"
                  : "Image URL"
              }
            />

            <button
              disabled={isLoading}
              className={`create__category ${
                isLoading ? "creating__category" : ""
              }`}
              type="submit"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreateCategory;
