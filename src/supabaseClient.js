import { createClient } from '@supabase/supabase-js'

// Ces informations sont disponibles sur votre tableau de bord Supabase
const supabaseUrl = https://kteaebstdgeqlxhuidaz.supabase.co
const supabaseAnonKey = sb_publishable_aEGE5GTu4nTWaR39lQp4SQ_77DJkzMg

export const supabase = createClient(supabaseUrl, supabaseAnonKey)