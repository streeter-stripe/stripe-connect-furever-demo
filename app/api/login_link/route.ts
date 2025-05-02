import {getServerSession} from 'next-auth/next';
import {authOptions} from '@/lib/auth';
import {stripe} from '@/lib/stripe';

export async function GET() {
  const session = await getServerSession(authOptions);

  const stripeAccount = session?.user?.stripeAccount?.id;
  if (!stripeAccount) {
    console.error('No connected account found for user');
    return new Response('No connected account found for user', {
      status: 400,
    });
  }

  const url = `https://dashboard.stripe.com/a/${stripeAccount}`;

  return new Response(
    JSON.stringify({
      url,
    }),
    {status: 200, headers: {'Content-Type': 'application/json'}}
  );
}
