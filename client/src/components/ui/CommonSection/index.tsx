import './style.css';
type CommonSectionProps = { title: string };

const CommonSection = ({ title }: CommonSectionProps) => (
  <section className="common-section">
    <div className="section-width">
      <h1>{title}</h1>
    </div>
  </section>
);

export { CommonSection };
