import { updateEarth } from '@base/000.earth'

export async function GET() {

  var bit = await updateEarth(0)
  return Response.json({ ertBit: { idx: 'update-earth', dat:bit } })
}




