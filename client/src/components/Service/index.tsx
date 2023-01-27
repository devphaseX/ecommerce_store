import './style.css';
import serviceData from '../../assets/data/serviceData';

const Service = () => (
  <section className="service">
    <div className="service__container section-width ">
      <div className="service__row">
        {serviceData.map(({ title, icon, subtitle, bg }, i) => (
          <div key={`${i}-${title}`} className="service__item-wrapper">
            <div className="service__item" style={{ backgroundColor: bg }}>
              <span>
                <i className={icon}></i>
              </span>
              <div>
                <h3>{title}</h3>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { Service };
