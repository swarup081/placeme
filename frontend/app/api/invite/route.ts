import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!supabaseServiceKey) {
      return NextResponse.json({ error: 'Server misconfiguration: Missing service key' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Generate a random temporary password
    const tempPassword = Math.random().toString(36).slice(-10) + 'A1!';

    // 2. Create the user using Supabase Admin Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        role: role,
        name: `Invited ${role}`
      }
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // 3. Update their role directly in the profiles table (just to be absolutely certain)
    if (authData?.user) {
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({ role: role })
        .eq('id', authData.user.id);

      if (profileError) {
          console.error("Profile update error during invite:", profileError);
      }
    }

    // Since we aren't hooking up a real email provider right now for the password,
    // we'll just return it in the payload. In a real scenario, we'd send an email
    // or use Supabase's inviteUserByEmail function.
    return NextResponse.json({
      message: 'User invited successfully',
      email: email,
      temporaryPassword: tempPassword
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
