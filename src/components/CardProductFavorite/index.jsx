import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

import { useCart } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"
import Image from 'next/image';
import {api} from '../../../services/api';

export default function CardProductFavorite({ product, selectedColor, id }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showCardBottom, setShowCardBottom] = useState(false);
    const [productColorImage, setProductColorImage] = useState("https://place-hold.it/300x300?text=sem%20imagem&fontsize=23");
    const {cart, handleAddItemToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (product.url_image_default) {
            setProductColorImage(product.url_image_default);
        }

        if (product.images && product.images.length > 0) {
            // console.log("Images", product.images);
            setProductColorImage(product.images[0].url_image);
        }
    }, [product.images, product.url_image_default]);

    useEffect(() => {
        function setImageToProductColor(selectedColor){
            if(selectedColor){
                product.variants.map(variant => (
                    variant.features.map(feature => (
                        feature.variant_type == "Cor" && feature.variant_name.toLowerCase() == selectedColor ?
                            variant.images.map(image => (
                                //image ? setProductColorImage(image.url) : null
                                image ? setProductColorImage("https://picsum.photos/1000") : null
                            ))
                        : null
                    ))
                ))
            }
        }

        setImageToProductColor(selectedColor);
    }, [selectedColor, product]);

    const onSubmit = (data) => {
        const item = {
            product_id: product.id,
            color_product_id: null,
            reference: product.code,
            slug: product.slug,
            image: product.url_image_default,
            images: product.images,
            product_name: product.name,
            color: selectedColor,
            quantity: data.quantity,
            colors: product.colors,
        };

        handleAddItemToCart(item);
    };

    const removeFavorite = async () => {
        const res = await api.delete(`favorites/${id}`)
        if (res.status == 200) {
            alert('Produto removido dos favoritos');
            window.location.reload()
            return;
        }
    }

    return (
        <>
            <div className={`${styles.root} p-2`}>

               

                {product?.flags && product.flags.length > 0 ? 
                    <span className={styles.tag}>
                        {product.flags.map((flag, id) => (
                            <span key={`flag-a-${id}`}>
                                &nbsp;{flag.name}&nbsp;
                            </span>
                        ))}
                    </span> : ''
                }
                 <button onClick={removeFavorite} type="button" className={`${styles.btnClose} p-0`} data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </button>

                <p>
                    {product.code}
                </p>

                <Image 
                    src={productColorImage ? productColorImage : product.url_image_default}
                    alt="Foto do produto"
                    fill
                />

                <span className={styles.title}>{product.name}</span>
                <div className={`${styles.caption}`}>

                    <h2>DESCRIÇÃO</h2>
                    <p>
                        {product.description}
                    </p>

                    <h2>ESPECIFICAÇÕES</h2>
                    <p>
                        - Altura: {product.height} cm <br />
                        - Largura: {product.width} cm <br />
                        {/* - Medidas de gravação (CxL): {product.depth}  */}
                        - Peso Aproximado (g): {product.weight}g
                    </p>

                    <h2>CORES</h2>

                    {product.colors.map((color, index) => (
                        <>
                            <div
                                style={{ border: `${selectedColor?.color?.id == color.color.id ? `3px solid #000` : '1px solid #ccc'}` }}
                                className={`color ${styles.color} ${color ? `color-${color.color.name.toLowerCase()}` : ''}`}
                            ></div>
                        </>
                    ))}
                </div>
                  <Link href={`/imovel/${product.slug}`}>
                    <button className={`btn btn-dark py-3 mt-3 ${styles.button}`} >ORÇAR</button>
                </Link>
            </div >
        </>
    )
}