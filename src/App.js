import './App.css';

import { MapContainer } from 'react-leaflet/MapContainer'
import { LayersControl } from 'react-leaflet/LayersControl'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'

import forbiddenArea from './data/forbiddenArea.json'

const aoiExtent = [[60.356401600304, 25.727405548096],[60.295829885323, 25.844049453735]]

function App() {
  const center = [61.9241, 25.7482]
  return (
    <MapContainer
      center={center}
      zoom={9}
      zoomSnap={0}
      whenReady={e => {
        const mapRef = e.target
        mapRef.flyToBounds(aoiExtent)
      }}
    >
    <GeoJSON
      data={forbiddenArea}
      style={{
        color: 'red',
        opacity: .5,
      }}
      interactive={false}
    />
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="MapAnt"> 
        <TileLayer
          attribution='&copy; <a href="http://www.mapant.fi/">MapAnt</a>'
          url="http://wmts.mapant.fi/wmts_EPSG3857.php?z={z}&x={x}&y={y}"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Google satellite">
        <TileLayer
          attribution='&copy; 2023 CNES / Airbus, Landsat / Copernicus, Maxar Technologies'
          url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="MML Maastokartta">
        <TileLayer
          attribution='&copy; <a href="https://www.maanmittauslaitos.fi">Maanmittauslaitos</a> <a href="https://www.maanmittauslaitos.fi">CC BY 4.0</a>'
          url="https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=maastokartta&STYLE=default&FORMAT=image/png&TILEMATRIXSET=WGS84_Pseudo-Mercator&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&username=02ec4999-f9a5-4e20-905e-bdfc5b8da7d4"
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="MML Orto">
        <TileLayer
          attribution='&copy; <a href="https://www.maanmittauslaitos.fi">Maanmittauslaitos</a> <a href="https://www.maanmittauslaitos.fi">CC BY 4.0</a>'
          url="https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ortokuva&STYLE=default&FORMAT=image/jpeg&TILEMATRIXSET=WGS84_Pseudo-Mercator&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&username=02ec4999-f9a5-4e20-905e-bdfc5b8da7d4"
        />
      </LayersControl.BaseLayer>
      <LayersControl.Overlay name="Topographic 1979">
        <TileLayer
          url=".\\tiilet\\Kartta1979_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={15}
          minNativeZoom={10}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Holken 1991">
        <TileLayer
          url=".\\tiilet\\Holken1991_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Seitlahti-Voolahti 1992">
        <TileLayer
          url=".\\tiilet\\Seitlahti-Voolahti1992_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Seitlahti-Fagersta 2003">
        <TileLayer
          url=".\\tiilet\\Seitlahti-Fagersta2003_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
        />
      </LayersControl.Overlay>
    </LayersControl>
  </MapContainer>
  )
}

export default App;
