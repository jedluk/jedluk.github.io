---
title: 'H3 intro'
description: ''
pubDate: 'Dec 17 2023'
heroImage: '/blog/images/h3_globe.png'
tags: ['H3']
---

It looks like a futuristic model of a soccer ball designed for the World Cup, doesn't it? In fact

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis est in nisi volutpat, sed varius ipsum suscipit. Donec eu lacinia ex, aliquam lacinia eros. Sed nec odio a nisi tincidunt sagittis. Aenean et risus ultrices nunc mattis viverra non et arcu. Donec sit amet dui tempor, posuere est a, convallis diam. Nam ac vestibulum orci. Pellentesque a ante vitae sem sollicitudin mollis nec eget ante. Sed tincidunt ligula vitae massa dictum consectetur ut eget quam. Praesent vitae augue porta, rhoncus metus sit amet, tristique nulla. Aenean ligula purus, volutpat vel ullamcorper eu, tempor vitae neque. In id convallis sapien. Duis ac ultrices arcu, id elementum est.

Alright, so let's get to the point. What are the practical applications of H3 system ? Consider images below.

<div class="max:w-full flex justify-between [&>img]:w-[33%]">
    <img src="/blog/images/city-polygon.png" alt="hex-approximation size 8">
    <img src="/blog/images/city-hex8.png" alt="hex-approximation size 8">
    <img src="/blog/images/city-hex10.png" alt="hex-approximation size 8">
</div>

All 3 images shows boundaries of my hometown. First (from the left) is pure geoJSON. This is most accurate representaion of boundaries. Next two options are hexes based approximation: size 8 (total amount of hexes <strong>465</strong>) and size 10 (<strong>22727</strong>). And now let's consider scenario where we want to check if point belongs to given city or no (or in more general is the point is polygon). As we can read on [Wikipedia](https://en.wikipedia.org/wiki/Point_in_polygon), it doesn't look like an easy task , and is also and in  Checking using. In other hand we can convert location into hex and check if it exists

BTW. images were taken from web app I wrote some time ago , called [hexifier](https://lukasi.uk/hexifier). It allows you to convert geoJSON into hexes (you define size) and later export into CSV or plain text.
