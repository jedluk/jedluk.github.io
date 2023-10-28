---
title: 'Build your own Planet with OSM vol. 1/2'
description: "Comprehensive introduction to Open Street Map and vector tiles"
pubDate: 'Oct 8, 2023'
heroImage: '/blog/osm-planet/nyc_hero_vol1.png'
---
Hypothesis: <q>Entire planet can be digitalized into 71 GB.</q>

Sounds ridiculous, don't you think ? It's less than entire series of <i>Game of Thrones</i> you might say. In the following post, we'll try to assess how true this statement is.

Have you ever heard about Open Street Map project ? If no, let me explain in couple words what it is. In nutshell OSM maintains geographic database which is created by community of volunteers. Probably it's one of the best examples of open source collaboration. As for today it has more than 11 milions of [registered users](https://planet.openstreetmap.org/statistics/data_stats.html) ! Home page of this project is available [here](https://www.openstreetmap.org/). If you've ever seen a map with a similar appearance, it means you have unknowingly become a OSM data consumer.

<img alt="osm" src="/blog/osm-planet/london_osm.png" />

OSM data is represented by elements called primitives, to which we include:

<ul>
    <li>nodes - points with geographic position (latitude & longitude). Can be vertices of <i>ways</i> or independent features - so called <i>Points of Interest</i>, like historical places, or mountain peaks,</li>
    <li>ways - ordered list of nodes. We can distinguish here a division into: open loops (polylines) and closed loops (polygons). Most popular polyline features are all kind of roads, but we can also include rivers, railways, etc. Polygons, in other hand may be rendered into features as buildings, parks, administrative boundaries and so on.</li>
    <li>relations - ordered lists of nodes, ways and relations (together called "members"). It has to contain at least one tag <i>type=*</i>. Members can optionally contain a <i>role</i> within relation. Relations are used to model geographic relationships between objects. As an example we can think about city which consists of 2 independent polygons.</li>
</ul>

Data is stored in [PostgreSQL database](https://wiki.openstreetmap.org/wiki/Database), where single row is mapped into single object. There are 3 different tables for each primitive. OSM release their dataset on week basis. Single file containing all records from DB is called <strong>Planet.osm</strong>. It can be downloaded from [here](https://planet.openstreetmap.org/) - it's available in 2 formats <i>OSM XML</i> and <i>PBF</i>. To be honest with You I've never used XML format (probably cause PBF is much lighter format - 71 GB vs 131 GB). Recommended way of downloading planet <i>planet.osm</i> is using curl, like this:

```sh
curl -OL https://planet.openstreetmap.org/pbf/planet-latest.osm.pbf
```

It can take awhile, depending on your internet connection (also keep in mind it's a large file - so please make sure you have enough space before downloading it). Assuming you sucessfully dowloaded a dump, now we can start processing the data. For this reason we will use tool called [osmium](https://osmcode.org/osmium-tool/). Depending on your OS there are different ways of installing it. On their home page I linked you can find instructions (I'm using MacOS, so `brew install osmium-tool` is all I want). After installation we ensure osmium is available in terminal:

```sh
❯ osmium --version
osmium version 1.15.0
libosmium version 2.19.0
Supported PBF compression types: none zlib lz4

Copyright (C) 2013-2023  Jochen Topf <jochen@topf.org>
License: GNU GENERAL PUBLIC LICENSE Version 3 <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

```
As you can imagine processing entire Planet might be time and resources consuming. This is why we'll use <i>osmium</i> to crop Planet into selected bounding box. For reasons I will reveal in next post we'll extract NYC area. Our bounding box can be described by 4 coordinates: left (longitude), top (latitude), right (longitude) and bottom (latitude). Quick look onto Google maps, 4 clicks and here we are, example bounding box can be described by:

<ul>
    <li>left 74°23'38.6" W</li>
    <li>top: 40°56'56.3" N</li>
    <li>right: 73°36'13.1" W</li>
    <li>bottom: 40°29'01.9" N</li>
</ul>

In geoprocessing tools, a convention has been adopted to mark coordinates from the Western and Southern Hemispheres with a negative sign. Also we have to use decimal number instead of using degrees with minutes and seconds. Eventually we get:

<ul>
    <li>left -74.410722</li>
    <li>top: 40.948972</li>
    <li>right: -73.603639</li>
    <li>bottom: 40.483861</li>
</ul>

Now we can pass those variables as CLI arguments. We invoke <i>osmisum extract</i> function (my dump is called  `planet-230918.osm.pbf`):
```sh
❯ osmium extract --bbox -74.410722,40.948972,-73.603639,40.483861 --set-bounds --strategy=smart planet-230918.osm.pbf --output nyc.osm.pbf
[======================================================================] 100% 
```
Are we ready to display data on a map ? Unfortunately not yet, but we are very close 😅. Modern web maps uses <strong>vector tiles</strong> as map source. It's nothing more like packets of geographical data sliced into predefined roughly-square shapes - </i>tiles</i>. Most popular tiles format - Mapbox Vector Tiles (<i>mvt</i> extension) uses PBF for data serialization. In such a form data is transferred over the web. After deserialization on client side, appropriate styles are applied and data is rendered onto a canvas. Thanks to this approach we can dynamically edit map style, which is not possible in case of raster tiles. Great tool for understanding process of map style creation is [Maputnik](https://maputnik.github.io/editor). OK, now to the point. We have to convert cropped piece of planet into MVT. For this reason we'll use another tool with self-explanatory name - [tilemaker](https://github.com/systemed/tilemaker). After cloning repo we have to build it from the source, by running:

```sh
make
sudo make install
```

If you experiencing issues with build, probably you use incompatible version of protobuf. Issue is described [here](https://github.com/systemed/tilemaker/issues/518). To overcome this you have to modify Makefile and point into older version of protobuf. You can do it by modyfing those lines:
```sh
87 LIB := -L/opt/homebrew/opt/protobuf@21/lib -L$(PLATFORM_PATH)/lib -lz $(LUA_LIBS) -lboost_program_options -lsqlite3 -lboost_filesystem -lboost_system -lboost_iostreams -lprotobuf -lshp -pthread
88 INC := -I/opt/homebrew/opt/protobuf@21/include -I$(PLATFORM_PATH)/include -isystem ./include -I./src $(LUA_CFLAGS)
```

We are ready to generate tiles now. By default `tilemaker` comes with OSM schema - it means our output will contain [all layers](https://github.com/openmaptiles/openmaptiles/blob/master/layers) defined by them. Configuration is defined in `process.lua`. Let's copy cropped PBF file into root dir and run the proccess!
```sh
mv ../nyc.osm.pbf . # use path to your pbf here
tilemaker --input nyc.osm.pbf --output nyc.mbtiles
(...) # after awhile 😎😎😎
Filled the tileset with good things at nyc.mbtiles
```
We did it! Let's check how it looks like on a map. We'll need some tool (I know, another one 😅) which can serve our tiles (it's just a single static file). We can use [tileserver-gl](https://github.com/maptiler/tileserver-gl) - nodejs based server which can be simply installed by npm.

```javascript
npm i -g tileserver-gl
mkdir tileserver && cd tileserver && cp ../nyc.mbtiles .
```
Last but not least - we have to create `config.json` and tell tileserver what exactly to serve. File looks like this (if you did not copy mbtiles into current dir you can use relative path to them):
```json
    {
        "data": {
            "openmaptiles": {
                "mbtiles": "nyc.mbtiles"
            }
        }
    }
```
Now we are ready. Let's kick off the server by typing `tileserver-gl`. No additional arguments are needed (default port is `8080`, and we use default config name). Open [http://localhost:8080/](http://localhost:8080/) in your browser and click `Inspect` button.

<img alt="nyc" src="/blog/osm-planet/osm_cropped_nyc.png" />

Voilà! This is exactly what you should see 🚀🚀🚀. Play a little bit with this map and enjoy your hard work. Huh 😅, this was tough tutorial. Now going back to initial hypothesis. The truth is bittersweet. Of course dump does not contain everything and everywhere. OSM is driven by community. In some countries community is more active than another. This is why details and accuracy might significantly differs, even across the cities. But this 71 GB dump is really good approximation of our planet and cover majority of map topics you can imagine. 

One more thing. If you're bored by copy-pasting all those commands, I've created a shell script which do all the job for You. Script is available [here](/blog/osm-planet/make-tiles.sh) (it takes dump and bbox as an input and creates mbtiles instead). Example invocation: 
```sh
sudo chmod +x make_tiles.sh
./make-tiles.sh --bbox -74.410722,40.948972,-73.603639,40.483861 --dump ~/Downloads/planet-230918.osm.pbf --output nyc
```

At the end I want to mention about [Overture Maps Foundation](https://overturemaps.org/). It's quite new initiative, with a goal to unleash potential of new generation of location based products by providing high quality and up-to-date geospatial data (they combine and enhance data from different sources including OSM). Steering members of organization consists of: Amazon, Meta, Microsoft and TomTom. I am examining this project with great interest. Recently they've released their first dataset in cloud-native Parquet format. Example map build of top of their data you can check [here](https://labs.overturemaps.org/). I bet you'll hear lot about them in the future. Also I think this will be topic of one of the upcoming posts.

That's all for this episode. I know that beginning with OSM & geoprocessing is hard, cause you have to know many different terms and tools to work efficiently. But in the next post you will see that it was worth it! I will guide you through the process of visualizing geospatial data using [maplibre-gl](https://maplibre.org/projects/maplibre-gl-js/). See you soon!