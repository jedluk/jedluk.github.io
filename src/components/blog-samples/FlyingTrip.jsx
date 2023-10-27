import 'maplibre-gl/dist/maplibre-gl.css'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import Map, { Layer, NavigationControl, Source } from 'react-map-gl'
import bearing from '@turf/bearing'
import maplibre from 'maplibre-gl'
import * as pmtiles from 'pmtiles'

const ANIMATION_MOVE_MS = 350

export default function FlyingTrip() {
  const [tramData, setTramData] = useState(null)
  const [boundaries, setBoundaries] = useState(null)
  const [isRunning, setRunning] = useState(false)
  const mapRef = useRef(null)
  const lastIdx = useRef(0)

  const route = useMemo(
    () =>
      tramData !== null
        ? tramData.features
            .filter((f) => f.properties.route_type > 0)
            .map((f) => f.geometry.coordinates)
            .flat()
        : [],
    [tramData]
  )

  useEffect(() => {
    const protocol = new pmtiles.Protocol()
    maplibre.addProtocol('pmtiles', protocol.tile)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/blog/flying-trip/tram8.json'),
      fetch('/blog/flying-trip/szczecin.json'),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([tramData, boundaries]) => {
        setTramData(tramData)
        setBoundaries(boundaries)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (route.length === 0 || !isRunning) {
      return
    }

    mapRef?.current.jumpTo({
      center: route[lastIdx.current],
      pitch: 70,
      zoom: 16,
    })

    let timeout = null

    const nextMove = () => {
      const currentIdx = lastIdx.current

      const currentPoint = route[currentIdx]
      const nextPoint = route[currentIdx + 1]

      mapRef?.current.flyTo({
        animate: true,
        bearing: bearing(currentPoint, nextPoint),
        center: nextPoint,
        curve: 1,
        duration: ANIMATION_MOVE_MS,
        easing: (x) => Math.sin((x * Math.PI) / 2),
        zoom: 16,
      })

      if (lastIdx.current === route.length) {
        lastIdx.current = 0
        setRunning(false)
      } else {
        lastIdx.current = currentIdx + 1
        timeout = setTimeout(() => nextMove(), ANIMATION_MOVE_MS)
      }
    }

    nextMove()
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [route, isRunning])

  return (
    <Map
      ref={mapRef}
      mapLib={maplibre}
      initialViewState={{ longitude: 14.6, latitude: 53.43, zoom: 9.5 }}
      minZoom={9}
      mapStyle="/blog/flying-trip/positron.json"
    >
      <NavigationControl position="top-right" />
      {tramData && (
        <Source id="route" type="geojson" data={tramData}>
          <Layer
            id="route"
            source="route"
            type="line"
            paint={{
              'line-color': [
                'case',
                ['==', ['get', 'route_type'], 2],
                'rgb(98, 0, 238)',
                'rgb(153, 153, 153)',
              ],
              'line-opacity': 0.7,
              'line-width': ['case', ['==', ['get', 'route_type'], 2], 5, 2],
            }}
          />
        </Source>
      )}
      {boundaries && (
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
      )}
      <button
        className="absolute left-1 bottom-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setRunning((prev) => !prev)}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
    </Map>
  )
}
