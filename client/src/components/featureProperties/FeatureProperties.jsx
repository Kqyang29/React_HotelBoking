import useFetch from "../../hooks/useFetch";
import "./FeatureProperties.css"

export default function FeatureProperties() {

  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");


  return (
    <div className="FP">
      {loading ? ("Loading...") : (
        <>
          {data.map((item) => (
            <div className="FPListItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="FPImg" />
              <div className="FPText">
                <span className="FPName">{item.name}</span>
                <span className="FPCity">{item.city}</span>
                <span className="FPPrice">Starting from ${item.cheapestPrice}</span>
                {item.rate && <div className="FPRate">
                  <button>{item.rate}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
