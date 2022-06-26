const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello world and start')
})

app.get('/bots', (req, res) => {
    res.json({
        type: 'message',
        data: 'get req to all bots'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})