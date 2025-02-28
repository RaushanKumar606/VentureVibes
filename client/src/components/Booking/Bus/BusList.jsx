// import "./service.css";
import countery from "../../Data/image.json";

function BusList()
 {
  return (
    <>
      <div className="blogs-container">
        <h2 className="blogs-title">TOP BUS TRAVELS</h2>
        <div className="blogs-grid">
          {countery.map((item, index) => (
            <div className="blog-card" key={item.key || index}>
              <img src={item.imageSrc} alt={item.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-title">{item.title}</h3>
                {/* <p className="blog-description">
                  {item.content || "Discover more about this destination!"}
                </p> */}
               <div className="booknow-container">
                <div className="booknow"> <a href="">BOOK NOW</a></div>
                <div className="cupon-code">Code:</div>
               </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>
     
    </>
  );
}

export default BusList;