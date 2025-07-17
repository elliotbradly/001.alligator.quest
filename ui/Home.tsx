'use client'

import React from "react";

let dex = 0

import { Center, Button } from "@mantine/core"

export default function EarthlyDecorativeFrame() {

    var action = ()=>{
    window.location.href = './description/'
    }

    return (
        <div>

            <Center style={{ width: "100%", height: "100vh", padding: "0 20px" }}>
                <Button onClick={action} size="lg" fullWidth>
                    Record Description
                </Button>
            </Center>

        </div>)
}




