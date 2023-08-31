import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './RecentNews.module.css';
import styleIndex from '../Css/index.module.css'
import slideItem1 from '../images/recent-football.jpg'
import slideItem2 from '../images/bayern1.jpg'
import slideItem3 from '../images/felix.jpg'

export const RecentNews = () => {
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
};


return (
    <div className={style.recentNews} id='recent'>
        <div className={styleIndex.container}>
            <Slider {...settings} className={style.recentNews__slider}>
                <div className={style.slideItem} >
                    <img src={slideItem1} alt="Slide Image" className={style.slideItem__image} />
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 04 June 2023</span>
                    <h3 className={style.slideItem__title}>Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms</h3>
                    <p className={style.slideItem__text}>The EuroLeague Finals Top Scorer is the individual award for the player that gained the highest points in the EuroLeague Finals</p>
                </div>
                <div className={style.slideItem}>
                    <img src={slideItem2} alt="Slide Image" className={style.slideItem__image} />
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 29 Августа 2023</span>
                    <h3 className={style.slideItem__title}>«Интер» покупает Павара у «Баварии» за 30+2 млн евро. Защитник подпишет контракт завтра</h3>
                    <p className={style.slideItem__text}>За трансфер Павара «нерадзурри» заплатят 30 миллионов евро, еще 2 миллиона предусмотрены в виде бонусов. Футболист может отправиться в Милан для прохождения медосмотра сегодня, контракт будет заключен завтра. </p>
                </div>
                <div className={style.slideItem}>
                    <img src={slideItem3} alt="Slide Image" className={style.slideItem__image} />
                    <div className={style.slideItem__name}>Football</div>
                    <span className={style.slideItem__date}>Agence France-Presse - 29 Августа 2023</span>
                    <h3 className={style.slideItem__title}>Феликс все еще хочет перейти в «Барсу» и будет ждать до 1 сентября</h3>
                    <p className={style.slideItem__text}>Ранее полузащитник «Атлетико» рассказал о своем желании перейти в каталонский клуб. Как сообщает Фабрицио Романо, намерение игрока не изменилось – он по-прежнему хочет присоединиться к «Барсе» и будет ждать предложения до пятницы, 1 сентября. </p> 
                </div>
            </Slider>
            
        </div>
    </div>

    );
};
