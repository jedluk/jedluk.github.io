---
title: 'Build your own Planet with OSM vol. 2/2'
description: "Comprehensive introduction to Open Street Map and Maplibre"
pubDate: 'Nov 12, 2023'
heroImage: '/blog/osm-planet/nyc_hero_vol2.png'
---
<style>
    a {
        color: var(--accent);
    }
    p {
        text-align: justify;
    }
 </style>

In this post, you will see that all the effort dedicated to learning the basic tools and concepts of OSM has brought you incredible possibilities. Attention: if you haven't done so already, please read [part 1](/blog//osm-intro-vol-1) - you'll need <i>mbtiles</i> generated at that episode to conitnue now.

Let's go back to the year 2010. The world was still mired in recession after the financial crisis caused by the real estate bubble. In general bad times (just like today). Thanks to [wayback machine](https://web.archive.org/), we can go back in time and see contemporary state of web maps. Practically without any competition, Google Maps was setting [trends](https://web.archive.org/web/20100415043805/https://www.google.com/maps).

<img alt="NYC 2010" src="/blog/osm-planet/nyc_2010.png">

 During this time [Mapbox](https://www.mapbox.com/) company was established. They found a niche of custom maps. Across many tools to work with geographic data (including OSM), their flagship product [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) for creating interactive maps unprecedentedly changed the meaning of the phrase 'modern web maps'. When in 2020 Mapbox decided to switch to a propertiaty software license (all versions &ge; 2), open-source community took matters into their own hands and created a fork called [maplibre-gl](https://github.com/maplibre/maplibre-gl-js/). Nowadays with almost 5,000 stars MapLibre is one of the most popular choices for greenfield map based projects (as an early adopter, I started using it in at my current company at the beginning of 2022, and I'm extremely happy to see how it grows).

Getting started with maplibre is extremely easy. All you need is HTML file with piece of JavaScript. Let's create `index.html` with following content
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, Maplibre!</title>
    <script src="https://unpkg.com/maplibre-gl/dist/maplibre-gl.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" crossorigin="anonymous">
    <style>
        body {
            padding: 0;
            margin: 0;
        }
        body,
        #map {
            height: 100vh;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <script>
        const map = new maplibregl.Map({
            container: 'map',
            style: 'https://demotiles.maplibre.org/style.json'
        })
    </script>
</body>

</html>
``` 
As you can see ther is no magic here. We import maplibre library and style from CDN in <i>head</i> section, in <i>body</i> we create single div tag which will be container for a map. Finally we call <i>Map</i> constructor, specyfing container id and map style. [Maplibre Style Spec](https://maplibre.org/maplibre-style-spec/) (as you can guess it's based on [Mapbox Style Spec](https://maplibre.org/maplibre-style-spec/)) is nothing more like definition of visual appearance. We define what to draw; from which sources; in which order and how to style it. Also we can define initial map conditions like center, zoom, pitch and bearing. To see how it looks like we have to serve `index.html` (please don't open HTML as a file in browser - it won't work in such case). We can use npm package - serve - for this purpose.
```shell
npm i -g serve
serve
```
You can now open [http://localhost:3000](http://localhost:3000). Our eyes should see a world map divided into countries.

<img src="/blog/osm-planet/maplibre.png" alt="maplibre">

Coolio 🚀🚀🚀 Now it's a time to combine our OSM-based data with maplibre. As you remember we ended fist part by creating `mbtiles` which contains area around New York City. Go to the location when you keep that file and simply kick off tileserver-gl by running
```shell 
tileserver-gl
``` 
(remember that default config is stored in `config.json` and both files should be stored in the same location). At this point our tiles are accesible under `http://localhost:8080/data/openmaptiles/{z}/{x}/{y}.pbf` and this is exactly what we are looking for defining source data in our map style. Also please take a look [here](http://localhost:8080/data/openmaptiles.json) - it's kind of metadata for our tiles. We can read from there min & max map zoom level for which tiles are served. Let's create `mapStyle.json` in same location as `index.html`

```json
{
  "version": 8,
  "name": "custom-style",
  "center": [-73.97213924223371, 40.77749354550904],
  "zoom": 10.7,
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "tiles": ["http://localhost:8080/data/openmaptiles/{z}/{x}/{y}.pbf"],
      "attribution": "© <a href='https://openstreetmap.org'>OpenStreetMap</a>",
      "minzoom": 0,
      "maxzoom": 14
    }
  },
  "layers": []
}
```
We've added mandatory properties, which are <strong>version, sources</strong> and <strong>layers</strong>. As told you before we're using our tiles served via `tileserver-gl` as a map source. In general we can define multiple sources but in our case we have just one. Additionally we defined initial center of the map (somewhere in Manhattan) and map zoom. At the same time we do a modification to `index.html`. Instead of prefedined maplibre style we want to use our own. All we need to do is to edit `style` property inside Map constructor. We can use relative path and assign `style: '/mapStyle.json'`. If you refresh a page you should see a blank scene. Why is that 🧐 ? Answer is simple. We have not defined layers yet. So, let's create first three layers then: <strong>background</strong>, <strong>water</strong> and <strong>grass</strong>.
```json
layers: [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "#212121"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": ["==", "$type", "Polygon"],
      "paint": {
        "fill-color": "#0D47A1",
        "fill-opacity": 0.2
      }
    },
    {
      "id": "grass",
      "type": "fill",
      "minzoom": 10,
      "source": "openmaptiles",
      "source-layer": "landcover",
      "filter": ["all", ["==", "$type", "Polygon"], ["in", "class", "grass"]],
      "paint": {
        "fill-color": "#33691E"
      }
    }
]
```
Most important layer properties are <strong>id</strong> and <strong>type</strong>. Id should be unique across all the layers. Maplibre allows you to specify one of the type: <i>background, fill, line, symbol, raster, circle, fill-extrusion, heatmap, hillshade</i>. Except for layers of the background type, each layer needs to refer to a source. In our case source is called `openmaptiles` - this is how we defined it in `mapStyle.json` (our only property insisde "sources"). Additionally for tile sources (and this is our case) we have to define `source-layer` - name of the layer from the source. Because during tiles creation we used official OSM schema we can pick one of [those](https://github.com/openmaptiles/openmaptiles/tree/master/layers). <i>Filter</i> property allows us to choose only those features which meets defined criteria. Filter is defined by [expression](https://maplibre.org/maplibre-style-spec/expressions/). You can think about expression as custom formula for computing a value of property using predefined operators (which are defined in artcle I've just linked). I strongly recommend to play around different [MapLibre examples](https://maplibre.org/maplibre-gl-js/docs/examples/) and see how it is used, cause it's very important to understand how it works. By the way - it also has roots in [Mapbox](https://docs.mapbox.com/style-spec/reference/expressions/) - you can clearly see that they have done a significant amount of pioneering work - from this place thank You for this 🙏🙏🙏. For grass layer we defined <i>minzoom</i> - it tells maplibre at which zoom layer should be visible. Last but not least <i>paint</i> property - hints for WebGL to apply appropriate styles while rendering. Each type allow to use ONLY predefined [properties](https://maplibre.org/maplibre-style-spec/layers/#paint-property). We can open browser now. Yeah, we can clearly recognoze NYC area now! Finally things are starting to go our way. 

<img src="/blog/osm-planet/nyc_map_1.png" alt="nyc map - water">

In this place I want to mention about [map generalization](https://en.wikipedia.org/wiki/Cartographic_generalization) - core part in cartographic design. In nutshell it's about keeping appropriate data balance when switching map zoom levels. For example, you wouldn't display all the roads when a map currently shows entire continent. Map has to be readable, no matter of current zoom. Also sending too much data over the web can cause performance issues. Data reduction, simplifying shapes, and enabling layers at various zoom levels are some of the approaches to generalization. Adhering to those principles we'll add three more layers - transportation based. We'll split them into two groups: <strong>highway major</strong> and <strong>highway minor</strong>. By using filter property we pick only those which belongs to certain class.

```json
{
  "id": "highway_minor",
  "type": "line",
  "source": "openmaptiles",
  "source-layer": "transportation",
  "minzoom": 12,
  "filter": [
    "all",
    ["==", "$type", "LineString"],
    ["in", "class", "secondary", "minor", "service", "track"]
  ],
  "layout": {
    "line-cap": "round",
    "line-join": "round",
  },
  "paint": {
    "line-color": "#FFB74D",
    "line-opacity": 0.4,
    "line-width": 2
  }
},
{
  "id": "highway_major",
  "type": "line",
  "source": "openmaptiles",
  "source-layer": "transportation",
  "filter": [
    "all",
    ["==", "$type", "LineString"],
    ["in", "class", "motorway", "primary"]
  ],
  "layout": {
    "line-cap": "round",
    "line-join": "round",
  },
  "paint": {
    "line-color": [
      "case",
      ["==", ["get", "class"], "motorway"],
      "#F57F17",
      "#FBC02D"
    ],
    "line-opacity": 0.8,
    "line-width": ["case", ["==", ["get", "class"], "motorway"], 3, 2]
  }
},
{
  "id": "subway_entrance",
  "type": "circle",
  "source": "openmaptiles",
  "source-layer": "poi",
  "minzoom": 13,
  "filter": ["all", ["in", "class", "railway"], ["==", "$type", "Point"]],
  "paint": {
    "circle-color": "#BF360C",
    "circle-radius": 6
  }
},
```
Third layer represents subway entrances around the city. In this case we have to choose `poi` (points of interests) source layer and apply appropriate filter. We present those points as circles (<i>circle</i> type).

And to top it all off, the cherry on the cake - buildings. In first episode I mentioned that in current post I will reveal a secret - why actually NYC area was chosen as training material. Answer is simple. OSM is driven by community. If the society is active and technically proficient, then quality of data is high. NYC is good example of area with high quality data, majority of buildings have height assigned, so we are able to create magnificent 3D visualizations.

We will do generalization here as well - buildings will begin to appear at zoom level 13 (only as footprints), while from zoom level 14, they will turn into three-dimensional models with the same extrusion as currently assigned in the OSM database. Also for building higher than 50 meters different color will be applied.

```json
{
  "id": "building-flat",
  "type": "fill",
  "source": "openmaptiles",
  "source-layer": "building",
  "minzoom": 13,
  "maxzoom": 14,
  "paint": {
    "fill-color": "#263238"
  }
},
{
  "id": "building",
  "type": "fill-extrusion",
  "source": "openmaptiles",
  "source-layer": "building",
  "minzoom": 14,
  "filter": ["has", "render_height"],
  "paint": {
    "fill-extrusion-color": [
      "case",
      [">", ["get", "render_height"], 50],
      "#263238",
      "#37474F"
    ],
    "fill-extrusion-height": ["get", "render_height"]
  }
}
```
Please notice that we've used <i>fill-extrusion</i> type for second layer. By reading <i>render_height</i> property we are able to turn flat footprint into into 3D building. Finally we can see our masterpiece live. 3...2...1... 🚀🚀🚀 

<img src="/blog/osm-planet/nyc_hero_vol2.png" alt="nyc final">

I really like it how it looks. Now, I think you have no doubts that the data we created in the previous post indeed represents an NYC area 😅. Also I have good news for you; if you got lost somewhere while analyzing the layers, you can download the entire JSON file from [here](/scripts/mapStyle.json). 

That's enough for today. In two-part series, I’ve included a wealth of information, we got to know OSM and maplibre (and a few other necessary tools).  I hope that the world of interactive vector maps is now wide open for you. Try to play around with OSM data - crop area around your city and create your own map (you can experiment with other layers). Maybe you'll spot missing data and consequently become OSM contributor ? See you soon!
