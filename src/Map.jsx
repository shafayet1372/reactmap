import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import ImageBlack from './assets/marker.png'
import ImageGreen from './assets/greenmarker.png'
import ImageRed from './assets/redmarker.png'
import L from "leaflet"
import { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Map({ position, pType }) {


    let setMarkerColor = () => {
        if (pType == "Admin") {
            return ImageGreen
        } else if (pType == "Office") {
            return ImageRed
        } else {
            return ImageBlack
        }
    }
    const icon = L.icon({
        iconUrl: setMarkerColor(), iconSize: [25, 38]

    })

    const ResetCenterView = (props) => {
        const map = useMap()
        const position = props.position
        map.setView(
            L.latLng(position[0], position[1]),
            map.getZoom(),
            {
                animate: true
            }
        )
        return null
    }

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=viLAwMztqJF9S85TNoyy"
            />
            <Marker position={position} icon={icon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ResetCenterView position={position} />
        </MapContainer>
    )
}

export default Map