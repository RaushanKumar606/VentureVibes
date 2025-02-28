import countery from "../Data/TopTours.json";
function ToursPage()
{
    return (
      <>
        <div className="blogs-container">
          <h2 className="blogs-title">  TOP POPULAR TRAVELS</h2>
          <div className="blogs-grid">
            {countery.map((item, index) => (
              <div className="blog-card" key={item.key || index}>
                <img src={item.image.url} alt={item.title} className="blog-image" />
                <div className="blog-content">
                  <h3 className="blog-title">{item.title}</h3>
                      {/* <p className="blog-description">
                        {item.content || "Discover more about this destination!"}
                      </p> */}
                </div>
              </div>
            ))}
          </div>
         
        </div>
       
      </>
    );
  }

export default ToursPage
