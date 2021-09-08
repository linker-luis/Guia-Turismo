import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import { Rating } from '@material-ui/lab'

import useStyles from './style'

function Map({setCoordinates, setBounds, coordinates, places, setChildClicked }) {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width: 600px)')
    
    // const coordinates = {lat: 0, lng: 0}

    return (
        <div className = {classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys = {{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = {coordinates}
                center = {coordinates}
                defaultZoom = {14}
                margin = {[50, 50, 50, 50]}
                options = {{disableDefaultUI: true, zoomControl: true}}
                onChange = {(e) => {
                    // console.log(e)
                    setCoordinates({lat: e.center.lat, lng: e.center.lng})
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick = {(child) => setChildClicked(child)}
            >
                {
                    places?.map((place, i) => (
                        <div
                            className = {classes.markerContainer}
                            lat = {Number(place.latitude)}
                            lng = {Number(place.longitude)}
                            key = {i}
                        >
                            {
                                !isDesktop ? (
                                    <LocationOnOutlinedIcon color = 'primary' fontSize = 'large' />
                                ) : (
                                    <Paper elevation = {3} className = {classes.paper}>
                                        <Typography className = {classes.Typography} variant = 'subtitle2' gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img
                                            className = {classes.pointer}
                                            src = {place.photo ? place.photo.images.large.url : 'https://www.peruforless.com/blog/wp-content/uploads/2013/06/maras-restaurant-interior-1.jpg'}
                                            alt = {place.name}
                                        />
                                        <Rating size = 'small' value = {Number(place.rating)} readOnly />
                                    </Paper>
                                )
                            }
                        </div>
                    ))
                }
            </GoogleMapReact>
        </div>
    )
}

export default Map
