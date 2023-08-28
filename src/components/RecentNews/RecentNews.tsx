import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './ReceptNews.module.css';
import styleIndex from '../Css/index.module.css'

const RecentNews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 4000, 
    pauseOnHover: true,
    arrows: true,
    prevArrow: <div className={`${style.customArrow} ${style.prevArrow}`}>Prev</div>, 
    nextArrow: <div className={`${style.customArrow} ${style.nextArrow}`}>Next</div>,  
};

return (
    <div className={style.recentNews} id='recent'>
        <div className={styleIndex.container}>
            <Slider {...settings} className={style.recentNews__slider}>
                <div className={style.slideItem}>
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 04 June 2023</span>
                    <h3 className={style.slideItem__title}>Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms</h3>
                    <p className={style.slideItem__text}>The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals</p>
                </div>
                <div className={style.slideItem}>
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 04 June 2023</span>
                    <h3 className={style.slideItem__title}>Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms</h3>
                    <p className={style.slideItem__text}>The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals</p>
                </div>
                <div className={style.slideItem}>
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 04 June 2023</span>
                    <h3 className={style.slideItem__title}>Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms</h3>
                    <p className={style.slideItem__text}>The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals</p>
                </div>
            </Slider>
            
        </div>
    </div>

    );
};

export default RecentNews;