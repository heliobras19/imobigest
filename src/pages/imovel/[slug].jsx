import {useState, useEffect, useRef} from 'react';
import { useRouter } from "next/router"
import Link from 'next/link';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useCart } from "../../context/CartContext";
import { api } from '../../../services/api.js';
import styles from './styles.module.css'
import ProductSuggestionn from '../../components/ProductSuggestion/index.jsx'
import { set, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, InstapaperIcon, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
export default function Produto({slug, imovel, colors, products}) {

    const [images, setImages] = useState([]);
    const { handleAddItemToCart } = useCart();
    const [variants, setVariants] = useState(null);
    const [showVariants, setShowVariants] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [productUrlToShare, setProductUrlToShare] = useState(null);
    const [isPendent, setIsPendent] = useState(null)
    const router = useRouter();
    const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm();
    const [loadingAddFavorite, setLoadingAddFavorite] = useState(false);

    const [cartFeedback, setCartFeedaback] = useState({ show: false, message: '', type: 'warning' });

    useEffect(() => {
        var arr = JSON.parse(localStorage.getItem("meus_imoveis")) ?? []
        if (arr.includes(imovel?.id)) {
            setIsPendent(true)
        }
    }, [imovel])

    const onSubmit = async (data) => {
        const email = JSON.parse(localStorage.getItem("usuario"))?.email
        if (email == undefined) {
            alert("Crie uma conta para puder arrendar ou comprar um imovel")
            location.href = "/cadastro"
            return
        }
       const result = await api.post("site/interesse", {imovel_id: imovel.id, email})
        if (result.status == 200) {
            alert("Os corretores foram notificados, Em breve, entrarão em contato")
            var arr = JSON.parse(localStorage.getItem("meus_imoveis")) ?? []
            arr.push(imovel.id)
            localStorage.setItem("meus_imoveis", JSON.stringify(arr))
            setIsPendent(true)
        }
    };


    // Referência para o componente ImageGallery

    if (router.isFallback) {
        return (
            <>
                <div className="d-flex justify-content align-items-center">
                    <div className="spinner-border text-primary" role="status">
                        Carregando...
                    </div>
                </div>
            </>
        );
    }

    const myUrl = process.env.NEXT_PUBLIC_SITE_URL
    return (
    <>
         <Head>
                <title>{ `${imovel.nome} - ${imovel.descTipo} | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`}</title>
              </Head>
        <div className={`container`}>
            <ToastContainer
                className={`p-3 ${ cartFeedback.show ? 'd-block d-md-none' : 'd-none' }`}
                position='top-center'
                style={{ zIndex: 10, position: 'fixed' }}
            >
                <Toast
                    bg={cartFeedback.type}
                >
                    <Toast.Body className='text-light text-center'>
                        {cartFeedback.message}
                        {cartFeedback.type === 'success' && (
                            <>
                                <br />
                                <Link href="/carrinho" className='btn btn-link text-light'>
                                    ver carrinho
                                </Link>
                            </>
                        )}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <div className={`${styles.breadCrumb} row mb-md-4`}>
                <nav aria-label="breadcrumb" className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item">{imovel.nome}</li>
                    </ol>
                </nav>
            </div>
            <div className="row mb-md-5" ></div>

            <div className={`row d-md-none`}>
                <h4>{imovel.nome}</h4>
                <p className={`${styles.code} mb-4`}>{imovel.descTipo}</p>
            </div>

            <div className={`${styles.containerRight} row mb-md-5`} >
                <div className={`col-md-6 mb-5`} >
                    <div className={`d-flex justify-content-center`} >
            <Carousel style={`${styles.customImageGallery}`}>
                <div>
                    <img src="/images/banners/banner2.jpg" />
                </div>
                <div>
                    <img src="/images/banners/banner3.jpg" />
                </div>
                <div>
                    <img src="/images/banners/banner4.jpg" />
                </div>
            </Carousel>
                    </div>
                </div>
                <div className={`col-md-6 `}>
                    <div className={`p-3  mb-4 align-items-center`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type='hidden' value={imovel.id}  name='casa_id'/>
                            <h1 className={`d-none d-md-block h4`}>{imovel.nome}</h1>
                            <p className={`${styles.code} mb-4 d-none d-md-block`}>{imovel.descTipo}</p>
                            <h2 className={`d-none d-md-block`} style={{ fontSize: '16px', margin: '0', marginBottom: '20px', padding: '0',  lineHeight: '1.5' }}>{imovel.descricao}</h2>
                            <div className={`row d-flex mb-4 px-2`}>

                                <div className={`col-6`}>
                                  {isPendent ? <button type="submit" disabled className={`btn btn-dark w-100`} style={{fontSize: '13px', height: '60px', borderRadius: '0px', backgroundColor: '#000'}}>{"NEGOCIAÇÃO PENDENTE"}</button> : <button type="submit" className={`btn btn-dark w-100`} style={{fontSize: '13px', height: '60px', borderRadius: '0px', backgroundColor: '#000'}}>{imovel.transacao == "V" ? "COMPRAR" : "ARRENDAR"}</button> }  
                                </div>
                            </div>
                        </form>
                        <div className={`d-none d-md-block row d-flex align-items-center`}>
                            <span style={{width: 'auto'}}>Compartilhar: </span>
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

            {/* <div className={`row mb-md-5`}>
                <div className={`d-none d-md-block col-md-6 `}>
                    <p>{imovel.description}</p>
                </div>
            </div> */}

            <div className={`d-block d-md-none row d-flex align-items-center mb-5 mt-5`}>
                <span style={{width: 'auto'}}>SHARE: </span>
                <Link href={`https://www.facebook.com/sharer/sharer.php?u=${myUrl}/${router.asPath}`} target="_blank" className={`button p-0 pe-2 btn btn-light`} style={{width: 'auto', border: 'none'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                </Link>
                <Link href={`https://api.whatsapp.com/send?text=Veja esse brinde no ${process.env.NEXT_PUBLIC_COMPANY_NAME}! ${myUrl}/${router.asPath}`} target="_blank" className={`button p-0 pe-2 btn btn-light`} style={{width: 'auto', border: 'none'}}>
                    <Image alt="Whatsapp" src="/images/whatsapp.svg" width="20" height="20" />
                </Link>
            </div>

        </div>
   </> );
}

function getProductsFromCategories(categories) {
    const categoriesIds = categories.map(category => category.id);
    return api.get(`/products?categories=${categoriesIds.join(',')}&limit=3`);
}
    
export async function getStaticPaths() {

    /*const slugs = [];
    const res = await api.get('/products/latest/500');
    const products = res.data.data;
    products.forEach(item => {
        if (item.images.length > 0) {
            slugs.push({params: {slug: item.slug}});
        } 
    });*/

    // console.log("Items", slugs);

    return {
        paths: [],
        fallback: true,
    };

}

export async function getStaticProps (context) {
    try{
    
    const slug = context.params.slug; // getStaticProps
    const imovel = await api.get(`/site/imoveis?slug=${slug}`);

    return {
        props: {
            slug,
            imovel: imovel.data
        },
        // 7 days in seconds
        revalidate: 60 * 60 * 24 * 3,
    }
    }catch(error){
    return { notFound: true };
  }
}
