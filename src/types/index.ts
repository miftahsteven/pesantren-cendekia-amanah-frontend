export type UnitType = 'pesantren' | 'smp' | 'sma' | 'diniyah';

export interface SiteConfig {
  name: string;
  tagline: string;
  subTagline: string;
  description: string;
  foundingYear: number;
  motto: string;
  leader: {
    name: string;
    role: string;
    title: string;
    photoUrl: string;
    quote: string[];
  };
}

export interface NavigationSubItem {
  label: string;
  href: string;
  description?: string;
  isExternal?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavigationSubItem[];
}

export interface HeroSlide {
  id: string;
  unit: UnitType;
  title: string;
  subtitle: string;
  bannerImage: string;
  ctaText: string;
  ctaHref: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  iconName?: string;
  description?: string;
}

export interface EducationUnit {
  id: UnitType;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string[];
  heroImage: string;
  iconName: string;
  colorTheme: string;
  features: {
    title: string;
    description: string;
    iconName: string;
  }[];
  bulletPoints: string[];
  programs: {
    id: string;
    title: string;
    description: string;
    iconName?: string;
    image?: string;
  }[];
  facilities: {
    id: string;
    name: string;
    description?: string;
    image: string;
  }[];
  activities: {
    id: string;
    title: string;
    description: string;
    image?: string;
  }[];
  achievements?: Achievement[];
  testimonials?: Testimonial[];
  brochureUrl?: string;
  whatsappNumber: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Semua' | 'Pesantren' | 'SMP' | 'SMA' | 'Diniyah' | 'Prestasi' | 'Kegiatan';
  author: string;
  publishedAt: string;
  readTime: string;
  viewsCount: number;
  featuredImage: string;
  tags: string[];
  isPopular?: boolean;
  highlightQuote?: string;
}

export interface OpinionArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featuredImage?: string;
  isFeatured?: boolean;
  tags: string[];
  highlightQuote?: string;
}

export interface Agenda {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  time: string;
  location?: string;
  status?: string;
}

export interface Achievement {
  id: string;
  title: string;
  rank: string;
  competition: string;
  year: string;
  unit: UnitType | 'Global';
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: UnitType | 'Umum' | 'Bisnis';
  image: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  category: 'Orang Tua Santri' | 'Alumni' | 'Tokoh Pendidikan';
  content: string;
  avatar: string;
  rating?: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category?: string;
  url?: string;
}

export interface Brochure {
  id: string;
  unit: UnitType;
  title: string;
  subtitle: string;
  year: string;
  format: string;
  fileSize?: string;
  downloadUrl?: string;
  status: 'available' | 'coming_soon';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  address: {
    street: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    fullText: string;
    mapsEmbedUrl?: string;
    mapsLink?: string;
  };
  phone: string;
  whatsapp?: string;
  email: string;
  workingHours: string;
  whatsappUnits: {
    unitName: string;
    number: string;
    formattedNumber: string;
    link: string;
  }[];
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  name: string;
  url: string;
  handle: string;
  icon: string;
}

export interface PPDBFormData {
  // Step 1: Student
  fullName: string;
  nisn: string;
  birthPlaceDate: string;
  previousSchool: string;

  // Step 2: Parent
  parentName: string;
  whatsapp: string;
  address: string;

  // Step 3: Unit
  selectedUnit: UnitType;
  notes?: string;
}

export interface PPDBSubmissionResult {
  success: boolean;
  registrationNumber: string;
  submittedAt: string;
  data: PPDBFormData;
}
