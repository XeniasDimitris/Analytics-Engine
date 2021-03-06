import React, { useState, } from 'react'
import ReactMapGL, { 
    Marker, 
    Popup,    
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
  } 
from 'react-map-gl';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


/* ----------------------------------- */
/* Set styles for Map's Control buttons */
/* ----------------------------------- */
const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default function Map(props){
      const [popupParking, setPopupParking] = useState(null)

      const parkings = props.parkings

      const handleClickMarker = (parking) => (e) => {
        setPopupParking(parking)
      } 
      const [viewport, setViewport] = React.useState({
          width:  '100%',
          height: 750,
          latitude: 56.15385440357377,
          longitude: 10.209113055098777,
          zoom: 14
        });

        let token = process.env.REACT_APP_TOKEN
        return (
          <ReactMapGL  mapboxApiAccessToken={token}
              mapStyle='mapbox://styles/xeniasdimitris/cki3rye421lkb19qigk2jv3bw'
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            onClick={(e)=>setPopupParking(null)}
          >

            {/* ----------------------------------- */}
            {/* Define Markers */}
            {/* ----------------------------------- */}
            {parkings && (
             parkings.map(parking => (
              <Marker key={parking.garacode} latitude={parking.latitude} longitude={parking.longitude} >
                  <IconButton 
                        aria-label="place" 
                        style = {{color:'#ff5353'}}
                        size='small'
                        onClick={handleClickMarker(parking)}
                      >
                    <PlaceIcon style={{margin:0, padding:0}}/> 
                  </IconButton>               
              </Marker>
             ) 
            ))}
  
  
            {/* ----------------------------------- */}
            {/* Define Popup Messages */}
            {/* ----------------------------------- */}
            { popupParking ? (
              <Popup 
                  tipSize={10}
                  latitude={popupParking.latitude} 
                  longitude={popupParking.longitude}
                  offsetLeft = {15}
                  dynamicPosition={false}
                  closeOnClick={false}
                  onClose= { (e)=> {setPopupParking(null)}}
                  >
                    <Box m={1}>
                    <Typography component='span'> 
                    <Box mb={1} textAlign="center" fontSize="h6.fontSize" style={{textDecoration: 'underline'}}> Details  </Box>
                    </Typography>
                    <Typography component='span'  style={{display: 'flex'}}> 
                    <Box mr={1}> Garagecode:  </Box>
                    <Box fontWeight='fontWeightBold'>{popupParking.garagecode}</Box>
                    </Typography>
                    <Typography component='span'  style={{display: 'flex'}}> 
                    <Box mr={1}> Street:  </Box>
                    <Box fontWeight='fontWeightBold'>{popupParking.street}</Box>
                    </Typography>
                    <Typography component='span'  style={{display: 'flex'}}> 
                    <Box mr={1}> Number:  </Box>
                    <Box fontWeight='fontWeightBold'>{popupParking.housenumber}</Box>
                    </Typography>
                    <Typography component='span'  style={{display: 'flex'}}> 
                    <Box mr={1}> City:  </Box>
                    <Box fontWeight='fontWeightBold'>{popupParking.city}</Box>
                    </Typography>
                    </Box>
              </Popup>
            ): null}

            {/* ----------------------------------- */}
            {/* Button for for using user's location */}
            {/* ----------------------------------- */}
            <div style={geolocateStyle}>
              <GeolocateControl />
            </div>

            {/* ----------------------------------- */}
            {/* Map Fullscreen button */}
            {/* ----------------------------------- */}
            <div style={fullscreenControlStyle}>
              <FullscreenControl />
            </div>

            {/* ----------------------------------- */}
            {/* Map's Compass */}
            {/* ----------------------------------- */}
            <div style={navStyle}>
              <NavigationControl />
            </div>

            {/* ----------------------------------- */}
            {/* Zoom In/Out button */}
            {/* ----------------------------------- */}
            <div style={scaleControlStyle}>
              <ScaleControl />
            </div>
          </ReactMapGL>

        );
  }
  