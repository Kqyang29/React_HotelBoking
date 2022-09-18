import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import "./Reserve.css"

function Reserve({ setOpen, hotelId }) {
  const [selectRoom, setSelectRoom] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { date } = useContext(SearchContext);

  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const d = new Date(start.getTime());

    const date = [];

    while (date <= end) {
      date.push(new Date(d).getTime());
      d.setDate(d.getDate() + 1);
    }

    return date;
  };

  const allDate = getDatesInRange(date[0].endDate, date[0].startDate);

  const isAvailable = (rNum) => {
    const isFound = rNum.unavailableDates.some(d =>
      allDate.includes(new Date(d).getTime())
    );
    // true = not availble
    return !isFound
  }




  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectRoom(selected ? [...selectRoom, value] : selectRoom.filter(item => item !== value))
  }

  console.log(selectRoom)

  const handleClick = async () => {
    try {
      await Promise.all(selectRoom.map((roomId) => {
        const res = axios.put(`/rooms/available/${roomId}`, { date: allDate })
        return res.data;
      }))
      setOpen(false);
      navigate("/");
    } catch (error) {

    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => { setOpen(false) }} />
        <span>Select your rooms:</span>
        {data?.map((item) => (
          <div div className="rItem" key={item._id} >
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMaxPeople">Max People:{item.maxPeople}</div>
              <div className="rPrice">Price:{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.RoomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="rButton" onClick={handleClick}>Reserve Now!</button>
      </div>
    </div >
  )
}

export default Reserve


