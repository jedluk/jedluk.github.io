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
      fetch('/blog/assets/tram8.json'),
      fetch('/blog/assets/szczecin.json')
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([tramRoute, boundaries]) => {
        setTramRoute(tramRoute)
        setBoundaries(boundaries)
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
      zoom: 16
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
        zoom: 16
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

  return (
    <Map
      ref={mapRef}
      mapLib={maplibre}
      minZoom={9}
      initialViewState={{ longitude: 14.6, latitude: 53.43, zoom: 9.5 }}
      mapStyle="/blog/assets/positron.json"
    >
      <NavigationControl position="top-right" />
      <Source id="route" type="geojson" data={tramRoute}>
        <Layer
          id="route"
          type="line"
          paint={{
            'line-color': [
              'case',
              ['==', ['get', 'route_variant_type'], 'default'],
              'rgb(131, 25, 224)',
              'rgb(153, 153, 153)'
            ],
            'line-width': [
              'case',
              ['==', ['get', 'route_variant_type'], 'default'],
              5,
              2
            ]
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
            'line-width': 2
          }}
        />
      </Source>
      <button
        className="absolute left-1 bottom-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setRunning((prev) => !prev)}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
    </Map>
  )
}
