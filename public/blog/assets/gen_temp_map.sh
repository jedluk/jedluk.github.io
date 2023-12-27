#!/bin/bash

echo "Removing old files..."
old_files=(
    "temp.grib2"
    "temp.tif"
    "temp_color.tif" 
    "output.tif"
    "output.png"
    "output.tif.aux.xml",
    "output.png.aux.xml"
)

for file in ${old_files[@]}; do
    if test -f "$file"; then
        rm $file
        echo "$file removed"
    fi
done

# use UTC time
day=$(date -u '+%Y%m%d')
current_hour=$(date -u +'%H')

if [ $current_hour -lt 6 ]; then
    rounded_hour="00"
elif [ $current_hour -lt 12 ]; then
    rounded_hour="06"
elif [ $current_hour -lt 18 ]; then
    rounded_hour="12"
else
    rounded_hour="18"
fi

BASE_URL="https://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl"
DIR="dir=%2Fgfs.${day}%2F${rounded_hour}%2Fatmos"
FILE="file=gfs.t${rounded_hour}z.pgrb2.0p25.f000"
VAR="var_TMP=on"
LEVEL="lev_2_m_above_ground=on"
REGION="subregion=&toplat=90&leftlon=-180&rightlon=180&bottomlat=-90"
URL="${BASE_URL}?${DIR}&${FILE}&${VAR}&${LEVEL}&${REGION}"
echo "\nDownloading data from noaa - ${URL}\n"
curl -L $URL -o temp.grib2

echo "\nGenerating tiff...\n"
gdal_translate -of GTiff -sds -a_srs EPSG:4326 temp.grib2 temp.tif
gdaldem color-relief temp.tif palette_celsius.txt temp_color.tif -alpha               

echo -e "\nGenerating png...\n"
gdal_translate -of PNG temp_color.tif output.png
echo -e "Job done."