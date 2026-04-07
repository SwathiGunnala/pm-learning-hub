import { getUncachableStripeClient } from '../server/stripeClient';

async function createProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Creating products and prices in Stripe...');

    const existingProducts = await stripe.products.search({
      query: "name:'Pro Plan' AND active:'true'",
    });

    if (existingProducts.data.length > 0) {
      console.log('Pro Plan already exists. Skipping creation.');
      console.log(`Product ID: ${existingProducts.data[0].id}`);
      const prices = await stripe.prices.list({ product: existingProducts.data[0].id, active: true });
      prices.data.forEach(p => console.log(`Price: ${p.id} - ${p.unit_amount! / 100} ${p.currency}/${(p.recurring as any)?.interval}`));
      return;
    }

    const proProduct = await stripe.products.create({
      name: 'Pro Plan',
      description: 'Unlimited access to all case studies, exercises, AI feedback, and progress tracking.',
      metadata: { tier: 'pro' },
    });
    console.log(`Created product: ${proProduct.name} (${proProduct.id})`);

    const proMonthlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 999,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: { billing: 'monthly' },
    });
    console.log(`Created monthly price: $9.99/month (${proMonthlyPrice.id})`);

    const proYearlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 7999,
      currency: 'usd',
      recurring: { interval: 'year' },
      metadata: { billing: 'yearly' },
    });
    console.log(`Created yearly price: $79.99/year (${proYearlyPrice.id})`);

    console.log('\nProduct and prices created successfully!');
    console.log('Webhooks will sync this data to your database automatically.');
  } catch (error: any) {
    console.error('Error creating products:', error.message);
    process.exit(1);
  }
}

createProducts();
