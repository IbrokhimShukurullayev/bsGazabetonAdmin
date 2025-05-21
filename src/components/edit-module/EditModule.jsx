import React from "react";
import "./EditModule.scss";

import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import { useUpdateProductMutation } from "../../context/productApi";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import { useGetCategoryQuery } from "../../context/categoryApi";

const EditModule = ({ product, setEditModule }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(null);

  const [
    updateProduct,
    {
      data: dataUpdateProduct,
      error: errorUpdateProduct,
      isLoading: loadingUpdateProduct,
    },
  ] = useUpdateProductMutation();
  const { data: dataGetCategory } = useGetCategoryQuery();

  let categoryItem = dataGetCategory?.map((el) => (
    <option key={el.id} value={el.title}>
      {el.title}
    </option>
  ));

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setPrice(product?.price);
      setOldPrice(product?.oldPrice);
      setCategory(product?.category);
      setDescription(product?.description);
      setImage(product?.image);
      setId(product?.id);
    }
  }, [product]);

  const handleEditProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      title,
      price: +price,
      oldPrice: +oldPrice,
      category,
      description,
      image,
    };

    updateProduct({ body: updatedProduct, id: id });
  };

  useEffect(() => {
    if (dataUpdateProduct) {
      setEditModule(null);
      toast.success("Product updated successfully");
    }
    if (errorUpdateProduct) {
      toast.success("Product could not updated");
    }
  }, [dataUpdateProduct, errorUpdateProduct]);

  return (
    <>
      <div
        onClick={() => setEditModule(null)}
        className={`edit__overlay ${product ? "show__edit__overlay" : ""}`}
      ></div>

      <form
        onSubmit={handleEditProduct}
        className={`manage__product__edit__box ${
          product ? "show__edit__module" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setEditModule(null)}
          className="edit__module__close__btn"
        >
          <IoCloseSharp />
        </button>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            id="title"
            type="text"
            className="manage__product__edit__inp"
          />
        </div>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="Price">Price</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="Price"
            type="text"
            className="manage__product__edit__inp"
          />
        </div>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="oldPrice">Old Price</label>
          <input
            onChange={(e) => setOldPrice(e.target.value)}
            value={oldPrice}
            id="oldPrice"
            type="text"
            className="manage__product__edit__inp"
          />
        </div>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="Image">Image Url</label>
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            id="Image"
            type="text"
            className="manage__product__edit__inp"
          />
        </div>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="Category">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="Category"
            required
            className="manage__product__edit__inp"
          >
            <option value="Tanlang">tanlang</option>
            {categoryItem}
          </select>
        </div>

        <div className="manage__product__edit__inp__box">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
            placeholder="Description"
            className="manage__product__edit__inp"
            name=""
            id="description"
            cols="30"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="manage__product__edit__btn">
          <span>Update</span>
          {loadingUpdateProduct && <Loading />}
        </button>
      </form>
    </>
  );
};

export default EditModule;
