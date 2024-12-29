import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateNumber() {
  try {
    // For now, just use current timestamp as our "random" number
    const newNumber = Date.now();
    
    const { data, error } = await supabase
      .from('missing_numbers')
      .update({
        current_number: newNumber,
        updated_at: new Date().toISOString()
      })
      .eq('source', 'wikipedia')
      .select();

    if (error) throw error;
    
    console.log('Successfully updated number:', newNumber);
    return data;
  } catch (error) {
    console.error('Error updating number:', error);
    throw error;
  }
}

// Run the update
updateNumber()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
