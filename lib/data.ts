import type { Article, Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Politics", slug: "politics" },
  { id: "2", name: "Business", slug: "business" },
  { id: "3", name: "Sports", slug: "sports" },
  { id: "4", name: "Tech", slug: "tech" },
  { id: "5", name: "Entertainment", slug: "entertainment" },
  { id: "6", name: "Breaking News", slug: "breaking-news" },
  { id: "7", name: "Latest News", slug: "latest-news" },
  { id: "8", name: "Country News", slug: "country-news" },
  { id: "9", name: "World News", slug: "world-news" },
  { id: "10", name: "Health", slug: "health" },
];

const sampleTitles = [
  "Government Announces New Economic Policy",
  "Stock Market Hits Record High",
  "Championship Finals Set for This Weekend",
  "Latest Tech Gadget Released",
  "Celebrity Scandal Rocks Entertainment World",
  "Breaking: Major Earthquake Strikes Region",
  "New Study Reveals Health Breakthrough",
  "International Summit Concludes Successfully",
  "Local Hero Saves Community",
  "Innovation in Renewable Energy",
  "Political Debate Heats Up",
  "Business Merger Shakes Industry",
  "Athlete Breaks World Record",
  "AI Advances in Technology",
  "Movie Premiere Draws Crowds",
  "Emergency Alert Issued",
  "Scientific Discovery Announced",
  "Diplomatic Talks Progress",
  "Community Event Success",
  "Startup Raises Millions",
  "Prime Minister Unveils New Infrastructure Plan",
  "Central Bank Cuts Interest Rates",
  "National Team Wins International Tournament",
  "New Smartphone Revolutionizes Mobile Industry",
  "Famous Director Announces Retirement",
  "Tropical Storm Warning Issued",
  "Cancer Research Makes Major Breakthrough",
  "Global Leaders Sign Climate Agreement",
  "Volunteers Clean Up Local Beach",
  "Solar Power Technology Improves Efficiency",
  "Opposition Parties Form Coalition",
  "Tech Giant Acquires Popular Startup",
  "Olympic Qualifiers Begin",
  "Quantum Computing Achieves Milestone",
  "Blockbuster Movie Breaks Box Office Records",
  "Wildfire Forces Evacuations",
  "Vaccine Shows Promise in Clinical Trials",
  "Peace Talks Resume After Months",
  "Charity Event Raises Record Funds",
  "Electric Vehicle Sales Surge",
];

const sampleImages = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
  "https://picsum.photos/800/400?random=4",
  "https://picsum.photos/800/400?random=5",
  "https://picsum.photos/800/400?random=6",
  "https://picsum.photos/800/400?random=7",
  "https://picsum.photos/800/400?random=8",
  "https://picsum.photos/800/400?random=9",
  "https://picsum.photos/800/400?random=10",
];

export const articles: Article[] = Array.from({ length: 40 }).map((_, i) => {
  // Create URL-friendly slugs from titles
  const createSlug = (title: string, index: number) => {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Remove multiple hyphens
        .substring(0, 50) + // Limit length
      `-${index + 1}`
    ); // Add unique identifier
  };

  // Standardized slug format for all articles
  const slug = createSlug(sampleTitles[i % sampleTitles.length], i);

  // Better category distribution - ensure each category gets roughly equal representation
  const categoryIndex = Math.floor(i / 4) % categories.length;
  const category = categories[categoryIndex];

  // More realistic excerpts based on category
  const getExcerptByCategory = (catSlug: string) => {
    switch (catSlug) {
      case "politics":
        return "Government officials announced major policy changes that will impact citizens across the country. Experts weigh in on the potential consequences.";
      case "business":
        return "Financial markets reacted strongly to the latest economic developments. Analysts predict significant shifts in investment strategies.";
      case "sports":
        return "In a thrilling match, the national team secured victory against tough opponents. Fans celebrate the historic achievement.";
      case "tech":
        return "Cutting-edge technology breakthrough promises to revolutionize the industry. Companies race to implement the latest innovations.";
      case "entertainment":
        return "Celebrity news and entertainment updates from around the world. Get the latest on your favorite stars and upcoming events.";
      case "breaking-news":
        return "Urgent breaking news update with developing information. Stay tuned for more details as the situation unfolds.";
      case "latest-news":
        return "The most recent news updates covering various topics. Stay informed with our comprehensive news coverage.";
      case "country-news":
        return "Local news and developments from across the nation. Community leaders share their perspectives on current issues.";
      case "world-news":
        return "International news and global affairs updates. Diplomatic relations and worldwide events shaping our future.";
      case "health":
        return "Medical breakthroughs and health-related news. Experts provide insights on maintaining wellness and preventing diseases.";
      default:
        return "This is a detailed excerpt about the news article, providing key insights and information.";
    }
  };

  // More detailed content based on category
  const getContentByCategory = (catSlug: string, title: string) => {
    return `## ${title}

This is the full content of the news article. It provides detailed information about the topic, including background, analysis, and expert opinions.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Key Points

- Point 1: Detailed explanation about the main topic
- Point 2: Additional insights and expert analysis
- Point 3: Future implications and potential developments

### Expert Opinions

Leading experts in the field have shared their perspectives on this development. Professor Ahmed states, "This represents a significant shift in how we approach this issue." Meanwhile, Dr. Rahman adds, "The long-term consequences could be profound for our society."

### Conclusion

This article concludes with a summary of the main points and potential future developments. As the situation continues to evolve, we will provide updates and additional analysis.

Stay tuned for more news and in-depth coverage on this important topic.`;
  };

  return {
    id: String(i + 1),
    title: sampleTitles[i % sampleTitles.length],
    slug: slug,
    excerpt: getExcerptByCategory(category.slug),
    content: getContentByCategory(
      category.slug,
      sampleTitles[i % sampleTitles.length]
    ),
    image: sampleImages[i % sampleImages.length],
    category: category,
    author: {
      id: String(Math.floor(Math.random() * 5) + 1),
      name: [
        "John Doe",
        "Jane Smith",
        "Mike Johnson",
        "Sarah Williams",
        "David Brown",
      ][Math.floor(Math.random() * 5)],
      avatar: `https://i.pravatar.cc/150?img=${
        Math.floor(Math.random() * 70) + 1
      }`,
    },
    publishedAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
});
