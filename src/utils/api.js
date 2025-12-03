import { supabase } from './supabaseClient';

export const uploadSchedule = async (file) => {
  try {
    // 1. Upload the file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `schedules/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('schedules')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Storage error: ${uploadError.message}`);
    }

    // 2. Invoke the Edge Function
    const { data, error: functionError } = await supabase.functions.invoke('parse-schedule', {
      body: { filePath },
    });

    if (functionError) {
      // If the function fails, try to remove the uploaded file
      await supabase.storage.from('schedules').remove([filePath]);
      throw new Error(`Function error: ${functionError.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in uploadSchedule:', error);
    throw error;
  }
};
