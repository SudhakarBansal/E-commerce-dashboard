import React, { useEffect, useState } from 'react';
import { Trash2, SquarePen, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://localhost:5000/list-product/${id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
    
        setProducts(result);
    };

    const deleteproduct = async (id) => {
        let result = await fetch(`http://localhost:5000/delete-product/${id}`, {
            method:"Delete",
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();

        }
    }

    const handleSearch = async (event) => {
        let key = event.target.value;
        if (key) {
            key = key.slice(0, 1).toUpperCase() + key.slice(1);
            let result = await fetch(`http://localhost:5000/search-product/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className='product-list main-content'>
            <h2>Product List</h2>
            <input className='search-box' placeholder='Search Product' onChange={handleSearch}></input>
            <ul className='heading-li'>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                (products.length > 0) ?
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>${item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <Trash2 style={{ cursor: "pointer" }} size={18} onClick={() => deleteproduct(item._id)} />
                                <Link to={"/updateproduct/" + item._id}>
                                    <SquarePen style={{ cursor: "pointer", color: "#5d8435" }} size={18} />
                                </Link>
                            </li>
                        </ul>
                    ) :
                    <h3>No Product Found</h3>
            }
            <div className='add-product'><Plus size={30} strokeWidth={3} color='#fff' onClick={() => navigate('/addproduct')} /></div>
        </div>
    );
};

export default ProductList;
