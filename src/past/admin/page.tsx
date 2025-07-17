"use client"

import { MantineProvider, createTheme, Paper, Button, rem, Box, Grid, ScrollArea, Title, Divider } from '@mantine/core'
import '@mantine/core/styles.css'

import { useRouter } from 'next/navigation'

import UseInitFictiq from './useInitFictiq'
import { updateFictiq } from '../../../core/277.okwierdo';

const theme = createTheme({
    headings: {
        // properties for all headings
        fontWeight: '400',
        fontFamily: 'Roboto',

        // properties for individual headings, all of them are optional
        sizes: {
            h1: {
                fontWeight: '100',
                fontSize: rem(26),
                lineHeight: '3',
            },
            h2: { fontSize: rem(30), lineHeight: '1.5' },
            // ...up to h6
            h6: { fontWeight: '900' },
        },
    },
});


export default function BrutalistDiscoElysiumInterface() {

    const router = useRouter()

    var click0 = () => window.location.href = './'

    var click1 = () => window.location.href = './admin/pixel-pivot'
    var click2 = () => window.location.href = './admin/hexmap-create'

    var click3 = () => window.location.href = './admin/being-load'
    var click4 = () => window.location.href = './admin/being-create'

    var click5 = () => window.location.href = './admin/setting-create'

    let action = async ()=>{

        var bit = await updateFictiq(3)
        alert( JSON.stringify(bit))

    }
   

    return (
        <MantineProvider theme={theme}>

            <Box className="flex items-center justify-center min-h-screen w-full overflow-hidden">
                <Paper
                    className="w-[1280px] h-[720px] flex items-center justify-center"
                    shadow="md"
                >
                    <Grid gutter={0} style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>

                        <Grid.Col span={4}>
                            <ScrollArea className='h-screen w-full' scrollbars="y">


                                <Divider></Divider>

                                <Button fullWidth color='black' variant='outline' onClick={click0}> Fictiq </Button>
                                <br></br>

                                <Divider></Divider>

                                <br></br>

                                <Button onClick={click1} color='purple' fullWidth>
                                    Access Pixel Pivot
                                </Button>

                                <Divider></Divider>

                                <br></br>


                                <Button onClick={click1} color='purple' fullWidth>
                                    Load Hexmap
                                </Button>

                                <Button onClick={click2} color='purple' fullWidth>
                                    Create Hexmap
                                </Button>

                                <Divider></Divider>

                                <br></br>

                                <Button onClick={click3} color='purple' fullWidth>
                                    Load Being
                                </Button>

                                <Button onClick={click4} color='purple' fullWidth>
                                    Create Being
                                </Button>


                                <Divider></Divider>

                                <br></br>


                                <Button onClick={click5} color='purple' fullWidth>
                                    Create Setting
                                </Button>



                                <Button onClick={action}> Setting Create  </Button>
                                <UseInitFictiq />


                                


                            </ScrollArea>
                        </Grid.Col>


                        <Grid.Col span={8} style={{ position: 'relative' }}>

                        </Grid.Col>

                    </Grid>

                </Paper>
            </Box>



        </MantineProvider>
    )
}