import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Image from 'next/image';
import {useContext} from 'react';
import {CompanyContext} from '../context/CompanyContext';

export default function Layout({ children }) {
    const contacts = useContext(CompanyContext)
    return (
        <>
            <Header />
            {contacts?.whatsapp_contact && 
            <div style={{ position: 'fixed', right: '10px', top: '70vh', zIndex: 9999 }}>
                <Link target='blank' href={`https://wa.me/55${contacts?.whatsapp_contact}`}>
                    <Image alt="WhatsApp" height="67" width="67" src="/images/layout/whatsapp.png" className={`img-fluid`} style={{width: 67, height: 67}}/>
                </Link>
            </div>
            }

            <main>{children}</main>

            <Footer />
        </>
    )
}