import { useMemo } from 'react'

export default function NOAALink() {
  const dir = useMemo(() => {
    const [day, time] = new Date().toISOString().split('T')
    const currentHour = +time.slice(0, 2)

    let roundedHour = '00'
    if (currentHour >= 6 && currentHour < 12) roundedHour = '06'
    if (currentHour >= 12 && currentHour < 18) roundedHour = '12'
    if (currentHour >= 18 && currentHour < 24) roundedHour = '18'

    return encodeURIComponent(
      `/gfs.${day.replaceAll('-', '')}/${roundedHour}/atmos`
    )
  }, [])

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?dir=${dir}`}
    >
      NOAA Global Forecast System
    </a>
  )
}
