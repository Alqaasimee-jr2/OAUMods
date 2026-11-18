export type VenueCategory =
  | "Food & Drinks"
  | "Shopping"
  | "Printing & Services"
  | "Recreation"
  | "Campus Facilities"
  | "Faith & Community";

export type VenueReview = {
  id: string;
  author: string;
  rating: number;
  dateLabel: string;
  comment: string;
};

export type Venue = {
  slug: string;
  name: string;
  category: VenueCategory;
  location: string;
  description: string;
  priceLabel: string;
  rating: number;
  reviewCount: number;
  initials: string;
  accent: string;
  highlights: string[];
  reviews: VenueReview[];
};

export const venueCategories: Array<"All" | VenueCategory> = [
  "All",
  "Food & Drinks",
  "Shopping",
  "Printing & Services",
  "Recreation",
  "Campus Facilities",
  "Faith & Community",
];

/**
 * Frontend preview records only.
 * Replace this module with API-backed venue data when the backend is ready.
 * Names, ratings, review counts and comments below are illustrative placeholders,
 * not verified venue listings or actual student reviews.
 */
export const sampleVenues: Venue[] = [
  {
    slug: "example-campus-cafeteria",
    name: "Example Campus Cafeteria",
    category: "Food & Drinks",
    location: "Student Union Building (SUB)",
    description: "A sample listing showing how students will discover food spots, compare experiences and read community reviews.",
    priceLabel: "Budget friendly",
    rating: 4.3,
    reviewCount: 28,
    initials: "EC",
    accent: "from-amber-100 to-orange-50",
    highlights: ["Meals", "Quick service", "Student-friendly prices"],
    reviews: [
      { id: "r1", author: "Preview student", rating: 5, dateLabel: "Sample review", comment: "This is placeholder review content. Real student reviews will appear after backend integration." },
      { id: "r2", author: "Preview student", rating: 4, dateLabel: "Sample review", comment: "The review layout is ready for the backend to supply verified submissions." },
    ],
  },
  {
    slug: "example-print-and-copy",
    name: "Example Print & Copy Hub",
    category: "Printing & Services",
    location: "Near the Faculty axis",
    description: "A sample service listing for printing, photocopying, scanning and other everyday student needs.",
    priceLabel: "Varies",
    rating: 4.1,
    reviewCount: 12,
    initials: "PC",
    accent: "from-sky-100 to-blue-50",
    highlights: ["Printing", "Photocopying", "Scanning"],
    reviews: [],
  },
  {
    slug: "example-campus-mini-mart",
    name: "Example Campus Mini-Mart",
    category: "Shopping",
    location: "Campus commercial area",
    description: "A sample shop listing for groceries, stationery and everyday essentials.",
    priceLabel: "Varies",
    rating: 3.9,
    reviewCount: 9,
    initials: "MM",
    accent: "from-emerald-100 to-teal-50",
    highlights: ["Groceries", "Stationery", "Daily essentials"],
    reviews: [],
  },
  {
    slug: "example-recreation-space",
    name: "Example Recreation Space",
    category: "Recreation",
    location: "Campus sports and recreation area",
    description: "A sample listing for recreational spaces and activities around campus.",
    priceLabel: "Check on site",
    rating: 4.5,
    reviewCount: 16,
    initials: "RS",
    accent: "from-violet-100 to-fuchsia-50",
    highlights: ["Recreation", "Group activities", "Outdoor space"],
    reviews: [],
  },
  {
    slug: "example-campus-facility",
    name: "Example Campus Facility",
    category: "Campus Facilities",
    location: "Main campus",
    description: "A sample directory entry for useful campus facilities and shared student spaces.",
    priceLabel: "Not applicable",
    rating: 4.2,
    reviewCount: 7,
    initials: "CF",
    accent: "from-slate-200 to-slate-50",
    highlights: ["Student access", "Campus information", "Facilities"],
    reviews: [],
  },
  {
    slug: "example-community-space",
    name: "Example Faith & Community Space",
    category: "Faith & Community",
    location: "Campus",
    description: "A sample listing for faith, fellowship and student community spaces.",
    priceLabel: "Not applicable",
    rating: 4.6,
    reviewCount: 5,
    initials: "CS",
    accent: "from-rose-100 to-pink-50",
    highlights: ["Community", "Fellowship", "Student activities"],
    reviews: [],
  },
];
