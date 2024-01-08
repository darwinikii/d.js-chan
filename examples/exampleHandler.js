import express from 'express';

import { Logger } from '../src/functions.js'

export const structure = {
  name: 'WebServer',
  autorun: true,
  type: 0 //0 is for service handlers, 1 is for function handlers
}

export async function run (client) {
  server = app.listen(3000, () => {
    Logger.done('WebServer running on https://127.0.0.1:3000')
  })
}

export async function stop (client) {
  server.close()
  Logger.done('WebServer stopped')
}

var server

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})