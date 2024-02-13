import Link from 'next/link'
import styles from './styles.module.css';
import TeamMember from '../../components/TeamMember';
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { api } from '../../../services/api.js';
import Head from 'next/head';

export default function Sac({team, faq}) {


    const { register, handleSubmit, errors } = useForm();

    const reRef = useRef();

    const onSubmit = async (data) => {
    };

    return (
        <>
      <Head>
        <title>Entre em contato</title>
    </Head>
            <div className={`container ${styles.catalogo_container}`}>
                <div className={`row mb-md-4`}>
                    <nav aria-label="breadcrumb" className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sistema de atendimento ao Clinete</li>
                        </ol>
                    </nav>
                </div>

                <div className={`row mb-md-3`}>
                    <h3>SAC</h3>
                </div>

                <div className={`row mb-5`}>
                    <p className={`mb-0`}>Qualquer problema com corretor, ou imovel danificado, não exite em entrar em contato</p>
                </div>

                <div className={`row mb-5 ${styles.contato_row}`} >
                    <div className="col-md-3">
                        <h3 className="mb-4 mb-md-0 mb-4">Entre em contato</h3>
                    </div>
                    <div className="col-md-9 p-md-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <input type="text" name="nome" className="form-control" id="contactName" placeholder="Nome *" required="required" {...register("nome", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <input type="email" name="email" className="form-control" id="contactEmail" aria-describedby="emailHelp" placeholder="E-mail *" required="required" {...register("email", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <input type="tel" name="telefone" className="form-control" id="contactTelefone" aria-describedby="emailHelp" placeholder="Telefone *" required="required" {...register("telefone", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <select  {...register("assunto", { required: true })}  className="form-select" aria-label="Selecione uma opção" name="assunto">
                                    <option value="">Assunto *</option>
                                    <option value="Minha compra">Minha compra</option>
                                    <option value="Imovel">Imovel</option>
                                    <option value="Corretor" selected>Corretor</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" id="contactText" name="mensagem" rows="6" placeholder="Mensagem *" {...register("mensagem", { required: true })} />
                            </div>

                            <div className="d-grid mt-3">
                                <button type="submit" className={`btn text-light ${styles.contato_submit_button}`}>ENVIAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            
            </div >

        </>
    );
}
