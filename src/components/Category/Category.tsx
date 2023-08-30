import style from "./Category.module.css";
import styleIndex from "../Css/index.module.css";
import ctg1 from '../images/ctg1.jpg';
import ctg2 from '../images/ctg2.jpg';
import ctg3 from '../images/ctg3.jpg';
import ctg4 from '../images/ctg4.png';


export const Category = () => {
  return (
    <section id="category" className={style.category}>
      <div className={styleIndex.container}>
        <div className={style.category}>
          <h2 className={style.category__title}>Category</h2>
          <div className={style.category__cards}>
            <div className={style.category__card}>
              <p className={style.p1}>football</p>
              <img src={ctg1} alt="" />
            </div>
            <div className={style.category__card}>
              <img src={ctg2} alt="" />
              <p className={style.p2}>
                bascket
                <br />
                ball
              </p>
            </div>
            <div className={style.category__card}>
              <p className={style.p3}>car sport</p>
              <img src={ctg3} alt="" />
            </div>
            <div className={style.category__card}>
              <img  className={style.categoryImg__last} src={ctg4} alt="" />
              <p className={style.p4}>
                table
                <br />
                tennis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
