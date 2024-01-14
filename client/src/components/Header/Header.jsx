import React, { useContext, useState } from 'react';

import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
import { DateRange } from 'react-date-range';

import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Header = ({type}) => {
  // Date Range :
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [openDate, setOpenDate] = useState(false);

  const handleClick = () => {
    setOpenDate(!openDate);
  }

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const [destination, setDestination] = useState("");
  
  const { dispatch } = useContext(SearchContext);
  
  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: {destination, dates, options}})
    navigate("/hotels", { state: { destination, dates, options } });
  }


  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className='headerList'>
          <div className='headerListItem active'>
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faBed} />
            <span>Attraction</span>
          </div>
          <div className='headerListItem'>
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div> 

        {type !== "list" &&
          <>
              <h1 className='headerTitle'>A lifetime of discounts? It is Genius</h1>
              <p className='headerDesc'>
              Get rewarded for your travels - unlock instant savings of 10% or more
              with a free Booking.com account
            </p>
            <button className='headerBtn'>Sign in / Register</button>
            <div className='headerSearch'>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                <input
                  type='text'
                  placeholder='Where are you going?'
                  className='headerSearchInput'
                  onChange={e => setDestination(e.target.value)}
                />
              </div>
              <div className='headerSearchItem date'>
                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                <span className='headerSearchText'
                  onClick={handleClick}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
              {openDate &&
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className='headerDate'
                />}
              </div>
              <div className='headerSearchItem'>
                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions && <div className='headerOption'>
                  <div className='headerOptionItem'>
                    <span className='optionText'>Adult</span>
                    <div className='optionCounter'>
                      <button disabled={options.adult <= 0} className='optionCounterBtn' onClick={() => handleOption("adult", "d")}>-</button>
                      <span className='optionCounterNumber'>1</span>
                      <button className='optionCounterBtn' onClick={() => handleOption("adult", "i")}>+</button>
                    </div>
                  </div>
                  <div className='headerOptionItem'>
                    <span className='optionText'>Children</span>
                    <div className='optionCounter'>
                      <button disabled={options.children <= 0} className='optionCounterBtn' onClick={() => handleOption("children", "d")}>-</button>
                      <span className='optionCounterNumber'>1</span>
                      <button className='optionCounterBtn' onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                  </div>
                  <div className='headerOptionItem'>
                    <span className='optionText'>Room</span>
                    <div className='optionCounter'>
                      <button disabled={options.room <= 0} className='optionCounterBtn' onClick={() => handleOption("room", "d")}>-</button>
                      <span className='optionCounterNumber'>1</span>
                      <button className='optionCounterBtn' onClick={() => handleOption("room", "i")}>+</button>
                    </div>
                  </div>
                </div>}
              
              </div>
              <div className='headerSearchItem'>
                <button className='headerBtn' onClick={handleSearch}>Search</button>
              </div>
            </div>
        </>}
      </div>
    </div>
  )
}

export default Header