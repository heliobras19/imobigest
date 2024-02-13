
import {useEffect, useState} from 'react';
import styles from './styles.module.css';
const LgpdBanner = () => {
    const [accept, setAccept] = useState(true)
    const save = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('lgpd_pepperoni', 'accept')
        }
        setAccept(true)
    }
    useEffect(() => {
        setAccept((localStorage.getItem('lgpd_pepperoni') == null) ? false : true)
    }, [])

    return (
    !accept &&
        <div className={styles.buttonBanner}>
            <p >
            Usamos cookies para personalizar anúncios e melhorar a sua experiência no site.
                Ao continuar navegando, você concorda com a nossa Política de Privacidade.
            </p>
                <button onClick={save}>Entendi</button>
        </div>
    )
}

export default LgpdBanner