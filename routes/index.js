const Url = require('postman-collection').Url
const Response = require('postman-collection').Response
const fs = require('fs')
const { Router } = require('express')
const Collection = require('postman-collection').Collection
const axios = require('axios')
const uuid = require('uuid')
const router = new Router()

router.get('/', (req, res) => {
  res.send('Mock server')
});
// remove route dynamicly runtime
// https://stackoverflow.com/questions/10378690/remove-route-mappings-in-nodejs-express?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
router.post('/', (req, res) => {
  // console.log('body', req.body)
  const body = req.body
  const id = uuid.v4()

  if (body.postman_url && body.service_name) {
    const service_name = body.service_name
    axios.get(body.postman_url)
    .then(response => {
      // console.log('res:', response.data)
      const myCollection = response.data
      let routePath = []
      myCollection.requests.map(item => {
        // console.log('item', item)
        const url = new Url(item.url)
        if (item.responses && item.responses.length > 0) {
          console.log('method: ', item.method)
          console.log(url.getPath())
          const path = "/" + service_name + url.getPath()
          routePath.push(path)
          const body = JSON.parse(item.responses[0].text)
          if (item.method == 'GET') {
            router.get(path, (req, res) => {
              res.status(200).json(body)
            })
          } else if (item.method == 'POST') {
            router.post(path, (req, res) => {
              res.status(200).json(body)
            })
          }
        } else {
          // console.log('response: ', item.responses)
        }
      })
      res.status(200).json({routePath})
    })

    .catch(ex => {
      console.log(ex)
    })
  }
})

// axios.get('https://www.getpostman.com/collections/f23ba1f4f4cc3ef67a80')
//   .then(response => {
//     // console.log('res:', response.data)
//     const myCollection = response.data

//     myCollection.requests.map(item => {
//       // console.log('item', item)
//       const url = new Url(item.url)
//       if (item.responses && item.responses.length > 0) {
//         console.log('method: ', item.method)
//         console.log(url.getPath())
//         const path = url.getPath()
//         const body = JSON.parse(item.responses[0].text)
//         if (item.method == 'GET') {
//           router.get(path, (req, res) => {
//             res.status(200).json(body)
//           })
//         } else if (item.method == 'POST') {
//           router.post(path, (req, res) => {
//             res.status(200).json(body)
//           })
//         }
//       } else {
//         // console.log('response: ', item.responses)
//       }
//     })
//   })

//   .catch(ex => {
//     console.log(ex)
//   })

// // Load a collection to memory from a JSON file on disk (say, sample-collection.json)
// const myCollection = new Collection(JSON.parse(fs.readFileSync('postman-collection.json').toString()));

// myCollection.items.map(item => {
//   const request = item.request
//   const url = new Url(request.url)
//   const response = new Response(item.responses.idx(0))
//   if (response.body) {
//     console.log('method: ', request.method)
//     console.log(url.getPath())
//     const path = url.getPath()
//     const body = JSON.parse(response.body)
//     if (request.method == 'GET') {
//       router.get(path, (req, res) => {
//         res.status(200).json(body)
//       })
//     } else if (request.method == 'POST') {
//       router.post(path, (req, res) => {
//         res.status(200).json(body)
//       })
//     }
//   } else {
//     // console.log('response: ', item.responses)
//   }
// })


module.exports = router
