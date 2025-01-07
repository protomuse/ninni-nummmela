# Contact Form with Next.js and Resend

A modern, responsive contact form built with Next.js 13+, React Hook Form, and Resend for email handling.

## Features

- Server-side email handling with Resend
- Form validation with Zod
- Responsive design with Tailwind CSS
- Loading states and user feedback
- TypeScript support

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_email@example.com
```

4. Get your Resend API key:
- Sign up at [Resend](https://resend.com)
- Go to [API Keys](https://resend.com/api-keys) to create a key
- Add the key to your `.env.local` file

5. Run the development server:
```bash
npm run dev
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add the following environment variables in Vercel:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
5. Deploy!

Your app will be automatically deployed to a `.vercel.app` domain. You can also configure a custom domain in your Vercel project settings.

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key for sending emails
- `CONTACT_EMAIL`: The email address where you want to receive contact form messages
- `RESEND_FROM_EMAIL`: (Optional) Your verified domain email for sending

## License

MIT
