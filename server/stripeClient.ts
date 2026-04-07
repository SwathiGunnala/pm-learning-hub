import Stripe from 'stripe';
import { StripeSync } from 'stripe-replit-sync';

let connectionSettings: any;
let stripeSyncInstance: StripeSync | null = null;

async function getStripeSecretKey(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!hostname || !xReplitToken) {
    throw new Error('Stripe connector environment variables not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=stripe',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken,
      },
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const secretKey = connectionSettings?.settings?.secret_key;
  if (!secretKey) {
    throw new Error('Stripe secret key not found. Please connect your Stripe account.');
  }
  return secretKey;
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = await getStripeSecretKey();
  return new Stripe(secretKey, { apiVersion: '2025-01-27.acacia' });
}

export async function getStripeSync(): Promise<StripeSync> {
  if (stripeSyncInstance) return stripeSyncInstance;
  const secretKey = await getStripeSecretKey();
  stripeSyncInstance = new StripeSync({
    stripeSecretKey: secretKey,
    databaseUrl: process.env.DATABASE_URL!,
  });
  return stripeSyncInstance;
}
