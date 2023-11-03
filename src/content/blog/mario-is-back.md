---
title: 'Mario is back!'
description: "Comphrenesive guide to setup SuperMario on raspberry Pi"
pubDate: 'Nov 5 2023'
heroImage: '/blog/images/supermario.jpg'
---
If you were born in the 90s or earlier, you know that Mario is a timeless classic. In this episode I'll show you 
how to recreate your childhood years at a common sense cost.
​

A few weeks ago, I was considering what I could buy with the Amazon voucher I received as a gift. For a long time, I was thinking about a Chicago Bulls jacket, but then I had an epiphany - I don't have a Raspberry Pi yet (back in my student days, I had an Arduino, but I can't locate it now). First and foremost, I wanted to complete a specific programming project (which is currently in progress - I may share more about it in the future, but for now, it's confidential 😎).When the Raspberry Pi package arrived, I started looking for additional accessories and stumbled upon the [botland](https://botland.com.pl) store. I was particularly interested in getting a case and something for cooling. But when I was browsing the available accessories, I came across gamepads 😯.
It caught my attention, and I started browsing GitHub projects related to Raspberry Pi. Finally I landed at [retropie](https://retropie.org.uk/). Great shoot ! At that point, I already knew I had to put together my gaming setup. Below, you'll find a list of purchases needed to set up a gaming station, and for simplicity's sake, I will provide prices in dollars (based on the exchange rate from November 5, 2023). 
<ul>
    <li>raspberry Pi 4B 4GB RAM, <a href="https://botland.com.pl/moduly-i-zestawy-raspberry-pi-4b/14647-raspberry-pi-4-model-b-wifi-dualband-bluetooth-4gb-ram-15ghz-5056561800349.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$74.27</strong></li>
    <li>charger, <a href="https://botland.com.pl/zasilacze-do-raspberry-pi-4b/7820-zasilacz-extreme-5v31a-ze-zlaczem-usb-c-dla-raspberry-pi-4b-5901445617509.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$8.62</strong></li>
    <li>orginal case, <a href="https://botland.com.pl/obudowy-do-raspberry-pi-4b/14654-obudowa-do-raspberry-pi-4b-oficjalna-czerwono-biala-644824914916.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$6.47</strong> </li>
    <li>fan for cooling (compatibile with case), <a href="https://botland.com.pl/obudowy-do-raspberry-pi-4b/18177-wentylator-do-oficjalnej-obudowy-raspberry-pi-4b-728886755172.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$6.46</strong></li>
    <li>microHDMI to HDMI adapter, <a href="https://botland.com.pl/przewody-wideo-i-audio-do-raspberry-pi-4b/16338-adapter-microhdmi-hdmi-oryginalny-do-raspberry-pi-4b-235mm-bialy-644824915043.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$4.54</strong></li>
    <li>SNES gaming pad, <a href="https://botland.com.pl/kontrolery-do-gier-usb/12458-snes-retro-kontroler-do-gier-kolorowe-przyciski-5904422319311.html"  target="_blank" rel="noopener noreferrer">botland</a>, <strong>$4.25</strong></li>
    <li>microSD Card (32GB), <a href="https://botland.com.pl/karty-pamieci-microsd-sd/6946-goodram-all-in-one-m1a4-karta-pamieci-microsd-32gb-100-mb-s-klasa-10-adapter-czytnik-otg-5908267930274.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$5.02</strong></li>
</ul>

This adds up to <strong>$109.63</strong>. The first thing after assembling the kit is to install the operating system on the SD card, and for this purpose, I use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). After opening click on <i>Choose OS</i> -> <i>Emulation and game OS</i> -> <i>RetroPie</i> -> <i>RetroPie 4.8 (RPI 1/Zero) </i> (or whatever version of Raspberry you possess). From storage choose SD Card which is plugged into your computer. Click <i>Write</i> and wait for awhile. Now you can connect raspberry with you monitor via HDMI and connect the power. After awhile you should see RetroPie splash screen.


<div class="flex flex-col md:flex-row justify-between [&>img]:w-[48%]">
    <img class="" src="/blog/images/rasp_pi_imager.png" alt="raspberry pi imager" />
    <img src="/blog/images/retropie.jpg" alt="retropie launching" />
</div>

By default RetroPie does not include any games. We have to manually install them with help of some ROM providers, like [hustler](https://romhustler.org/). There are couple of ways of installing them , I will show you simplest one. 