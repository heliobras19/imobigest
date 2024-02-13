import Link from 'next/link';
import styles from './styles.module.css'
import { api } from '../../../services/api.js';
import { useEffect } from 'react';
import Head from 'next/head';

export default function Termos({terms}) {
    return (
        <>
              <Head>
                <meta name="description" content={`Termos de uso, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="author" content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes Personalizados`} />
                <meta name="robots" content="all" />
                <title>{`Termos de uso - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}</title>
                
                <meta property="og:title" content={`Termos de uso - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta property="og:description" content={`Termos de uso, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />

                
                <meta name="DC.title" content={`Termos de uso - Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta name="DC.creator " content={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`}/>
                <meta name="DC.subject" content={`Termos de uso, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="DC.description" content={`Termos de uso, Brindes Personalizados | ${process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes`} />
                <meta name="DC.publisher" content={`${process.env.NEXT_PUBLIC_SITE_URL}`}></meta>
            </Head>
            <div className={`container ${styles.termos_container}`}>
                <div className={`row ${styles.termos_breadcrumb}`}>
                    <nav aria-label="breadcrumb" className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Termos de uso</li>
                        </ol>
                    </nav>
                </div>
                <div className={`d-none d-md-block row ${styles.termos_title}`}>
                    <h3>TERMOS DE USO</h3>
                </div>
                <div className="row">
                    <div className={`col-md-3 d-none d-md-block `}>
                        <h5 className='text-center'>Termos de Uso</h5>
                    </div>
                    <div className={`col-md-9`}>
                        {terms?.content ? 
                            <div dangerouslySetInnerHTML={{ __html: terms.content }}></div>
                            : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const content = await api.get(`/company`);
    const terms = content.data.terms_of_use || [];

    return {
        props: {
            terms: terms,
        },
        // 7 days
        revalidate: 604800,
    }
}
