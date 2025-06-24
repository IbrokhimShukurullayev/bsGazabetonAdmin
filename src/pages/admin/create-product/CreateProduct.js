// Importlar (o'zgarmagan)
import React, { useState, useEffect } from "react";
import "./CreateProduct.scss";
import { toast, ToastContainer } from "react-toastify";
import { useGetCategoryQuery } from "../../../context/categoryApi";
import { useCreateProductMutation } from "../../../context/productApi";

const languages = [
  { code: "uz_UZ", label: "O'zbek" },
  { code: "ru_RU", label: "Русский" },
  { code: "en_US", label: "English" },
];

const initialTechnicalData = {
  "Zichligi, marka": "",
  "O‘lchami, mm": "",
  "Og‘irligi, kg": "",
  "1 m³ da gazobloklar soni": "",
  "1 m² yuza uchun gazobloklar soni": "",
  "1 ta paddonda hajm, m³": "",
  "1 ta paddonda gazobloklar soni": "",
  Mustahkamlik: "",
  "Issiqlik o‘tkazuvchanligi": "",
  "Sovuqqa chidamliligi": "",
};

const CreateProduct = () => {
  const { data: dataGetCategory } = useGetCategoryQuery({ skip: 0, take: 10 });
  const [
    createProduct,
    { data: dataCreateProduct, error: errorCreateProduct },
  ] = useCreateProductMutation();

  const [activeLang, setActiveLang] = useState("uz_UZ");

  const [name, setName] = useState({ uz_UZ: "", ru_RU: "", en_US: "" });
  const [description, setDescription] = useState({
    uz_UZ: "",
    ru_RU: "",
    en_US: "",
  });
  const [imageUrl, setImageUrl] = useState({ uz_UZ: "", ru_RU: "", en_US: "" });

  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [technicalData, setTechnicalData] = useState(initialTechnicalData);

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const allFilled = languages.every(
      (lang) =>
        name[lang.code].trim() &&
        description[lang.code].trim() &&
        imageUrl[lang.code].trim()
    );

    if (!allFilled || !price || !unit || !categoryId) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    const product = {
      price: +price,
      unit,
      technicalData: JSON.stringify(technicalData),
      productCategoryId: categoryId,
      translations: { name, description, imageUrl },
    };

    createProduct(product);
    toast.success("Yaratilmoqda...");
  };

  useEffect(() => {
    if (dataCreateProduct) {
      toast.success("Mahsulot muvaffaqiyatli yaratildi!");

      // Inputlarni tozalash
      setName({ uz_UZ: "", ru_RU: "", en_US: "" });
      setDescription({ uz_UZ: "", ru_RU: "", en_US: "" });
      setImageUrl({ uz_UZ: "", ru_RU: "", en_US: "" });
      setPrice("");
      setUnit("");
      setCategoryId("");
      setTechnicalData(initialTechnicalData);
    }
    if (errorCreateProduct) {
      toast.error("Mahsulot yaratilmadi!");
    }
  }, [dataCreateProduct, errorCreateProduct]);

  return (
    <section id="create__product">
      <div className="create__product">
        <form onSubmit={handleCreateProduct} className="create__product__box">
          <h2>Create Product</h2>

          {/* Language Switch */}
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

          {/* Common Inputs */}
          <div className="create__product__inp__box">
            <label>Title</label>
            <input
              value={name[activeLang]}
              onChange={(e) =>
                setName({ ...name, [activeLang]: e.target.value })
              }
              className="create__product__input"
              type="text"
            />
          </div>

          <div className="create__product__inp__box">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="create__product__input"
              type="number"
            />
          </div>

          <div className="create__product__inp__box">
            <label>Unit</label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="create__product__input"
              type="text"
            />
          </div>

          <div className="create__product__inp__box">
            <label>Image URL</label>
            <input
              value={imageUrl[activeLang]}
              onChange={(e) =>
                setImageUrl({ ...imageUrl, [activeLang]: e.target.value })
              }
              className="create__product__input"
              type="text"
            />
          </div>

          <div className="create__product__inp__box">
            <label>Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="create__product__input"
              value={categoryId}
            >
              <option value="">Kategoriya tanlang</option>
              {dataGetCategory?.data?.list.map((el) => (
                <option key={el.productCategoryId} value={el.productCategoryId}>
                  {el.name || "Noma'lum"}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={description[activeLang]}
            onChange={(e) =>
              setDescription({ ...description, [activeLang]: e.target.value })
            }
            placeholder="Description"
            className="create__product__input"
            rows="4"
          ></textarea>

          <h3 className="create__product__title">TechnicalData </h3>

          {/* Technical Data Inputs */}
          {Object.entries(initialTechnicalData).map(([key]) => (
            <div className="create__product__inp__box" key={key}>
              <label>{key}</label>
              <input
                value={technicalData[key]}
                onChange={(e) =>
                  setTechnicalData({ ...technicalData, [key]: e.target.value })
                }
                className="create__product__input"
                type="number"
              />
            </div>
          ))}

          <button type="submit" className="create__product__btn">
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateProduct;
