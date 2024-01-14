import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import './list.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/SearchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = () => {
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='listTitle'>Search</h1>
            <div className='listItem'>
              <label>Destination</label>
              <input
                type='text'
                placeholder={destination} 
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className='listItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>

              {openDate &&
                <DateRange
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />}
            </div>
            <div className='listItem'>
              <label>Options</label>
              <div className='listOptions'>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Min price <small>per night</small></span>
                  <input type='number' onChange={(e) => setMin(e.target.value)} className='listOptionInput'/>
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Max price <small>per night</small></span>
                  <input type='number' onChange={(e) => setMax(e.target.value)}className='listOptionInput'/>
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Adult</span>
                  <input type='number' min={1} className='listOptionInput' placeholder={options.adult}/>
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Children</span>
                  <input type='number' min={0} className='listOptionInput' placeholder={options.children}/>
                </div>
                <div className='listOptionItem'>
                  <span className='listOptionText'>Room</span>
                  <input type='number' min={1} className='listOptionInput' placeholder={options.room}/>
                </div>
                </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
            {loading ? "Loading" : <>
              {data.map((item, index) => (
                <SearchItem item={item} key={index} />
                ))}
            </>}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default List