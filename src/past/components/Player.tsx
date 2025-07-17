"use client"

import {useGetPlayer} from '../../model/fetch-player'


import React from 'react'

function Player() {

    const { data, error, fetchStatus } = useGetPlayer()

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

export default Player
