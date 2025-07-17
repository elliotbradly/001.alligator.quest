import { initEarth } from '@base/000.earth'

export async function GET() {

  var bit = await initEarth(0)
  return Response.json({ ertBit: { idx: 'init-earth', dat:bit } })
}




