import { initTime } from '@base/001.time'

export async function GET() {

  var bit = await initTime(0)
  return Response.json(bit)
}




