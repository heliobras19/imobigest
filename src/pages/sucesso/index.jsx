import Link from 'next/link'
import styles from './styles.module.css'
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';

export default function Sucesso() {

    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <>
            <div className={`container ${styles.sucesso_container} mb-5`}>
                <div className={`row mb-md-4`}>
                    <nav aria-label="breadcrumb" className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sucesso</li>
                        </ol>
                    </nav>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <span className={`d-md-none text-center mb-4 ${styles.sucesso_title}`}>SUCESSO NO ENVIO DO SEU ORÇAMENTO</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="75vw" height="38vh" fill="#AEC837" className={`bi bi-emoji-smile mb-4 mb-md-5`} viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>

                    <span className={`d-none d-md-block text-center ${styles.sucesso_title}`}>SUCESSO NO ENVIO DO SEU ORÇAMENTO</span>

                    <span className={`text-center ${styles.sucesso_paragraph}`} >Sua solicitação foi recebida com sucesso. Em breve você receberá na caixa postal informada, <br />a resposta da sua solicitação. Em caso de dúvida, entre em contato.</span>

                    <span className="text-center">Equipe {process.env.NEXT_PUBLIC_COMPANY_NAME}</span>
                </div>
            </div>

        </>
    );
}