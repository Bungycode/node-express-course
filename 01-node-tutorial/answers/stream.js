const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', { encoding: 'utf8', highWaterMark: 200 })

stream.on('data', (result) => {
  console.log(result)
})

stream.on('error', (err) => console.log("There was an error!", err))