import React from 'react'

import {useInitFictiq} from '@queue/okwierdo.query'

const Page = () => {
    const { data, error, fetchStatus } = useInitFictiq()

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

export default Page
