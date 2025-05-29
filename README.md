# Hectos Website

Modern e-commerce website built with Next.js 13+, TailwindCSS, and Stripe integration.

## Features

- Modern, responsive design
- Shopping cart with hover preview
- Stripe integration for payments
- Server-side rendering with Next.js
- TailwindCSS for styling
- Framer Motion animations

## Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/hectos-website.git
cd hectos-website/front
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file with your environment variables:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

4. Start the development server:
```bash
yarn dev
```

The site will be available at `http://localhost:3001`

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the required environment variables in Vercel:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

## Stripe Integration

After deployment, configure your Stripe webhooks to point to:
```
https://[your-vercel-domain]/api/webhooks/stripe
```

Configure the following events:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
