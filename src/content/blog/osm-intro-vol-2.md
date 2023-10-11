---
title: 'Build your own Planet with OSM vol. 2/2'
description: "Comprehensive introduction to Open Street Map and Maplibre"
pubDate: 'Nov 10, 2023'
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

Let's go back to the year 2010. The world was still mired in recession after the financial crisis caused by the real estate bubble. Uniteresting times (just like today). Thanks to [wayback machine](https://web.archive.org/), we can go back to those times and see the state of web maps at that time. Practically without any competition, Google Maps was setting [trends](https://web.archive.org/web/20100415043805/https://www.google.com/maps).

<img alt="NYC 2010" src="/blog/osm-planet/nyc_2010.png">

 It was during this time that [Mapbox](https://www.mapbox.com/) company was founded. They found a niche of custom maps. Across many tools to work with geographic data (including OSM), their flagship product [mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js) for creating interactive maps unprecedentedly changed the meaning of the phrase 'modern web maps'. When in 2020 Mapbox decided to switch to a propertiaty software license (all versions &ge; 2), open-source community took matters into their own hands and created a fork called [maplibre-gl](https://github.com/maplibre/maplibre-gl-js/). Nowadays with almost 5,000 stargazers it's one of the most popular choices for greenfield map based projects (as an early adopter, I started using it in at my current company at the beginning of 2021, and I'm extremely happy to see how it grows).

