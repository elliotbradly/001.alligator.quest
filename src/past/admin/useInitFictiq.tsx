import React from 'react'

import { Text } from '@mantine/core'
import {useInitFictiq} from '@queue/okwierdo.query'

const Page = () => {
    const { data, error, fetchStatus } = useInitFictiq()

    if ( error ) return ( <div> ERROR: {data['error']} </div>)
    if ( data  ){

        var s = data.dat 


        return (

          <Text> RESULT: {s} </Text>

        )
    }


  return (
    <div>
      loading...
    </div>
  )

}

export default Page
