// import "./service.css";
import countery from "../Data/image.json";

function Blogs()
 {
  return (
    <>
      <div className="blogs-container">
        <h2 className="blogs-title">BLOGS TRAVELS</h2>
        <div className="blogs-grid">
          {countery.map((item, index) => (
            <div className="blog-card" key={item.key || index}>
              <img src={item.imageSrc} alt={item.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-title">{item.title}</h3>
                <p className="blog-description">
                  {item.content || "Discover more about this destination!"}
                </p>
              </div>
            </div>
          ))}
        </div>
       
      </div>
     
    </>
  );
}

export default Blogs;
