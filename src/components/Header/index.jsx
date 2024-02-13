import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { CartContext } from "../../context/CartContext"
import ProductCart from '../ProductCart';
import SearchedProduct from '../SearchedProduct';
import styles from './styles.module.css';
import { api } from '../../../services/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { parseCookies, setCookie } from "nookies"
import { CategoryContext } from '../../context/CategoryContext';
import { BannerContext }   from '../../context/BannerContext';
import { AuthContext } from "../../context/AuthContext";
import Image from 'next/image';
import Head from 'next/head';
import getFinal from '../getFinal';

const cookies = parseCookies()

export default function Header() {  
    const { signIn, isAuthenticated, logout, user } = useContext(AuthContext);
    
    const { cart, handleRemoveItemFromCart, showCartDropDown } = useContext(CartContext)
    const [showPassword, setShowPassword] = useState(false);
    const [showFullHeader, setShowFullHeader] = useState(true);
    const [searchProducts, setSearchProducts] = useState(null);
    const [products, setProducts] = useState([{}]);
    const [isLogged, setIsLogged] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [search, setSearch] = useState('');
    const [seller, setSeller] = useState(null);
    const dropdownRef = useRef(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { categories } = useContext(CategoryContext);
    const { banners } = useContext(BannerContext);
    const router = useRouter();

    useEffect(() => {   

        window.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 194) {
                setShowFullHeader(false);
            } else {
                setShowFullHeader(true);
            }
        });

        // verifica se deve ou nao abrir o box de Login
        if (router.asPath === "/?need=login") {
            setIsLogged(false);
            setShowLogin(true);
            logout()
            // console.log("VC ESTÁ LOGADO? ", isLogged);
        }

    }, [router.asPath]);

    useEffect(() => {
        async function getSearchedProducts(){
            if(searchProducts?.length > 3){
              const response = await api.get(`/products?query=${searchProducts}`);
              console.log('Aqui');
              setProducts(response.data.data);
              console.log(response.data.data);
            }else{
              setProducts(null);
            }
        }

        getSearchedProducts();
    }, [searchProducts]);

    useEffect(() => {
        async function getSeller(){
            const me = await api.get(`/me`);
            console.log({me});
            setSeller(me.data.data.user);
        }

        getSeller();
    }, []);

 const handleKeyPress = (e) => {
        e.preventDefault()
    if (e.key === 'Enter') {
      // Redirecionar para a rota desejada
      router.push(`/resultado?busca=${search}`, undefined, { shallow: true });
    }
  };

  const handleCloseDropdown = () => {
        console.log(showLogin)
       setShowLogin(false);
    };

    async function onLogin(data) {
        try {
            await signIn(data);
            setIsLogged(true);
            setShowLogin(false);
            window.location.reload();
        } catch (error) {
            alert("Email ou senha inválidos.\nCaso tenha esquecido a senha, clique em 'esqueci a senha'")
            console.log('error', error)
        }
    }

    return (
        <>
            <div className={`${!showFullHeader ? styles.headerSpaceTop : ''}`}></div>
            <div className={`border d-none d-md-block container-fluid p-0 ${styles.root} ${!showFullHeader ? styles.headerFixed : ''}`}>
                {/* <div className={`${showFullHeader ? 'headerStep' : ''}`}>.</div> */}
                <div className="container">
                    <div className={`${showFullHeader ? '' : 'd-none'} d-flex justify-content-center p-3`}>
                        <Link href="/">
                            <Image src={`/images/header/${process.env.NEXT_PUBLIC_LOGO}`} alt="" width={266} height={116}/>
                        </Link>
                    </div>
                    <div className={`row d-flex align-items-around`}>
                        <div className={`${showFullHeader ? 'col-2' : 'd-none'}  d-flex align-items-center`}></div>

                        <div className={`${showFullHeader ? 'col-8' : 'col-6'} d-flex justify-content-center align-items-center`}>
                            <ul className="nav">
                                <li className="nav-item">
                                    <Link href="/" className={`nav-link text-decoration-none text-dark ${styles.navLink}`}>Pagina inicial</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/imoveis" className={`nav-link ${styles.navLink}`}>Imoveis</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/sobre" className={`nav-link ${styles.navLink}`}>Sobre</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/sac" className={`nav-link ${styles.navLink}`}>Fale conosco</Link>
                                </li>
                            </ul>
                        </div>

                        <div className={`${showFullHeader ? 'd-none' : 'col-4'} d-flex p-0 py-3`}>
                            <Link href="/">
                                <Image src={`/images/header/${process.env.NEXT_PUBLIC_LOGO_FIXED}`}  width={200} height={89} alt=""/>
                            </Link>
                        </div>

                        <div className={`col-2 d-flex justify-content-end align-items-center`}>
                            <div className="dropdown">
                                <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search me-2 me-lg-3" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                                <div className={`${styles.containerSearch} dropdown-menu`}>
                                    <form method="GET" className="headerForm" action='/resultado'>
                                        <div className={`py-1 px-2 d-flex`}>
                                            <input type="text" className="form-control" id="searchFor" aria-describedby="searchFor" name='busca' onChange={(e) => {setSearchProducts(e.target.value); setSearch(e.target.value.toUpperCase());}} placeholder="Pesquisar por..."/>
                                            {search && <Link legacyBehavior href={`/resultado?busca=${search}`} >
                                                <a>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                    </svg>
                                                </a>
                                            </Link>}
                                        </div>
                                    </form>
                                    <hr/>
                                    <div className="offcanvas-body">
                                        {products != null &&
                                            products?.data?.map((product, index) => (
                                                <SearchedProduct key={`product-header-${index}`} product={product}/>
                                        ))}
                                        <br></br>
                                    </div>
                                     {
                                    products != null &&  
                                    <div style={{    
                                        position: 'sticky',
                                        bottom: '10px', 
                                        backgroundColor: 'white', 
                                        padding: '10px', 
                                        textAlign: 'center'}}>
                                        {search &&
                                        <Link legacyBehavior href={`/resultado?busca=${search}`} >
                                            Ver tudo      
                                        </Link>}
                                    </div>
                                }
                                </div>
                            </div>

                            <div className="dropdown" >
                                <button className="btn p-0" type="button" onClick={() => setShowLogin(true)} data-bs-toggle="dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill me-2 me-lg-3" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>
                                </button>
                                <div className={`${styles.containerLogin} dropdown-menu dropdownMenu p-4 ${showLogin ? 'show' : ''}`} ref={dropdownRef} id="dropdownHeader"  onClick={(e) => e.stopPropagation()}>
                                    {!isAuthenticated ?
                                        <>
                                            <div className="offcanvas-header d-flex align-items-center">
                                                <h5 className="offcanvas-title" id="offcanvasRightLabel">LOGIN</h5>

                                                <button type="button" onClick={handleCloseDropdown} className={`${styles.btnClose} p-0`} data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <span className={`pe-2`}>Fechar</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </button>

                                            </div>
                                            <hr />
                                            <div className="offcanvas-body">
                                                <p>Insira seu e-mail e senha para acessar sua conta:</p>

                                                <form onSubmit={handleSubmit(onLogin)} className={`${styles.loginForm}`}>
                                                    <div className="mb-3">
                                                        <div className="form-floating mb-3">
                                                            <input 
                                                                type="email" 
                                                                className="form-control" 
                                                                id="floatingInput" 
                                                                name="email" 
                                                                placeholder="Seu email..."
                                                                {...register("email", { required: true }) }
                                                            />
                                                            <label htmlFor="floatingInput">E-mail</label>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className={`${styles.passwordField} form-floating d-flex`}>
                                                            <input 
                                                                type={showPassword ? "text" : "password"} 
                                                                className="form-control" 
                                                                id="floatingPassword" 
                                                                name="password" 
                                                                placeholder="Password" 
                                                                {...register("password", { required: true }) }
                                                            />
                                                            <label htmlFor="floatingPassword">Senha</label>
                                                            <button type='button'  onClick={() => setShowPassword(!showPassword)}>
                                                                {showPassword ?
                                                                    <Image src="/images/header/view.png" alt="view" width="20" height="20"/>
                                                                :
                                                                    <Image src="/images/header/hide.png" alt="hide" width="20" height="20"/>
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 d-flex justify-content-end">
                                                        <Link href="/recuperar-senha" className={`text-dark`}>Esqueci a minha senha</Link>
                                                    </div>
                                                    <div className="mb-3">
                                                        <Link href="/cadastro" className={`text-dark`}>criar conta</Link>
                                                    </div>
                                                    <button type="submit" className={`${styles.btnLogin} btn btn-dark w-100 py-3`}>ENTRAR</button>
                                                </form>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="offcanvas-header d-flex align-items-center">
                                                <h5 className="offcanvas-title" id="offcanvasRightLabel">Bem-vindo {user.nome}</h5>
                                                
                                                <button type="button" className={`${styles.btnClose} p-0`} data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <span className={`pe-2`}>Fechar</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </button>
                                                    
                                            </div>
                                            <small className="offcanvas-title" id="offcanvasRightLabel">{user.email}</small>
                                            <hr />
                                            <div className="offcanvas-body">

                                                <div style={{cursor: 'pointer'}} onClick={() => {logout(); window.location.reload()}} className={` align-items-center`}>
                                                            Terminar sessão
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}