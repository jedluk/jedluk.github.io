import React, { useEffect, useState } from 'react'
import { useExportableCSV } from 'use-exportable-csv'

export default function CSVLink() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(setData)
  }, [])

  const options = { bom: true }
  const csvLink = useExportableCSV(data, options)

  return (
    <a
      className="text:white hover:text-white"
      href={csvLink}
      download="test.csv"
    >
      CSV download
    </a>
  )
}
