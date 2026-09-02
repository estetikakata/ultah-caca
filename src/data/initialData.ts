import {
  UserProfile,
  MediaItem,
  TopReason,
  VoucherCoupon,
  TriviaQuestion,
  LoveLetterData,
  BirthdayAppConfig
} from '../types';

export const DEFAULT_CONFIG: BirthdayAppConfig = {
  girlfriendName: 'Caca',
  boyfriendName: 'Azka',
  birthdayDate: '2026-08-28',
  anniversaryDate: '2022-10-14',
  appName: 'NETFLIX',
  heroTagline: 'THE 18TH BIRTHDAY SPECIAL • SWEET 18',
  heroDescription: 'Sebuah mahakarya film pendek terbaik yang dibuat oleh cinta, berisi potongan memori Caca tercinta dengan pacar gantengnya.',
  heroBackdrop: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/utama.jpg',
  relationshipMilestone: 'Sweet 18 Edition',
};

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'birthday_queen',
    name: 'MARSCHA',
    avatar: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/profil.jpg',
    role: 'girlfriend',
    greeting: 'Selamat ulang tahun ke-18, Marscha! Hari kemarin di tanggal 28 Agustus adalah hari paling spesial untukmu.',
    color: '#E50914',
    badge: 'MY PRINCESS',
  },
];

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'sweet-18-caca-movie',
    title: 'HAPPY BIRTHDAY SAYANG',
    season: 'Sweet 18 Movie',
    category: 'special',
    matchScore: 100,
    year: '2026',
    duration: 'Full Special Movie',
    tags: ['Sweet 18', 'Love Story', 'Exclusive Blockbuster'],
    description:
      'An exclusive romantic film celebrating Caca on turning 18! A lifetime of sweetest memories, endless laughter, and our greatest love story since Day 1.',
    romanticNote:
      'Selamat ulang tahun ke-18 untuk perempuan terindah dan paling berharga di hidupku, Caca ❤️',
    coverImage:
      'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/utama.jpg',
    backdropImage:
      'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/utama.jpg',
    cast: [
      { role: 'The Birthday Queen', name: 'Caca' },
      { role: 'Devoted Partner', name: 'Azka' },
    ],
  },
];

export const INITIAL_TOP_REASONS: TopReason[] = [
  {
    id: 1,
    rank: 1,
    title: 'your humor',
    shortSummary: 'Never in my life im not laughing when im with you',
    detail: 'Kamu lucu, semua jokes yg aku kasih kamu bisa respon dengan baik',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/humor.JPG',
    tags: [],
  },
  {
    id: 2,
    rank: 2,
    title: 'Kepolosan Kamu',
    shortSummary: 'still think the world is all sunshine and rainbow',
    detail: 'Gatau apa-apa, LUCU KAYAK ANAK KECI',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/polos.JPG',
    tags: [],
  },
  {
    id: 3,
    rank: 3,
    title: 'Pretty Smile',
    shortSummary: 'the prettiest ive seen so far',
    detail: 'Setiap aku liat kamu senyum, kamu keliatan lebih manis dan lucu',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/senyum.jpg',
    tags: [],
  },
  {
    id: 4,
    rank: 4,
    title: 'Kamu Baik',
    shortSummary: 'the most caring and kind girl',
    detail: 'Kamu selalu baik ke semua orang tanpa melihat mereka siapa',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/baik.JPG',
    tags: [],
  },
  {
    id: 5,
    rank: 5,
    title: 'Honest Girl',
    shortSummary: 'i have never seen you lied about things',
    detail: 'Kamu selalu berkata yang sebenarnya ke aku',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/jujur.jpg',
    tags: [],
  },
  {
    id: 6,
    rank: 6,
    title: 'Your Eyes',
    shortSummary: 'the brightest eyes i have ever seen',
    detail: 'Aku seneng ngelihat mata (sedikit) sipit kamu',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/mata.jpg',
    tags: [],
  },
  {
    id: 7,
    rank: 7,
    title: 'Gak Gampangan',
    shortSummary: 'the best so far',
    detail: 'Kamu bisa kontrol diri kamu sendiri, kebanyakan perempuan zaman sekarang hilang kemampuan itu',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/hormat.JPG',
    tags: [],
  },
  {
    id: 8,
    rank: 8,
    title: 'Pekerja Keras',
    shortSummary: 'make me wanna be a better person everyday',
    detail: 'aku saksi yang bakal bilang ke semua orang kalo kamu salah satu perempuan paling pekerja keras yg pernah aku tahu',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/kerjakeras.jpg',
    tags: [],
  },
  {
    id: 9,
    rank: 9,
    title: 'Sipaling Kuat',
    shortSummary: 'STRONGER THAN ADERAIIIIIII',
    detail: 'Setelah semua yang terjadi ke diri kamu, kamu bisa bangkit dan fokus perbaiki diri kamu',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/kuat.JPG',
    tags: [],
  },
  {
    id: 10,
    rank: 10,
    title: 'cantik',
    shortSummary: 'such a cutie',
    detail: 'Kamu cantik dan lucu mukanya',
    photoUrl: 'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/cantik.JPG',
    tags: [],
  },
];

export const INITIAL_COUPONS: VoucherCoupon[] = [
  {
    id: 'coupon-massage',
    title: 'VIP 60-Minute Relaxing Massage',
    description: 'Includes scented oils, gentle music, and zero complaints from the masseur (me).',
    code: 'LOVE-RELAX-99',
    category: 'Pampering',
    perks: ['Foot & Back massage', 'Aromatherapy candle lit', 'Unlimited relaxation'],
    isRedeemed: false,
    iconName: 'Sparkles',
    badge: '100% Free',
  },
  {
    id: 'coupon-dinner',
    title: 'Fancy Dinner Anywhere You Choose',
    description: 'Pick any restaurant in town (even the fancy one you have been eyeing on TikTok). My treat!',
    code: 'LOVE-DINE-55',
    category: 'Food & Dining',
    perks: ['Any restaurant in city', 'Dessert & drinks included', 'Dressing up fancy'],
    isRedeemed: false,
    iconName: 'Utensils',
    badge: 'Boyfriend Pays',
  },
  {
    id: 'coupon-yes-day',
    title: 'The Ultimate "YES" Day Pass',
    description: 'For 24 hours, the answer to any request you make is an enthusiastic "YES!".',
    code: 'LOVE-YES-24H',
    category: 'Wildcard',
    perks: ['Valid for 24 full hours', 'Choose all activities', 'No veto power allowed'],
    isRedeemed: false,
    iconName: 'Crown',
    badge: 'Unlimited Power',
  },
  {
    id: 'coupon-movie-night',
    title: 'All-You-Can-Eat Movie & Snack Fest',
    description: 'You pick all the movies/shows. I provide freshly popped butter popcorn, candy, and cuddle duty.',
    code: 'LOVE-CINEMA-77',
    category: 'Cozy',
    perks: ['All snacks included', 'You control the remote', 'Full blanket nest'],
    isRedeemed: false,
    iconName: 'Film',
    badge: 'Cozy Night',
  },
  {
    id: 'coupon-weekend-trip',
    title: 'Spontaneous Weekend Getaway Pass',
    description: 'A cozy Airbnb road trip or seaside escape planned from start to finish just for the two of us.',
    code: 'LOVE-ESCAPE-01',
    category: 'Travel',
    perks: ['Scenic cabin or beach stay', 'Itinerary customized by me', 'Endless photo ops'],
    isRedeemed: false,
    iconName: 'Compass',
    badge: 'Romantic Getaway',
  },
  {
    id: 'coupon-dessert',
    title: 'Late Night Ice Cream & Dessert Run',
    description: 'Even if it is 11:30 PM in sweatpants, I will drive to get your favorite sweet craving.',
    code: 'LOVE-SWEET-44',
    category: 'Cravings',
    perks: ['Any craving, anytime', 'Double scoop waffle cone', 'No judgment'],
    isRedeemed: false,
    iconName: 'Heart',
    badge: 'Late Night VIP',
  },
];

export const INITIAL_TRIVIA: TriviaQuestion[] = [
  {
    id: 'q1',
    question: 'Siapa saja teman caca selama bekerja?',
    options: ['Azka', 'Teh Fitri', 'Nadira', 'Teh Fitri dan Nadira'],
    correctIndex: 3,
    explanation: 'Mereka berdua menemani caca selama bekerja.',
  },
  {
    id: 'q2',
    question: 'Siapakah adik favorit caca?',
    options: [
      'Defandra',
      'Widi',
      'Defandra & Widi',
      'Azka',
    ],
    correctIndex: 2,
    explanation: 'Caca sayang sama semua adik - adik Caca.',
  },
  {
    id: 'q3',
    question: 'Apa cita - cita Caca kecil?',
    options: ['Polwan', 'Livestreamer', 'Guru', 'Azka'],
    correctIndex: 0,
    explanation: 'Caca sejak dari dulu bercita - cita menjadi Polwan.',
  },
  {
    id: 'q4',
    question: 'Dimana Azka dan Caca pertama kali mengobrol?',
    options: ['Kantin Ciwong', 'Ruang Kelas 10.11', 'Azka', 'Di Motor'],
    correctIndex: 1,
    explanation: 'Ruang kelas waktu kelas 10 adalah saksi pertama azka lihat caca.',
  },
  {
    id: 'q5',
    question: 'Siapa pacar Caca?',
    options: ['Azka', 'Azka', 'Azka', 'Azka'],
    correctIndex: -1,
    explanation: 'AKHIRNYA AZKA JADI JAWABAN YANG BENAR..',
  },
];

export const INITIAL_LOVE_LETTER: LoveLetterData = {
  title: 'Special 18th Birthday Letter for Marscha',
  dearName: 'Untuk Caca Tersayang,',
  fromName: 'Forever & Always Yours, Azka ❤️',
  date: '28 Agustus 2026',
  paragraphs: [
    'Selamat ulang tahun yang ke 18 sayang, ga pernah nyangka ada yang setua ini tapi masih selucu ini.',
    'Seneng rasanya udah 2 kali aku jadi orang yang nemenin kamu di hari spesial diri kamu. dan aku pastiin di kedepannya aku bakal tetap selalu senang dan bahagia bisa jadi pendamping kamu.',
    'Di hari bahagia kamu ini, aku selalu berharap kamu bisa mencapai semua mimpi - mimpi terbaik kamu. tapi pastiin untuk selalu siapin tempat di samping kamu karena aku akan selalu jadi supporter paling semangat yang selalu ada di samping kamu.',
    'Aku harap hubungan kita akan selalu barjalan dengan baik sesuai yang kita mau di kedepannya. aku akan selalu pastiin kalo kamu akan selalu jadi perempuan pertama yang aku lihat. I LOVE YOU.',
  ],
  closing: 'Selamat memasuki usia 18 tahun, My Baby! I love you more than words could ever explain.',
  photos: [
    'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/lucu_1',
    'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/lucu_2',
    'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/lucu_3',
    'https://raw.githubusercontent.com/estetikakata/ultah-caca/main/lucu_4',
  ],
};

const STORAGE_KEY = 'loveflix_birthday_data_v8';

export interface StoredData {
  config: BirthdayAppConfig;
  profiles: UserProfile[];
  mediaItems: MediaItem[];
  topReasons: TopReason[];
  coupons: VoucherCoupon[];
  trivia: TriviaQuestion[];
  letter: LoveLetterData;
  activeProfileId: string;
}

export function loadStoredData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let profiles =
        Array.isArray(parsed.profiles) && parsed.profiles.length === 1
          ? parsed.profiles.map((p: any) => ({ ...p, badge: 'MY PRINCESS' }))
          : INITIAL_PROFILES;
      if (profiles[0] && (profiles[0].name === 'Sarah' || profiles[0].name === 'Birthday Queen 👑' || profiles[0].name === 'Caca 👑' || profiles[0].name === 'Caca')) {
        profiles = INITIAL_PROFILES;
      }
      const config = { ...DEFAULT_CONFIG, ...(parsed.config || {}) };
      if (config.appName === 'LOVEFLIX' || config.appName === 'BDAYFLIX') {
        config.appName = 'NETFLIX';
      }
      if (!config.boyfriendName || config.boyfriendName === 'Alex') {
        config.boyfriendName = 'Azka';
      }
      if (!config.girlfriendName || config.girlfriendName === 'Sarah') {
        config.girlfriendName = 'Caca';
        config.heroTagline = 'THE 18TH BIRTHDAY SPECIAL • SWEET 18';
        config.heroDescription = 'An exclusive Netflix original celebrating Caca on turning 18! A lifetime of sweetest memories, endless laughter, and our greatest love story since Day 1.';
        config.relationshipMilestone = 'Sweet 18 Edition';
      }
      return {
        config,
        profiles: INITIAL_PROFILES,
        mediaItems: INITIAL_MEDIA_ITEMS,
        topReasons: INITIAL_TOP_REASONS,
        coupons: parsed.coupons || INITIAL_COUPONS,
        trivia: INITIAL_TRIVIA,
        letter: parsed.letter && parsed.letter.dearName !== 'My Dearest Sarah,' ? parsed.letter : INITIAL_LOVE_LETTER,
        activeProfileId: profiles[0]?.id || 'birthday_queen',
      };
    }
  } catch (err) {
    console.error('Failed to parse stored LoveFlix data:', err);
  }
  return {
    config: DEFAULT_CONFIG,
    profiles: INITIAL_PROFILES,
    mediaItems: INITIAL_MEDIA_ITEMS,
    topReasons: INITIAL_TOP_REASONS,
    coupons: INITIAL_COUPONS,
    trivia: INITIAL_TRIVIA,
    letter: INITIAL_LOVE_LETTER,
    activeProfileId: 'birthday_queen',
  };
}

export function saveStoredData(data: Partial<StoredData>) {
  try {
    const current = loadStoredData();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save LoveFlix data:', err);
  }
}

export function resetStoredData(): StoredData {
  localStorage.removeItem(STORAGE_KEY);
  return {
    config: DEFAULT_CONFIG,
    profiles: INITIAL_PROFILES,
    mediaItems: INITIAL_MEDIA_ITEMS,
    topReasons: INITIAL_TOP_REASONS,
    coupons: INITIAL_COUPONS,
    trivia: INITIAL_TRIVIA,
    letter: INITIAL_LOVE_LETTER,
    activeProfileId: 'birthday_queen',
  };
}
