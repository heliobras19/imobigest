import FooterTop from '../FooterTop';
import FooterContent from '../FooterContent';
import FooterBottom from '../FooterBottom';
import styles from './styles.module.css';

export default function Footer() {
    return (
        <div className={`${styles.root} w-100`}>
            <FooterContent />
        </div>
    )
}