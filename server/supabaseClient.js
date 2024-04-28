import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase