
import { useState, useEffect, useRef, useContext } from 'react';
import { api } from '../../../services/api';
import Link from 'next/link'
import styles from './styles.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import Head from 'next/head';

export default function Recuperar() {
    const [messages, setMessages] = useState([]);
    const { register, handleSubmit, errors } = useForm({});

    const { signIn } = useContext(AuthContext);

    const reRef = useRef();

    const router = useRouter();

   

    const onSubmit = async (data) => {
        const res = await signIn(data);
        if (res) {
            console.log()
            //window.location.href = "/"
            return;
        }
        setMessages(['Usuário ou senha inválidos']);
    };    

    return (
        <>
            <Head>
                <title>{`Login - ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}</title>
            </Head>
            <div className={`${styles.root}`}>
                <div className={`container ${styles.catalogo_container}`}>
                    <div className={`row mb-md-4`}>
                        <nav aria-label="breadcrumb" className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Login</li>
                            </ol>
                        </nav>
                    </div>

                    <div className={`row mb-md-3`}>
                        <h3>LOGIN</h3>

                        <p>Informe seus dados abaixo para acessar sua área de cliente</p>
                    </div>

                    {messages && messages?.map((message, index) => (
                        <div className="alert alert-danger" key={`alert-message-${index}`}>
                            {message}
                        </div>
                    ))}
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className={`row d-flex mb-5 ${styles.contato_row}`} >
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <input type="email" className="form-control" id="email" name="email" placeholder="E-mail *" required={true} {...register("email", { required: true })}/>
                                </div>
                                
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Senha *" required={true} {...register("password", { required: true })}/>
                                </div>

                                <div className={`text-left mb-2`}>
                                    <a className="btn btn-link btn-sm text-decoration-none text-dark">
                                        <Link href="/recuperar-senha">
                                            esqueci a senha
                                        </Link>
                                    </a>
                                </div>

                                <div className="mb-3">
                                    <div className={`row d-flex align-items-center justify-content-between`}>
                                        <ReCAPTCHA
                                            sitekey="6LcF3F0mAAAAAMZFnGB2AR896bkUngmwivNTRKj4"
                                            ref={reRef}
                                            size='invisible'
                                        />
                                        
                                        <div className={`col-md-6 d-flex flex-column`}>
                                            <button type="submit" className={`w-100 btn text-light ${styles.contato_submit_button}`} id="sendButton">EFETUAR LOGIN</button>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        Não tem cadastro, <Link href="/cadastro" className={`text-dark`}>clique aqui</Link>
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