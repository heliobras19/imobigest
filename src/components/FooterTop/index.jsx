import Image from 'next/image';
import styles from './styles.module.css';

export default function FooterTop() {
    return (
        <>
            <div className={`${styles.rootFooterTop}`}>
                <div className="container">
                    <div className={`row ${styles.line1}`}>
                        <div className={`col-lg-4 ${styles.columnsLines}`}>
                            <div className={`d-flex justify-content-end pe-3 col-4`}>
                                <Image alt="Entrega" width="68" height="50" src="/images/home/truck.png" className={`${styles.truckIcon} img-fluid`} />
                            </div>
                            <div>
                                <p className="m-0">Entrega em todo Brasil &nbsp; &nbsp; &nbsp;</p>
                            </div>
                        </div>
                        <div className={`col-lg-4 ${styles.columnsLines}`}>
                            <div className={`d-flex justify-content-end pe-3 col-4`}>
                                <Image alt="Atendimento" width="68" height="50" src="/images/home/handshake.png" className={`${styles.truckIcon} img-fluid`} />
                            </div>
                            <div>
                                <p className="m-0">Atendimento personalizado</p>
                            </div>
                        </div>
                        <div className={`col-lg-4 ${styles.columnsLines}`}>
                            <div className={`d-flex justify-content-end pe-3 col-4`}>
                                <Image alt="Qualidade" width="68" height="50" src="/images/home/award.png" className={`${styles.truckIcon} img-fluid`} />
                            </div>
                            <div>
                                <p className="m-0">Qualidade e garantia &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}