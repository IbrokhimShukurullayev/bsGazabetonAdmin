import React, { useState } from 'react'
import "./CreateCategory.scss"
import { useCreateCategoryMutation } from '../../../context/categoryApi'
import Loading from '../../../components/loading/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

const CreateCategory = () => {
    const [category, setCategory] = useState("")

    const [CreateCategory, { data: dataCreateCategory, isLoading, error }] = useCreateCategoryMutation()

    const handleCreateCategory = (e) => {
        e.preventDefault()
        CreateCategory({ title: category })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (dataCreateCategory) {
            toast.success("Category created successfully")
            setCategory("")
        }

        if (error) {
            toast.error("Category could not create")
        }
    }, [dataCreateCategory, error])

    return (
        <>
            <section id="create-category">
                <div className="create__category">
                    <h2 className="create__category__title">Create Category</h2>
                    <form onSubmit={handleCreateCategory} className="create__category__form">
                        <input
                            required
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            type="text"
                            placeholder="Category Name"
                        />
                        <button disabled={isLoading ? true : false} className={`create__category ${isLoading ? "creating__category" : ""}`} type="submit">
                            {
                                isLoading ? "Creating..." : "Create"
                            }
                        </button>
                    </form>
                </div>
            </section>
            <ToastContainer/>
        </>
    )
}

export default CreateCategory