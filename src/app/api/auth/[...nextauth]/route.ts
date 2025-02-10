import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from '@/lib/supabase';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await handleSignIn(user);
      return true;
    },
  },
});

async function handleSignIn(user: {email: string, name: string, image: string}) {
    // Check if the user already exists in the database
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

    if (!data) {
        // User does not exist, insert new user details
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                { email: user.email, name: user.name, image: user.image, created_at: new Date() }
            ]);

        if (insertError) {
            console.error('Error inserting user:', insertError);
        }
    }
}

export { handler as GET, handler as POST }; 