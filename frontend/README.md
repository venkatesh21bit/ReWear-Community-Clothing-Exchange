# ReWear Frontend - Next.js Application

This is the frontend application for **ReWear**, a community clothing exchange platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=ReWear
```

3. **Start development server:**
```bash
npm run dev
```

4. **Access the application:**
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quick Start Scripts
- **Windows**: Run `start-dev.bat` for automated setup and start
- **Production Build**: Run `build.bat` for production build

## 🛠️ Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React icons
- **HTTP Client**: Axios for API communication
- **UI Components**: Headless UI for accessible components

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and Tailwind config
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
│   ├── api.ts            # API client and endpoints
│   └── utils.ts          # Utility functions
└── types/                 # TypeScript type definitions
    └── index.ts          # Application types
```

## 🎨 Features Implemented

- ✅ **Landing Page** with hero section and features
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **TypeScript Configuration** for type safety
- ✅ **API Integration** setup for Django backend
- ✅ **Custom Styling** with ReWear theme
- ✅ **Component Structure** ready for development

## 🔗 API Integration

The frontend is configured to connect to the Django backend running on `http://localhost:8000`. 

### API Features:
- Automatic authentication token handling
- Error handling and redirects
- File upload support with progress tracking
- Comprehensive endpoint configuration

## 🎯 Planned Features

### Pages to Implement:
- [ ] Authentication (Login/Register)
- [ ] User Dashboard
- [ ] Item Browsing and Search
- [ ] Item Detail Pages
- [ ] Add New Item Form
- [ ] Swap Management
- [ ] User Profile
- [ ] Admin Panel

### Components to Build:
- [ ] Navigation Header
- [ ] Item Cards
- [ ] Search Filters
- [ ] User Profile Components
- [ ] Swap Request Components
- [ ] Image Upload Components

## 🌟 Development Guidelines

### Component Structure:
```tsx
// components/ItemCard.tsx
import { Item } from '@/types';

interface ItemCardProps {
  item: Item;
  onSelect?: (item: Item) => void;
}

export function ItemCard({ item, onSelect }: ItemCardProps) {
  // Component implementation
}
```

### API Usage:
```tsx
import api, { endpoints } from '@/lib/api';

// Fetch data
const { data } = await api.get(endpoints.items.list);

// Post data
await api.post(endpoints.items.create, itemData);
```

### Styling:
- Use Tailwind CSS classes
- Follow the custom ReWear design tokens
- Use the predefined component classes (`.rewear-button`, `.rewear-card`, etc.)

## 🚀 Deployment

### Build for Production:
```bash
npm run build
npm start
```

### Environment Variables:
Set these for production:
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable analytics (true/false)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🤝 Contributing

This project is part of the Odoo Hackathon. Follow these guidelines:

1. Use TypeScript for all new components
2. Follow the established project structure
3. Add proper type definitions
4. Use Tailwind CSS for styling
5. Test API integration with the Django backend

## 📄 License

This project is developed for the Odoo Hackathon and follows the hackathon's terms and conditions.
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
