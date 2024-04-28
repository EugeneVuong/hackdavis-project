import express from 'express'
import supabase from './supabaseClient.js'
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hello World!')
  // const {data, error} = await supabase
  // .from('smoothies')
  // .select()

  // console.log(data)
  const title = 'dople blue'
  const method = 'Avocado, blueberries, and pineapple'
  const rating = 8
  // const{data1,error1} = await supabase
  // .from('smoothies')
  // .insert([{title, method, rating }])

  // const{data2, error2} = await supabase
  // .from('smoothies')
  // .update([{title, method, rating}])
  // .eq('id','5')
  // .select()

  // const{data3, error3} = await supabase
  // .from('smoothies')
  // .delete()
  // .eq('id','6')
  // .select()

  const{data, error} = await supabase 
    .from('smoothies')
    .select()
    .order('id', {ascending:false})

  console.log(data)
})

app.get('/he', (req, res) => {
  res.send('bruh')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

