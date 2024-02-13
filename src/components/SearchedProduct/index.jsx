import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchedProduct({product}){

    return (
        <>
            <Link href={`/imovel/${product.slug}`}>
                <div className={`d-flex align-items-center px-4 py-2`}>
                    <Image width="80" height="80" src={product.url_image_default ?? 'https://via.placeholder.com/80x80?text=sem+imagem'} className="img-fluid me-3 border border-secondary" alt={product.name} style={{width: '80px', height: '80px', objectFit: 'contain'}}/>
                    <span className={`text-dark text-decoration-none`}>
                        {product.name}
                    </span>
                </div>
            </Link>
        <hr/>
    </>
    )
}