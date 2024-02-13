
import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { api } from '../../services/api';
import Carousel from '../components/Carousel'
import CategoryBanners from '../components/CategoryBanners'
import ProductSuggestion from '../components/ProductSuggestion'
import OurServices from '../components/OurServices'
import CustomerTestimonial from '../components/CustomerTestimonial'
import InstagramPosts from '../components/InstagramPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import LgpdBanner from '../components/lgpdBanner';

export default function Home({ 
  launchs, 
 }) {

    const [showVideoModal, setShowVideoModal] = useState(false);
    const handleOpenVideoModal = () => setShowVideoModal(true);
    const handleCloseVideoModal = () => setShowVideoModal(false);
     const myUrl = process.env.NEXT_PUBLIC_SITE_URL
    const banner = [
        {
            file_url: "/images/banners/banner1.jpg",
            file: "/images/banners/banner1.jpg",
            link: "",
            id: "1"
        },
        {
            file_url: "/images/banners/banner5.png",
            file: "/images/banners/banner5.png",
            link: "",
            id: "1"
        }
    ]

 const bannerSecundario = [
        {
            file_url: "/images/banners/Imobiliario_01.png",
            file: "/images/banners/banner2.jpg",
            link: "",
            id: "1"
        },
        {
            file_url: "/images/banners/Imobiliario_02.png",
            file: "/images/banners/banner3.jpg",
            link: "",
            id: "2"
        },
        {
            file_url: "/images/banners/Imobiliario_03.png",
            file: "/images/banners/banner4.jpg",
            link: "",
            id: "3"
        }
    ]
  return (
    <>
      <Head>
        <title>{`IMOBIGEST`}</title>
    </Head>
      <div className={`mb-4`}>
        <Carousel banners={banner} />
      </div>

      <div className={`mb-5`}>
        <CategoryBanners banners={bannerSecundario} />
      </div>

      <div className={`mb-md-5`}>
        {launchs && launchs.length > 0 && (
          <ProductSuggestion title="Novos imoveis" description={"Realize o seu sonho da casa propria"} products={launchs} />
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  
  let launchs = [];
  try {
    const resLaunchs = await api.get('/site/imoveis');
    launchs = resLaunchs.data || [];
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      launchs,
    },
    revalidate: 10,
  }
}