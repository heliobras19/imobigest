import { useState, useEffect } from 'react'
import { api } from '../../../services/api.js';
import CardProduct from '../../components/CardProduct/index.jsx';
import CardProductList from '../../components/CardProductList/index.jsx';
import Pagination from '../../components/Pagination/index.jsx';
import {useRouter} from 'next/router.js';
import Head from 'next/head.js';

export default function Resultado({ products, busca }) {
    const [productDisplayType, setProductDisplayType] = useState("grid");
    const [pages, setPages] = useState([]);
    const router = useRouter()
    useEffect(() => {
        document.title = `Produtos - ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`;

        let pages = [];
        for (let i = 1; i <= products?.last_page; i++) {
            pages.push(i);
        }
        setPages(pages);
    }, [products?.last_page]);
    const comnayName = process.env.NEXT_PUBLIC_COMPANY_NAME
    const myUrl = process.env.NEXT_PUBLIC_SITE_URL
     const getCanonicalLinkPaths = () => {
        const {page} = router.query
        const {busca} = router.query
        return 'page' in router.query ? '?busca='+busca+ '&page='+ page : '?busca='+busca
    }
    return (
        <>
        <Head>
            <title>{`Brindes Personalizados - Brindes Personalizados | ${comnayName} Brindes`}</title>
            <link rel="canonical" href={`${myUrl}/resultado`} />
            <meta property="og:title" content={`Brindes Personalizados - Brindes Personalizados | ${comnayName} Brindes`} />
            <meta property="og:description" content={`Querendo comprar Brindes Personalizados? É aqui na ${comnayName} Brindes`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={`${comnayName} Brindes`} />

            
            <meta name="DC.title" content={`Brindes Personalizados - Brindes Personalizados | ${comnayName} Brindes`} />
            <meta name="DC.creator " content={`${comnayName} Brindes`} />
            <meta name="DC.subject" content={`Querendo comprar Brindes Personalizados? É aqui na ${comnayName} Brindes`} />
            <meta name="DC.description" content={`Querendo comprar Brindes Personalizados? É aqui na ${comnayName} Brindes`} />
            <meta name="DC.publisher" content={myUrl} />
        </Head>
            
            <div className="container">
                <h1 className='h3 mb-5 mt-5'>Resultado da busca por: {busca}</h1>
                <div className={`row`}>
                    {products.data.length > 0 ?
                        products?.data?.map((product, index) => (
                            productDisplayType === "grid" 
                        ?
                            <>
                                <div className="col-md-3">
                                    <CardProduct product={product} key={`result-grid-${index}`}/>
                                </div>
                            </>
                        :   <CardProductList product={product} key={`result-list-${index}`}/>
                    )):
                        <div className={`d-flex justify-content-center`}> <h1 className='h3'> Nenhum produto encontrado</h1> </div>
                    }
                    <div className={`d-flex justify-content-center`}>
                    <Pagination pages={pages} currentPage={products?.current_page} totalPages={products?.last_page}> </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}



export async function getServerSideProps(context) {
 const page = context.query.page ? context.query.page : 1;

    let url = `/products?page=${page}`;
    const { busca } = context.query
  //  const res = await api.get(`/products?page=1&query=${busca}`);
    const res = await api.get(`${url}&query=${busca}`)
    console.log({res});

    return {
        props: {
            products: res.data.data,
            busca,

        }
    }
}