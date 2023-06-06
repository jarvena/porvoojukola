import './App.css';

import { MapContainer } from 'react-leaflet/MapContainer'
import { LayersControl } from 'react-leaflet/LayersControl'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'

import forbiddenArea from './data/forbiddenArea.json'
import parkingArea from './data/parkingArea.json'
import eventCentre from './data/eventCentre.json'

const aoiExtent = [[60.356401600304, 25.727405548096],[60.295829885323, 25.844049453735]]

const styleFunction = (object) => { // To parse object drawn with geojson.io
  const style = {
    color: object.properties.stroke,
    strokeWidth: object.properties["stroke-width"],
    opacity: object.properties["stroke-opacity"],
    fillColor: object.properties.fill,
    fillOpacity: object.properties["fill-opacity"],
  }
  return style
}

const parkingPopup = (feature, layer) => {
  layer.bindPopup(feature.properties.name)
}

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
      {/* <LayersControl.BaseLayer name="MML Maastokartta">
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
      </LayersControl.BaseLayer> */}
      <LayersControl.Overlay name="Topographic 1979">
        <TileLayer
          url=".\\tiilet\\Kartta1979_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={15}
          minNativeZoom={10}
          bounds={[[60.3623195464795685, 25.7397526170164745], [60.2833882631587130, 25.8610933793943261]]}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Holken 1991">
        <TileLayer
          url=".\\tiilet\\Holken1991_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
          bounds={[[60.3771676738971408, 25.7458411632768396], [60.3369948250552284, 25.8319421006571446]]}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Seitlahti-Voolahti 1992">
        <TileLayer
          url=".\\tiilet\\Seitlahti-Voolahti1992_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
          bounds={[[60.3457681696294443, 25.7403588597135453], [60.2847717244076406, 25.8549246002912945]]}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Seitlahti-Fagersta 2003">
        <TileLayer
          url=".\\tiilet\\Seitlahti-Fagersta2003_3857\\{z}\\{x}\\{y}.png"
          maxNativeZoom={16}
          minNativeZoom={10}
          bounds={[[60.3347678328687707, 25.7568050935712449], [60.2927163966103024, 25.8208731498315878,]]}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Pysäköintialueet">
        <GeoJSON
          data={parkingArea}
          interactive={true}
          onEachFeature={parkingPopup}
          style={styleFunction}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Kilpailukeskus">
        <GeoJSON
          data={eventCentre}
          interactive={true}
          style={styleFunction}
        />
      </LayersControl.Overlay>
    </LayersControl>
  </MapContainer>
  )
}

export default App;
