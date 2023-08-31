import { Link } from 'react-router-dom';
import style from "./Header.module.css"
import styleIndex from "../Css/index.module.css"
import logo from "../images/logo.svg"
import signUpImg from "../images/signUp.svg"

export const Header = () => {
    return (
        <div>
            <header className={style.header}>
                <div className={styleIndex.container}>
                    <div className={style.header__inner}>
                        <div className="logo">
                            <img src={logo} alt="" className="header-img" />
                        </div>
                        <nav className={style.header__nav}>
                            <ul className={style.header__ul}>
                                <li className={style.header__li}>
                                    <a href="#home" className={style.header__navLink}>Home</a>
                                </li>
                                <li className={style.header__li}>
                                    <a href="#category" className={style.header__navLink}>Category</a>
                                </li>
                                <li className={style.header__li}>
                                    <a href="#" className={style.header__navLink}>Trending News</a>
                                </li>
                                <li className={style.header__li}>
                                    <a href="#recent" className={style.header__navLink}>Recent News</a>
                                </li>
                                <li className={style.header__li}>
                                    <a href="#articles" className={style.header__navLink}>Sports Article</a>
                                </li>
                            </ul>
                        </nav>
                        <div className={style.header__search}>
                            <input className={style.header__input} type="text" placeholder="Search"/>
                            <Link to="/login"><img className={style.signUp__img} src={signUpImg} alt="Sign" /></Link>
                            
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
