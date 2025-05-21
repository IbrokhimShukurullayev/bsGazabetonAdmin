import React from "react";
import "./ManageCategory.scss";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../../context/categoryApi";
import { useState } from "react";
import { MdOutlineCreate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";
import EditCategory from "../../../components/edit-category/EditCategory";
import Loading from "../../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";

const ManageCategory = () => {
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editCategoryModule, setEditCategoryModule] = useState(null);
  const navigate = useNavigate();

  const { data: dataGetCategory, isLoading: loadingGetCategory } =
    useGetCategoryQuery();
  const [
    deleteCategory,
    { data: dataDeleteCategory, isLoading: loadingDeleteCategory, error },
  ] = useDeleteCategoryMutation();

  const onDelete = async (id) => {
    setDeleteLoading((prevState) => ({ ...prevState, [id]: true }));
    await deleteCategory(id);
    setDeleteLoading((prevState) => ({ ...prevState, [id]: false }));
  };

  useEffect(() => {
    if (dataDeleteCategory) {
      toast.info("category deleted");
    }
    if (error) {
      toast.error("category could not deleted");
    }
  }, [dataDeleteCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let category = dataGetCategory?.map((el) => (
    <div key={el.id} className="category__item">
      <h3 className="category__item__title">{el.title}</h3>
      <div className="category__item__actions">
        <button
          onClick={() => setEditCategoryModule(el)}
          className={`category__item__edit__btn ${
            deleteLoading[el.id] ? "category__item__deleting__edit" : ""
          }`}
        >
          <MdOutlineCreate />
        </button>

        <button
          onClick={() => onDelete(el.id)}
          className={`category__item__delete__btn ${
            deleteLoading[el.id] ? "deleting__category" : ""
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
      <EditCategory
        category={editCategoryModule}
        setEditCategoryModule={setEditCategoryModule}
      />
    </>
  );
};

export default ManageCategory;
