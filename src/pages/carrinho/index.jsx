import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import styles from './styles.module.css';
import { useEffect, useState, useRef, useContext } from 'react';
import { api } from "../../../services/api";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../context/AuthContext";
import {phoneMask} from "../../components/Masks";

export default function Carrinho() {

    const reRef = useRef();
    
    const { isAuthenticated, user } = useContext(AuthContext);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const { cart, handleRemoveItemFromCart, handleColorItemFromCart } = useCart();
    const [selectedColor, setSelectedColor] = useState(cart.color);
    const [newCustomer, setNewCustomer] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [data, setData] = useState({});
    const router = useRouter();
    const [phone, setPhone] = useState()

    useEffect(() => {
        document.title = `(${cart.length} items) Carrinho de orçamento - ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`;
        console.log('CARRINHO', cart);
    }, [cart]);

    const changeColor = (item, color, index) => {
        handleColorItemFromCart(item, color);
        setSelectedColor(color);
       setValue(`items.${index}.color_product_id`, color.id)
    };

    const customerExists = async (email) => {
        try {
            // Consulta o cliente pelo email
            const res = await api.post(`/customer/by-email`, { email });
            if (res.status && res.data.success == true) {
                return {
                    name: res.data.fields.name,
                    phone: res.data.fields.phone,
                };
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    const onSubmit = async (data) => {
        console.log("Data", data);
        const customer = await customerExists(data.email);
        if (customer === false) {
            setNewCustomer(true);
            //return;
        }
        
        if (!newCustomer) {
            data = { ...data, name: customer.name, phone: customer.phone };
        }
        
        try {
            const res = await api.post(`/fast-quote`, data);
            console.log("Resultado da API", res.data);
            router.push(`/sucesso`);
            return;
        } catch (e) {
           customer == false ?  alert("Complete o formulario para criar o orçamento") : alert("Erro ao criar orçamento, por favor tente novamente mais tarde") ;
            return;
        }
    };

    const removeItemFromCart = (item) => {
        handleRemoveItemFromCart(item);
    };

    return (
        <>
            <div className={styles.bodyCart}>
                <div className="container">
                    <div className={`row pt-md-3`}>
                        <nav aria-label="breadcrumb" className="breadcrumbs mt-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Carrinho</li>
                            </ol>
                        </nav>
                    </div>

                    <h2 className="pb-4 pt-2 text-uppercase title">
                        Carrinho de orçamento
                    </h2>

                    <p className="text-header">
                        Ao solicitar um orçamento em nosso site, um pequeno cadastro será solicitado para que possamos<br />
                        responder a solicitação com valores e prazos.
                    </p>

                    <h4>Informações</h4>
                    {cart.length > 0 ? 
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className={`table-responsive ${styles.table}`}>

                                    <table className="table mb-4">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-uppercase col-1">imagem</th>
                                                <th scope="col" className="text-uppercase">descrição</th>
                                                <th scope="col" className="text-uppercase">cores</th>
                                                <th scope="col" className="text-uppercase text-end" colSpan="2">
                                                    Quantidades
                                                    <span className={styles.qtdSpan}>
                                                        <small>(Possível orçar até 3 quantidades por produto)</small>
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((item, index) => {
                                                    return (
                                                        <>
                                                            <tr className="align-middle" key={`cart-item-${index}`}>
                                                                <td scope="row" className={styles.imageTable} data-label="IMAGEM">
                                                                    {item.image ?
                                                                        <Link href={`/imovel/${item.slug}`}>
                                                                            <Image 
                                                                                src={item.image}
                                                                                alt="Produto"
                                                                                width={90}
                                                                                height={90}
                                                                            />
                                                                        </Link> : ''
                                                                    }
                                                                </td>
                                                                <td scope="col" className={styles.productTable} data-label="DESCRIÇÂO">
                                                                    <span className={`d-block d-md-none ${styles.reference}`}>
                                                                        {item.reference}<br />
                                                                    </span>
                                                                    <Link href={`/imovel/${item.slug}`} className="text-dark">
                                                                        {item.product_name}
                                                                    </Link>
                                                                    <p className={`d-none d-md-block`}>
                                                                        <span>
                                                                            {item.reference}<br />
                                                                        </span>
                                                                        {item.color_product_id != null ? 
                                                                            <small className="text-muted spectral">{item.color.color.name}</small>
                                                                            : ''
                                                                        }
                                                                    </p>
                                                                </td>
                                                                <td scope="col" className={styles.colorTable} data-label="CORES">
                                                                    {item.color_product_id != null ? 
                                                                        <small className={`d-block d-md-none ${styles.colorText}`}>{item.color.color.name}</small>
                                                                    : '' }
                                                                    
                                                                    {item.colors && item.colors.map((itemColor, i) => {
                                                                        return (
                                                                            <>
                                                                                <span
                                                                                    className={`${styles.spanColor} d-none d-md-block color color-card color-${itemColor.color?.name.toLowerCase()} ${(itemColor.id == item?.color?.id) ? styles.colorChoosed : 'border: 1px solid #ccc'}`} 
                                                                                    onClick={() => changeColor(item, itemColor, index)}
                                                                                    key={`item-cart-color-${i}`}
                                                                                ></span>
                                                                            </>
                                                                        )
                                                                    })}

                                                                </td>
                                                                <td scope="col-1" className={`text-end ${styles.quantityTable}`} data-label="QUANTIDADES">
                                                                    <input 
                                                                        type="hidden"
                                                                        name="product_id"
                                                                        value={item.product_id}
                                                                        {...register(`items.${index}.product_id`, { required: true })}
                                                                    />
                                                                    <input 
                                                                        type="hidden"
                                                                        name="color_product_id"
                                                                        value={item.color_product_id || ''}
                                                                        {...register(`items.${index}.color_product_id`)}
                                                                    />
                                                                    <input 
                                                                        type="number" 
                                                                        name="quantity1" 
                                                                        min={10} 
                                                                        className={`form-control`} 
                                                                        defaultValue={item.quantity}
                                                                        step={10}
                                                                        {...register(`items.${index}.quantity1`, { 
                                                                            required: true,
                                                                        })}
                                                                    /><br />
                                                                    <input 
                                                                        type="number" 
                                                                        name="quantity2" 
                                                                        min={10}
                                                                        className={`form-control`} 
                                                                        onChange={()=>{this._handleChangeEvent(this.state.data);}} 
                                                                        defaultValue={item.quantity}
                                                                        step={10}
                                                                        {...register(`items.${index}.quantity2`, { required: true})}
                                                                    /><br />
                                                                    <input 
                                                                        type="number" 
                                                                        name="quantity3" 
                                                                        min={10}
                                                                        className={`form-control`} 
                                                                        onChange={()=>{this._handleChangeEvent(this.state.data);}} 
                                                                        defaultValue={item.quantity}
                                                                        step={10}
                                                                        {...register(`items.${index}.quantity3`, { required: true })}
                                                                    />
                                                                </td>
                                                                <td scope="col" className={`text-end ${styles.removeTable}`} data-label="">
                                                                    <button className={`btn btn-link px-3 ${styles.buttonRemove}`} type="button" onClick={() => removeItemFromCart(item)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            
                                <div className="row pb-5">

                                    <div className="col-md-5">
                                        <p>
                                            Para enviar o orçamento, basta informar seu e-mail. Vamos checar se seu cadastro existe, qualquer problema, solicitaremos mais informações.
                                        </p>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="visually-hidden">E-mail</label>
                                            <input 
                                                type="email" 
                                                className={`form-control form-control-lg rounded-0`} 
                                                id="email" 
                                                placeholder="E-mail*" 
                                                defaultValue={user ? user.customer?.email : ''}
                                                {...register("email", { required: true })}
                                            />
                                            { errors.email && <span className="text-danger">E-mail é obrigatório</span> }
                                        </div>

                                        { newCustomer &&
                                            <>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name" className="visually-hidden">Name</label>
                                                    <input 
                                                        type="text" 
                                                        className={`form-control form-control-lg rounded-0`} 
                                                        id="name" 
                                                        placeholder="Nome*" 
                                                        {...register("name", { required: true })}
                                                    />
                                                    { errors.name && <span className="text-danger">Nome é obrigatório</span> }
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="company_name" className="visually-hidden">Nome da empresa</label>
                                                    <input 
                                                        type="text" 
                                                        className={`form-control form-control-lg rounded-0`} 
                                                        id="company_name" 
                                                        placeholder="Nome da empresa" 
                                                        {...register("company_name", { required: false })}
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="phone" className="visually-hidden">Telefone</label>
                                                    <input 
                                                        type="tel" 
                                                        className={`form-control form-control-lg rounded-0`} 
                                                        id="phone" 
                                                        value={phone}
                                                        onBlur={(e) => {setPhone(phoneMask(e.target.value))}}
                                                         maxLength={13}
                                                        placeholder="Telefone*" 
                                                        {...register("phone", { required: true })}
                                                    />
                                                    { errors.phone && <span className="text-danger">Telefone é obrigatório</span> }
                                                </div>
                                            </>
                                        }
                                        <ReCAPTCHA
                                          sitekey={`${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
                                            ref={reRef}
                                            size='invisible'
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="btn btn-dark btn-lg text-uppercase rounded-0 px-5">
                                                Concluir
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </>  
                        : 'CARRINHO VAZIO' 
                    }

                </div>
            </div>
        </>
    );

}