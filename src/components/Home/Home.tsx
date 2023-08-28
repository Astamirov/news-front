import style from "./Home.module.css"
import styleIndex from "../Css/index.module.css"
import img_1 from "../images/img-1.jpg"


export const Home = () => {
    return (
    <div className={style.home} id='home'>
        <div className={styleIndex.container}>
        <div className={style.home__inner}>
            <h2 className={style.home__title}>
                Top scorer to the final match
            </h2>
            <img
                src={img_1}// Подставьте путь к большой картинке
                alt="News"
                className={style.homeImg}
            />
            <div className={style.home__content}>
                <p className={style.homeContent_text}>
                    The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals
                </p>
                <button className={style.btn_text}>
                    continue reading
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}
