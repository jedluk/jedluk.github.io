import 'maplibre-gl/dist/maplibre-gl.css'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import Map, { Layer, NavigationControl, Source } from 'react-map-gl'
import bearing from '@turf/bearing'
import maplibre from 'maplibre-gl'
import * as pmtiles from 'pmtiles'

const ANIMATION_MOVE_MS = 350

export default function FlyingTrip() {
  const [tramRoute, setTramRoute] = useState()
  const [boundaries, setBoundaries] = useState()
  const [palace, setPalace] = useState()
  const [isRunning, setRunning] = useState(false)
  const mapRef = useRef(null)
  const lastIdx = useRef(0)

  const routeCoordinates = useMemo(
    () =>
      tramRoute
        ? tramRoute.features
            .filter((f) => f.properties.route_variant_type === 'default')
            .map((f) => f.geometry.coordinates)
            .flat()
        : [],
    [tramRoute]
  )

  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibre.addProtocol('pmtiles', protocol.tile)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/blog/flying-trip/tram8.json'),
      fetch('/blog/flying-trip/szczecin.json'),
      fetch('/blog/flying-trip/palace.json'),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([tramRoute, boundaries, palace]) => {
        setTramRoute(tramRoute)
        setBoundaries(boundaries)
        setPalace(palace)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (routeCoordinates.length === 0 || !isRunning) {
      return
    }

    mapRef?.current.jumpTo({
      center: routeCoordinates[lastIdx.current],
      pitch: 70,
      zoom: 16,
    })

    let timeout = null

    const nextMove = () => {
      const currentIdx = lastIdx.current

      if (currentIdx + 1 >= routeCoordinates.length) {
        lastIdx.current = 0
        setRunning(false)
        return
      }

      const currentPoint = routeCoordinates[currentIdx]
      const nextPoint = routeCoordinates[currentIdx + 1]

      mapRef?.current.flyTo({
        animate: true,
        bearing: bearing(currentPoint, nextPoint),
        center: nextPoint,
        curve: 1,
        duration: ANIMATION_MOVE_MS,
        easing: (x) => Math.sin((x * Math.PI) / 2),
        zoom: 16,
      })

      lastIdx.current = currentIdx + 1
      timeout = setTimeout(() => nextMove(), ANIMATION_MOVE_MS)
    }

    nextMove()
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [routeCoordinates, isRunning])

  const viewState = {
    longitude: 21.0043177,
    latitude: 52.2325207,
    zoom: 15.2,
    pitch: 60,
    bearing: 20,
  }
  return (
    <Map
      ref={mapRef}
      mapLib={maplibre}
      initialViewState={viewState}
      minZoom={9}
      mapStyle="/blog/flying-trip/positron.json"
    >
      {/* <NavigationControl position="top-right" /> */}
      <Source id="route" type="geojson" data={tramRoute}>
        <Layer
          id="route"
          type="line"
          paint={{
            'line-color': [
              'case',
              ['==', ['get', 'route_variant_type'], 'default'],
              'rgb(131, 25, 224)',
              'rgb(153, 153, 153)',
            ],
            'line-width': [
              'case',
              ['==', ['get', 'route_variant_type'], 'default'],
              5,
              2,
            ],
          }}
        />
      </Source>
      <Source id="boundaries" type="geojson" data={boundaries}>
        <Layer
          id="boundaries"
          type="line"
          paint={{
            'line-color': 'rgb(140, 41, 49)',
            'line-dasharray': [6, 2],
            'line-width': 2,
          }}
        />
      </Source>
      <Source id="palace" type="geojson" data={palace}>
        <Layer
          id="palace"
          type="fill-extrusion"
          paint={{
            'fill-extrusion-vertical-gradient': true,
            'fill-extrusion-color': [
              'case',
              ['>=', ['get', 'render_min_height'], 100],
              'rgb(255,255,255)',
              'rgb(221,11,57)',
            ],
            'fill-extrusion-opacity': 0.94,
            'fill-extrusion-height': ['get', 'render_height'],
            'fill-extrusion-base': ['get', 'render_min_height'],
          }}
        />
      </Source>
      {/* <button
        className="absolute left-1 bottom-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setRunning((prev) => !prev)}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button> */}
    </Map>
  )
}
