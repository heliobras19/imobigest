import Link from 'next/link'
import styles from './styles.module.css'
import { useEffect } from 'react';
import { api } from '../../../services/api.js';
import Head from 'next/head';

export default function Politica({policy}) {
    return (
        <>
            <Head>
                <meta name="description" content={`Politicas de privacidade, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="author" content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes Personalizados`} />
                <meta name="robots" content="all" />
                <title>{`Politicas de privacidade - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}</title>
                
                <meta property="og:title" content={`Politicas de privacidade - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta property="og:description" content={`Politicas de privacidade, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />

                
                <meta name="DC.title" content={`Politicas de privacidade - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta name="DC.creator " content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta name="DC.subject" content={`Politicas de privacidade, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="DC.description" content={`Politicas de privacidade, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="DC.publisher" content={`${process.env.NEXT_PUBLIC_SITE_URL}`}></meta>
            </Head>
            <div className={`container ${styles.politica_container}`}>
                <div className={`row mb-md-4 `}>
                    <nav aria-label="breadcrumb" className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Política de privacidade</li>
                        </ol>
                    </nav>
                </div>
                <div className={`d-none d-md-block row mb-md-5`}>
                    <h3>POLÍTICA DE PRIVACIDADE</h3>
                </div>
                <div className="row">
                    <div className={`col-md-3 d-none d-md-block `}>
                        <h5 className='text-center'>Políticas de Privacidade</h5>
                    </div>
                    <div className={`col-md-9`}>
                        {
                        policy && <div dangerouslySetInnerHTML={{ __html: policy }}></div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {

    const res = await api.get('/company');

    return {
        props: {
            policy: res.data.company.policy_privacy,
        },
        // 7 days
        revalidate: 604800,
    }
}