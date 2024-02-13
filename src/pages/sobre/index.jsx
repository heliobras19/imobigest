import Link from 'next/link'
import styles from './styles.module.css'
import { useEffect, useState, useRef } from 'react';
import { api } from '../../../services/api.js';
import Image from 'next/image';
import Head from 'next/head';

export default function Sobre({ about_us, contact_phone, contact_email, image }) {
const myUrl = process.env.NEXT_PUBLIC_SITE_URL
    return (
        <>
            <Head>
             
                <title>{`Empresa de Imoveis - | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}</title>
                
            </Head>
            <div className={`container ${styles.sobre_container} mb-5`}>
                <div className={`row ${styles.sobre_breadcrumb}`}>
                    <nav aria-label="breadcrumb" className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sobre</li>
                        </ol>
                    </nav>
                </div>

                <div>
                <strong>Bem-vindo à ImobiGest - Sua Jornada para o Lar Perfeito</strong><br/>

Na ImobiGest, estamos comprometidos em tornar realidade o sonho de encontrar o lar perfeito para você. Somos mais do que uma empresa de imóveis; somos seus parceiros na busca por um espaço que não apenas acomode sua vida, mas a eleve.<br/><br/>

<strong>Nossa Experiência:</strong><br/>
Com anos de experiência no mercado imobiliário, construímos uma reputação sólida baseada em confiança, transparência e excelência no atendimento ao cliente. Nosso time de especialistas está aqui para guiar você em cada passo do processo, desde a procura até a aquisição do imóvel dos seus sonhos.
<br/><br/>
<strong>Variedade de Opções:</strong><br/>
Entendemos que cada pessoa é única, e é por isso que oferecemos uma ampla variedade de opções de imóveis. Seja você um comprador à procura da casa dos sonhos, um investidor buscando oportunidades promissoras ou alguém interessado em locações de qualidade, temos a solução certa para você.
<br/><br/>
<strong>Compromisso com a Qualidade:</strong><br/>
A qualidade é a pedra angular do nosso serviço. Trabalhamos apenas com propriedades que atendem aos mais altos padrões, garantindo que cada cliente tenha uma experiência de vida excepcional em seu novo lar.
<br/><br/>
<strong>Inovação e Tecnologia:</strong><br/>
Estamos na vanguarda da inovação no setor imobiliário. Utilizamos tecnologias avançadas para simplificar o processo de busca por propriedades, facilitar transações e oferecer uma experiência moderna e eficiente.
<br/><br/>
<strong>Comprometimento Sustentável:</strong><br/>
Além de ajudar você a encontrar a casa perfeita, também nos comprometemos com práticas sustentáveis. Trabalhamos para promover o desenvolvimento responsável, contribuindo para comunidades vibrantes e ambientalmente conscientes.
<br/><br/>
Na ImobiGest, não vendemos apenas imóveis; realizamos sonhos e construímos lares. Junte-se a nós nessa jornada emocionante em busca do espaço que você chama de seu. Seu lar perfeito está apenas a um passo de distância.
                </div>
            </div>

        </>
    );
}


