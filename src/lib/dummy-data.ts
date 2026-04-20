// Dummy data for OIC CRM Prototype
// SPA: Annathaya | GYM: The Square

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  tier: "silver" | "gold" | "platinum";
  status: "active" | "pending" | "expired" | "frozen";
  joinDate: string;
  expiryDate: string;
  points: number;
  totalVisits: number;
  lastVisit: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  outlet: "annathaya" | "thesquare" | "both";
  allergies?: string[];
  notes?: string;
  preferredTherapist?: string;
  favouriteServices: string[];
}

export interface Booking {
  id: string;
  memberId: string;
  memberName: string;
  service: string;
  therapist: string;
  date: string;
  time: string;
  outlet: string;
  status: "confirmed" | "completed" | "cancelled" | "no-show";
  duration: number; // minutes
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  outlet: "annathaya" | "thesquare" | "both";
  image?: string;
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  type: "purchase" | "topup" | "redemption" | "refund";
  amount: number;
  description: string;
  date: string;
  outlet: string;
  pointsEarned?: number;
  pointsRedeemed?: number;
}

export interface Staff {
  id: string;
  name: string;
  role: "therapist" | "trainer" | "frontdesk" | "manager";
  outlet: "annathaya" | "thesquare" | "both";
  avatar?: string;
  specialties: string[];
  rating: number;
  totalSessions: number;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  pendingRenewal: number;
  monthlyRevenue: number;
  monthlyVisits: number;
  newMembersThisMonth: number;
  averageVisitFrequency: number;
  topServices: { name: string; count: number }[];
}

// Members
export const members: Member[] = [
  {
    id: "m001",
    name: "Amelia Putri",
    email: "amelia.putri@email.com",
    phone: "+62 812 3456 7001",
    tier: "platinum",
    status: "active",
    joinDate: "2024-01-15",
    expiryDate: "2026-07-15",
    points: 2450,
    totalVisits: 87,
    lastVisit: "2026-04-18",
    birthDate: "1992-03-22",
    gender: "female",
    outlet: "annathaya",
    allergies: ["Lavender", "Peppermint"],
    notes: "Prefers firm pressure. Sensitive to strong scents.",
    preferredTherapist: "Dewi",
    favouriteServices: ["Aromatherapy Massage", "Hot Stone Therapy", "Facial Treatment"],
  },
  {
    id: "m002",
    name: "Benedict Suganda",
    email: "benedict.s@email.com",
    phone: "+62 812 3456 7002",
    tier: "gold",
    status: "active",
    joinDate: "2024-06-01",
    expiryDate: "2026-06-01",
    points: 1200,
    totalVisits: 42,
    lastVisit: "2026-04-15",
    birthDate: "1988-07-14",
    gender: "male",
    outlet: "thesquare",
    favouriteServices: ["Personal Training", "HIIT Session", "Protein Shake"],
  },
  {
    id: "m003",
    name: "Catherine Wijaya",
    email: "catherine.w@email.com",
    phone: "+62 812 3456 7003",
    tier: "silver",
    status: "pending",
    joinDate: "2025-09-20",
    expiryDate: "2026-04-25",
    points: 380,
    totalVisits: 15,
    lastVisit: "2026-04-10",
    birthDate: "1995-11-08",
    gender: "female",
    outlet: "annathaya",
    favouriteServices: ["Swedish Massage", "Body Scrub"],
  },
  {
    id: "m004",
    name: "David Harjuno",
    email: "david.h@email.com",
    phone: "+62 812 3456 7004",
    tier: "platinum",
    status: "active",
    joinDate: "2023-03-10",
    expiryDate: "2027-03-10",
    points: 5200,
    totalVisits: 156,
    lastVisit: "2026-04-19",
    birthDate: "1985-01-25",
    gender: "male",
    outlet: "both",
    notes: "VIP client. Always check preferences before session.",
    favouriteServices: ["Deep Tissue Massage", "Sport Massage", "Sauna Access"],
  },
  {
    id: "m005",
    name: "Esther Gunawan",
    email: "esther.g@email.com",
    phone: "+62 812 3456 7005",
    tier: "gold",
    status: "expired",
    joinDate: "2024-02-14",
    expiryDate: "2026-02-14",
    points: 890,
    totalVisits: 31,
    lastVisit: "2026-02-10",
    birthDate: "1990-06-30",
    gender: "female",
    outlet: "annathaya",
    favouriteServices: ["Reflexology", "Aromatherapy"],
  },
  {
    id: "m006",
    name: "Felix Tanoto",
    email: "felix.t@email.com",
    phone: "+62 812 3456 7006",
    tier: "silver",
    status: "active",
    joinDate: "2025-11-05",
    expiryDate: "2026-11-05",
    points: 420,
    totalVisits: 18,
    lastVisit: "2026-04-17",
    birthDate: "1997-09-12",
    gender: "male",
    outlet: "thesquare",
    favouriteServices: ["CrossFit Class", "Yoga Session"],
  },
  {
    id: "m007",
    name: "Grace Hidayanto",
    email: "grace.h@email.com",
    phone: "+62 812 3456 7007",
    tier: "platinum",
    status: "active",
    joinDate: "2023-08-22",
    expiryDate: "2026-08-22",
    points: 3800,
    totalVisits: 112,
    lastVisit: "2026-04-19",
    birthDate: "1987-04-18",
    gender: "female",
    outlet: "annathaya",
    notes: "Anniversary bonus every Aug 22. Don't miss!",
    favouriteServices: ["Royal Javanese Treatment", "Hair Spa", "Facial"],
  },
  {
    id: "m008",
    name: "Henry Kusumo",
    email: "henry.k@email.com",
    phone: "+62 812 3456 7008",
    tier: "silver",
    status: "frozen",
    joinDate: "2025-01-10",
    expiryDate: "2026-01-10",
    points: 200,
    totalVisits: 8,
    lastVisit: "2025-12-15",
    birthDate: "1993-12-03",
    gender: "male",
    outlet: "thesquare",
    favouriteServices: ["Swimming", "Steam Room"],
  },
];

// Bookings (today)
export const bookings: Booking[] = [
  {
    id: "b001",
    memberId: "m001",
    memberName: "Amelia Putri",
    service: "Aromatherapy Massage",
    therapist: "Dewi",
    date: "2026-04-20",
    time: "10:00",
    outlet: "Annathaya",
    status: "confirmed",
    duration: 90,
  },
  {
    id: "b002",
    memberId: "m004",
    memberName: "David Harjuno",
    service: "Deep Tissue Massage",
    therapist: "Asep",
    date: "2026-04-20",
    time: "11:00",
    outlet: "Annathaya",
    status: "confirmed",
    duration: 120,
  },
  {
    id: "b003",
    memberId: "m002",
    memberName: "Benedict Suganda",
    service: "Personal Training",
    therapist: "Rudi",
    date: "2026-04-20",
    time: "09:00",
    outlet: "The Square",
    status: "completed",
    duration: 60,
  },
  {
    id: "b004",
    memberId: "m006",
    memberName: "Felix Tanoto",
    service: "CrossFit Class",
    therapist: "Rudi",
    date: "2026-04-20",
    time: "14:00",
    outlet: "The Square",
    status: "confirmed",
    duration: 60,
  },
  {
    id: "b005",
    memberId: "m007",
    memberName: "Grace Hidayanto",
    service: "Royal Javanese Treatment",
    therapist: "Siti",
    date: "2026-04-20",
    time: "13:00",
    outlet: "Annathaya",
    status: "confirmed",
    duration: 150,
  },
  {
    id: "b006",
    memberId: "m003",
    memberName: "Catherine Wijaya",
    service: "Swedish Massage",
    therapist: "Dewi",
    date: "2026-04-20",
    time: "15:00",
    outlet: "Annathaya",
    status: "confirmed",
    duration: 60,
  },
];

// Services
export const services: Service[] = [
  { id: "s001", name: "Aromatherapy Massage", category: "Massage", duration: 90, price: 350000, outlet: "annathaya" },
  { id: "s002", name: "Deep Tissue Massage", category: "Massage", duration: 90, price: 400000, outlet: "annathaya" },
  { id: "s003", name: "Hot Stone Therapy", category: "Massage", duration: 120, price: 500000, outlet: "annathaya" },
  { id: "s004", name: "Swedish Massage", category: "Massage", duration: 60, price: 250000, outlet: "annathaya" },
  { id: "s005", name: "Reflexology", category: "Massage", duration: 45, price: 200000, outlet: "annathaya" },
  { id: "s006", name: "Royal Javanese Treatment", category: "Signature", duration: 150, price: 750000, outlet: "annathaya" },
  { id: "s007", name: "Body Scrub", category: "Body Treatment", duration: 60, price: 300000, outlet: "annathaya" },
  { id: "s008", name: "Facial Treatment", category: "Skin Care", duration: 60, price: 350000, outlet: "annathaya" },
  { id: "s009", name: "Personal Training", category: "Fitness", duration: 60, price: 300000, outlet: "thesquare" },
  { id: "s010", name: "HIIT Session", category: "Fitness", duration: 45, price: 250000, outlet: "thesquare" },
  { id: "s011", name: "Yoga Session", category: "Fitness", duration: 60, price: 200000, outlet: "thesquare" },
  { id: "s012", name: "CrossFit Class", category: "Fitness", duration: 60, price: 220000, outlet: "thesquare" },
  { id: "s013", name: "Sauna Access", category: "Facility", duration: 30, price: 100000, outlet: "thesquare" },
  { id: "s014", name: "Steam Room", category: "Facility", duration: 30, price: 80000, outlet: "thesquare" },
];

// Transactions
export const transactions: Transaction[] = [
  { id: "t001", memberId: "m001", memberName: "Amelia Putri", type: "topup", amount: 5000000, description: "Top up Platinum Package", date: "2026-04-15", outlet: "Annathaya", pointsEarned: 500 },
  { id: "t002", memberId: "m002", memberName: "Benedict Suganda", type: "purchase", amount: 300000, description: "Personal Training x4 sessions", date: "2026-04-14", outlet: "The Square", pointsEarned: 30 },
  { id: "t003", memberId: "m004", memberName: "David Harjuno", type: "topup", amount: 10000000, description: "Top up Platinum Annual", date: "2026-04-10", outlet: "Annathaya", pointsEarned: 1000 },
  { id: "t004", memberId: "m007", memberName: "Grace Hidayanto", type: "redemption", amount: -350000, description: "Redeem: Aromatherapy Massage", date: "2026-04-18", outlet: "Annathaya", pointsRedeemed: 350 },
  { id: "t005", memberId: "m003", memberName: "Catherine Wijaya", type: "purchase", amount: 250000, description: "Swedish Massage", date: "2026-04-10", outlet: "Annathaya", pointsEarned: 25 },
  { id: "t006", memberId: "m006", memberName: "Felix Tanoto", type: "topup", amount: 1000000, description: "Top up Silver Package", date: "2026-04-01", outlet: "The Square", pointsEarned: 100 },
];

// Staff
export const staff: Staff[] = [
  { id: "st001", name: "Dewi", role: "therapist", outlet: "annathaya", specialties: ["Aromatherapy", "Swedish", "Facial"], rating: 4.9, totalSessions: 1240 },
  { id: "st002", name: "Siti", role: "therapist", outlet: "annathaya", specialties: ["Javanese Treatment", "Hot Stone", "Reflexology"], rating: 4.8, totalSessions: 980 },
  { id: "st003", name: "Asep", role: "therapist", outlet: "annathaya", specialties: ["Deep Tissue", "Sport Massage"], rating: 4.7, totalSessions: 756 },
  { id: "st004", name: "Rudi", role: "trainer", outlet: "thesquare", specialties: ["Personal Training", "HIIT", "CrossFit"], rating: 4.8, totalSessions: 890 },
  { id: "st005", name: "Anisa", role: "frontdesk", outlet: "both", specialties: ["Customer Service"], rating: 4.6, totalSessions: 0 },
  { id: "st006", name: "Bayu", role: "manager", outlet: "both", specialties: ["Operations", "Staff Management"], rating: 4.9, totalSessions: 0 },
];

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalMembers: 8,
  activeMembers: 5,
  pendingRenewal: 1,
  monthlyRevenue: 18750000,
  monthlyVisits: 64,
  newMembersThisMonth: 1,
  averageVisitFrequency: 4.2,
  topServices: [
    { name: "Aromatherapy Massage", count: 18 },
    { name: "Personal Training", count: 14 },
    { name: "Deep Tissue Massage", count: 12 },
    { name: "Swedish Massage", count: 10 },
    { name: "CrossFit Class", count: 8 },
  ],
};
