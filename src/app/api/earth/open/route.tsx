import { openEarth } from '@base/000.earth'

export async function GET() {

  var bit = await openEarth(0)
  return Response.json({ ertBit: { idx: 'open-earth', dat:bit } })
}




