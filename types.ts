export enum ServiceType {
  HouseCleaning = 'House Cleaning',
  DeepCleaning = 'Deep Cleaning',
  MoveOut = 'Move-Out/Move-In',
  Office = 'Office Cleaning',
  ApartmentCleaning = 'Apartment Cleaning',
}

export enum JobStatus {
  New = 'New',
  Contacted = 'Contacted',
  Quoted = 'Quoted',
  Booked = 'Booked',
  Completed = 'Completed',
}

export interface Subcontractor {
  id: string;
  name: string;
  rating: number;
  specialties: ServiceType[];
  available: boolean;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  address: string;
  zipCode: string;
  serviceType: ServiceType;
  date: string;
  frequency: string;
  instructions?: string;
  status: JobStatus;
  quoteAmount: number;
  assignedTo?: string; // Subcontractor ID
  createdAt: string;
  addOns?: string[];
}

export interface ServiceContent {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  imagePlaceholder: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  pricingExamples?: { label: string; price: string }[];
}

export interface CityPageContent {
  slug: string; // url slug e.g. white-plains-house-cleaning
  cityName: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introText: string[]; // Array of paragraphs
  whyChooseUs: { title: string; description: string }[];
  localServicesText: string;
  pricing: { label: string; price: string }[];
  faqs: { question: string; answer: string }[];
}