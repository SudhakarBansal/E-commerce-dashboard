import React, { useState } from 'react'
import ProductForm from './ProductForm';

const AddProduct = () => {
    const [name, setname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company,userId}),
            headers: {
                'Content-Type': "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        })
        setname("");
        setCategory("");
        setPrice("");
        setCompany("");
    }

    return (
        <ProductForm
        name={name}
        price={price}
        category={category}
        company={company}
        headingtext={"Add Product"}
        setname={setname}
        setPrice={setPrice}
        setCategory={setCategory}
        setCompany={setCompany}
        onFormSubmit={handleAddProduct}
        />
    )
}

export default AddProduct