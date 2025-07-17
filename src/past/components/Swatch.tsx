"use client"

import { useSelectSwatch } from '../data/pixel.select-swatch'
import React from 'react'

function Swatch() {

  const { data, error, fetchStatus } = useSelectSwatch()

  if (error) return (<div> data['error'] </div>)
  if (data) {

    var s = JSON.stringify(data)

    return (
      <div>
        {s}
      </div>
    )
  }

  return (
    <div>

    </div>
  )
}

export default Swatch
