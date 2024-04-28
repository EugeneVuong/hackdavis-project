import express from 'express'
import supabase from './supabaseClient.js'
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hello World!')
  const {data, error} = await supabase
  .from('smoothies')
  .select()

  console.log(data)
  const title = 'Spicy Shah'
  const method = 'Mango with Prickly Pear'
  const rating = 11
  const{data1,error1} = await supabase
  .from('smoothies')
  .insert([{title, method, rating }])

  console.log(data1)
})

app.get('/he', (req, res) => {
  res.send('bruh')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

