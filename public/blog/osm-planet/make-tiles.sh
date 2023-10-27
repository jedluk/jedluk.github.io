SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

bbox=()
output=""
dump=""

# parse cli args
while [[ $# -gt 0 ]]; do
  case $1 in
    --help)
      echo "Script will crop area from planet dump and generate OSM compatibile tiles."
      echo "Correct call:"
      echo "./generate_tiles.sh --bbox LEFT,BOTTOM,RIGHT,TOP --dump planet_dump.osm.pbf --output my_area"
      exit 0
      ;;
    --bbox)
      bbox=($(echo "$2" | tr ',' ' '))
      shift 2
      ;;
    --output)
      output="$2"
      shift 2
      ;;
    --dump)
      dump="$2"
      shift 2
      ;;
    *) shift ;;
  esac
done

if [[ -z "$bbox" || -z "$output" || -z "$dump" ]]; then
  echo "Error: bbox, name, dump options are required" >&2
  exit 1
fi

CROPPED_PBF="${SCRIPT_DIR}/${output}.pbf"
echo "Cropping area from ${dump} into ${CROPPED_PBF} with bbox: ${bbox[*]}"
osmium extract --bbox ${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]} --set-bounds --strategy=smart ${dump} --output ${CROPPED_PBF} --overwrite


# water is necessary to generate tiles
WATER="${SCRIPT_DIR}/water-polygons-split-4326"

if [ -d "$WATER" ]; then
  echo "${WATER} exists..."
else 
    echo "Fetching water data..."
    wget https://osmdata.openstreetmap.de/download/water-polygons-split-4326.zip --directory-prefix ${SCRIPT_DIR}
    unzip "${SCRIPT_DIR}/water-polygons-split-4326.zip"
fi

CONFIG="${SCRIPT_DIR}/config-openmaptiles.json"

if [ -f "$CONFIG" ]; then
    echo "${CONFIG} exists..."
else 
  echo "Fetching OSM config"
  wget https://raw.githubusercontent.com/systemed/tilemaker/master/resources/config-openmaptiles.json --directory-prefix ${SCRIPT_DIR}
fi

PROCESS="${SCRIPT_DIR}/process-openmaptiles.lua"

if [ -f "$PROCESS" ]; then
    echo "${PROCESS} exists..."
else 
  echo "Fetching LUA config"
  wget https://raw.githubusercontent.com/systemed/tilemaker/master/resources/process-openmaptiles.lua --directory-prefix ${SCRIPT_DIR}
fi

TILES="${SCRIPT_DIR}/${output}.mbtiles"
echo "Generating tiles..."
tilemaker --input ${CROPPED_PBF} --output ${TILES} --process ${PROCESS} --config ${CONFIG}