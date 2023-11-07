---
title: 'Mario is back!'
description: 'Comprehensive guide to turn your raspberry Pi into Super Nitendo Entertainment System with Super Mario included.'
pubDate: 'Nov 3 2023'
heroImage: '/blog/images/supermario.jpg'
tags: ['raspberry pi']
---

If you were born in the 90s or earlier, you know that Mario is a timeless classic. In this episode I'll show you
how to recreate your childhood years at a common sense cost.
​

A few weeks ago, I was considering what I could buy with the Amazon voucher I received as a gift. For a long time, I was thinking about a Chicago Bulls jacket, but then I had an epiphany - I don't have a Raspberry Pi yet (back in my student days, I had an Arduino, but I can't locate it now). First and foremost, I wanted to complete a specific programming project (which is currently in progress - I may share more about it in the future, but for now, it's confidential 😎).When the Raspberry Pi package arrived, I started looking for additional accessories and stumbled upon the [botland](https://botland.com.pl) store. I was particularly interested in getting a case and something for cooling. But when I was browsing the available accessories, I came across gamepads 😯.
It caught my attention, and I started browsing GitHub projects related to Raspberry Pi. Finally I landed at [retropie](https://retropie.org.uk/). Great shoot ! At that point, I already knew I had to put together my gaming setup. Below, you'll find a list of purchases needed to set up a gaming station, and for simplicity's sake, I will provide prices in dollars (based on the exchange rate from November 3, 2023).

<ul>
    <li>raspberry Pi 4B 4GB RAM, <a href="https://botland.com.pl/moduly-i-zestawy-raspberry-pi-4b/14647-raspberry-pi-4-model-b-wifi-dualband-bluetooth-4gb-ram-15ghz-5056561800349.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$74.27</strong></li>
    <li>charger, <a href="https://botland.com.pl/zasilacze-do-raspberry-pi-4b/7820-zasilacz-extreme-5v31a-ze-zlaczem-usb-c-dla-raspberry-pi-4b-5901445617509.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$8.62</strong></li>
    <li>orginal case, <a href="https://botland.com.pl/obudowy-do-raspberry-pi-4b/14654-obudowa-do-raspberry-pi-4b-oficjalna-czerwono-biala-644824914916.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$6.47</strong> </li>
    <li>fan for cooling (compatibile with case), <a href="https://botland.com.pl/obudowy-do-raspberry-pi-4b/18177-wentylator-do-oficjalnej-obudowy-raspberry-pi-4b-728886755172.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$6.46</strong></li>
    <li>microHDMI to HDMI adapter, <a href="https://botland.com.pl/przewody-wideo-i-audio-do-raspberry-pi-4b/16338-adapter-microhdmi-hdmi-oryginalny-do-raspberry-pi-4b-235mm-bialy-644824915043.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$4.54</strong></li>
    <li>SNES gaming pad, <a href="https://botland.com.pl/kontrolery-do-gier-usb/12458-snes-retro-kontroler-do-gier-kolorowe-przyciski-5904422319311.html"  target="_blank" rel="noopener noreferrer">botland</a>, <strong>$4.25</strong></li>
    <li>microSD Card (32GB), <a href="https://botland.com.pl/karty-pamieci-microsd-sd/6946-goodram-all-in-one-m1a4-karta-pamieci-microsd-32gb-100-mb-s-klasa-10-adapter-czytnik-otg-5908267930274.html" target="_blank" rel="noopener noreferrer">botland</a>, <strong>$5.02</strong></li>
</ul>

This adds up to <strong>$109.63</strong> (101.96 EUR). Assembled kit looks like below.

<img src="/blog/images/raspberry_pi.jpg" alt="raspberry pi">

Next thing after assembling the kit is to install the operating system on the SD card, and for this purpose I use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/). After opening the app click on <i>Choose OS</i> -> <i>Emulation and game OS</i> -> <i>RetroPie</i> -> <i>RetroPie 4.8 (RPI 1/Zero) </i> - or whatever version of Raspberry you possess. From storage choose SD Card which is plugged into your computer. Click <i>Write</i> and wait unitl it ends (it can take couple of miniutes, as OS has to be downloaded first). Now you can connect raspberry with you monitor via HDMI and connect the power. After awhile you should see RetroPie splash screen.

<div class="flex flex-col flex-wrap md:flex-row justify-between md:[&>img]:w-[48%] [&>img]:mb-1">
    <img class="" src="/blog/images/rasp_pi_imager.png" alt="raspberry pi imager" />
    <img src="/blog/images/retropie.jpg" alt="retropie launching" />
</div>

By default RetroPie does not include any games. We have to manually install them with help of some ROM providers, like [hustler](https://romhustler.org/) or [emulatorgames](https://www.emulatorgames.net/). There are couple of ways of installing them, I will show you simplest one. It requires usage of USB flash drive. First thing you create folder <i>retropie</i> inside USB stick and plug it into a turned on raspberry. Wait ~ 5 minutes and unplugg it. Retropie OS will create 3 directories inside <i>retropie</i>: <strong>BIOS</strong>, <strong>configs</strong> and <strong>roms</strong>. Inside roms you can see a list of all possible emulators supported. Now you have to identify with which system your pad is compatibile with. Mine is compatibilie with SNES (Super Nintendo Entertainment System). In such case I'm downloading Super Mario from [here](https://www.emulatorgames.net/roms/super-nintendo/super-mario-world/). I'm unzipping archieve and drop <i>SMC</i> file into <strong>snes</strong> folder. My pendrive structrue looks like this (I've also downloaded couple more different games):

<img src="/blog/images/retropie_pendrive.png" alt="retropie folder">

Last step is to plug pendrive into raspberry again (it has to fetch them into OS). Wait 5 minutes and reboot raspberry (5 minutes is just arbitrary value, in real it depends of number of games you want to upload). You should reboot raspberry now. Now we're ready to go back to the '90s! After launching please make sure to select appropriate emulator (you should recognize it by pad on a top).

<div class="flex flex-col flex-wrap md:flex-row justify-between md:[&>img]:w-[48%] [&>img]:mb-1">
  <img class="" src="/blog/images/snes.jpg" alt="snes" />
    <img src="/blog/images/mario.jpg" alt="mario" />
</div>

What a wonderful metaphysical experience! Btw. you can play Pac Man as well (and many other well known titles)! Currently I'm stuck in the ghost castle (this one with flying green blobs 🤣). I don't want to cheat by googling for tips, instead I'm preparing for long winter (perfect situation to use phrase 'Winter is coming' again 😅). Thank you for reading and see you in next episode !
