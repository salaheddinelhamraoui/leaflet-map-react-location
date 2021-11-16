import logo from './logo.svg';
import './App.css';
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DisplayPosition from './DisplayPosition'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function App() {

  // New Code For places input

  const [address, setAddress] = useState([]);

  const handleAddressChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };



  const position = [33.7062215, -7.4036035]


  const myIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/145/145602.png',
    iconSize: [30, 30],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  })




  const [map, setMap] = useState(null)

  const zoom = 18


  const setMapL = (map) => {
    setMap(map);

    map.locate({ setView: true, }) /* This will return map so you can do chaining */
      .on('locationfound', function (e) {
        var marker = L.marker([e.latitude, e.longitude], { icon: myIcon }).bindPopup('Your are here :)');
        console.log("Latitude 2 is :", e.latitude);
        console.log("Longitude 2 is :", e.longitude);
        map.addLayer(marker);
      })
      .on('locationerror', function (e) {
        console.log(e);
        alert("Location access denied.");
      });

  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMapL}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="map-marker-centered"></div>
        <div className="use-location ">
          <p className="title-location">Use This Location</p>
        </div>
      </MapContainer>

    ),
    [],
  )

  return (
    <div className="MapContainer">
      <PlacesAutocomplete
        value={address}
        onChange={handleAddressChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div key={suggestion.index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >

                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}

    </div>
  )
}

export default App;
