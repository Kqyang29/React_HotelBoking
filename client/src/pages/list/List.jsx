import "./list.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
export default function List() {

  const location = useLocation();
  // console.log(location)
  console.log(location)
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1 className="listTitle">
                Search
              </h1>
              <div className="listItem">
                <label htmlFor="">Destination</label>
                <input type="text" placeholder={destination} />
              </div>
              <div className="listItem">
                <label htmlFor="">Check-in Date</label>
                <span onClick={() => { setOpenDate(!openDate) }}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}  `} </span>
                {openDate && <DateRange
                  onChange={(item) => setDate(!item.selection)}
                  minDate={new Date()}
                  ranges={date}
                  className="listDate"
                />
                }
              </div>
              <div className="listItem">
                <label htmlFor="">Options</label>
                <div className="listOptions">
                  <div className="listOptionsItem">
                    <span className="listOptionsText">
                      Min Price <small>per night</small>
                    </span>
                    <input type="number" onChange={e => setMin(e.target.value)} className="listOptionsInput" name="" id="" />
                  </div>
                  <div className="listOptionsItem">
                    <span className="listOptionsText">
                      Max Price <small>per night</small>
                    </span>
                    <input type="number" onChange={e => setMax(e.target.value)} className="listOptionsInput" name="" id="" />
                  </div>
                  <div className="listOptionsItem">
                    <span className="listOptionsText">
                      Adult
                    </span>
                    <input type="number" min={1} className="listOptionsInput" name="" id="" placeholder={options.adult} />
                  </div>
                  <div className="listOptionsItem">
                    <span className="listOptionsText">
                      Children
                    </span>
                    <input type="number" min={0} className="listOptionsInput" name="" id="" placeholder={options.children} />
                  </div>
                  <div className="listOptionsItem">
                    <span className="listOptionsText">
                      Room
                    </span>
                    <input type="number" min={1} className="listOptionsInput" name="" id="" placeholder={options.room} />
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? ("Loading...") : (
                <>
                  {data.map(item => (
                    <SearchItem item={item} key={item._id} />
                  ))}

                </>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
