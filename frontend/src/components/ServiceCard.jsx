
export default function ServiceCard({ image, title, description }) {
  return (
    <div className="service-card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Know More</button>
    </div>
  );
}