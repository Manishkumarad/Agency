# ScaleCraft - Digital Agency Website

![ScaleCraft Logo](https://img.shields.io/badge/ScaleCraft-Digital%20Agency-blue?style=for-the-badge&logo=rocket)

A modern Next.js digital agency website that helps small businesses grow online. We build websites, e-commerce stores, and mobile applications that bring customers to your business.

## 🌟 Features

- **Modern Design**: Beautiful, responsive website built with Next.js 14 and Tailwind CSS
- **Contact Forms**: Functional contact and audit request forms with email integration
- **Service Showcase**: Display of web development, e-commerce, and mobile app services
- **Portfolio**: Case studies and success stories from real clients
- **Pricing Plans**: Clear pricing tiers for different service packages
- **Interactive Elements**: Smooth animations and modern UI components
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **SEO Optimized**: Built with best practices for search engine optimization

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Email Service**: Resend API for contact form submissions
- **State Management**: React Hooks
- **Build Tool**: Next.js built-in bundler

## 📱 Application Structure

### Public Pages
- **Homepage** (`/`): Landing page with services, portfolio, and testimonials
- **Services** (`#services`): Detailed service offerings
- **Portfolio** (`#portfolio`): Client work and case studies
- **Pricing** (`#pricing`): Service packages and pricing
- **Contact** (`#contact`): Contact form and business information

### Forms & API
- **Free Audit Form** (`#audit`): Website audit request form
- **Contact API** (`/api/contact`): Handles contact form submissions
- **Audit API** (`/api/audit`): Handles audit request submissions

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manishkumarad/Agency.git
   cd Agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your email configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Agency/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── audit/         # Audit form API
│   │   ├── contact/       # Contact form API
│   │   └── auth/          # Authentication APIs
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Radix UI)
│   └── agency-navigation.tsx
├── lib/                  # Utility functions
│   ├── auth-store.ts     # Authentication store
│   └── auth.ts           # Auth utilities
├── public/               # Static assets
├── package.json          # Dependencies
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Key Components

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Handling**: Comprehensive forms with validation using React Hook Form
- **Email Integration**: Resend API for contact form submissions
- **Modern UI**: Custom components built with Radix UI primitives
- **Interactive Elements**: Smooth animations and transitions

## 📧 Email Configuration

The contact forms use Resend for email delivery. Set up your environment variables:

```env
CONTACT_EMAIL=your-email@example.com
RESEND_API_KEY=re_your_api_key_here
```

Get your free API key at [https://resend.com](https://resend.com)

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your email configuration
3. Get a free Resend API key from https://resend.com

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Manish Kumar** - *Initial work* - [Manishkumarad](https://github.com/Manishkumarad)

## � Contact

- **Email**: deodhmanish059@gmail.com
- **Phone**: 9135112405
- **Location**: Mig 24, Rajeev Nagar, Bhopal, Madhya Pradesh
- **GitHub**: [@Manishkumarad](https://github.com/Manishkumarad)
- **Project Link**: [https://github.com/Manishkumarad/Agency](https://github.com/Manishkumarad/Agency)

## 🔗 Live Demo

Visit the live application: [https://your-domain.vercel.app](https://your-domain.vercel.app)

---

⭐ **Star this repository if you found it helpful!**

![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
