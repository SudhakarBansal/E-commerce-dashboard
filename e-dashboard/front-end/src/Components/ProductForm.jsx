import React from 'react'

const ProductForm = ({name,price,category,company,headingtext,setname,setPrice,setCategory,setCompany,onFormSubmit}) => {
    return (
        <form className='ItemContainer' onSubmit={onFormSubmit}>
            <h1>{headingtext}</h1>
            <div className='form'>
                <input
                    className='input-field'
                    type='text'
                    required
                    placeholder='Product name'
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                >
                </input>
                <input
                    className='input-field'
                    type='text'
                    required
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                >
                </input>
                <input
                    className='input-field'
                    type='text'
                    required
                    placeholder='Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                </input>
                <input
                    className='input-field'
                    type='text'
                    required
                    placeholder='Company'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                >
                </input>

                <button
                    className='formBtn'
                    type="submit">
                    {headingtext}
                </button>
            </div>
        </form>
    )
}

export default ProductForm