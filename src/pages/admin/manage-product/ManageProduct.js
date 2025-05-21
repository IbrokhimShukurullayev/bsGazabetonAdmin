import React, { useEffect, useState } from "react";
import "./ManageProduct.scss";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../../context/productApi";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineCreate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Loading from "../../../components/loading/Loading";
import EditModule from "../../../components/edit-module/EditModule";
import { IoAddCircle } from "react-icons/io5";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const [deleteLoading, setDeleteLoading] = useState({});
  const { data: dataGetProducts, isLoading: loadingGetProducts } =
    useGetProductQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [editModule, setEditModule] = useState(null);
  const navigate = useNavigate();

  const onDelete = async (id) => {
    setDeleteLoading((prevState) => ({ ...prevState, [id]: true }));
    await deleteProduct(id);
    setDeleteLoading((prevState) => ({ ...prevState, [id]: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = dataGetProducts?.map((el) => (
    <div key={el.id} className="card">
      <div className="product__card">
        <img src={el.image} alt={el.name} />
        <h3>{el.category}</h3>
        <div className="product__card__text">
          <p>Og‘irligi:</p>
          <p>{el.oldPrice}</p>
        </div>
        <div className="product__card__list">
          <p>1 m3 da bloklar soni: </p>
          <p>{el.price}</p>
        </div>
        <div className="product__card__end">
          <p>1 paddonda bloklar soni:</p>
          <p>{el.title}</p>
        </div>
        <h4 className="product__price">{el.price}UZS/m3</h4>
        <div className="card__actions__wrapper">
          <button
            onClick={() => setEditModule(el)}
            className={`card__edit__btn ${
              deleteLoading[el.id] ? "card__edit__deleting__pr" : ""
            }`}
          >
            <MdOutlineCreate />
          </button>

          <button
            onClick={() => onDelete(el.id)}
            className={`card__delete__btn ${
              deleteLoading[el.id] ? "deleting__product" : ""
            }`}
          >
            {deleteLoading[el.id] ? (
              <>
                deleting <FaRegTrashAlt />
              </>
            ) : (
              <FaRegTrashAlt />
            )}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {loadingGetProducts && <Loading />}

      <section id="manage-product">
        <div className="container manage__product">
          <div className="manage__product__box">
            <h1 className="manage__product__title">Products</h1>
            <button onClick={() => navigate("/admin/create-product")}>
              <IoAddCircle />
              Add new
            </button>
          </div>
          <div className="manage__product__wrapper">{products}</div>
        </div>
      </section>
      <EditModule product={editModule} setEditModule={setEditModule} />
    </>
  );
};

export default ManageProduct;
