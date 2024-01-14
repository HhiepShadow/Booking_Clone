import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/Footer/Footer';

import './hotel.css';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [sliderNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const {data, loading, error} = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

  const { dates, options } = useContext(SearchContext);
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  } 

  const days = dayDifference(dates[0].startDate, dates[0].endDate);

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

  const handleOpen = (index) => { 
    setSliderNumber(index);
    setOpen(!open);
  }

  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = sliderNumber === 0 ? 5 : sliderNumber - 1;
    } else {
      newSliderNumber = sliderNumber === 5 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSliderNumber);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading" :
        (<div className='hotelContainer'>
          {open &&
            <div className='hotelSlider'>
              <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)}/>
              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow'
                onClick={() => handleMove("l")}
              />
              <div className='hotelSliderWrapper'>
                <img src={photos[sliderNumber].src} className='hotelSliderImg'/>
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow'
                onClick={() => handleMove("r")}
              />
            </div>}

          <div className='hotelWrapper'>
            <button className='hotelBookNow'>Reserve or Book Now!</button>
            <h1 className='hotelTitle'>{data.name}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location - {data.distance}m from center
            </span>
            <span className='hotelPriceHighLight'>
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className='hotelImages'>
              {photos.map((photo, index) => (
                <div className='hotelImgWrapper' key={index}>
                  <img onClick={() => handleOpen(index)} src={photo.src} className='hotelImg'/>
                </div>
              ))}
            </div>
            <div className='hotelDetails'>
              <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">
                  Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                  Street Apartments has accommodations with air conditioning and
                  free WiFi. The units come with hardwood floors and feature a
                  fully equipped kitchenette with a microwave, a flat-screen TV,
                  and a private bathroom with shower and a hairdryer. A fridge is
                  also offered, as well as an electric tea pot and a coffee
                  machine. Popular points of interest near the apartment include
                  Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                  airport is John Paul II International Kraków–Balice, 16.1 km
                  from Tower Street Apartments, and the property offers a paid
                  airport shuttle service.
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice * days * options.room}</b> ({days} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
            </div>
          </div>
          <MailList />
          <Footer />
      </div>)}
    </div>
  )
}

export default Hotel