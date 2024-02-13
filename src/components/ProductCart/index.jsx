import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';


export default function ProductCart({ product }) {

    const { handleRemoveItemFromCart } = useCart();
    
    return (
        <div className={`container-fluid`}>
            <div className={`row justify-content-center`}>
                <div className={`col-4`}>
                    <Image 
                        src={product.image}
                        alt={product.product_name}
                        width={100}
                        height={100}
                        style={{objectFit: 'contain'}}
                    />
                </div>
                <div className={`col-6`}>
                    <p>
                        {product?.product_name}<br />
                        <small style={{ color: '#999' }}>
                            {product.reference}
                            ({product?.color?.color?.name})
                        </small>
                    </p>
                    <p className="">
                        <small>
                            {product?.quantity}
                        </small>
                    </p>
                </div>
                <div className={`col-2 d-flex flex-column justify-content-around`}>
                    <button className={`btn fw-bold text-gray`} onClick={() => handleRemoveItemFromCart(product)}>X</button>
                    <button className={`btn`} onClick={() => addToFavorites(product)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}