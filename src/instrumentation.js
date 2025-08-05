import { initEarth } from '../base/000.earth'
import { initTime } from '../base/001.time'
import { initSpace } from '../base/002.space'
import { initSower } from '../base/010.sower'

export async function register() {

    global.EARTH = await initEarth(1)
    global.TIME = await initTime(1)
    global.SPACE = await initSpace(1)
    global.SOWER = await initSower(1)

}