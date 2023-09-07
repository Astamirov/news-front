import logo from "../images/logo.svg"
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
            <img src={logo} alt="" className="header-img" />
        </div>
        
        <div className={styles.socialIcons}>
          <a href="ссылка на Facebook"><FaFacebook /></a>
          <a href="ссылка на Twitter"><FaTwitter /></a>
          <a href="ссылка на Instagram"><FaInstagram /></a>
          <a href="ссылка на LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
