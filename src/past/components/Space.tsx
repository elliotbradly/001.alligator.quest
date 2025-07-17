"use client"

import {useInitSpace} from '../data/init-space'
import {useSelectSwatch} from '../data/pixel.select-swatch'


import React from 'react'

function Space() {

    const { data, error, fetchStatus } = useInitSpace()

    if ( error ) return ( <div> data['error'] </div>)
    if ( data  ){

        var s = JSON.stringify( data  )

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

export default Space
