import { CssBaseline, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react';

import { getPlacesData } from './api'
import Header from "./components/Header/Header";
import List from "./components/List/List";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Map from './components/Map/Map';

function App() {
  const [places, setPlaces] = useState([])
  const [filterPlaces, setFilterPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({lat: latitude, lng: longitude})
      
    })
    
    // setCoordinates({lat: '-12.04868826549056', lng: '-77.0386112267186'})
    
  }, [])

  useEffect(() => {
    const filterPlaces = places.filter((place) => place.rating > rating)

    setFilterPlaces(filterPlaces)
  }, [rating])

  useEffect(()=> {
    if(bounds.sw && bounds.ne){
      setIsLoading(true)
      // console.log(coordinates, bounds)
      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          // console.log(data)
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilterPlaces([])
          setIsLoading(false)
        })
    }
  }, [type, bounds])

  return (
    <>
      <CssBaseline/>
      <Header setCoordinates = {setCoordinates} />
      <Grid container spacing = {3} styles = {{width: '100%'}}>
        <Grid item xs = {12} md = {4}>
          <List 
            places = {places}
            childClicked = {childClicked}
            isLoading = {isLoading}
            type = {type}
            setType = {setType}
            rating = {rating}
            setRating = {setRating}
          />
        </Grid>
        <Grid item xs = {12} md = {8}>
          <Map
            setCoordinates = {setCoordinates}
            setBounds = {setBounds}
            coordinates = {coordinates}
            places = {filterPlaces.length ? filterPlaces : places}
            setChildClicked = {setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
