import React, { useEffect, useState } from 'react'
import "./EditCategory.scss"

import { IoCloseSharp } from "react-icons/io5";
import { useUpdateCategoryMutation } from '../../context/categoryApi';
import { toast } from 'react-toastify';

const EditCategory = ({ category, setEditCategoryModule }) => {
    const [categoryValue, setCategoryValue] = useState("")
    const [categoryId, setCategoryId] = useState(null)

    const [editCategory, { data, error, isLoading }] = useUpdateCategoryMutation()

    useEffect(() => {
        if (category) {
            setCategoryValue(category?.title);
            setCategoryId(category?.id)
        }
    }, [category]);

    const handleUpdateCategory = (e) => {
        e.preventDefault()

        const updatedCategory = {
            ...category,
            title: categoryValue,
        };

        editCategory({ body: updatedCategory, id: categoryId })
    }

    useEffect(() => {
        if (data) {
            setEditCategoryModule(null)
            toast.success("Category updated successfully")
        }
        if (error) {
            toast.success("Category could not updated")
        }
    }, [data, error])

    return (
        <>
            <div onClick={() => setEditCategoryModule(null)} className={`edit__category__overlay ${category ? "show__edit__category__overlay" : ""}`}></div>

            <form onSubmit={handleUpdateCategory} className={`edit__category__box ${category ? "show__edit__category__box" : ""}`}>
                <button onClick={() => setEditCategoryModule(null)} type='button' className="edit__category__box__close__btn">
                    <IoCloseSharp />
                </button>
                <label htmlFor="category">Category</label>
                <input
                    value={categoryValue}
                    onChange={(e) => setCategoryValue(e.target.value)}
                    id='category'
                    type="text"
                />
                <button disabled={isLoading ? true : false} className={`edit__category__box__update__btn ${isLoading ? "updating__category" : ""}`} type="submit">
                    {
                        isLoading ? "Updating..." : "Update"
                    }
                </button>
            </form>
        </>
    )
}

export default EditCategory