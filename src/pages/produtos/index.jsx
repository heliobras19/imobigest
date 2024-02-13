import React, {useState, useEffect, useContext} from 'react';
import Link from 'next/link';
import { api } from '../../../services/api.js';
import CardProduct from '../../components/CardProduct/index.jsx';
import CardProductList from '../../components/CardProductList/index.jsx';
import styles from './styles.module.css'
import { useRouter } from 'next/router.js';
import { useCategory } from '../../context/CategoryContext.jsx';
import Pagination from '../../components/Pagination/index.jsx';
import Image from 'next/image.js';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export default function Produtos({ 
    products,
    totalProducts,
    currentPage,
    totalPages,
    selected_color,
    banners,
    flags,
    productsPerPage
}) {

    const [productDisplayType, setProductDisplayType] = useState("grid");
    const { categories } = useCategory();
    const [pages, setPages] = useState([]);
    const router = useRouter();

    const [ignorePriceFilter, setIgnorePriceFilter] = useState(true);
    const [rangeValue, setRangeValue] = useState({ min: 5, max: 50 });
    const handleValue = (value) => {
        console.log("new values", value);
        setRangeValue(value);
    }
    
    useEffect(() => {
        document.title = `Produtos - ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`;

        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        setPages(pages);
    }, [totalPages]);

    useEffect(() => {

        if (!ignorePriceFilter) {
            setTimeout(() => {
                console.log("Chamar a URL para filtrar por faixa de preço", rangeValue);
                router.push(`/produtos?preco=${rangeValue.min}-${rangeValue.max}`);
            }, 500);
        } else {
            setIgnorePriceFilter(false);
        }

    }, [rangeValue]);

    const redirectBySort = (value) => {
        const order = value.split('=');
        const currentParams = router.query;

        router.push({
            pathname: `/produtos`,
            query: {
                ...currentParams,
                ['order']: order[0],
                ['sort']:  order[1],
            },
        });
    }
    
    return (
        <div className={`container`}>
            <div className="row mb-md-4" style={{paddingTop: '50px'}}>
                <nav aria-label="breadcrumb" className="breadcrumbs">
                    <ol className={`breadcrumb`}>
                        <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                        <li className="breadcrumb-item">Brindes</li>
                    </ol>
                </nav>
            </div>

            <div className="row mb-md-5" >
                <h3>Todos os produtos</h3>
            </div>

            <div className={`row`}>
                <div className={`d-none d-md-block col-3`}>
                    {/*
                    <div className={`px-2 mb-5 pb-4`}>
                        <hr />

                        <h5 className={`mt-4 mb-5 pb-2`}>Faixas de Preços (unidade)</h5>

                        <InputRange
                            // draggableTrack
                            maxValue={100}
                            minValue={1}
                            formatLabel={value => `R$ ${value}`}
                            allowSameValues={false}
                            step={10}
                            value={rangeValue}
                            onChange={value => handleValue(value)} 
                            onChangeComplete={value => console.log('VALOR ATUAL', value)}
                        />
                    </div>*/
                    }

                    {categories && categories?.length > 0 ?   
                        <>
                            <hr />
                            <h4 className={`px-0 mb-4`}>Categorias</h4>
                            <div className={styles.categoryMenu}>
                                {categories?.map(category => (
                                    <Link key={category.id} href={`/categorias/${category.slug}`} className="btn btn-link btn-block">
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </>                 
                    : null}
                    
                    { banners && banners?.map(banner => {
                        <div className={`mt-5`}>
                            <Image alt={banner.name} width="200" height="300" src={banner.file_url} className={`img-fluid p-0`} />
                        </div>
                    })}
                </div>

                <div className={`col-md-9`}>

                    <div className={`row mb-4 d-flex justify-content-between`}>
                        <div className={`col-12 col-md-5 d-flex align-items-center`}>
                            {/* Filtro Mobile */}
                            <div className={`d-md-none col-5 col-md-6 me-3 dropdown`}>
                                <button className="btn btn-dark d-flex align-items-center dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    FILTROS
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1 bi bi-funnel-fill" viewBox="0 0 16 16">
                                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                                        </svg>
                                </button>
                                <ul className="dropdown-menu px-5" style={{width: '98vw', borderRadius: '0px'}}>
                                    {categories && categories?.length > 0 ?   
                                        <>
                                            <h4 className={`px-0 mb-4`}>Categorias</h4>
                                            <div className={styles.categoryMenu}>
                                                {categories?.map(category => (
                                                    <Link key={category.id} href={`/categorias/${category.slug}`} className="btn btn-link btn-block">
                                                        {category.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>                 
                                    : null}

                                    <div className={`row my-4`}>
                                        <span className={`mb-4`} style={{borderTop: "1px solid #707070"}}></span>

                                        <div className="d-flex justify-content-between p-0">
                                            <Link href="/produtos" className="btn btn-link d-flex align-items-center text-dark text-decoration-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg me-1" viewBox="0 0 16 16">
                                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                </svg>
                                                LIMPAR
                                            </Link>

                                            {/* <button type="button" className="btn btn-dark px-5 py-2" style={{borderRadius: '0px'}}>APLICAR</button> */}
                                        </div>
                                    </div>
                                </ul>
                            </div>

                            <div className={`col-6 me-md-3`}>
                                <select
                                    name="sort"
                                    id="sort"
                                    className={`${styles.selectOrder} form-select`}
                                    onChange={(e) => { redirectBySort(e.target.value) }}
                                >
                                    <option value="">ORDENAR POR</option>
                                    {/*<option value="cost=asc">Preço Crescente</option>
                                    <option value="cost=desc">Preço Decrescente</option>*/}
                                    <option value="name=asc">A-Z</option>
                                    <option value="name=desc">Z-A</option>
                                    <option value="code=asc">Referência</option>
                                </select>
                            </div>
                            <div className={`col-3 col-md-6 d-none d-lg-flex align-items-center`}>
                                <strong className={`d-none d-md-block`}>Ver como</strong>
                                <button className={`btn`} onClick={() => setProductDisplayType('grid')}>
                                    {productDisplayType === "grid" ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-grid-fill" viewBox="0 0 16 16">
                                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                                        </svg>
                                    : 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                        </svg>
                                    }
                                </button>
                                <button className={`btn`} onClick={() => setProductDisplayType('list')}>
                                    {productDisplayType === "list" ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hdd-stack-fill" viewBox="0 0 16 16">
                                            <path d="M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"/>
                                        </svg>
                                    :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-hdd-stack" viewBox="0 0 16 16">
                                            <path d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z"/>
                                            <path d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                                            <path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                                        </svg>
                                    }
                                </button>
                            </div>
                        </div>
                        {/* <div className={`col-4 p-0 d-none d-md-flex align-items-center`}>
                            <div className={`col`}>
                            </div>
                            <h1></h1>
                        </div> */}
                        <div className={`col-12 col-md-3 p-0 d-none d-md-flex align-items-center`}>
                            <div className={`col-12 d-flex justify-content-end align-items-center`}>
                                <span className={`pe-2`}>Página</span>
                                {/*<input type="text" defaultValue={current_page} style={{width: '40px'}} className={`me-2`}/> */}
                                <span>{currentPage}</span>
                                <span className={`mx-1`}>/</span>
                                <span>{totalPages}</span>
                            </div>
                        </div>
                    </div>

                    <div className={`row`}>
                        { Array.isArray(products) ? (
                            products.map((product, index) => (
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

                    <div className={`d-flex justify-content-center`}>
                        <Pagination pages={pages} currentPage={currentPage} totalPages={totalPages}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}

const getApiUrl = (params) => {
    // iterable object with key-value pairs
    const entries = Object.entries(params);
    let url = '';
    for (const [key, value] of entries) {
        if(value != null && key != 'page' && key != 'slug') {
            url = `${url}&${key}=${value}`;
        }
    }
    return url;
}

export async function getServerSideProps(context) {

    // const page = context.params.page ? context.params.page : 1;
    const page = context.query.page ? context.query.page : 1;
    // const color = (context.query.variant == 'cor' && context.query.value) ? context.query.value : null;
    
    let res;
    // let url = `/products?page=${page}${getApiUrl(context.params)}`;
    let url = `/products?page=${page}${getApiUrl(context.query)}`;
    res = await api.get(url);

    /* if(color != null){
        url = `${url}&variant=cor&value=${color}`;
    } */

    const resBanner = await api.get(`/banners/by-local/banner-lateral`);
    const banners = resBanner.data;

    return {
        props: {
            products: res.data.data.data,
            totalProducts: res.data.data.total,
            currentPage: res.data.data.current_page,
            totalPages: res.data.data.last_page,
            productsPerPage: res.data.data.per_page,
            // selected_color: color,
            banners: banners,
            flags: await getFlags(),
            categories: await getCategories(),
        },
        // revalidate: 60 * 60 * 2, // 2 hours
    }
}

async function getFlags() {
    try {
        const res = await api.get(`/flags`);
        return res.data.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function getCategories() {
    try {
        const res = await api.get(`/categories`);
        console.log('Lidia', res);
        return res.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}