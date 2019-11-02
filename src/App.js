import React from 'react';
import useFetch from './utils/useFetch'

import HotelsCard from './components/HotelsCard'
import ViewSection from './components/ViewSection';
import Loading from './components/Loading'

import './App.css';

function App() {
  const [hotelId, setHotelId] = React.useState(null);
  const [numberOfNights, setNumberOfNights] = React.useState(1);

  const { loading, data: hotels, error } = useFetch(
    `http://my-json-server.typicode.com/fly365com/code-challenge/hotels`
  )

  // React.useEffect(() => {
  // const getSelectedHotel = hotels && hotels.filter((hotel) => hotel.id === hotelId)[0]
  // if (getSelectedHotel) {
  //   useFetch(
  //     `http://my-json-server.typicode.com/fly365com/code-challenge/hotels`
  //   )
  //   setSelectedHotel(getSelectedHotel)
  // }
  // }, [hotelId, hotels])

  if (loading) {
    return <Loading>Loading hotels</Loading>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="App">
      {hotels && hotels.map((hotel) => (
        <HotelsCard key={hotel.id} hotel={hotel} selectedNights={numberOfNights} selectHotel={setHotelId} />
      ))}
      {hotelId ? (
        <ViewSection hotel={hotelId} nightsChange={setNumberOfNights} />
      ) : (
          <p style={{ width: '100%', textAlign: 'center' }}>Please select an hotel</p>
        )}
    </div>
  );
}

export default App;
