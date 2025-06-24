import React, { useEffect, useState } from "react";
import "./ManageProduct.scss";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../../context/productApi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineCreate } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import Loading from "../../../components/loading/Loading";
// import EditModule from "../../../components/edit-module/EditModule";
import DeleteModule from "../../../components/delete-module/DeleteModule";
import { useNavigate } from "react-router-dom";

const ManageProduct = () => {
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editModule, setEditModule] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const navigate = useNavigate();

  const { data: dataGetProducts, isLoading: loadingGetProducts } =
    useGetProductQuery({
      skip: 0,
      take: 10,
    });
  console.log(dataGetProducts);

  const [deleteProduct] = useDeleteProductMutation();

  const onDelete = async (id) => {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    await deleteProduct(id);
    setDeleteLoading((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = dataGetProducts?.data?.list.map((el) => (
    <div key={el.productId} className="card">
      <div className="product__card">
        <img className="product__card__img" src={el.imageUrl} alt={el.name} />
        <h3>nkj</h3>

        <div className="product__card__text">
          <p>Og‘irligi:</p>
          <p>23</p>
        </div>

        <div className="product__card__list">
          <p>1 m3 da bloklar soni:</p>
          <p>{el.price}</p>
        </div>

        <div className="product__card__end">
          <p>1 paddonda bloklar soni:</p>
          <p>{el.name}</p>
        </div>

        <h4 className="product__price">{el.price} UZS/m3</h4>

        <div className="card__actions__wrapper">
          <button
            onClick={() => setEditModule(el)}
            className="card__edit__btn"
            disabled={deleteLoading[el.productId]}
          >
            <MdOutlineCreate />
          </button>

          <button
            onClick={() => setDeleteConfirmId(el.productId)}
            className="card__delete__btn"
            disabled={deleteLoading[el.productId]}
          >
            <FaRegTrashAlt />
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

      {/* <EditModule product={editModule} setEditModule={setEditModule} /> */}

      {deleteConfirmId && (
        <DeleteModule
          onConfirm={async () => {
            await onDelete(deleteConfirmId);
            setDeleteConfirmId(null);
          }}
          onCancel={() => setDeleteConfirmId(null)}
        />
      )}
    </>
  );
};

export default ManageProduct;
