# Email Setup – Receive Leads in Your Inbox

When clients submit the **Free Audit** or **Contact** form, you'll get an email.

## 1. Create a Resend account (free)

1. Go to [resend.com](https://resend.com) and sign up
2. Free tier: **100 emails/day**

## 2. Get your API key

1. In Resend: **API Keys** → **Create API Key**
2. Copy the key (starts with `re_`)

## 3. Add environment variables

Create a file `.env.local` in the project root:

```env
# Your email – where you receive leads
CONTACT_EMAIL=your@email.com

# Resend API key from step 2
RESEND_API_KEY=re_your_api_key_here
```

## 4. Restart the dev server

```bash
npm run dev
```

## What you'll receive

- **Audit form:** Business name, website URL, email, phone
- **Contact form:** Name, email, message

Each email includes a **reply-to** address set to the client's email, so you can reply directly.

## Optional: custom sender domain

To send from `noreply@yourdomain.com` instead of `onboarding@resend.dev`:

1. In Resend: add and verify your domain
2. Add to `.env.local`:

```env
RESEND_FROM_EMAIL=noreply@yourdomain.com
```
