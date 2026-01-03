# EmailJS Setup Guide

This portfolio uses EmailJS to handle contact form submissions. Follow these steps to set it up:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free tier)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Set **To Email** to: `hassan.zaib223@gmail.com`
5. Save the template and copy your **Template ID**

## Step 4: Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** in the API Keys section
3. Copy it

## Step 5: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add these variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual EmailJS credentials
4. Restart your development server after adding the variables

## Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Troubleshooting

- **Form not sending**: Check that all environment variables are set correctly
- **Email not received**: Verify your email service is connected and template is correct
- **Rate limit**: Free tier allows 200 emails/month. Upgrade if needed.

## Alternative: FormSubmit (Simpler Option)

If you prefer a simpler setup without EmailJS, you can use FormSubmit:

1. Change the form action to: `action="https://formsubmit.co/hassan.zaib223@gmail.com"`
2. Add `method="POST"` to the form
3. No additional setup needed!

