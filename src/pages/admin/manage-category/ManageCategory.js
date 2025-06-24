import React, { useState, useEffect } from "react";
import "./ManageCategory.scss";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../../context/categoryApi";
import { MdOutlineCreate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import EditCategory from "../../../components/edit-category/EditCategory";
import DeleteModule from "../../../components/delete-module/DeleteModule";
import Loading from "../../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";

const ManageCategory = () => {
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editCategoryModule, setEditCategoryModule] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const navigate = useNavigate();

  const { data: dataGetCategory, isLoading: loadingGetCategory } =
    useGetCategoryQuery({ skip: 0, take: 10 });

  const [
    deleteCategory,
    { data: dataDeleteCategory, isLoading: loadingDeleteCategory, error },
  ] = useDeleteCategoryMutation();

  const onDelete = async (id) => {
    setDeleteLoading((prevState) => ({ ...prevState, [id]: true }));
    await deleteCategory(id);
    setDeleteLoading((prevState) => ({ ...prevState, [id]: false }));
    setDeleteModalId(null); // modalni yopish
  };

  useEffect(() => {
    if (dataDeleteCategory) {
      toast.info("Category o‘chirildi");
    }
    if (error) {
      toast.error("Category o‘chirilmadi");
    }
  }, [dataDeleteCategory, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const category = dataGetCategory?.data?.list.map((el) => (
    <div key={el.productCategoryId} className="category__item">
      <h3 className="category__item__title">{el.name}</h3>
      <div className="category__item__actions">
        <button
          onClick={() => setEditCategoryModule(el)}
          className={`category__item__edit__btn ${
            deleteLoading[el.productCategoryId]
              ? "category__item__deleting__edit"
              : ""
          }`}
        >
          <MdOutlineCreate />
        </button>

        <button
          onClick={() => setDeleteModalId(el.productCategoryId)}
          className={`category__item__delete__btn ${
            deleteLoading[el.productCategoryId] ? "deleting__category" : ""
          }`}
        >
          {deleteLoading[el.productCategoryId] ? (
            <>
              deleting <FaRegTrashAlt />
            </>
          ) : (
            <FaRegTrashAlt />
          )}
        </button>
      </div>
    </div>
  ));

  return (
    <>
      {loadingGetCategory && <Loading />}
      <section id="manage-category">
        <div className="manage__category">
          <div className="manage__category__box">
            <h1 className="manage__category__title">Category</h1>
            <button onClick={() => navigate("/admin/create-category")}>
              <IoAddCircle />
              Add new
            </button>
          </div>
          <div className="manage__category__wrapper">{category}</div>
        </div>
      </section>

      {deleteModalId && (
        <DeleteModule
          onConfirm={() => onDelete(deleteModalId)}
          onCancel={() => setDeleteModalId(null)}
        />
      )}

      {editCategoryModule && (
        <EditCategory
          category={editCategoryModule}
          onClose={() => setEditCategoryModule(null)}
        />
      )}
    </>
  );
};

export default ManageCategory;
