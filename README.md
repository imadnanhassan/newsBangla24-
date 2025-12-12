# NewsPortal - Modern News Website

A comprehensive news portal built with Next.js 14, React, and TypeScript. This project provides a complete news website with categories, articles, search functionality, and responsive design.

## Features

### 📰 Core Features

- **News Categories**: Organized news by categories (Politics, Business, Sports, Tech, etc.)
- **Article Pages**: Detailed article views with author information
- **Search Functionality**: Full-text search across articles
- **Breaking News Ticker**: Animated breaking news banner
- **Responsive Design**: Mobile-friendly layout with adaptive components

### 🚀 Advanced Features

- **API Routes**: RESTful API endpoints for articles and search
- **Newsletter Subscription**: Email subscription form
- **Mobile Navigation**: Responsive mobile menu
- **Category Navigation**: Easy category browsing
- **Hero Slider**: Featured articles carousel
- **Sidebar Widgets**: Popular categories and trending topics

### 🎨 UI Components

- **Hero Slider**: Auto-rotating featured news
- **Article Cards**: Responsive card layouts
- **Category Sections**: Organized content by category
- **Search Bar**: Global search functionality
- **Breaking News Ticker**: Animated news updates
- **Newsletter Signup**: Email subscription form
- **Mobile Menu**: Responsive navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React Components
- **Fonts**: Geist (Next.js default)
- **Icons**: SVG and custom components

## Project Structure

```
newsportal/
├── app/
│   ├── api/
│   │   ├── articles/
│   │   └── search/
│   ├── article/
│   │   └── [slug]/
│   ├── categories/
│   │   └── [slug]/
│   ├── about/
│   ├── contact/
│   ├── latest/
│   ├── search/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ArticleCard.tsx
│   ├── BreakingNewsTicker.tsx
│   ├── CategoryNav.tsx
│   ├── CategorySection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroSlider.tsx
│   ├── MobileMenu.tsx
│   ├── NewsletterSignup.tsx
│   ├── SearchBar.tsx
│   └── Sidebar.tsx
├── lib/
│   └── data.ts
├── types/
│   └── index.ts
├── public/
├── app/
│   └── globals.css
├── next.config.ts
└── package.json
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/newsportal.git
   cd newsportal
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Next.js configuration
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_NAME=NewsPortal
NEXT_PUBLIC_SITE_DESCRIPTION=Your trusted source for the latest news
```

### Deployment

The project is configured for multiple deployment options:

1. **Vercel** (Recommended):

   - Push to GitHub/GitLab and import to Vercel
   - Automatic deployment with zero configuration

2. **Netlify**:

   - Use `next build && next export` for static hosting
   - Uncomment `output: "export"` in `next.config.ts`

3. **Docker**:

   - Use the `standalone` output for containerized deployment
   - Build with `docker build -t newsportal .`

4. **Node.js Server**:
   - Standard Next.js deployment with `next build && next start`

## API Endpoints

### Articles API

- **GET** `/api/articles` - Get all articles
- **GET** `/api/articles?category={slug}` - Get articles by category
- **GET** `/api/articles?limit={number}&page={number}` - Paginated articles

### Search API

- **GET** `/api/search?q={query}` - Search articles
- **GET** `/api/search?q={query}&limit={number}&page={number}` - Paginated search results

## Customization

### Themes

Modify colors in `app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #dc2626; /* Red */
  /* Add more theme variables */
}
```

### Content

Update news data in `lib/data.ts`:

- Add/remove categories
- Modify sample articles
- Update author information

### Layout

Customize the layout in `app/layout.tsx`:

- Modify header/footer
- Change container width
- Adjust spacing

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Contact: support@newsportal.com

---

© 2024 NewsPortal. All rights reserved.
