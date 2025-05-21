import React from 'react'
import "./CreateProduct.scss"
import { useState } from 'react'

import { FaRegHeart } from 'react-icons/fa6'
import { MdOutlineCreate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import { useGetCategoryQuery } from '../../../context/categoryApi'
import { useCreateProductMutation } from '../../../context/productApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CreateProduct = () => {
    const { data: dataGetCategory } = useGetCategoryQuery()
    const [createProduct, { data: dataCreateProduct, error: errorCreateProduct }] = useCreateProductMutation()
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    let categoryItem = dataGetCategory?.map(el => (
        <option key={el.id} value={el.title}>{el.title}</option>
    ))

    const handleCreateProduct = (e) => {
        e.preventDefault()
        let product = {
            title,
            price: +price,
            oldPrice: +oldPrice,
            category,
            description,
            image,
        }
        createProduct(product)
        setTitle("")
        setPrice("")
        setOldPrice("")
        setCategory("")
        setDescription("")
        setImage("")
    }

    useEffect(() => {
        if (dataCreateProduct) {
            toast.success("Product created successfully")
        }

        if (errorCreateProduct) {
            toast.error("Product could not be created")
        }
    }, [dataCreateProduct, errorCreateProduct])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <section id='create__product'>
                <div className="create__product">
                    <form onSubmit={handleCreateProduct} className='create__product__box'>
                        <h2>Create Product</h2>

                        <div className="create__product__inp__box">
                            <label htmlFor="title">Title</label>
                            <input
                                id='title'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='create__product__input'
                                type="text"
                            />
                        </div>

                        <div className="create__product__inp__box">
                            <label htmlFor="Price">Price</label>
                            <input
                                id='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='create__product__input'
                                type="number"
                            />
                        </div>

                        <div className="create__product__inp__box">
                            <label htmlFor="old Price">old Price</label>
                            <input
                                id='old Price'
                                required
                                value={oldPrice}
                                onChange={(e) => setOldPrice(e.target.value)}
                                className='create__product__input'
                                type="number"
                            />
                        </div>

                        <div className="create__product__inp__box">
                            <label htmlFor="image">Image - Url</label>
                            <input
                                id='image'
                                required
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className='create__product__input'
                                type="text"
                            />
                        </div>

                        <div className="create__product__inp__box">
                            <label htmlFor="Category">Category</label>
                            <select
                                id='Category'
                                required
                                onChange={(e) => setCategory(e.target.value)}
                                className='create__product__input'>
                                <option value="Tanlang">tanlang</option>
                                {categoryItem}
                            </select>
                        </div>

                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'
                            className='create__product__input'
                            name="" id="" cols="30" rows="4"></textarea>

                        <button className='create__product__btn'>Create</button>
                    </form>

                    <div className="create__product__example__box">
                        <div className="card">
                            <button className="card__like__btn">
                                <FaRegHeart />
                            </button>
                            <div className="card__frame">
                                <img src={image} alt="" />
                            </div>
                            <div className="card__content">
                                <p className="card__category">{category}</p>
                                <h3 className="card__title">{title}</h3>
                                <div className="card__bottom">
                                    <div className="card__price__wrapper">
                                        <del className='card__old__price'>{oldPrice}₽</del>
                                        <p className="card__price">{price}₽</p>
                                    </div>
                                    <div className="card__actions__wrapper">
                                        <button className="card__edit__btn">
                                            <MdOutlineCreate />
                                        </button>
                                        <button className="card__delete__btn">
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateProduct