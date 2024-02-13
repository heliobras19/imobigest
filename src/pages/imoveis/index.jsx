import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import { api } from '../../../services/api.js';
import CardProduct from '../../components/CardProduct/index.jsx';
import CardProductList from '../../components/CardProductList/index.jsx';
import styles from './styles.module.css'
import { useCategory } from '../../context/CategoryContext.jsx';
import Pagination from '../../components/Pagination/index.jsx';
import Image from 'next/image.js';

export default function Imoveis({ 
    imoveis,
    totalimoveis,
    currentPage,
    totalPages,
    selected_color,
    banners,
    flags,
    imoveisPerPage
}) {

    const [productDisplayType, setProductDisplayType] = useState("grid");
    const { categories } = useCategory();
    const [pages, setPages] = useState([]);
    
    useEffect(() => {
        document.title = `Imoveis - ${process.env.NEXT_PUBLIC_COMPANY_NAME}`;

        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        setPages(pages);
    }, [totalPages]);
    
    return (
        <div className={`container`}>
            <div className="row mb-md-4" style={{paddingTop: '50px'}}>
                <nav aria-label="breadcrumb" className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item">Todos imoveis</li>
                    </ol>
                </nav>
            </div>

            <div className="row mb-md-5" >
                <h3>Todos os imoveis</h3>
            </div>

            <div className={`row`}>

                <div className={`col-md-9`}>
                    <div className={`row`}>
                        { Array.isArray(imoveis) ? (
                            imoveis.map((product, index) => (
                                productDisplayType === "grid" ?
                                    <>
                                        <div className="col-md-4 col-6" key={`product-grid-${index}`}>
                                            <CardProduct product={product}/>
                                        </div>
                                    </>
                                :   <CardProductList product={product} key={`product-list-${index}`}/>
                            ))) : (
                                <p>Carregando produtos...</p>
                        )}
                    </div>

                   
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
     let launchs = [];
    const resLaunchs = await api.get('/site/imoveis');
    launchs = resLaunchs.data || [];
    return {
        props: {
            imoveis: launchs
        }
    }
}