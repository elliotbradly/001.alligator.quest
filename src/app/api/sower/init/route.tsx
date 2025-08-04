import { initSower } from '@base/010.sower'

export async function GET() {

  var bit = await initSower(0)
  return Response.json(bit)
}




