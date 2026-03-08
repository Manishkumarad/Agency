# Email Setup – Receive Leads in Your Inbox

When clients submit the **Free Audit** or **Contact** form, you'll get an email.

## ✅ Your API Key is Ready

Your Resend API key has been configured: `re_eeWw8QoE_AH4gtttzFB4Uxj9vieuPtAip`

## 1. Create .env.local file

Create a file `.env.local` in the project root (this file is ignored by Git for security):

```env
# ===========================================
# ScaleCraft - Email Configuration
# ===========================================

# Your email address - where you receive leads (audit + contact form)
CONTACT_EMAIL=deodhmanish059@gmail.com

# Resend API key - Free tier: 100 emails/day
RESEND_API_KEY=re_eeWw8QoE_AH4gtttzFB4Uxj9vieuPtAip

# Optional: Custom "from" email (must be a verified domain in Resend)
# If not set, uses onboarding@resend.dev (Resend's default for testing)
# RESEND_FROM_EMAIL=noreply@yourdomain.com
```

## 2. For Local Development

1. Save the `.env.local` file in your project root
2. Restart the development server:
   ```bash
   npm run dev
   ```
3. Test the contact forms at http://localhost:3000

## 3. For Vercel Deployment

Add these environment variables in your Vercel dashboard:
1. Go to your project on Vercel → Settings → Environment Variables
2. Add both variables:
   - `CONTACT_EMAIL` = `deodhmanish059@gmail.com`
   - `RESEND_API_KEY` = `re_eeWw8QoE_AH4gtttzFB4Uxj9vieuPtAip`
3. Redeploy your application

## What you'll receive

- **Audit form:** Business name, website URL, email, phone
- **Contact form:** Name, email, message

Each email includes a **reply-to** address set to the client's email, so you can reply directly.

## 📧 Email Templates

**Contact Form:**
- From: ScaleCraft <onboarding@resend.dev>
- To: deodhmanish059@gmail.com
- Subject: [Contact] {name} - Message from ScaleCraft website

**Audit Request:**
- From: ScaleCraft <onboarding@resend.dev>
- To: deodhmanish059@gmail.com
- Subject: [Free Audit] {business} - Website Audit Request

## 🔒 Security Notes

- ✅ API key is never committed to Git
- ✅ .env.local is in .gitignore
- ✅ Production uses Vercel environment variables
- ✅ Free tier includes 100 emails/day

## Optional: Custom Sender Domain

To send from `noreply@yourdomain.com` instead of `onboarding@resend.dev`:

1. In Resend: add and verify your domain
2. Add to `.env.local` and Vercel:
   ```env
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

## 🧪 Testing

After setup:
1. Fill out the contact form on your website
2. Check deodhmanish059@gmail.com for the email
3. Verify you can reply directly to the client
