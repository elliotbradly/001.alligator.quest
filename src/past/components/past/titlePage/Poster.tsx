import { Box, Text, rem } from '@mantine/core'

import React from 'react'

function Poster() {
    return (
        <div>

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', position: 'relative' }}>
                <Box
                    style={{
                        width: '1080px',
                        height: '1080px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginTop: '2rem',
                    }}
                >
                    <Box
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            transform: 'perspective(800px) rotateX(10deg) rotateY(-15deg) rotateZ(-5deg)',
                            transformOrigin: 'center center',
                            boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <img
                            src="/img/000.png?height=1080&width=1080"
                            alt="Placeholder"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Box>
                <Box
                    style={{
                        background: 'black',
                        padding: '1rem 2rem',
                        borderRadius: '2rem',
                        transform: 'rotate(-5deg) translateY(-50%)',
                        boxShadow: '5px 5px 0 rgba(0, 0, 0, 0.2)',
                        zIndex: 2,
                        position: 'absolute',
                        top: '4rem',
                        left: '8rem',
                    }}
                >
                    <Text
                        color="white"
                        size={rem(36)}
                        style={{
                            letterSpacing: '0.1em',
                            fontWeight: 'bold',
                        }}
                    >
                        FUNFOOT
                    </Text>
                </Box>
            </Box>


        </div>
    )
}

export default Poster
