import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';

export default function FooterBottom() {
    return (
        <div  style={{backgroundColor: `#${process.env.NEXT_PUBLIC_BOTTON_COLOR}`, color: process.env.NEXT_PUBLIC_COMPANY_NAME=="Pepperone" ? "#959595" : "#fff" }} className={`container-fluid p-0 ${styles.root}`}>

            <div className="container">
                <div className={`row ${styles.line3}`}>
                    <div className={`col-lg-6 py-3 py-lg-0 text-center text-lg-start`}>&copy; Copyright 2023 {process.env.NEXT_PUBLIC_COMPANY_NAME} Brindes Corporativos</div>
                    <div className={`col-lg-6 pb-3 pb-lg-0 ${styles.line3LastColumn}`}>
                        <Link href="https://www.ajung.com.br/" className="text-decoration-none">
                            <span className={`${styles.dev}`}>Desenvolvimento</span>
                            <Image alt="Ajung" src="/images/footer/logoAjung.png" className={`${styles.footerLogo} ms-3`} width="100" height="100" />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}