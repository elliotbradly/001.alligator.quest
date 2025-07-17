import { initPivot } from '../actions/play'
import React from 'react'

async function Open() {

  const bit = await initPivot()
  var s = JSON.stringify(bit)

  return (
    <div>
      {s}
    </div>
  )


}

export default Open
