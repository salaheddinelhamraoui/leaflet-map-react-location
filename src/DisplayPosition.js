import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

function DisplayPosition({ map, zoom, center }) {

    const [position, setPosition] = useState(map.getCenter())
    const myIcon = L.icon({
        iconUrl: 'https://icon-library.com/images/marker-icon-png/marker-icon-png-26.jpg',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
    })



    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }

    }, [map, onMove])


    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
        </p>
    )
}

export default DisplayPosition;