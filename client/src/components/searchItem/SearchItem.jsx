import { Link } from "react-router-dom"
import "./SearchItem.css"

const SearchItem = ({ item }) => {
  return (
    <div className="SIItem">
      <img src={item.photos[0]} alt="" className="SIImg" />
      <div className="SIDesc">
        <h1 className="SITitle">{item.name}</h1>
        <span className="SIDistance">{item.distance}m from center</span>
        <span className="SITaxi">Free airport taxi</span>
        <span className="SISubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="SIFeatures">
          {item.desc}
        </span>
        <span className="SICancelOp">Free cancellation </span>
        <span className="SICancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="SIDetail">
        {item.rate && <div className="SIDeatailRate">
          <span>Excellent</span>
          <button>{item.rate}</button>
        </div>}
        <div className="SIDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTax">Includes taxes and fees</span>
          <Link to={`/hotel/${item._id}`}>
            <button className="siCheckButton">See availability</button>

          </Link>
        </div>
      </div>
    </div>

  )
}

export default SearchItem