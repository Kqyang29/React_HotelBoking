import "./Hotel.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import EmailList from '../../components/emailList/EmailList'
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext.js";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

export default function Hotel() {

  //fetch hotel id
  const location = useLocation();
  console.log(location)
  const path = location.pathname.split("/")[2];
  // console.log(path);
  const [sliderNum, setSliderNum] = useState(0);
  // open silder
  const [open, setOpen] = useState(false);

  // open reservation model
  const [openModel, setOpenModel] = useState(false);


  const { data, loding, error } = useFetch(`/hotels/find/${path}`);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSliderNum(i);
    setOpen(true);
  }

  const handleMove = (d) => {
    let newNum;

    if (d === "l") {
      newNum = sliderNum === 0 ? 5 : sliderNum - 1;

    }
    else {
      newNum = sliderNum === 5 ? 5 : sliderNum + 1;
    }

    setSliderNum(newNum);
  }

  const { date, options } = useContext(SearchContext)
  console.log(date)

  // count how many day
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate);

  const handleClick = () => {
    if (user) {
      setOpenModel(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loding ? ("Loading...") : (
        <>
          <div className="hContainer">
            {open && <div className="slider">
              <FontAwesomeIcon
                icon={faXmark}
                className="close"
                onClick={() => setOpen(false)}
              />

              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />

              <div className="sliderWrapper">
                <img src={data.photos[sliderNum]} alt="" className="sliderImg" />
              </div>

              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />

            </div>}
            <div className="hWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hTitle">
                {data.name}
              </h1>
              <div className="hAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
              </span>
              <div className="hImages">
                {data.photos?.map((photo, i) => (
                  <div className="hImgWrapper" key={i}>
                    <img
                      src={photo}
                      alt=""
                      className="hImg"
                      onClick={() => handleOpen(i)}
                    />
                  </div>
                ))}
              </div>
              <div className="hDetail">
                <div className="hDeatilText">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                    {data.desc}
                  </p>
                </div>
                <div className="hDetailPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>


            <EmailList />
            <Footer />
          </div>
        </>
      )}
      {/* path -- from location */}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={path} />}
    </div>
  )
}
