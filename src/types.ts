export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'girlfriend' | 'boyfriend' | 'couple' | 'surprise';
  greeting: string;
  color: string;
  badge?: string;
}

export interface MediaEpisode {
  id: string;
  title: string;
  duration: string;
  description: string;
  photoUrl: string;
  date?: string;
  location?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  season?: string;
  category: 'special' | 'memories' | 'milestones' | 'bloopers' | 'dates' | 'future';
  matchScore: number;
  year: string;
  ageRating?: string; // e.g. "100% Mine", "18+ Cute", "All Ages"
  duration: string; // e.g. "4 Seasons", "1h 45m"
  tags: string[];
  description: string;
  romanticNote: string;
  coverImage: string;
  backdropImage: string;
  cast: { role: string; name: string }[];
  episodes?: MediaEpisode[];
  featured?: boolean;
}

export interface TopReason {
  id: number;
  rank: number;
  title: string;
  shortSummary: string;
  detail: string;
  photoUrl: string;
  tags: string[];
}

export interface VoucherCoupon {
  id: string;
  title: string;
  description: string;
  code: string;
  category: string;
  perks: string[];
  isRedeemed: boolean;
  redeemedAt?: string;
  iconName: string;
  badge: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
  photoUrl?: string;
}

export interface LoveLetterData {
  title: string;
  dearName: string;
  fromName: string;
  date: string;
  paragraphs: string[];
  closing: string;
  photos: string[];
}

export interface BirthdayAppConfig {
  girlfriendName: string;
  boyfriendName: string;
  birthdayDate: string; // YYYY-MM-DD
  anniversaryDate: string; // YYYY-MM-DD
  appName: string; // "LOVEFLIX"
  heroTagline: string;
  heroDescription: string;
  heroBackdrop: string;
  relationshipMilestone: string;
}
