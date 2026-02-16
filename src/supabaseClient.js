import { createClient } from '@supabase/supabase-js'

// Ces informations sont disponibles sur votre tableau de bord Supabase
const supabaseUrl = 'VOTRE_URL_SUPABASE'
const supabaseAnonKey = 'VOTRE_CLE_ANONYME_SUPABASE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)