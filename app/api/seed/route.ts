import { NextResponse } from 'next/server';
import { PROGRAMS, SERMONS } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    let results = [];
    
    // Seed Programs
    for (const program of PROGRAMS) {
      const { data, error } = await supabase
        .from('programs')
        .select('id')
        .eq('id', program.id)
        .single();
        
      if (!data) {
        await supabase.from('programs').insert([program]);
        results.push(`Inserted program: ${program.title}`);
      }
    }

    // Seed Sermons
    for (const sermon of SERMONS) {
      const { data, error } = await supabase
        .from('sermons')
        .select('id')
        .eq('id', sermon.id)
        .single();
        
      if (!data) {
        await supabase.from('sermons').insert([sermon]);
        results.push(`Inserted sermon: ${sermon.title}`);
      }
    }

    return NextResponse.json({ success: true, inserted: results, message: "Base de données initialisée avec succès !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'initialisation" }, { status: 500 });
  }
}
