// import "./service.css";
import countery from "../Data/image.json";

function Services() {
  return (
    <>
    
   
    
    <div className="train-container">
      <h2>LUXURY TRAINS</h2>
      <div className="luxury-train">
        {countery.map((item, index) => (
          <div className="c1" key={item.key || index}>
            <img src={item.imageSrc} alt={item.title} />
            <h3 className="train-title">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
   


<div className="train-container">
<h2>LUXURY HOTELS</h2>
<div className="luxury-train">
  {countery.map((item, index) => (
    <div className="c1" key={item.key || index}>
      <img src={item.imageSrc} alt={item.title} />
      <h3 className="train-title">{item.name}</h3>
    </div>
  ))}
</div>
</div>
</>
  );
}

export default Services;

