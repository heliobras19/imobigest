
import { useState, useEffect, useRef } from 'react';
import { api } from '../../../services/api';
import Link from 'next/link'
import styles from './styles.module.css';
import ProductSuggestion from '../../components/ProductSuggestion';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { cnpjMask, phoneMask, cepMask } from '../../components/Masks'
import axios from 'axios';
// import AddressForm from '../../components/AddressForm'

export default function Cadastro({launchs}) {
    const { register, handleSubmit, setValue, errors } = useForm({});
    const [products, setProducts] = useState([]);
    const [messages, setMessage] = useState([]);
    const [cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const router = useRouter();
    const reRef = useRef();



    const onSubmit = async (data) => {

        var button = document.getElementById('sendButton');
        button.text = 'ENVIANDO...';
        setMessage([]);
        const dataSend = {...data}  
        console.log(dataSend)
        api.post('/site/cliente', dataSend, {headers : {
            'Content-Type': 'multipart/form-data', // Importante definir o tipo de conteúdo como multipart/form-data
            }},
        )
            .then(res => {
                console.log("dados enviado", dataSend)
                console.log("res", res.data);
                button.text = 'ENVIAR CADASTRO';
                
                if (res.data.success != undefined && res.data.success == true) {
                    alert("Cadastro feito com sucesso! Faça Login com os dados cadastrados.");
                    router.push("/login");
                    //setIsLogged(true);
                    // setShowLogin(false);
                    
                    // return;
                }
            }).catch(err => {
                console.log("ERR", err);
                console.log("Erro que sera exibido ao cliente: ");
                console.log(err.response.data, typeof err.response.data);
                if(err.response != undefined) {
                    console.log(err.response.data);
                    
                    const errorData = err.response.data;
                    const errorMessages = [];
                    
                    for (const fieldName in errorData) {
                        if (errorData.hasOwnProperty(fieldName)) {
                            const fieldErrors = errorData[fieldName];
                            errorMessages.push(...fieldErrors);
                        }
                    }
                    setMessage(errorMessages);
                }

                alert(`Foram encontrados os seguintes erros ao enviar o formulário: \n${messages.join("\n")}`);
                button.text = 'ENVIAR CADASTRO';
            });
    };


    const [address, setAddress] = useState({
        cep: '',
        logradouro: '',
        district: '',
        city: '',
        state: '',
      });

      const cepMask = (value) => {
        // console.log({value})
        return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substr(0, 9); // Limita o tamanho máximo do valor em 9 caracteres
        
    };
    
    const handleCepChange = (e) => {
        const maskedCep = cepMask(e.target.value);
        setAddress((prevAddress) => ({ ...prevAddress, cep: maskedCep }));
        
        console.log(maskedCep.length);
        if (maskedCep.length === 9) {
          fetchAddress(maskedCep);
        }
      };

      const fetchAddress = async (cep) => {
        console.log('Buscar p cep:', cep)
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { data } = response;
            console.log('Data:', data);
            
            setAddress({
                cep: data.cep,
                logradouro: data.logradouro,
                district: data.bairro,
                city: data.localidade,
                state: data.uf,
            });
            console.log({address});
        } catch (error) {
          console.log('Erro ao buscar o endereço:', error);
        }
      };

    
  

    return (
        <>
            <div className={`${styles.root}`}>
                <div className={`container ${styles.catalogo_container}`}>
                    <div className={`row mb-md-4`}>
                        <nav aria-label="breadcrumb" className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Cadastro</li>
                            </ol>
                        </nav>
                    </div>

                    <div className={`row mb-md-3`}>
                        <h1 className='h3'>CADASTRO</h1>
                    </div>

                    <div className={`row mb-3 ${styles.contato_row}`} >
                        <div className="col-md-6">
                            <h3 className="mb-0">Informações</h3>
                        </div>
                    </div>
                    {messages && messages?.map((message, index) => (
                        <div className="alert alert-danger" key={`alert-message-${index}`}>
                            {message}
                        </div>
                    ))}
                    <form method="POST" id="cadastroForm" onSubmit={handleSubmit(onSubmit)} >
                        <div className={`row d-flex mb-5 ${styles.contato_row}`} >
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="text" 
                                    className="form-control"
                                      onInput={(event) => {
                                        setValue("nome", event.target.value);
                                    }}    
                                 id="name" name="name" placeholder="Nome *" required={true}  {...register("nome", { required: true })}/>
                                </div>

                                 <div className="mb-3">
                                    <input type="text" 
                                    className="form-control"
                                      onInput={(event) => {
                                        setValue("sobrenome", event.target.value);
                                    }}    
                                 id="sobrenome" name="sobrenome" placeholder="sobrenome *" required={true}  {...register("sobrenome", { required: true })}/>
                                </div>
<div className="mb-3">
                                    <select  {...register("genero", { required: true })}  className="form-control" >
                                        <option value={"M"}>Masculino</option>
                                        <option value={"F"}>Femenino</option>
                                    </select>
                                </div>
                               

                                <div className="mb-3">
                                    <input
                                        type="tel" 
                                        value={phone}
                                        {...register("phone", { required: true })}
                                        onInput={(event) => {
                                        setValue("phone", event.target.value);
                                        }}
                                        onChange={(e) => {setPhone(phoneMask(e.target.value)); setValue("telefone", e.target.value)}}
                                        maxLength={15}
                                        className="form-control" 
                                        id="phone" 
                                        name="telefone" 
                                        placeholder="Telefone *" 
                                        required={true} 
                                    />
                                </div>

                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="date"  
                                    onInput={(event) => {
                                        setValue("data_nascimento", event.target.value);
                                    }}     
                                    className="form-control" id="data_nascimento" name="data_nascimento" placeholder="E-mail *" required={true} {...register("data_nascimento", { required: true })}/>
                                </div>
                                <div className="mb-3">
                                    <input type="email"  
                                    onInput={(event) => {
                                        setValue("email", event.target.value);
                                    }}     
                                    className="form-control" id="email" name="email" placeholder="E-mail *" required={true} {...register("email", { required: true })}/>
                                </div>
                                <div className="mb-3">
                                    <div className={`row`}>
                                        <div className={`col-6`}>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Senha *" required={false} {...register("password", { required: true })}/>
                                        </div>
                                        <div className={`col-6`}>
                                            <input type="password" className="form-control" id="passwordConfirm" name="password_confirmation" placeholder="Confirmação Senha *" required={true} {...register("password_confirmation", { required: true })}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <span className={`text-secondary`}>Campos obrigatórios *</span>
                                </div>


                                <div className="mb-3">
                                    <div className={`row d-flex align-items-center justify-content-between`}>
                                        <ReCAPTCHA
                                            sitekey={`${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`}
                                            ref={reRef}
                                            size='invisible'
                                        />
                                        <div className={`col-md-8 d-flex flex-column`}>
                                            <div className="form-check align-self-end">
                                                <input className="form-check-input" type="checkbox" value="1" id="terms"/>
                                                <label className="form-check-label  mb-3 mb-md-3" htmlFor="flexCheckChecked">
                                                    Concordo com os <Link href="/termos-de-uso" target="_blank" className={`text-dark`}>Termos e Condições</Link>
                                                </label>
                                            </div>
                                            <button type="submit" className={`w-100 btn text-light ${styles.contato_submit_button}`} id="sendButton">CRIAR CONTA</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div >
            </div>
        </>
    );
}