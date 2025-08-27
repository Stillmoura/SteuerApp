import { Home, Settings, User, FileText, BarChart3, Upload, Cloud, Database, Calendar, ClipboardList, FolderOpen } from 'lucide-react'

// Navigation data
export const navigationItems = [
  {
    title: 'Dashboard',
    icon: Home,
    id: 'dashboard',
  },
  {
    title: 'Fristen & Termine',
    icon: Calendar,
    id: 'deadlines',
  },
  {
    title: 'Anträge',
    icon: ClipboardList,
    id: 'applications',
  },
  {
    title: 'Dokumente',
    icon: FolderOpen,
    id: 'documents',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    id: 'analytics',
  },
]

export const uploadLinks = [
  {
    title: 'Cloud Storage',
    icon: Cloud,
    url: 'https://drive.google.com/',
  },
]

// TODO: Implement direct Google Drive folder upload without login requirement
// Current Google Drive link requires manual login - need API integration for direct upload
// PLACEHOLDER: Google Drive URL is generic, not linked to specific folder

// Sample data
export const deadlines = [
  {
    id: 1,
    title: 'Umsatzsteuervoranmeldung',
    dueDate: '2024-01-10',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Jahresabschluss 2023',
    dueDate: '2024-03-31',
    status: 'in-progress',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Sozialversicherungsmeldung',
    dueDate: '2024-01-15',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'Lohnsteueranmeldung',
    dueDate: '2024-01-10',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 5,
    title: 'Gewerbesteuervoranmeldung',
    dueDate: '2024-02-15',
    status: 'pending',
    priority: 'medium'
  }
]

export const applications = [
  {
    id: 1,
    title: 'Förderantrag Digitalisierung',
    status: 'submitted',
    submittedDate: '2023-12-15',
    amount: '50.000 €'
  },
  {
    id: 2,
    title: 'Kurzarbeitergeld Antrag',
    status: 'approved',
    submittedDate: '2023-11-20',
    amount: '25.000 €'
  },
  {
    id: 3,
    title: 'Investitionszuschuss',
    status: 'in-review',
    submittedDate: '2023-12-01',
    amount: '75.000 €'
  }
]

export const documentsByYear = {
  2024: [
    { name: 'Umsatzsteuervoranmeldung Q1', type: 'Steuer', uploadDate: '2024-01-15' },
    { name: 'Lohnabrechnung Januar', type: 'Personal', uploadDate: '2024-02-01' },
  ],
  2023: [
    { name: 'Jahresabschluss 2023', type: 'Bilanz', uploadDate: '2023-12-31' },
    { name: 'Umsatzsteuervoranmeldung Q4', type: 'Steuer', uploadDate: '2023-12-15' },
    { name: 'Inventurliste', type: 'Inventar', uploadDate: '2023-12-30' },
  ],
  2022: [
    { name: 'Jahresabschluss 2022', type: 'Bilanz', uploadDate: '2022-12-31' },
    { name: 'Steuerliche Gewinnermittlung', type: 'Steuer', uploadDate: '2022-12-20' },
  ]
}

export const extendedDeadlines = [
  {
    id: 1,
    title: 'Umsatzsteuervoranmeldung Q1 2024',
    dueDate: '2024-01-10',
    description: 'Voranmeldung der Umsatzsteuer für das erste Quartal',
    status: 'pending',
    priority: 'high',
    documents: ['Umsatzsteuererklärung', 'Belege Q1']
  },
  {
    id: 2,
    title: 'Jahresabschluss 2023',
    dueDate: '2024-03-31',
    description: 'Erstellung und Einreichung des Jahresabschlusses',
    status: 'in-progress',
    priority: 'high',
    documents: ['Bilanz', 'GuV', 'Anhang']
  },
  {
    id: 3,
    title: 'Lohnsteueranmeldung Januar 2024',
    dueDate: '2024-01-10',
    description: 'Anmeldung der Lohnsteuer für Januar',
    status: 'pending',
    priority: 'high',
    documents: ['Lohnabrechnung', 'Sozialversicherungsmeldung']
  },
  {
    id: 4,
    title: 'Gewerbesteuervoranmeldung Q1',
    dueDate: '2024-02-15',
    description: 'Voranmeldung der Gewerbesteuer',
    status: 'pending',
    priority: 'medium',
    documents: ['Gewinnermittlung', 'Gewerbesteuererklärung']
  },
  {
    id: 5,
    title: 'Körperschaftsteuererklärung 2023',
    dueDate: '2024-05-31',
    description: 'Körperschaftsteuererklärung für das Jahr 2023',
    status: 'pending',
    priority: 'medium',
    documents: ['Steuerbilanz', 'Körperschaftsteuererklärung']
  },
  {
    id: 6,
    title: 'Einkommensteuererklärung 2023',
    dueDate: '2024-07-31',
    description: 'Einkommensteuererklärung für Geschäftsführer',
    status: 'pending',
    priority: 'low',
    documents: ['Einkommensteuererklärung', 'Anlagen']
  }
]

// TODO: Replace DATEV URLs with actual functional links
// PLACEHOLDER: These DATEV URLs are currently non-functional placeholders
export const datevApplications = [
  {
    category: 'Steuererklärungen',
    items: [
      { name: 'Einkommensteuererklärung 2023', url: 'https://drive.google.com/drive/u/0/folders/1CU79JFT_PNBm2-lsq-yNf8eWDOClWZyK', status: 'verfuegbar' },
      { name: 'Körperschaftsteuererklärung 2023', url: 'https://drive.google.com/drive/u/0/folders/1ZR2gaA2MMGu3x7n8naZ3hCXee2GuKlNZ', status: 'verfuegbar' },
      { name: 'Gewerbesteuererklärung 2023', internal: true, status: 'verfuegbar' }
    ]
  },
  {
    category: 'Kapitalsteuer',
    items: [
      { name: 'Kapitalertragsteuer Anmeldung', url: 'https://drive.google.com/drive/u/0/folders/1j43daH3Oj31WvbhIckdvcxwku9HlQe1J', status: 'verfuegbar' },
      { name: 'Abgeltungsteuer Erklärung', url: 'https://drive.google.com/drive/u/0/folders/1ueC4w_rKFkRPSEyq_gWW4TovoUrHR6sa', status: 'verfuegbar' }
    ]
  },
  {
    category: 'Umsatzsteuer',
    items: [
      { name: 'Umsatzsteuervoranmeldung Q1 2024', url: 'https://drive.google.com/drive/u/0/folders/1Xpuc7DBO7Ke_fkRo6fJR4d9qj9R30m6U', status: 'ueberfaellig' },
      { name: 'Umsatzsteuerjahreserklärung 2023', url: 'https://drive.google.com/drive/u/0/folders/1O_OkSntBh3oJiw-Wb4ii6rtFwhfgGCff', status: 'verfuegbar' }
    ]
  },
  {
    category: 'Lohnsteuer',
    items: [
      { name: 'Lohnsteueranmeldung Januar 2024', url: 'https://drive.google.com/drive/u/0/folders/1T0T3s7-0xoZA6AE87uJ21Qzl3BjR4iRS', status: 'verfuegbar' },
      { name: 'Lohnsteuerbescheinigungen 2023', url: 'https://drive.google.com/drive/u/0/folders/1A197KKLhPTzgf0E_FYTcSJYx7ApIEGZb', status: 'in-bearbeitung' }
    ]
  }
]