import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

import { useCart } from "../../context/CartContext";
import { useForm } from "react-hook-form";
import { Router, useRouter } from "next/router"
import Image from 'next/image';
import { api } from '../../../services/api';

export default function CardProductMobile({ product, selectedColor }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showCardBottom, setShowCardBottom] = useState(false);
    const [productColorImage, setProductColorImage] = useState("https://place-hold.it/300x300?text=sem%20imagem&fontsize=23");
    const {cart, handleAddItemToCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        setProductColorImage('');

        if (product.url_image_default) {
            setProductColorImage(product.url_image_default + `?timestamp=${Date.now()}`);
        }

        if (product.images && product.images.length > 0) {
            setProductColorImage(product.images[0].url_image + `?timestamp=${Date.now()}`);
        }
    }, [product]);

    const addToFavorites = (product_id) => {
        api.post(`/favorites`, {
            product_id
        }).then(response => {
            if (response.status === 200) {
                alert("Produto adicionado aos favoritos");
                return;
            }
        })
        .catch(error => {
            if (error.response.status === 401) {
                alert("Você precisa estar logado para adicionar produtos aos favoritos");
                router.push("/login");
                return;
            }
            
            alert("Erro ao adicionar produto aos favoritos");
        });
    };

    
    useEffect(() => {
        function setImageToProductColor(selectedColor){
            if(selectedColor){
                product?.variants?.map(variant => (
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
        router.push("/carrinho");
    };

    return (
        <>
            <div className={`${styles.root} p-2`} onMouseOver={() => setShowCardBottom(true)} onMouseLeave={() => setShowCardBottom(false)}>
                {product?.flags && product.flags.length > 0 ? 
                    <>
                        <span className={styles.tag}>
                        {product.flags.map((flag, id) => (
                            <span key={`flag-a-${id}`} className={styles.tagItem} style={{color: flag.color_text, background: flag.color_background}}>
                                &nbsp;{flag.name}&nbsp;
                            </span> 
                        ))}
                        </span>
                    </>
                : '' }
                <Link href={`/imovel/${product.slug}`} className={`text-decoration-none`}>
                    <div className={`container-fluid`}>
                        {product.url_image_default && (
                            <div className={styles.imageContainer}>
                                <Image
                                    src={product.url_image_default}
                                    alt="Foto do produto"
                                    fill
                                />
                            </div>
                        )}
                        <div className={`row`}>
                            <span className={`text-dark spectral ${styles.title}`}>{product.name}</span>
                        </div>

                        <div className={`row`}>
                            <span className={`${styles.sku}`}>{product.code}</span>
                        </div>
                    </div>
                </Link>
                <div className={`container-fluid`}>
                    <div className={`${styles.cardProductBottom} ${showCardBottom == false ? '' : ''}`}>
                        <br />
                        <div className="row">
                            <div className={`col-md-10`}>
                                <form onSubmit={handleSubmit(onSubmit)} className={`row justify-content-between align-items-center`}>
                                    <input 
                                        type="hidden" 
                                        defaultValue={100} 
                                        {...register("quantity", { required: true })}
                                    />
                                    <button className={`btn ${styles.btnLink}`} type="submit">ORÇAR</button>
                                </form>
                            </div>
                            <div className={`col-md-2`}>
                                <button type="button" onClick={() => addToFavorites(product.id)} className={`${styles.favoriteButton} d-none d-md-block`}>
                                    <Image alt="star" src="/images/star.svg" width="20" height="20" />
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}