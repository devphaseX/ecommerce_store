import { useNavigate } from 'react-router-dom';
import hero_img from '../../assets/images/hero-img.png';
import './style.css';
const currentYear = new Date().getFullYear();

const Heroes = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero__container section-width">
        <div className="hero_row">
          <div className="content-container">
            <div className="hero__content">
              <p className="hero__subtitle">
                Trending project in {currentYear}
              </p>
              <h2>Make your interior more minimalistic & modern</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptas repudiandae rem illum? Quo eos ex quaerat quia fugit
                consequatur.
              </p>
              <div>
                <button
                  className="buy_button"
                  onClick={() => navigate('/product')}
                >
                  Shop now
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="hero__img">
              <img src={hero_img} alt="hero section image banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Heroes };
