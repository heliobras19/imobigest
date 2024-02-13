import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { api } from '../../../services/api';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, InstapaperIcon, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import {CompanyContext} from '../../context/CompanyContext';

export default function CardProductList({ product, color }) {
    const [showCardBottom, setShowCardBottom] = useState(false);
    const [selectedColor, setSelectedColor] = useState({})
    const [images, setImages] = useState([]);
    const {cart, handleAddItemToCart } = useCart();
    const router = useRouter();
    const contacts = useContext(CompanyContext)
    const [productUrlToShare, setProductUrlToShare] = useState(null);

    useEffect(() => {
        console.log({color})
    //    setSelectedColor(color);
        productImages(product);
        // setImageToProductColor(color);
         setSelectedColor(null);
        setProductUrlToShare(`http://${window.location.hostname}/imovel/${product.slug}`);
    }, [color, product]);

    function productImages(product){
        product.images?.map(image => {
            setImages((arr) => [...arr, image.url_image]);
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        var selectedColorId = null;
        if (!selectedColor && product.colors.length > 0) {
            alert("Selecione uma cor");
            return;
        } 
        if (selectedColor) {
            selectedColorId = selectedColor.id
        }

        const item = {
            product_id: product.id,
            color_product_id: selectedColorId,
            reference: product.code,
            slug: product.slug,
            image: product.images[0].url_image,
            images: product.images,
            product_name: product.name,
            color: selectedColor,
            quantity: data.quantity,
            colors: product.colors,
        };

        handleAddItemToCart(item);
        // router.push("/carrinho");
    };

    const changeColor = (color) => {
        console.log("Color", color);
        setSelectedColor(color);
    }

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

    return (
        <div className={`${styles.root} p-2`} onMouseOver={() => setShowCardBottom(true)} onMouseLeave={() => setShowCardBottom(false)}>
            <div className={`container-fluid`} style={{borderBottom: '1px solid #000'}}>
                <div className={`row p-3  mb-4 align-items-center`}>
                    <div className={`col-4 ${styles.root}`}>
                        
                        {product?.flags && product.flags.length > 0 && (
                            <span className={styles.tag}>
                                {product.flags.map((flag, id) => (
                                    <span key={`flag-b-${id}`}>
                                        {flag.name}&nbsp;
                                    </span>
                                ))}
                            </span>
                        )}

                        <Swiper tag="section"
                            id="slide-destaques"
                            className="imageSlide"
                            navigation
                            spaceBetween={0}
                            slidesPerView={1}
                            loop
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation]}
                        >
                            {(images != undefined) && (
                                images.map((image, index) => {
                                    return (
                                        <SwiperSlide key={`slide-${index}`}>
                                            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                                <Image 
                                                    alt="Imagem" 
                                                    src={image} 
                                                    className={`img-fluid`}
                                                    fill
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            )}

                            {images == undefined && (
                                <div className="col-md-12 text-center">Carregando imagens...</div>
                            )}
                        </Swiper>

                    </div>
                    <div className={`col-5`}>
                        <h4>{product.name}</h4>
                        <p className={`${styles.code} mb-4`}>{product.code}</p>
                        <div className={`${styles.description}`}>
                            <p className={`${styles.descriptionText}`}>
                                {product.description}
                                Medidas aproximadas para gravação (CxL): {product.width}cm x {product.depth}cm
                            </p>
                            
                        </div>

                        <div className={`${styles.containerLinks} row d-flex mb-4`}>
                            <Link href="/termos-de-uso" target='_blank' className={`text-dark`}>Termos e Condições</Link>
                            <Link href="/termos-de-uso#garantia" target='_blank' className={`text-dark`}>Garantia</Link>
                           {contacts?.whatsapp_contact && <Link target='_blank' href={`https://wa.me/55${contacts?.whatsapp_contact}`} className={`text-dark`}>Fale com um especialista</Link> }
                        </div>

                        <div className={`${styles.containerTitleColors} row d-flex align-items-center mb-3`}>
                            <p>
                                <span className={`fw-bold`}>CORES: </span>
                                {selectedColor && selectedColor.color?.name}
                            </p>

                        </div>

                        <div className={`mb-4`}>
                            {product.colors?.map((color, index) => (
                                <>
                                    <label 
                                        key={`color-${index}`}
                                        type="button" 
                                        className={`p-0 mx-2 ${styles.productColor}`} 
                                        onClick={() => changeColor(color)} 
                                    >
                                        <div
                                            style={{ height: '30px', width: '30px', borderRadius: '50%', border: `${selectedColor != null && selectedColor?.color?.id == color?.color?.id ? `3px solid #000` : '1px solid #ccc'}` }}
                                            className={`color ${color ? `color-${color.color?.name?.toLowerCase()}` : ''}`}
                                        ></div>
                                    </label>
                                </>
                            ))}
                        </div>
                    </div>

                    <div className={`col-3`}>
                        <div className={`row mb-4 px-2 d-flex justify-content-end`}>
                            <button onClick={() => addToFavorites(product.id)} className={`button p-0 pe-2 d-flex align-items-center`} style={{width: 'auto', backgroundColor: 'transparent', border: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={`row mb-4 px-2`}>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    defaultValue={100} 
                                    step={10}
                                    min={10}
                                    {...register("quantity", { required: true })} 
                                    style={{height: '60px', maxWidth: '110px', borderRadius: '0px'}}
                                />
                            </div>
                            <div className={`row mb-4 px-2 d-flex justify-content-end`}>
                                <button type="submit" className={`btn btn-dark`} style={{fontSize: '13px', height: '60px', borderRadius: '0px', backgroundColor: '#000'}}>ADICIONAR AO ORÇAMENTO</button>
                            </div>
                        </form>
                        <div className={`row d-flex align-items-center justify-content-center`}>
                            <span className={`p-0 pe-2 mb-3`} style={{width: 'auto'}}>Compartilhar: </span>

                            <div className="d-flex justify-content-center">
                                <FacebookShareButton url={productUrlToShare} className='mx-1'>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                
                                <WhatsappShareButton url={productUrlToShare} className='mx-1'>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                                
                                <TwitterShareButton url={productUrlToShare} className='mx-1'>
                                    <TwitterIcon size={32} round={true} />
                                </TwitterShareButton>

                                <LinkedinShareButton url={productUrlToShare} className='mx-1'>
                                    <LinkedinIcon size={32} round={true} />
                                </LinkedinShareButton>
                                
                                <EmailShareButton url={productUrlToShare} className='mx-1'>
                                    <EmailIcon size={32} round={true} />
                                </EmailShareButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}