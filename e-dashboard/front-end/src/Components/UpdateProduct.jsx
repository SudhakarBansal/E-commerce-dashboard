import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';


const UpdateProduct = () => {
    const [name, setname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate= useNavigate();

    useEffect(()=>{
        getData();
    },[])

    const getData = async () => {
        let result = await fetch(`http://localhost:5000/fetch-product/${params.id}`,{
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setname(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const handleUPdateProduct = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/update-product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company}),
            headers: {
                'Content-Type': "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        })
        navigate('/');
    }

    return (
        <ProductForm
        name={name}
        price={price}
        category={category}
        company={company}
        headingtext={"Update Product"}
        setname={setname}
        setPrice={setPrice}
        setCategory={setCategory}
        setCompany={setCompany}
        onFormSubmit={handleUPdateProduct}
        />
    )
}

export default UpdateProduct