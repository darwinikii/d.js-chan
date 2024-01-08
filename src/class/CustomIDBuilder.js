import { Logger } from '../functions.js'

export default function (id, data) {
  if (id.includes('@*@') || data.includes('@*@')) throw new Error("CustomID cannot include '@*@'")
  if (typeof id !== 'string' || typeof data !== 'string' || (id + '@*@' + data).length > 100) return Logger.error('Custom ID creation error. ID and data must be strings and total less than 97 characters.')
  return id + '@*@' + data
}
