import { 
  Calculator, 
  FlaskConical, 
  History as HistoryIcon, 
  Cpu, 
  Type, 
  Languages,
  Music,
  Palette,
  Wind,
  Theater,
  Globe2,
  Users,
  BarChart3,
  Radio,
  Sprout,
  Flame
} from 'lucide-react';

export const SUBJECT_CATEGORIES = [
  {
    name: 'Core Subjects (ප්‍රධාන විෂයන්)',
    subjects: [
      { id: 'buddhism', name: 'Buddhism (බුද්ධ ධර්මය)', icon: Flame, color: 'bg-orange-500/10 text-orange-500' },
      { id: 'sinhala', name: 'Sinhala', icon: Type, color: 'bg-orange-500/10 text-orange-500' },
      { id: 'maths', name: 'Mathematics', icon: Calculator, color: 'bg-rose-500/10 text-rose-500' },
      { id: 'science', name: 'Science', icon: FlaskConical, color: 'bg-emerald-500/10 text-emerald-500' },
      { id: 'history', name: 'History', icon: HistoryIcon, color: 'bg-amber-500/10 text-amber-500' },
      { id: 'english', name: 'English', icon: Languages, color: 'bg-violet-500/10 text-violet-500' },
    ]
  },
  {
    name: 'Aesthetic Subjects (සෞන්දර්ය විෂයන්)',
    subjects: [
      { id: 'music', name: 'Music (සංගීතය)', icon: Music, color: 'bg-indigo-500/10 text-indigo-500' },
      { id: 'art', name: 'Art (චිත්‍ර)', icon: Palette, color: 'bg-pink-500/10 text-pink-500' },
      { id: 'dancing', name: 'Dancing (නැටුම්)', icon: Wind, color: 'bg-cyan-500/10 text-cyan-500' },
      { id: 'drama', name: 'Drama (නාට්‍ය හා රංග කලාව)', icon: Theater, color: 'bg-purple-500/10 text-purple-500' },
    ]
  },
  {
    name: 'Basket Group 1 (පළමු කාණ්ඩය)',
    subjects: [
      { id: 'commerce', name: 'Commerce (ව්යාපාර හා ගිණුම්කරණය)', icon: BarChart3, color: 'bg-emerald-600/10 text-emerald-600' },
      { id: 'geography', name: 'Geography (භූගෝල විද්යාව)', icon: Globe2, color: 'bg-lime-500/10 text-lime-500' },
      { id: 'citizen', name: 'Civic Education (පුරවැසි අධ්යාපනය)', icon: Users, color: 'bg-blue-600/10 text-blue-600' },
    ]
  },
  {
    name: 'Basket Group 2 (දෙවන කාණ්ඩය)',
    subjects: [
      { id: 'music_ol', name: 'Music (සංගීතය)', icon: Music, color: 'bg-indigo-500/10 text-indigo-500' },
      { id: 'dancing_ol', name: 'Dancing (නැටුම්)', icon: Wind, color: 'bg-cyan-500/10 text-cyan-500' },
      { id: 'art_ol', name: 'Art (චිත්‍ර)', icon: Palette, color: 'bg-pink-500/10 text-pink-500' },
    ]
  },
  {
    name: 'Basket Group 3 (තෙවන කාණ්ඩය)',
    subjects: [
      { id: 'health', name: 'Health & Phys. Ed (සෞඛ්ය හා ශාරීරික අධ්යාපනය)', icon: Flame, color: 'bg-rose-600/10 text-rose-600' },
      { id: 'ict', name: 'ICT (තොරතුරු හා සන්නිවේදන තාක්ෂණය)', icon: Cpu, color: 'bg-cyan-500/10 text-cyan-500' },
      { id: 'media', name: 'Media Studies (සන්නිවේදනය හා මාධ්ය අධ්යයනය)', icon: Radio, color: 'bg-red-500/10 text-red-500' },
      { id: 'agriculture', name: 'Agriculture (කෘෂිකර්මය)', icon: Sprout, color: 'bg-green-600/10 text-green-600' },
    ]
  }
];

export const ALL_SUBJECTS = SUBJECT_CATEGORIES.flatMap(cat => cat.subjects);

export const SUBJECT_THEMES: Record<string, { 
  color: string; 
  secondaryColor: string; 
  glowColor: string; 
  animation: 'bubbles' | 'math' | 'matrix' | 'ancient' | 'aesthetic' | 'nature' | 'language' | 'geometric' | 'default';
}> = {
  science: { color: 'emerald', secondaryColor: 'teal', glowColor: '#10B981', animation: 'bubbles' },
  maths: { color: 'rose', secondaryColor: 'pink', glowColor: '#F43F5E', animation: 'math' },
  ict: { color: 'cyan', secondaryColor: 'blue', glowColor: '#06B6D4', animation: 'matrix' },
  history: { color: 'amber', secondaryColor: 'orange', glowColor: '#F59E0B', animation: 'ancient' },
  citizen: { color: 'blue', secondaryColor: 'indigo', glowColor: '#3B82F6', animation: 'ancient' },
  music: { color: 'indigo', secondaryColor: 'violet', glowColor: '#6366F1', animation: 'aesthetic' },
  music_ol: { color: 'indigo', secondaryColor: 'violet', glowColor: '#6366F1', animation: 'aesthetic' },
  art: { color: 'pink', secondaryColor: 'rose', glowColor: '#EC4899', animation: 'aesthetic' },
  art_ol: { color: 'pink', secondaryColor: 'rose', glowColor: '#EC4899', animation: 'aesthetic' },
  dancing: { color: 'cyan', secondaryColor: 'teal', glowColor: '#22D3EE', animation: 'aesthetic' },
  dancing_ol: { color: 'cyan', secondaryColor: 'teal', glowColor: '#22D3EE', animation: 'aesthetic' },
  drama: { color: 'purple', secondaryColor: 'fuchsia', glowColor: '#A855F7', animation: 'aesthetic' },
  sinhala: { color: 'orange', secondaryColor: 'amber', glowColor: '#F97316', animation: 'language' },
  buddhism: { color: 'orange', secondaryColor: 'amber', glowColor: '#F97316', animation: 'ancient' },
  english: { color: 'violet', secondaryColor: 'purple', glowColor: '#8B5CF6', animation: 'language' },
  commerce: { color: 'emerald', secondaryColor: 'green', glowColor: '#059669', animation: 'geometric' },
  geography: { color: 'lime', secondaryColor: 'green', glowColor: '#84CC16', animation: 'nature' },
  health: { color: 'rose', secondaryColor: 'red', glowColor: '#E11D48', animation: 'bubbles' },
  media: { color: 'red', secondaryColor: 'orange', glowColor: '#EF4444', animation: 'aesthetic' },
  agriculture: { color: 'green', secondaryColor: 'lime', glowColor: '#16A34A', animation: 'nature' },
  default: { color: 'blue', secondaryColor: 'sky', glowColor: '#3B82F6', animation: 'default' }
};

export const SUBJECT_RESOURCES: Record<string, { formulas: { name: string; icon: string }[] }> = {
  maths: {
    formulas: [
      { name: "වර්ගඵලය (Area)", icon: "📐" },
      { name: "පරිමාව (Volume)", icon: "📦" },
      { name: "ත්‍රිකෝණමිතිය (Trig)", icon: "🔺" },
    ]
  },
  science: {
    formulas: [
      { name: "ප්‍රභාසංස්ලේෂණය", icon: "🍃" },
      { name: "නිරපේක්ෂ ව්‍යුහය", icon: "⚗️" },
      { name: "චලිත සමීකරණ", icon: "🏎️" },
    ]
  },
  ict: {
    formulas: [
      { name: "Binary Conversion", icon: "🔢" },
      { name: "Logic Gates", icon: "🔌" },
      { name: "HTML Tags", icon: "🌐" },
    ]
  },
  history: {
    formulas: [
      { name: "රාජාවලිය", icon: "👑" },
      { name: "සෙල්ලිපි", icon: "📜" },
      { name: "මහාවංශය", icon: "📖" },
    ]
  },
  buddhism: {
    formulas: [
      { name: "පෙළ පොත (Textbook)", icon: "📔" },
      { name: "ගාථා (Gatha)", icon: "🙏" },
      { name: "බුද්ධ චරිතය", icon: "☸️" },
    ]
  },
  music: {
    formulas: [
      { name: "රාග සප්තකය හා ස්වර (Ragas & Swaras)", icon: "🎵" },
      { name: "තාල හා මාත්‍රා (Taal & Matra)", icon: "🥁" },
      { name: "නූර්ති හා නාඩගම් ගීත", icon: "🎻" },
      { name: "ස්වර ලිපි (Staff & Bhatkhande)", icon: "🎼" }
    ]
  },
  music_ol: {
    formulas: [
      { name: "රාග සප්තකය හා ස්වර (Ragas & Swaras)", icon: "🎵" },
      { name: "තාල හා මාත්‍රා (Taal & Matra)", icon: "🥁" },
      { name: "නූර්ති හා නාඩගම් ගීත", icon: "🎻" },
      { name: "ස්වර ලිපි (Staff & Bhatkhande)", icon: "🎼" }
    ]
  },
  art: {
    formulas: [
      { name: "වර්ණ රෝදය හා සංයුතිය", icon: "🎨" },
      { name: "දෘෂ්ටිකෝණ නීති (Perspective)", icon: "📐" },
      { name: "ලක්දිව බිතුසිතුවම් සම්ප්‍රදාය", icon: "🏛️" },
      { name: "මානව රූප ඇඳීම (Anatomy)", icon: "🧍" }
    ]
  },
  art_ol: {
    formulas: [
      { name: "වර්ණ රෝදය හා සංයුතිය", icon: "🎨" },
      { name: "දෘෂ්ටිකෝණ නීති (Perspective)", icon: "📐" },
      { name: "ලක්දිව බිතුසිතුවම් සම්ප්‍රදාය", icon: "🏛️" },
      { name: "මානව රූප ඇඳීම (Anatomy)", icon: "🧍" }
    ]
  },
  dancing: {
    formulas: [
      { name: "උඩරට වට්ටම් හා කස්තිරම්", icon: "💃" },
      { name: "පහතරට දෙවොල් නර්තන", icon: "🔥" },
      { name: "වන්නම් 18 හා තාල", icon: "🪘" },
      { name: "සාම්ප්‍රදායික රංග වස්ත්‍ර", icon: "👑" }
    ]
  },
  dancing_ol: {
    formulas: [
      { name: "උඩරට වට්ටම් හා කස්තිරම්", icon: "💃" },
      { name: "පහතරට දෙවොල් නර්තන", icon: "🔥" },
      { name: "වන්නම් 18 හා තාල", icon: "🪘" },
      { name: "සාම්ප්‍රදායික රංග වස්ත්‍ර", icon: "👑" }
    ]
  },
  drama: {
    formulas: [
      { name: "රංග ශෛලීන් (Realistic/Stylized)", icon: "🎭" },
      { name: "නාට්‍ය පිටපත් විචාරය (Scripts)", icon: "📜" },
      { name: "අංගරචනය හා පසුතල (Stagecraft)", icon: "🎪" },
      { name: "කටහඬ හා රංගන අභ්‍යාස", icon: "🗣️" }
    ]
  },
  sinhala: {
    formulas: [
      { name: "අක්ෂර වින්‍යාසය (න/ණ, ල/ළ)", icon: "✍️" },
      { name: "සන්ධි හා සමාස රීති", icon: "📚" },
      { name: "කර්තෘකාරක/කර්මකාරක ආඛ්‍යාත", icon: "📝" },
      { name: "සාහිත්‍ය සංග්‍රහය විචාර", icon: "📜" }
    ]
  },
  english: {
    formulas: [
      { name: "Tenses & Active/Passive Voice", icon: "🗣️" },
      { name: "Conditional Clauses (Types 1-3)", icon: "🔤" },
      { name: "Formal Letter Structure", icon: "✉️" },
      { name: "Reported Speech Rules", icon: "💬" }
    ]
  },
  commerce: {
    formulas: [
      { name: "ගිණුම්කරණ සමීකරණය (Assets=Liab+Equity)", icon: "📊" },
      { name: "මූල්‍ය ප්‍රකාශන (Final Accounts)", icon: "📑" },
      { name: "බැංකු සැසඳුම් ප්‍රකාශ", icon: "🏦" }
    ]
  },
  geography: {
    formulas: [
      { name: "සිතියම් පරිමාණ හා සමෝච්ච රේඛා", icon: "🗺️" },
      { name: "කාලගුණ හා දේශගුණ කලාප", icon: "⛅" },
      { name: "GIS භූගෝලීය තොරතුරු පද්ධති", icon: "🛰️" }
    ]
  },
  health: {
    formulas: [
      { name: "සමබල ආහාර හා පෝෂණය (BMI)", icon: "🥗" },
      { name: "පළමු ආධාර හා ආරක්ෂාව (First Aid)", icon: "🩹" },
      { name: "ක්‍රීඩා නීතිරීති හා යෝග්‍යතාව", icon: "🏃" }
    ]
  },
  default: {
    formulas: [
      { name: "සටහන් (Notes)", icon: "📝" },
      { name: "පාරිභාෂික වචන", icon: "📖" },
      { name: "වැදගත් කරුණු", icon: "💡" },
    ]
  }
};

export interface SyllabusUnitDetail {
  unitNo: number;
  title: string;
  term: '1st Term' | '2nd Term' | '3rd Term';
  keyConcepts: string[];
}

export const SYLLABUS_DATA: Record<string, Record<string, { units: string[]; textbookUrl?: string; literatureBookUrl?: string; detailedUnits?: SyllabusUnitDetail[] }>> = {
  'Grade 6': {
    science: {
      units: [
        '1. අප අවට පරිසරය (Our Environment)',
        '2. ජලයේ වැදගත්කම හා සංරක්ෂණය (Importance of Water)',
        '3. පදාර්ථයේ විවිධත්වය (Diversity of Matter)',
        '4. ශක්ති ප්‍රභව හා භාවිත (Energy Sources)',
        '5. ආලෝකය හා දෘෂ්ටිය (Light & Vision)',
        '6. ශබ්දය හා ශ්‍රවණය (Sound & Hearing)',
        '7. චලිතය හා බලය (Motion & Force)',
        '8. චුම්භක හා ඒවායේ යෙදීම් (Magnets)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. රවුම් සහ සරල රේඛා (Circles & Lines)',
        '2. පූර්ණ සංඛ්‍යා (Whole Numbers)',
        '3. ගණිත කර්ම (Mathematical Operations)',
        '4. කාලය (Time & Calendar)',
        '5. ගුණාකාර හා සාධක (Multiples & Factors)',
        '6. භාග (Fractions)',
        '7. දශම (Decimals)',
        '8. දිග මැනීම (Measurement of Length)',
        '9. පරිමිතිය (Perimeter)',
        '10. වර්ගඵලය (Area)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. ඉතිහාසය හදාරන්නේ ඇයි? (Why Study History?)',
        '2. ඉතිහාසය හැදෑරීමේ මූලාශ්‍ර (Historical Sources)',
        '3. ශ්‍රී ලංකාවේ ප්‍රාග් ඓතිහාසික යුගය (Prehistoric Sri Lanka)',
        '4. මුල් ජනාවාස ව්‍යාප්තිය (Early Human Settlements)',
        '5. මුල් ඓතිහාසික රාජ්‍ය බිහිවීම (Early Historic Kingdom)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. සම්බුදු තෙමඟුල (The Triple Festival)',
        '2. තිසරණය සහ පන්සිල් (Refuge & Five Precepts)',
        '3. රහතන් වහන්සේලාගේ ජීවිත (Lives of Arahants)',
        '4. බුදුරදුන්ගේ ලෝකාභිවෘද්ධි සේවය (Service of the Buddha)',
        '5. දහම් කරුණු හා ගුණධර්ම (Moral Values)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. පරිගණක හැඳින්වීම (Introduction to Computers)',
        '2. ආදාන හා ප්‍රතිදාන උපාංග (Input & Output Devices)',
        '3. පරිගණක මෙහෙයුම් පද්ධතිය (Basic OS Skills)',
        '4. වදන් සැකසුම් මෘදුකාංග (Word Processing)',
        '5. ආරක්ෂිත පරිගණක භාවිතය (Safe Computer Usage)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. සිංහල අක්ෂර මාලාව හා හෝඩිය (මිශ්‍ර සිංහල හෝඩිය හා ව්‍යවහාරික හෝඩිය)',
        '2. සරල අක්ෂර වින්‍යාස නීති (න/ණ, ල/ළ මූලික රීති)',
        '3. නාම පද හා ක්‍රියා පද හඳුනාගැනීම',
        '4. විරාම ලක්ෂණ - තිත හා කොමාව භාවිතය',
        '5. සරල වාක්‍ය ගොඩනැගීම හා නිර්මාණාත්මක රචනා',
        '6. [පද්‍ය] දිය රැලි නැග නැගිලා (කාව්‍ය රසවින්දනය)',
        '7. [පද්‍ය] අපේ ගමේ ගොවි මාමා (ජන කවි ආභාෂය)',
        '8. [ගද්‍ය] කැලේ රජ්ජුරුවෝ (ළමා කතා රසවින්දනය)',
        '9. [ගද්‍ය] පරිසරය රැකගනිමු (ආදර්ශ ලිපි)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Greetings, Introductions & Classroom Language',
        '2. Nouns: Singular & Plural Forms',
        '3. Simple Present Tense (Daily Routines & Habits)',
        '4. Pronouns & Possessive Adjectives',
        '5. Prepositions of Place (in, on, under, behind)',
        '6. Reading Comprehension: Stories & Dialogues',
        '7. Short Composition: My School / My Pet'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. අපේ පාසල සහ අවට පරිසරය (School & Local Environment)',
        '2. සිතියම් හා මූලික දිශා (Cardinal Directions & Basic Maps)',
        '3. ශ්‍රී ලංකාවේ පිහිටීම හා දිස්ත්‍රික්ක (Districts of Sri Lanka)',
        '4. කාලගුණය හා සෘතු (Weather Patterns)',
        '5. ස්වභාවික සම්පත් හා ජල මූලාශ්‍ර (Water Resources)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. පවුල හා එහි වගකීම් (Family & Responsibilities)',
        '2. පාසලේ යහපත් පුරවැසියෙකු වීම (Good Student Citizen)',
        '3. සමාජ ආචාරධර්ම හා ගරුත්වය (Social Respect & Values)',
        '4. පොදු දේපළ ආරක්ෂා කිරීම (Public Property Care)',
        '5. දේශීය සංස්කෘතික උරුමය (National Cultural Heritage)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. පෞද්ගලික ස්වස්ථතාව හා පිරිසිදුකම (Personal Hygiene)',
        '2. සමබල ආහාර වේලක් හා පිරිසිදු ජලය (Balanced Diet & Water)',
        '3. ශාරීරික ක්‍රියාකාරකම් හා නිවැරදි ඉරියව් (Physical Posture & Games)',
        '4. සුරක්ෂිතභාවය හා හදිසි අනතුරු වළක්වාගැනීම (Safety at Home & School)',
        '5. විවේකය හා සුවබර නින්ද (Rest & Sleep)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. නාද සහ ශබ්ද හඳුනාගැනීම (Musical Pitch & Sound Identification)',
        '2. සප්තකය හා මූලික ස්වර සත - ස, රි, ග, ම, ප, ධ, නි (The 7 Basic Swaras)',
        '3. සරල තාල අභ්‍යාස - කේහර්වා තාලය (Intro to Kaharwa Taal & Clapping)',
        '4. ශ්‍රී ලාංකීය ළමා ජන ගීත (Folk Songs for Children - ඔන්චිලි වාරම්, නෙළුම් කවි)',
        '5. ආනන්ද සමරකෝන් මහතාගේ ළමා නිර්මාණ (Ananda Samarakoon Children Songs)',
        '6. දේශීය හා බටහිර වාද්‍ය භාණ්ඩ හඳුනාගැනීම (Acoustic Instruments Identification)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. නාද සහ ශබ්ද හඳුනාගැනීම (Musical Pitch & Sound Identification)',
        '2. සප්තකය හා මූලික ස්වර සත - ස, රි, ග, ම, ප, ධ, නි (The 7 Basic Swaras)',
        '3. සරල තාල අභ්‍යාස - කේහර්වා තාලය (Intro to Kaharwa Taal & Clapping)',
        '4. ශ්‍රී ලාංකීය ළමා ජන ගීත (Folk Songs for Children - ඔන්චිලි වාරම්, නෙළුම් කවි)',
        '5. ආනන්ද සමරකෝන් මහතාගේ ළමා නිර්මාණ (Ananda Samarakoon Children Songs)',
        '6. දේශීය හා බටහිර වාද්‍ය භාණ්ඩ හඳුනාගැනීම (Acoustic Instruments Identification)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. රේඛා හා හැඩතල මූලික ඇඳීම් (Basic Lines & Organic Shapes)',
        '2. ප්‍රාථමික හා ද්විතීයික වර්ණ (Primary & Secondary Colors)',
        '3. ස්වභාවධර්මයේ වර්ණ රටා හා කොළ අච්චු මුද්‍රණය (Leaf Printing & Nature Motifs)',
        '4. මගේ නිවස හා පරිසරය චිත්‍රණය (My Home & Landscape Sketching)',
        '5. මැටි භාණ්ඩ හා සරල මෝස්තර නිර්මාණ (Clay Modeling & Sri Lankan Patterns)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. රේඛා හා හැඩතල මූලික ඇඳීම් (Basic Lines & Organic Shapes)',
        '2. ප්‍රාථමික හා ද්විතීයික වර්ණ (Primary & Secondary Colors)',
        '3. ස්වභාවධර්මයේ වර්ණ රටා හා කොළ අච්චු මුද්‍රණය (Leaf Printing & Nature Motifs)',
        '4. මගේ නිවස හා පරිසරය චිත්‍රණය (My Home & Landscape Sketching)',
        '5. මැටි භාණ්ඩ හා සරල මෝස්තර නිර්මාණ (Clay Modeling & Sri Lankan Patterns)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. නර්තන ඉරියව් හා මූලික පා සරඹ (Basic Dance Postures & Steps)',
        '2. තාලයට පාද තැබීම හා අත් අභ්‍යාස (Hand Gestures & Footwork)',
        '3. දේශීය ළමා නැටුම් (Traditional Sinhala Folk Dances)',
        '4. ගැටබෙරය හා යක්බෙරය හඳුනාගැනීම (Indigenous Drums Recognition)',
        '5. සත්ව චලන අනුකරණය (Animal Movement Dances)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. නර්තන ඉරියව් හා මූලික පා සරඹ (Basic Dance Postures & Steps)',
        '2. තාලයට පාද තැබීම හා අත් අභ්‍යාස (Hand Gestures & Footwork)',
        '3. දේශීය ළමා නැටුම් (Traditional Sinhala Folk Dances)',
        '4. ගැටබෙරය හා යක්බෙරය හඳුනාගැනීම (Indigenous Drums Recognition)',
        '5. සත්ව චලන අනුකරණය (Animal Movement Dances)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. ශරීර චලන හා අභිනය (Mime & Body Expressions)',
        '2. කටහඬ හා ශබ්ද අනුකරණය (Voice Projection & Animal Sounds)',
        '3. ළමා නාට්‍ය හා චරිත රංගනය (Children Theatrical Acting)',
        '4. සංවාද හා කෙටි කතා නාට්‍යගත කිරීම (Dialogues & Playlets)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 7': {
    science: {
      units: [
        '1. ශාක විවිධත්වය (Plant Diversity)',
        '2. සත්ත්ව විවිධත්වය (Animal Diversity)',
        '3. ද්‍රව්‍යවල ගුණ හා භාවිත (Properties of Matter)',
        '4. අම්ල හා භෂ්ම (Acids & Bases)',
        '5. තාපය හා උෂ්ණත්වය (Heat & Temperature)',
        '6. ස්ථිති විද්‍යුතය (Static Electricity)',
        '7. පෘථිවිය හා අභ්‍යවකාශය (Earth & Space)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. පූර්ණ සංඛ්‍යා (Integers)',
        '2. සාධක හා ගුණාකාර (Factors & Prime Numbers)',
        '3. භාග හා දශම (Fractions & Decimals)',
        '4. වීජීය ප්‍රකාශන (Algebraic Expressions)',
        '5. සරල සමීකරණ (Simple Equations)',
        '6. කෝණ (Angles)',
        '7. පරිමිතිය හා වර්ගඵලය (Perimeter & Area)',
        '8. පරිමාව හා ධාරිතාව (Volume & Capacity)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. අනුරාධපුර රාජධානිය (Anuradhapura Kingdom)',
        '2. වාරි ශිෂ්ටාචාරය (Hydraulic Civilization)',
        '3. කෘෂිකර්මාන්තය හා ආර්ථිකය (Agriculture & Trade)',
        '4. කලා හා නිර්මාණ ශිල්ප (Art & Architecture)',
        '5. විදේශීය සබඳතා (Foreign Relations)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. පරිගණක ආචයන උපාංග (Storage Devices)',
        '2. පැතුරුම්පත් මුලධර්ම (Spreadsheets Intro)',
        '3. ඉදිරිපත් කිරීමේ මෘදුකාංග (Presentations)',
        '4. අන්තර්ජාලය හා විද්‍යුත් තැපෑල (Internet & Email)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. සිද්ධාර්ථ කුමාරෝත්පත්තිය හා ළමාවිය (Birth & Childhood of Prince Siddhartha)',
        '2. සත්සතිය හා ප්‍රථම ධර්ම දේශනය (Seven Weeks & Dhammacakkappavattana Sutta)',
        '3. කර්මය හා පුනර්භවය (Karma & Rebirth)',
        '4. මවුපිය ගුණ හා සිඟාලෝවාද සූත්‍ර ඉගැන්වීම් (Duties to Parents)',
        '5. ශ්‍රී ලංකාවේ බුදුසසුන පිහිටුවීම - මහින්දාගමනය (Arrival of Arahant Mahinda)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. අක්ෂර වින්‍යාසය - තාලුජ ශ, මුර්ධජ ෂ, දන්තජ ස',
        '2. පද බෙදීමේ මූලික රීති (නාම හා ක්‍රියා පද)',
        '3. සමානාර්ථ හා විරුද්ධාර්ථ පද මාලාව',
        '4. සරල උපමා යෙදුම් හා රූඪි',
        '5. [පද්‍ය] සිරිපා වඳිමු (සමනළ ගමන කවි විවරණය)',
        '6. [පද්‍ය] හඳපානේ සෙල්ලම (ළමා කාව්‍ය)',
        '7. [ගද්‍ය] ගමේ වෙද මහතා (චරිතාපදාන)',
        '8. [ගද්‍ය] සතුන්ට කරුණාව (ජාතක කතා ඇසුරින්)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Present Continuous Tense (Actions Happening Now)',
        '2. Past Simple Tense: Regular & Irregular Verbs',
        '3. Adjectives: Comparative & Superlative Forms',
        '4. Conjunctions (and, but, because, so)',
        '5. Informal Letter to a Friend',
        '6. Reading for Main Ideas & Details'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. ලෝක සිතියම හා මහද්වීප/සාගර (Continents & Oceans of the World)',
        '2. ශ්‍රී ලංකාවේ ගංගා හා දියඇලි (Rivers & Waterfalls of Sri Lanka)',
        '3. කඳුකරය හා තැනිතලා භූමි (Highlands & Lowlands)',
        '4. කාලගුණ මිනුම් උපකරණ (Weather Instruments)',
        '5. වෘක්ෂලතා හා වනාන්තර (Forests & Flora)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. ප්‍රජාතන්ත්‍රවාදී ගුණාංග (Democratic Values & Peer Co-existence)',
        '2. නායකත්වය හා කණ්ඩායම් හැඟීම (Leadership & Teamwork)',
        '3. සමාජ සාරධර්ම හා වැඩිහිටියන්ට ගරු කිරීම (Respect for Elders)',
        '4. පරිසර හිතකාමී ජීවන රටාව (Eco-friendly Living)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. නව යොවුන් වියේ වෙනස්කම් (Adolescent Growth & Changes)',
        '2. බෝවන රෝග හා වැළැක්වීම (Infectious Diseases Prevention)',
        '3. මලල ක්‍රීඩා මූලික කුසලතා (Athletics: Running & Jumping)',
        '4. මානසික ප්‍රබෝධය හා විවේකය (Mental Relaxation & Hobbies)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. සප්තකය හා ස්වර ප්‍රභේද - ශුද්ධ ස්වර හා කෝමල/තීව්‍ර ස්වර (Shuddha & Komal Swaras)',
        '2. තාල හැඳින්වීම - දාද්රා තාලය හා කේහර්වා තාලය (Dhadra & Keharwa Taals)',
        '3. දේශීය ජන ගී ප්‍රභේද - නෙළුම් කවි, පැල් කවි, කරත්ත කවි (Sri Lankan Folk Songs)',
        '4. සරල වාද්‍ය භාණ්ඩ වාදනය - සර්පිනාව හා තබ්ලාව (Harmonium & Tabla Basics)',
        '5. ශ්‍රී ලාංකීය ප්‍රවීණ සංගීතඥයන් - ඩබ්ලිව්.ඩී. අමරදේවයන්ගේ ගීත (Pandit Amaradeva Classics)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. සප්තකය හා ස්වර ප්‍රභේද - ශුද්ධ ස්වර හා කෝමල/තීව්‍ර ස්වර (Shuddha & Komal Swaras)',
        '2. තාල හැඳින්වීම - දාද්රා තාලය හා කේහර්වා තාලය (Dhadra & Keharwa Taals)',
        '3. දේශීය ජන ගී ප්‍රභේද - නෙළුම් කවි, පැල් කවි, කරත්ත කවි (Sri Lankan Folk Songs)',
        '4. සරල වාද්‍ය භාණ්ඩ වාදනය - සර්පිනාව හා තබ්ලාව (Harmonium & Tabla Basics)',
        '5. ශ්‍රී ලාංකීය ප්‍රවීණ සංගීතඥයන් - ඩබ්ලිව්.ඩී. අමරදේවයන්ගේ ගීත (Pandit Amaradeva Classics)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. වර්ණ චක්‍රය හා තෘතීයික වර්ණ (Color Wheel & Tertiary Colors)',
        '2. ත්‍රිමාණ බව පෙන්වීම - ආලෝකය හා සෙවනැලි (Light, Shade & 3D Volume)',
        '3. ස්වභාවික දර්ශන ඇඳීම - ඉදිරිපස හා පසුබිම (Foreground & Background Landscape)',
        '4. ශ්‍රී ලාංකීය සාම්ප්‍රදායික කැටයම් මෝස්තර - ලියවැල්, මල් පෙති (Traditional Foliage Patterns)',
        '5. සතුන්ගේ හා පක්ෂීන්ගේ රූප සටහන් (Animal & Bird Sketches)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. වර්ණ චක්‍රය හා තෘතීයික වර්ණ (Color Wheel & Tertiary Colors)',
        '2. ත්‍රිමාණ බව පෙන්වීම - ආලෝකය හා සෙවනැලි (Light, Shade & 3D Volume)',
        '3. ස්වභාවික දර්ශන ඇඳීම - ඉදිරිපස හා පසුබිම (Foreground & Background Landscape)',
        '4. ශ්‍රී ලාංකීය සාම්ප්‍රදායික කැටයම් මෝස්තර - ලියවැල්, මල් පෙති (Traditional Foliage Patterns)',
        '5. සතුන්ගේ හා පක්ෂීන්ගේ රූප සටහන් (Animal & Bird Sketches)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. උඩරට නැටුමේ මූලික මණ්ඩිය හා පා සරඹ (Kandyan Dance Mandiya & Footwork)',
        '2. පහතරට නැටුමේ මූලික ඉරියව් (Low-Country Dance Fundamentals)',
        '3. වන්නම් හැඳින්වීම - ගජගා වන්නම හා මයුරා වන්නම (Gajaga & Mayura Wannam Intro)',
        '4. තාල රූප අනුව අත් පා හැසිරවීම (Rhythm & Gesture Coordination)',
        '5. බෙර පද හා තාල වාදන (Traditional Drum Syllables - තාක් ජිට් තොං)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. උඩරට නැටුමේ මූලික මණ්ඩිය හා පා සරඹ (Kandyan Dance Mandiya & Footwork)',
        '2. පහතරට නැටුමේ මූලික ඉරියව් (Low-Country Dance Fundamentals)',
        '3. වන්නම් හැඳින්වීම - ගජගා වන්නම හා මයුරා වන්නම (Gajaga & Mayura Wannam Intro)',
        '4. තාල රූප අනුව අත් පා හැසිරවීම (Rhythm & Gesture Coordination)',
        '5. බෙර පද හා තාල වාදන (Traditional Drum Syllables - තාක් ජිට් තොං)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. නාට්‍යමය දෙබස් උච්චාරණය (Stage Diction & Voice Modulation)',
        '2. චරිතාංග නිරූපණය හා මුහුණේ ඉරියව් (Facial Expressions & Character Study)',
        '3. සරල වේදිකා පසුතල නිර්මාණය (Basic Stagecraft & Props)',
        '4. ශ්‍රී ලාංකීය ගැමි නාට්‍ය - සොකරි නාට්‍ය හැඳින්වීම (Sokari Folk Drama Intro)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 8': {
    science: {
      units: [
        '1. ජීවීන්ගේ ක්ෂුද්‍රජීවී ලෝකය (Microorganisms)',
        '2. ප්‍රභාසංස්ලේෂණය හා ශ්වසනය (Photosynthesis & Respiration)',
        '3. මූලද්‍රව්‍ය හා සංයෝග (Elements & Compounds)',
        '4. මිශ්‍රණ හා ඒවා වෙන් කිරීම (Mixtures & Separation)',
        '5. ධාරා විද්‍යුතය (Current Electricity)',
        '6. පීඩනය හා බලය (Pressure & Force)',
        '7. රසායනික ප්‍රතික්‍රියා (Chemical Reactions)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. වර්ගමූලය (Square Roots)',
        '2. දර්ශක (Indices)',
        '3. සරල රේඛීය සමීකරණ (Linear Equations)',
        '4. අනුපාත හා ප්‍රතිශත (Ratios & Percentages)',
        '5. සංයුක්ත තල රූපවල වර්ගඵලය (Area of Composite Figures)',
        '6. කාටීසීය තලය (Cartesian Plane)',
        '7. දත්ත නිරූපණය හා සම්භාවිතාව (Data & Probability)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. පොළොන්නරු රාජධානිය (Polonnaruwa Kingdom)',
        '2. මහා පරාක්‍රමබාහු රජුගේ යුගය (Era of King Parakramabahu I)',
        '3. දකුණු ඉන්දීය ආක්‍රමණ (South Indian Invasions)',
        '4. දඹදෙණිය හා යාපහුව (Dambadeniya & Yapahuwa Kingdoms)',
        '5. මධ්‍යතන යුගයේ සංස්කෘතිය (Medieval Culture & Society)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. ඇල්ගොරිතම හා ගැලීම් සටහන් (Algorithms & Flowcharts)',
        '2. පැතුරුම්පත් සූත්‍ර හා ශ්‍රිත (Spreadsheet Functions)',
        '3. පරිගණක ජාල මුලධර්ම (Computer Networks)',
        '4. ඩිජිටල් පුරවැසිභාවය හා ආරක්ෂාව (Digital Safety)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. සම්බුද්ධ පරිනිර්වාණය හා ධාතු බෙදීයාම (Mahaparinibbana & Relics)',
        '2. ධර්ම සංගායනා - ප්‍රථම, ද්විතීයික හා තෘතීයික (Buddhist Councils)',
        '3. පංචශීලයේ ගැඹුරු අර්ථය (Deep Meaning of Five Precepts)',
        '4. අනුරාධපුර පූජනීය ස්ථාන - රුවන්වැලිසෑය හා ශ්‍රී මහා බෝධිය (Sacred Shrines)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. සන්ධි මූලධර්ම - ස්වර සන්ධි හා පූර්වස්වර ලෝප සන්ධි',
        '2. නාම පද ප්‍රභේද - ද්‍රව්‍ය නාම, ගුණ නාම, ක්‍රියා නාම',
        '3. ක්‍රියා පද ප්‍රභේද - සකර්මක හා අකර්මක ක්‍රියා',
        '4. උපමා හා රූපක අලංකාර',
        '5. [පද්‍ය] ගුත්තිල කාව්‍ය රසවින්දනය (දෙදෙනෙකුගේ වාදය)',
        '6. [පද්‍ය] සන්දේශ කාව්‍ය හැඳින්වීම (හංස සන්දේශය)',
        '7. [ගද්‍ය] පන්සිය පනස් ජාතක කතා කලාව',
        '8. [ගද්‍ය] රචනා හා සංක්ෂිප්ත ලිවීම'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Future Tenses (will / going to)',
        '2. Modal Verbs: can, could, should, must',
        '3. Relative Clauses (who, which, that, where)',
        '4. Passive Voice: Simple Present & Simple Past',
        '5. Writing Formal Notices and Announcements',
        '6. Reading Comprehension: Science & Technology Articles'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. පෘථිවියේ අභ්‍යන්තර ව්‍යුහය හා භූ තැටි (Earth Internal Structure & Plates)',
        '2. භූමිකම්පා හා ගිනිකඳු (Earthquakes & Volcanoes)',
        '3. ශ්‍රී ලංකාවේ ඛනිජ සම්පත් හා පාංශු වර්ග (Minerals & Soils of Sri Lanka)',
        '4. ජනගහන ව්‍යාප්තිය හා ඝනත්වය (Population Distribution)',
        '5. ස්වභාවික ආපදා කළමනාකරණය (Disaster Management)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. ශ්‍රී ලංකාවේ ප්‍රාදේශීය පාලන ක්‍රමය (Local Government in Sri Lanka)',
        '2. පුරවැසි අයිතිවාසිකම් හා යුතුකම් (Citizenship Rights & Duties)',
        '3. නීතිය හා සාමය සුරැකීම (Law & Order Maintenance)',
        '4. ආර්ථික සාධක හා නිෂ්පාදනය (Economic Factors & Production)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. ආහාරවල පෝෂණ කොටස් හා ඌනතා රෝග (Nutrients & Deficiency Diseases)',
        '2. ක්‍රීඩා අනතුරු හා මූලික ප්‍රථමාධාර (Sports Injuries & First Aid)',
        '3. මානසික ආතතිය හා යහපත් මිතුරු ඇසුර (Peer Pressure & Stress Relief)',
        '4. පිහිනුම් හා ජල ආරක්ෂණ ක්‍රම (Water Safety & Swimming)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. රාග හැඳින්වීම - බිලාවල් රාගය හා කල්‍යාණ රාගය (Bilawal & Kalyan Ragas)',
        '2. තීන්තාලය හා මාත්‍රා 16 ගණනය (Teentaal 16 Matras & Bol)',
        '3. නූර්ති ගී සහ නාඩගම් ගී ලක්ෂණ (Noorthi & Nadagam Musical Traditions)',
        '4. ශ්‍රී ලාංකීය තූර්ය භාණ්ඩ වර්ගීකරණය - තත, සුසිර, ඝන, අවනද්ධ (4 Instrument Classes)',
        '5. හඬ පුහුණුව හා ආලෝචන විධි (Vocal Culture & Alankars)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. රාග හැඳින්වීම - බිලාවල් රාගය හා කල්‍යාණ රාගය (Bilawal & Kalyan Ragas)',
        '2. තීන්තාලය හා මාත්‍රා 16 ගණනය (Teentaal 16 Matras & Bol)',
        '3. නූර්ති ගී සහ නාඩගම් ගී ලක්ෂණ (Noorthi & Nadagam Musical Traditions)',
        '4. ශ්‍රී ලාංකීය තූර්ය භාණ්ඩ වර්ගීකරණය - තත, සුසිර, ඝන, අවනද්ධ (4 Instrument Classes)',
        '5. හඬ පුහුණුව හා ආලෝචන විධි (Vocal Culture & Alankars)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. ඒක ලක්ෂ්‍ය දෘෂ්ටිකෝණය (One-Point Perspective Drawing)',
        '2. මානව මුහුණේ සමානුපාතික ලක්ෂණ හා ප්‍රකාශනය (Human Face Proportions & Expression)',
        '3. සීගිරි බිතුසිතුවම් කලාව (Sigiriya Frescoes Art & Colors)',
        '4. පෝස්ටර් නිර්මාණය හා අක්ෂර කලාව (Poster Design & Typography)',
        '5. මුද්‍රණ ශිල්පය - ස්ටෙන්සිල් හා බ්ලොක් මුද්‍රණය (Block Printing & Stencil)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. ඒක ලක්ෂ්‍ය දෘෂ්ටිකෝණය (One-Point Perspective Drawing)',
        '2. මානව මුහුණේ සමානුපාතික ලක්ෂණ හා ප්‍රකාශනය (Human Face Proportions & Expression)',
        '3. සීගිරි බිතුසිතුවම් කලාව (Sigiriya Frescoes Art & Colors)',
        '4. පෝස්ටර් නිර්මාණය හා අක්ෂර කලාව (Poster Design & Typography)',
        '5. මුද්‍රණ ශිල්පය - ස්ටෙන්සිල් හා බ්ලොක් මුද්‍රණය (Block Printing & Stencil)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. සබරගමු නැටුම් සම්ප්‍රදායේ මූලික ලක්ෂණ (Sabaragamuwa Dance Tradition)',
        '2. උඩරට වන්නම් - නෛඅඩි වන්නම හා උදුරා වන්නම (Naiyandi & Udara Wannam)',
        '3. කස්තිරම් හා ශීර්ෂ චලන (Head Movements & Kasthiram)',
        '4. දේශීය නර්තන ඇඳුම් කට්ටලය (Traditional Dance Costumes)',
        '5. දවුල හා තම්මැට්ටම වාදනය (Davula & Thammattama Drums)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. සබරගමු නැටුම් සම්ප්‍රදායේ මූලික ලක්ෂණ (Sabaragamuwa Dance Tradition)',
        '2. උඩරට වන්නම් - නෛඅඩි වන්නම හා උදුරා වන්නම (Naiyandi & Udara Wannam)',
        '3. කස්තිරම් හා ශීර්ෂ චලන (Head Movements & Kasthiram)',
        '4. දේශීය නර්තන ඇඳුම් කට්ටලය (Traditional Dance Costumes)',
        '5. දවුල හා තම්මැට්ටම වාදනය (Davula & Thammattama Drums)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. කෝලම් නාට්‍ය සම්ප්‍රදාය හා වෙස් මුහුණු (Kolam Drama & Masks)',
        '2. චරිත ගැටුම් හා නාට්‍යමය අවස්ථා ගොඩනැගීම (Dramatic Conflict & Scenes)',
        '3. වේදිකා ආලෝකකරණය හා ඇඳුම් නිර්මාණය (Stage Lighting & Costume)',
        '4. මහාචාර්ය එදිරිවීර සරච්චන්ද්‍රයන්ගේ නාට්‍ය කලාව (Prof. Sarachchandra Theatre Intro)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 9': {
    science: {
      units: [
        '1. මිනිස් සිරුරේ ජීව ක්‍රියා (Human Body Systems)',
        '2. පෝෂණය හා සෞඛ්‍යය (Nutrition & Health)',
        '3. පරමාණුවේ ව්‍යුහය (Atomic Structure)',
        '4. රසායනික බන්ධන හැඳින්වීම (Chemical Bonding Intro)',
        '5. තරංග හා ඒවායේ යෙදීම් (Waves & Applications)',
        '6. කාර්යය, ශක්තිය හා ක්ෂමතාව (Work, Energy & Power)',
        '7. පෘථිවියේ ස්වභාවික සම්පත් (Natural Resources)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. තාත්වික සංඛ්‍යා (Real Numbers)',
        '2. වීජීය භාග (Algebraic Fractions)',
        '3. සමගාමී සමීකරණ (Simultaneous Equations)',
        '4. ත්‍රිකෝණමිතිය හැඳින්වීම (Intro to Trigonometry)',
        '5. කවයක ගුණ (Properties of Circles)',
        '6. සංඛ්‍යානය හා මාධ්‍යනය (Statistics & Measures)',
        '7. ජ්‍යාමිතික නිර්මාණ (Geometric Constructions)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. කෝට්ටේ රාජධානිය (Kotte Kingdom)',
        '2. පෘතුගීසි හා ලන්දේසි ආගමනය (Portuguese & Dutch Invasions)',
        '3. උඩරට රාජධානිය (Kingdom of Kandy)',
        '4. බ්‍රිතාන්‍ය අධිරාජ්‍යවාදය (British Colonialism in Sri Lanka)',
        '5. 1818 හා 1848 නිදහස් අරගල (Independence Rebellions)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. දත්ත නිරූපණය හා ද්වීමය පද්ධතිය (Binary Data Representation)',
        '2. ක්‍රමලේඛන මූලධර්ම - Scratch (Programming with Scratch)',
        '3. වෙබ් අඩවි නිර්මාණය - HTML මුලික (HTML Web Basics)',
        '4. පරිගණක ආචාරධර්ම හා නීතිය (Cyber Ethics & Law)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. බුදුරදුන්ගේ අසමසම ගුණ - නවලෝකෝත්තර ධර්මය (Qualities of Buddha)',
        '2. චතුරාර්ය සත්‍යය මූලික හැඳින්වීම (Intro to Four Noble Truths)',
        '3. ත්‍රිපිටකය හා එහි කොටස් (The Tipitaka: Sutta, Vinaya, Abhidhamma)',
        '4. බෞද්ධ පරිසර දර්ශනය (Buddhist Ecology)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. ආඛ්‍යාතය හා කර්තෘකාරක වාක්‍ය රීති',
        '2. කර්මකාරක වාක්‍ය ගොඩනැගීම හා විග්‍රහය',
        '3. සන්ධි - ව්‍යඤ්ජන සන්ධි හා පරස්වර ලෝප සන්ධි',
        '4. සමාස පද හැඳින්වීම (කර්මධාරය, තත්පුරුෂ)',
        '5. [පද්‍ය] ලෝවැඩ සඟරාව විචාරය (වීදාගම මෛත්‍රෙය හිමි)',
        '6. [පද්‍ය] කව්සිළුමිණ ආභාෂය',
        '7. [ගද්‍ය] පූජාවලිය හා සද්ධර්මරත්නාවලිය උපුටන',
        '8. [ගද්‍ය] කෙටිකතා විචාරය හා නවකතා හැඳින්වීම'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Conditional Sentences (Type 0, Type 1 & Type 2)',
        '2. Reported Speech (Statements & Questions)',
        '3. Expressing Opinions, Agreeing & Disagreeing',
        '4. Formal Letters to Principals & Authorities',
        '5. Summary Writing Skills for O/L Foundation',
        '6. Literature: Appreciating English Poetry & Short Fiction'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. ගෝලීය දේශගුණ කලාප (Global Climatic Zones)',
        '2. ශ්‍රී ලංකාවේ වාරි කර්මාන්තය හා කෘෂිකර්මය (Agriculture & Irrigation in Sri Lanka)',
        '3. කාර්මිකකරණය හා සේවා ආර්ථිකය (Industrialization & Services)',
        '4. සිතියම් කියවීම - සමෝච්ච රේඛා (Contour Lines & Topo Map Reading)',
        '5. ගෝලීය උණුසුම හා හරිතාගාර ආචරණය (Global Warming & Greenhouse Effect)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. ආණ්ඩුක්‍රම ව්‍යවස්ථාව හා මූලික අයිතිවාසිකම් (Constitution & Fundamental Rights)',
        '2. ප්‍රජාතන්ත්‍රවාදී මැතිවරණ හා පාර්ලිමේන්තුව (Parliament & Democratic Elections)',
        '3. යුක්තිය, සමානාත්මතාව හා මානව හිමිකම් (Justice, Equality & Human Rights)',
        '4. ශ්‍රී ලංකාවේ බහුසංස්කෘතික සහජීවනය (Multicultural Harmony)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. යහපත් ජීවන රටාවක් හා බෝනොවන රෝග (Healthy Lifestyle & NCDs)',
        '2. දුම්කොළ, මත්පැන් හා මත්ද්‍රව්‍යවල විපාක (Substance Abuse Dangers)',
        '3. ප්‍රජනක සෞඛ්‍යය මූලික කරුණු (Reproductive Health Basics)',
        '4. ක්‍රීඩා සංවිධානය හා නීතිරීති (Sports Organization & Rules)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. ඛමාජ් හා කාෆි රාග ගායනා (Khamaj & Kafi Ragas Performance)',
        '2. රූපක් තාලය හා ධීර්ඝ ලය අභ්‍යාස (Roopak Taal & Laya Drills)',
        '3. ශ්‍රී ලාංකීය ප්‍රශස්ති හා වන්නම් ගීත (Prashasthi Songs & Wannam Melodies)',
        '4. ස්වර ලිපි කියවීම හා ලිවීම - භාත්ඛණ්ඩේ ක්‍රමය (Bhatkhande Notation Literacy)',
        '5. සංගීත ඥානය හා ශ්‍රවණ අභ්‍යාස (Ear Training & Raga Identification)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. ඛමාජ් හා කාෆි රාග ගායනා (Khamaj & Kafi Ragas Performance)',
        '2. රූපක් තාලය හා ධීර්ඝ ලය අභ්‍යාස (Roopak Taal & Laya Drills)',
        '3. ශ්‍රී ලාංකීය ප්‍රශස්ති හා වන්නම් ගීත (Prashasthi Songs & Wannam Melodies)',
        '4. ස්වර ලිපි කියවීම හා ලිවීම - භාත්ඛණ්ඩේ ක්‍රමය (Bhatkhande Notation Literacy)',
        '5. සංගීත ඥානය හා ශ්‍රවණ අභ්‍යාස (Ear Training & Raga Identification)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. ද්වි-ලක්ෂ්‍ය දෘෂ්ටිකෝණය (Two-Point Perspective Drawing)',
        '2. පොළොන්නරු යුගයේ බිතුසිතුවම් හා තිවංක පිළිමගෙය (Polonnaruwa Frescoes)',
        '3. මිනිස් සිරුරේ ක්‍රියාකාරී ඉරියව් චිත්‍රණය (Human Anatomy & Gesture Drawing)',
        '4. නිර්මාණාත්මක මෝස්තර රටා හා රෙදි සායම්කරණය (Batik & Fabric Design)',
        '5. ලෝක ප්‍රකට සිතුවම් අගය කිරීම (Appreciating Mona Lisa & Starry Night)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. ද්වි-ලක්ෂ්‍ය දෘෂ්ටිකෝණය (Two-Point Perspective Drawing)',
        '2. පොළොන්නරු යුගයේ බිතුසිතුවම් හා තිවංක පිළිමගෙය (Polonnaruwa Frescoes)',
        '3. මිනිස් සිරුරේ ක්‍රියාකාරී ඉරියව් චිත්‍රණය (Human Anatomy & Gesture Drawing)',
        '4. නිර්මාණාත්මක මෝස්තර රටා හා රෙදි සායම්කරණය (Batik & Fabric Design)',
        '5. ලෝක ප්‍රකට සිතුවම් අගය කිරීම (Appreciating Mona Lisa & Starry Night)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. උඩරට නර්තනයේ වට්ටම් හා කස්තිරම් (Kandyan Vattam & Kasthiram)',
        '2. පහතරට නැටුමේ දෙවොල් නැටුම හා ගුරුළු නැටුම (Devol & Gurulu Dances)',
        '3. වන්නම් ගායනා හා උසස් රංග වින්‍යාසය (Wannam Chants & Choreography)',
        '4. බෙර වාදන ශිල්පය - දෙබෙර වැයුම් (Dual Drum Performance)',
        '5. දේශීය නර්තන ඉතිහාසය (History of Sri Lankan Dance Traditions)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. උඩරට නර්තනයේ වට්ටම් හා කස්තිරම් (Kandyan Vattam & Kasthiram)',
        '2. පහතරට නැටුමේ දෙවොල් නැටුම හා ගුරුළු නැටුම (Devol & Gurulu Dances)',
        '3. වන්නම් ගායනා හා උසස් රංග වින්‍යාසය (Wannam Chants & Choreography)',
        '4. බෙර වාදන ශිල්පය - දෙබෙර වැයුම් (Dual Drum Performance)',
        '5. දේශීය නර්තන ඉතිහාසය (History of Sri Lankan Dance Traditions)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. ශ්‍රී ලාංකීය නාඩගම් නාට්‍ය සම්ප්‍රදාය (Nadagam Traditional Theatrical Style)',
        '2. රංග වස්ත්‍ර, අංගරචනය හා පසුතල (Costumes, Stage Makeup & Decor)',
        '3. පිටපත් රචනය හා දෙබස් ලිවීම (Scriptwriting & Dialogue Composition)',
        '4. මනමේ සහ සිංහබාහු නාට්‍ය විවරණය (Analysis of Maname & Sinhabahu)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 10': {
    science: {
      units: [
        '1. ජීවයේ රසායනික පදනම (Chemical Basis of Life)',
        '2. සෛලය - ජීවයේ ව්‍යුහමය හා ක්‍රියාකාරී ඒකකය (Cell Structure & Function)',
        '3. ජීවීන්ගේ ජීව ක්‍රියා I - ප්‍රභාසංස්ලේෂණය (Photosynthesis)',
        '4. ජීවීන්ගේ ජීව ක්‍රියා II - සෛලීය ශ්වසනය (Cellular Respiration)',
        '5. ද්‍රව්‍යවල ව්‍යුහය (Atomic Structure & Periodic Table)',
        '6. රසායනික බන්ධන (Chemical Bonding)',
        '7. පදාර්ථයේ වෙනස්වීම් හා ශක්තිය (Physical & Chemical Changes)',
        '8. චලිත ප්‍රස්ථාර හා සමීකරණ (Motion Graphs & Equations)',
        '9. නිව්ටන්ගේ නියම හා ඝර්ෂණය (Newton\'s Laws & Friction)',
        '10. කාර්යය, ශක්තිය හා ක්ෂමතාව (Work, Energy & Power)',
        '11. පීඩනය හා එහි යෙදීම් (Pressure & Applications)',
        '12. ප්‍රකාශ විද්‍යාව - ආලෝක වර්තනය (Light Refraction)',
        '13. කාබනික රසායනය හැඳින්වීම (Intro to Organic Chemistry)',
        '14. පෘථිවි ගෝල හා ජෛවගෝලය (Biosphere & Earth Systems)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. පරිමිත ගණිත ශ්‍රේණි (Arithmetic Progressions)',
        '2. පරිමිත ගුණෝත්තර ශ්‍රේණි (Geometric Progressions)',
        '3. වීජීය ප්‍රකාශනවල සාධක (Factors of Algebraic Expressions)',
        '4. වීජීය භාග (Algebraic Fractions)',
        '5. වර්ගජ සමීකරණ (Quadratic Equations)',
        '6. සමගාමී සරල සමීකරණ (Simultaneous Linear Equations)',
        '7. දර්ශක හා ලඝුගණක (Indices & Logarithms I & II)',
        '8. ත්‍රිකෝණමිතිය (Trigonometric Ratios)',
        '9. ත්‍රිකෝණවල අංගසමතාව (Congruency of Triangles)',
        '10. සමාන්තරාස්‍ර හා ජ්‍යාමිතික ප්‍රමේය (Parallelograms & Theorems)',
        '11. තල රූපවල වර්ගඵලය (Area of Plane Figures)',
        '12. ප්‍රිස්ම හා සිලින්ඩරවල පරිමාව (Volume of Prisms & Cylinders)',
        '13. සංඛ්‍යානය හා දත්ත නිරූපණය (Statistics, Mean & Ogives)',
        '14. සම්භාවිතාව (Probability & Tree Diagrams)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. ශ්‍රී ලංකාවේ බ්‍රිතාන්‍ය පාලනය ස්ථාපිත වීම (Establishment of British Rule)',
        '2. කෝල්බෲක්-කැමරන් ප්‍රතිසංස්කරණ (Colebrooke-Cameron Reforms)',
        '3. වැවිලි ආර්ථිකය හා සමාජ පරිවර්තනය (Plantation Economy)',
        '4. ජාතික හා ආගමික පුනරුදය (National & Religious Revival)',
        '5. ව්‍යවස්ථාදායක ප්‍රතිසංස්කරණ (Constitutional Evolution)',
        '6. පළමුවන ලෝක යුද්ධය හා ලෝක බලවතුන් (World War I & Global Impact)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        // 1 වන පොත: සිංහල භාෂාව හා සාහිත්‍යය (Language & Grammar Textbook)
        '1. [1 වන පොත] සිංහල අක්ෂර මාලාව හා හෝඩිය (මිශ්‍ර සිංහල හෝඩිය හා ව්‍යවහාරික හෝඩිය)',
        '2. [1 වන පොත] අක්ෂර වින්‍යාසය හා න/ණ, ල/ළ රීති (ශ, ෂ, ස භාවිතය හා බන්ධනාක්ෂර)',
        '3. [1 වන පොත] පද බෙදීමේ නීති රීති (නාම, ක්‍රියා, නිපාත, උපසර්ග වෙන් කිරීම)',
        '4. [1 වන පොත] සන්ධි රීති (ස්වර, ව්‍යඤ්ජන, පූර්වස්වර ලෝප හා පරස්වර ලෝප සන්ධි)',
        '5. [1 වන පොත] නාම පද ප්‍රභේද හා ලිංග, වචන, පුරුෂ භේදය',
        '6. [1 වන පොත] ආඛ්‍යාතය හා වාක්‍ය රීති (කර්තෘකාරක හා කර්මකාරක වාක්‍ය විග්‍රහය)',
        '7. [1 වන පොත] සමාස පද (තත්පුරුෂ, කර්මධාරය, ද්වන්ද, බහුව්‍රීහි සමාස)',
        '8. [1 වන පොත] විරාම ලක්ෂණ භාවිතය හා නිවැරදි යෙදුම්',
        '9. [1 වන පොත] රචනා හා ලේඛන කලාව (නිර්මාණාත්මක රචනා, විභාග වාර්තා හා ලිපි)',
        '10. [1 වන පොත] සාරාංශකරණය හා අවබෝධය (Comprehension & Summary Skills)',
        // 2 වන පොත: සිංහල සාහිත්‍ය සංග්‍රහය (Literature Anthology - Poetry, Prose, Stories, Drama)
        '11. [2 වන පොත: පද්‍ය] තෙරුවන් ගුණ සිරිත (ලෝවැඩ සඟරාව - වීදාගම මෛත්‍රෙය හිමි)',
        '12. [2 වන පොත: පද්‍ය] යශෝධරා දැක්ම (යශෝධරාවත කාව්‍යය)',
        '13. [2 වන පොත: පද්‍ය] දියකෙළි වර්ණනාව (කව්සිළුමිණ මහා කාව්‍යය)',
        '14. [2 වන පොත: පද්‍ය] නිරිඳුගේ ගුණ වැණුම (පැරකුම්බා සිරිත ප්‍රශස්ති කාව්‍යය)',
        '15. [2 වන පොත: පද්‍ය] මහබෝ වැනුම (මුවදෙව්දාවත)',
        '16. [2 වන පොත: පද්‍ය] මවුගුණ ගීතය (නූතන පද්‍ය - පී.බී. අල්විස් පෙරේරා)',
        '17. [2 වන පොත: ගද්‍ය] ධර්මපාල ජාතකය (පන්සිය පනස් ජාතක පොත)',
        '18. [2 වන පොත: ගද්‍ය] ගංගාරෝහණ වර්ණනාව (පූජාවලිය - බුද්ධපුත්‍ර හිමි)',
        '19. [2 වන පොත: ගද්‍ය] ආනන්ද තෙරුන්ගේ පිරිනිවීම (සද්ධර්මරත්නාවලිය - ධර්මසේන හිමි)',
        '20. [2 වන පොත: ගද්‍ය] සිංහල අවුරුදු සිරිත් (මාර්ටින් වික්‍රමසිංහ)',
        '21. [2 වන පොත: කෙටිකතා] ගොළු දරුවා (කෙටිකතාව - කේ. ජයතිලක)',
        '22. [2 වන පොත: කෙටිකතා] මැටි කරත්තය (කෙටිකතාව - ජී.බී. සේනානායක)',
        '23. [2 වන පොත: නවකතා] ගම්පෙරළිය උපුටනය (මාර්ටින් වික්‍රමසිංහ)',
        '24. [2 වන පොත: නාට්‍ය] සිංහබාහු නාට්‍ය උපුටනය (මහාචාර්ය එදිරිවීර සරච්චන්ද්‍ර)',
        '25. [2 වන පොත: නාට්‍ය] මනමේ නාට්‍ය විවරණය (මහාචාර්ය එදිරිවීර සරච්චන්ද්‍ර)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php',
      literatureBookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Building Vocabulary & Word Formation',
        '2. Tenses & Voice (Active and Passive Voice)',
        '3. Direct & Indirect Speech',
        '4. Conditional Sentences (Types 1, 2, 3)',
        '5. Formal & Informal Letter Writing',
        '6. Comprehension & Summary Skills',
        '7. Essay & Report Writing for O/L'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. සිරි සදම් මග - චතුරාර්ය සත්‍යය හා පටිච්චසමුප්පාදය (Four Noble Truths)',
        '2. සම්බුදු සිරිත - බුද්ධත්වයෙන් පසු ජීවිතය (Life of the Buddha)',
        '3. සීල භාවනා හා බෞද්ධ සමාජ දර්ශනය (Buddhist Philosophy & Ethics)',
        '4. ශාසන ඉතිහාසය - සංගායනා හා ධර්මදූත සේවය (Buddhist Councils & Missions)',
        '5. බෞද්ධ සංස්කෘතිය හා පුරාවස්තු (Buddhist Heritage in Sri Lanka)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. තොරතුරු හා සන්නිවේදන තාක්ෂණය පිළිබඳ හැඳින්වීම (Introduction to ICT)',
        '2. දත්ත නිරූපණය හා තාර්කික ද්වාර (Data Representation & Logic Gates)',
        '3. පරිගණක පද්ධතිවල දෘඩාංග සංරචක (Computer Hardware Architecture)',
        '4. මෙහෙයුම් පද්ධති (Operating Systems)',
        '5. වදන් සැකසුම් මෘදුකාංග (Word Processing Masterclass)',
        '6. පැතුරුම්පත් මෘදුකාංග (Spreadsheet Formulas & Analysis)',
        '7. දත්ත සමුදාය කළමනාකරණය - Access (Database Management Intro)',
        '8. වෙබ් අඩවි නිර්මාණය - HTML & CSS (Web Design with HTML/CSS)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    commerce: {
      units: [
        '1. ව්‍යාපාර පසුබිම හා පරිසරය (Business Environment)',
        '2. ව්‍යාපාර සංවිධාන වර්ග (Types of Business Organizations)',
        '3. රජය හා ව්‍යාපාර (Government & Business)',
        '4. බැංකු හා මූල්‍ය ආයතන (Banking & Financial Institutions)',
        '5. රක්ෂණය හා ප්‍රවාහනය (Insurance & Transportation)',
        '6. ගිණුම්කරණ සමීකරණය (The Accounting Equation)',
        '7. ප්‍රාථමික පොත් හා ලෙජරය (Books of Prime Entry & Ledger)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. පෘථිවියේ ස්වභාවය හා හැඩය (The Earth & Planetary System)',
        '2. සිතියම් කියවීම හා පරිමාණය (Map Reading & Topographical Maps)',
        '3. කාලගුණය හා දේශගුණය (Weather, Climate & Monsoons)',
        '4. ශ්‍රී ලංකාවේ භූ විෂමතාව (Physical Relief of Sri Lanka)',
        '5. ජනාවාස හා සංවර්ධනය (Settlements & Development)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. යහපැවැත්ම හා නිරෝගී දිවිය (Physical Wellbeing & Healthy Living)',
        '2. ආහාර හා පෝෂණය (Nutrition, Diet & Balanced Meals)',
        '3. බෝවන හා බෝනොවන රෝග (Communicable & Non-communicable Diseases)',
        '4. ප්‍රථමාධාර හා ආරක්ෂාව (First Aid & Safety Measures)',
        '5. ක්‍රීඩා හා ශාරීරික යෝග්‍යතාව (Sports, Athletics & Fitness)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. නාද ප්‍රභේද, සප්තකය හා ස්වර මාලාව (Pitch, Octaves & Swara System)',
        '2. රාග න්‍යාය - බිලාවල්, කල්‍යාණ, ඛමාජ්, කාෆි (Raga Concepts & Aroha/Avroha)',
        '3. තාල හා මාත්‍රා - තීන්තාලය, දාද්රා, කේහර්වා, රූපක් (Taals, Matras & Laya)',
        '4. ශ්‍රී ලාංකේය ජන සංගීතය හා නාඩගම්/නූර්ති ගී (Sri Lankan Folk Songs & Nadagam)',
        '5. සංගීත භාණ්ඩ වර්ගීකරණය - තත, සුසිර, ඝන, අවනද්ධ (Classical & Folk Instruments)',
        '6. ස්වර ලිපි ක්‍රම හා අංකන විධි (Notation Systems & Sight Reading)',
        '7. හඬ පුහුණුව හා ආලෝචන විධි (Voice Culture & Vocal Exercises)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. නාද ප්‍රභේද, සප්තකය හා ස්වර මාලාව (Pitch, Octaves & Swara System)',
        '2. රාග න්‍යාය - බිලාවල්, කල්‍යාණ, ඛමාජ්, කාෆි (Raga Concepts & Aroha/Avroha)',
        '3. තාල හා මාත්‍රා - තීන්තාලය, දාද්රා, කේහර්වා, රූපක් (Taals, Matras & Laya)',
        '4. ශ්‍රී ලාංකේය ජන සංගීතය හා නාඩගම්/නූර්ති ගී (Sri Lankan Folk Songs & Nadagam)',
        '5. සංගීත භාණ්ඩ වර්ගීකරණය - තත, සුසිර, ඝන, අවනද්ධ (Classical & Folk Instruments)',
        '6. ස්වර ලිපි ක්‍රම හා අංකන විධි (Notation Systems & Sight Reading)',
        '7. හඬ පුහුණුව හා ආලෝචන විධි (Voice Culture & Vocal Exercises)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. රේඛා, වර්ණ, හැඩතල හා සංයුති මූලධර්ම (Elements & Principles of Art)',
        '2. මානව රූප ඇඳීම හා සමානුපාතික රීති (Human Figure Drawing & Proportion)',
        '3. ස්වභාවික හා දෘශ්‍ය පරිසර චිත්‍ර (Landscape, Perspective & Shading)',
        '4. ශ්‍රී ලංකාවේ බිතුසිතුවම් සම්ප්‍රදායන් (සීගිරිය, පොළොන්නරුව, නුවර යුගය)',
        '5. ලෝක ප්‍රකට කලා ශෛලීන් හා යුරෝපීය පුනරුදය (Renaissance & European Art)',
        '6. සාම්ප්‍රදායික මෝස්තර නිර්මාණ හා සායම් භාවිතය (Traditional Motifs & Color Theory)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. රේඛා, වර්ණ, හැඩතල හා සංයුති මූලධර්ම (Elements & Principles of Art)',
        '2. මානව රූප ඇඳීම හා සමානුපාතික රීති (Human Figure Drawing & Proportion)',
        '3. ස්වභාවික හා දෘශ්‍ය පරිසර චිත්‍ර (Landscape, Perspective & Shading)',
        '4. ශ්‍රී ලංකාවේ බිතුසිතුවම් සම්ප්‍රදායන් (සීගිරිය, පොළොන්නරුව, නුවර යුගය)',
        '5. ලෝක ප්‍රකට කලා ශෛලීන් හා යුරෝපීය පුනරුදය (Renaissance & European Art)',
        '6. සාම්ප්‍රදායික මෝස්තර නිර්මාණ හා සායම් භාවිතය (Traditional Motifs & Color Theory)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. ත්‍රිවිධ දේශීය නර්තන සම්ප්‍රදායන් (උඩරට, පහතරට, සබරගමු)',
        '2. පා සරඹ හා ගොඩ සරඹ මූලික අභ්‍යාස (Basic Dance Steps & Postures)',
        '3. වන්නම් 18 සහ එහි නාද මාලාවන් (18 Wannam, Rhythms & Meaning)',
        '4. සාම්ප්‍රදායික නර්තන ඇඳුම් කට්ටලය හා වෙස් මංගල්‍යය (Ves Traditions)',
        '5. දේශීය බෙර වාදන ශිල්පය හා තාල රූප (Geta Bera, Yak Bera & Rhythms)',
        '6. ශාන්තිකර්ම හා කෝලම් සම්ප්‍රදාය (Ritual Healing, Masks & Kolam)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. ත්‍රිවිධ දේශීය නර්තන සම්ප්‍රදායන් (උඩරට, පහතරට, සබරගමු)',
        '2. පා සරඹ හා ගොඩ සරඹ මූලික අභ්‍යාස (Basic Dance Steps & Postures)',
        '3. වන්නම් 18 සහ එහි නාද මාලාවන් (18 Wannam, Rhythms & Meaning)',
        '4. සාම්ප්‍රදායික නර්තන ඇඳුම් කට්ටලය හා වෙස් මංගල්‍යය (Ves Traditions)',
        '5. දේශීය බෙර වාදන ශිල්පය හා තාල රූප (Geta Bera, Yak Bera & Rhythms)',
        '6. ශාන්තිකර්ම හා කෝලම් සම්ප්‍රදාය (Ritual Healing, Masks & Kolam)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. රංගනය හා චරිත නිරූපණ මූලධර්ම (Acting & Characterization)',
        '2. කටහඬ හා උච්චාරණ අභ්‍යාස (Voice, Diction & Projection)',
        '3. ශ්‍රී ලාංකේය සාම්ප්‍රදායික නාට්‍ය (කෝලම්, සොකරි, නාඩගම්)',
        '4. නූතන වේදිකා නාට්‍ය ඉතිහාසය (මනමේ, සිංහබාහු, මහාචාර්ය සරච්චන්ද්‍ර යුගය)',
        '5. පිටපත් රචනය, ආලෝකකරණය හා පසුතල නිර්මාණය (Playwriting, Lighting & Stagecraft)',
        '6. ග්‍රීක හා ලෝක නාට්‍ය කලාවේ ප්‍රවණතා (Greek Theatre & World Drama)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. ප්‍රජාතන්ත්‍රවාදී පාලන ක්‍රමය හා ආණ්ඩුක්‍රම ව්‍යවස්ථාව (Democratic Governance)',
        '2. පුරවැසි අයිතිවාසිකම්, නිදහස හා යුතුකම් (Rights & Civic Responsibilities)',
        '3. ආණ්ඩුවේ ප්‍රධාන අවයව - ව්‍යවස්ථාදායකය, විධායකය, අධිකරණය',
        '4. නීතියේ ආධිපත්‍යය හා අධිකරණ ස්වාධීනත්වය (Rule of Law & Judiciary)',
        '5. බහුසංස්කෘතික සමාජයක සහජීවනය හා සංහිඳියාව (Harmony & Multiculturalism)',
        '6. ජාත්‍යන්තර සබඳතා හා එක්සත් ජාතීන්ගේ සංවිධානය (UN & International Relations)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    agriculture: {
      units: [
        '1. පාංශු සංරක්ෂණය හා භෞතික රසායනික ගුණ (Soil Conservation & Properties)',
        '2. ශාක පෝෂක හා කාබනික/අකාබනික පොහොර (Plant Nutrition & Fertilizers)',
        '3. බෝග වගා තාක්ෂණය හා බීජ තවාන් පාලනය (Crop Management & Nurseries)',
        '4. කෘමි හා රෝග ඒකාබද්ධ මර්දනය (Integrated Pest & Disease Management)',
        '5. සත්ව පාලනය - කිරි ගව හා කුකුළු පාලනය (Animal Husbandry & Dairy/Poultry)',
        '6. අස්වනු නෙලීම හා පසු අස්වනු තාක්ෂණය (Post-harvest Technology)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    media: {
      units: [
        '1. සන්නිවේදන ක්‍රියාවලිය හා මූලික ආකෘති (Communication Process & Models)',
        '2. ජනමාධ්‍ය ප්‍රභේද - මුද්‍රිත, ගුවන්විදුලි, රූපවාහිනී (Mass Media Formats)',
        '3. පුවත්පත් කලාව හා ප්‍රවෘත්ති වාර්තාකරණය (Journalism & News Writing)',
        '4. මාධ්‍ය ආචාරධර්ම හා ප්‍රකාශන නිදහස (Media Ethics & Freedom of Expression)',
        '5. වෙළඳ දැන්වීම්කරණය හා මහජන සම්බන්ධතා (Advertising & Public Relations)',
        '6. සමාජ මාධ්‍ය, අන්තර්ජාලය හා ඩිජිටල් මාධ්‍ය සාක්ෂරතාව (Social & Digital Media)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 11': {
    science: {
      units: [
        '1. ජීවීන්ගේ සන්තතිය හා ප්‍රවේණිය (Genetics, DNA & Inheritance)',
        '2. ජෛව පරිණාමය හා අනුවර්තන (Biological Evolution & Adaptations)',
        '3. සතුන්ගේ වර්ධනය හා සංවර්ධනය (Reproduction & Development)',
        '4. පදාර්ථයේ ව්‍යුහය හා රසායනික සමතුලිතතාවය (Equilibrium & Reactions)',
        '5. රසායනික ප්‍රතික්‍රියා ආශ්‍රිත ගණනය කිරීම් - මවුලය (Mole Concept & Calculations)',
        '6. අම්ල, භෂ්ම හා ලවණ (Acids, Bases & pH Calculations)',
        '7. විද්‍යුත් රසායනය හා විද්‍යුත් විච්ඡේදනය (Electrochemistry & Electrolysis)',
        '8. ලෝහ විද්‍යාව (Extraction of Metals & Extraction of Iron)',
        '9. ධාරා විද්‍යුතය හා විද්‍යුත් චුම්භක ප්‍රේරණය (Current Electricity & Induction)',
        '10. ඉලෙක්ට්‍රොනික් විද්‍යාව (Electronics, Diodes & Transistors)',
        '11. තාපය හා තාප ධාරිතාව (Heat, Specific Heat & Latent Heat)',
        '12. තරංග චලිතය, ශබ්දය හා දෘෂ්ටිය (Wave Motion, Sound & Vision)',
        '13. විකිරණශීලතාවය හා න්‍යෂ්ටික ශක්තිය (Radioactivity & Nuclear Energy)',
        '14. ජෛවගෝල කළමනාකරණය හා පරිසර ආරක්ෂණය (Environmental Conservation)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. තාත්වික සංඛ්‍යා හා ලඝුගණක (Real Numbers & Logarithms Masterclass)',
        '2. වර්ගජ සමීකරණ හා ප්‍රස්ථාර (Quadratic Equations & Parabolic Graphs)',
        '3. වීජීය අසමානතා (Algebraic Inequalities)',
        '4. සූත්‍ර හා විෂය කිරීම (Formulae & Subject of Formula)',
        '5. න්‍යාස (Matrices & Operations)',
        '6. ත්‍රිකෝණවල සමානරූපතාව (Similarity of Triangles)',
        '7. කවයක ජ්‍යාමිතිය හා කෝණ ප්‍රමේය (Circle Theorems & Angles)',
        '8. කවයක ස්පර්ශක ප්‍රමේය (Tangents to a Circle)',
        '9. පරිමාව හා වර්ගඵලය - ගෝල, කේතු, ප්‍රිස්ම (Spheres, Cones & Cylinders)',
        '10. ත්‍රිකෝණමිතියේ උන්නතාංශ හා අවනතාංශ (Trig: Angles of Elevation & Depression)',
        '11. සංඛ්‍යානය - මාධ්‍යය, මධ්‍යස්ථය හා මාතය (Grouped Data Mean & Ogives)',
        '12. සම්භාවිතා රුක් සටහන් (Probability & Tree Diagrams for O/L)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    history: {
      units: [
        '1. දෙවන ලෝක යුද්ධය හා ශ්‍රී ලංකාව (World War II & Sri Lanka)',
        '2. නිදහස් ශ්‍රී ලංකාව බිහිවීම (Independence of 1948)',
        '3. 1972 සහ 1978 ආණ්ඩුක්‍රම ව්‍යවස්ථා (1972 & 1978 Constitutions)',
        '4. නූතන ශ්‍රී ලංකාවේ සමාජ ආර්ථික සංවර්ධනය (Post-Independence Development)',
        '5. එක්සත් ජාතීන්ගේ සංවිධානය හා ජාත්‍යන්තරය (The UN & International Relations)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        // 1 වන පොත: සිංහල භාෂාව හා සාහිත්‍යය (Language & Grammar Textbook)
        '1. [1 වන පොත] ප්‍රකෘති හා ප්‍රත්‍ය (නාම ප්‍රකෘති, ධාතු ප්‍රකෘති හඳුනාගැනීම)',
        '2. [1 වන පොත] කෘදන්ත හා තද්ධිත (නාමික කෘදන්ත, ආඛ්‍යාත කෘදන්ත හා තද්ධිත පද)',
        '3. [1 වන පොත] විභක්ති හා කාරක රීති (නාම විභක්ති 9 හා වාක්‍ය සම්බන්ධතාව)',
        '4. [1 වන පොත] සංකීර්ණ වාක්‍ය රටා හා මිශ්‍ර වාක්‍ය (වාක්‍ය විග්‍රහය හා පරිවර්තනය)',
        '5. [1 වන පොත] උපසර්ග හා නිපාත පද නිරවද්‍ය භාවිතය හා අර්ථය',
        '6. [1 වන පොත] භාෂාවේ ලිඛිත ව්‍යවහාරය හා කථන ව්‍යවහාරය සංසන්දනය',
        '7. [1 වන පොත] උසස් රචනා ලේඛනය, සම්මුඛ සාකච්ඡා හා විභාග වාර්තාකරණය',
        '8. [1 වන පොත] භාෂා ඓතිහාසික පසුබිම, පරිණාමය හා සෙල්ලිපි හඳුනාගැනීම',
        // 2 වන පොත: සිංහල සාහිත්‍ය සංග්‍රහය (Literature Anthology - Poetry, Prose, Stories, Drama)
        '9. [2 වන පොත: පද්‍ය] සැළලිහිණි සන්දේශය (තොටගමුවේ ශ්‍රී රාහුල හිමි - සැළලිහිණියාට අවවාද)',
        '10. [2 වන පොත: පද්‍ය] ගුත්තිල කාව්‍යය (ගුත්තිල මූසිල වාදය - වෑත්තෑවේ හිමි)',
        '11. [2 වන පොත: පද්‍ය] කුසදා කව (කව්මිණි කොඬොල - අලගියවන්න මුකවෙටි)',
        '12. [2 වන පොත: පද්‍ය] සුභාෂිතය (අලගියවන්න මුකවෙටි)',
        '13. [2 වන පොත: පද්‍ය] ගිරා සන්දේශය (කෝට්ටේ යුගයේ සන්දේශ කාව්‍ය විචාරය)',
        '14. [2 වන පොත: පද්‍ය] සිරිමල් (නූතන පද්‍ය - කේයස් / සාගර පලන්සූරිය)',
        '15. [2 වන පොත: පද්‍ය] අයියනායක (නූතන පද්‍ය - විමලරත්න කුමාරගම)',
        '16. [2 වන පොත: පද්‍ය] මගේ දේශය (ආනන්ද රාජකරුණා / මහගම සේකර)',
        '17. [2 වන පොත: ගද්‍ය] උම්මග්ග ජාතකය (මහා උමංදාව - සිරිවඩ්ඪක හා අමරාදේවි පුවත)',
        '18. [2 වන පොත: ගද්‍ය] මනෝහරී කතා වස්තුව (සද්ධර්මාලංකාරය)',
        '19. [2 වන පොත: ගද්‍ය] බුදුරදුන් කිඹුල්වත්පුර වැඩීම (අමාවතුර - ගුරුළුගෝමී)',
        '20. [2 වන පොත: ගද්‍ය] සාලිය අශෝකමාලා පුවත (සද්ධර්මරත්නාවලිය / ථූපවංසය)',
        '21. [2 වන පොත: කෙටිකතා] මරණය (කෙටිකතාව - ජී.බී. සේනානායක)',
        '22. [2 වන පොත: කෙටිකතා] වැස්ස (කෙටිකතාව - මහාචාර්ය ගුණදාස අමරසේකර)',
        '23. [2 වන පොත: නවකතා] විරාගය කෘති විමර්ශනය (මාර්ටින් වික්‍රමසිංහ)',
        '24. [2 වන පොත: නාට්‍ය] කුවේණි නාට්‍යය (හෙන්රි ජයසේන)',
        '25. [2 වන පොත: නාට්‍ය] මූදු පුත්තු නාට්‍යය (ගුණසේන ගලප්පත්ති)',
        '26. [2 වන පොත: නාට්‍ය] හුණුවටයේ කතාව (හෙන්රි ජයසේන)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php',
      literatureBookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    english: {
      units: [
        '1. Mastering Complex Sentence Structures (Clauses & Connectives)',
        '2. Passive Voice Mastery for Formal Contexts',
        '3. Reported Speech with Questions & Imperatives',
        '4. Graphs & Charts Interpretation Writing (O/L Paper II Essential)',
        '5. Formal Letter Writing to Editors & Officials',
        '6. Creative & Narrative Composition Techniques',
        '7. Literature: Poetry & Prose Analysis'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    buddhism: {
      units: [
        '1. බුද්ධ ධර්මය හා නූතන විද්‍යාව (Buddhism & Modern Science)',
        '2. අභිධර්ම මූලික කරුණු - සිත්, චෛතසික, රූප, නිබ්බාන (Abhidhamma Basics)',
        '3. ආර්ථික දර්ශනය - සිඟාලෝවාද, ව්‍යග්ඝපජ්ජ සූත්‍ර (Buddhist Economic Philosophy)',
        '4. බෞද්ධ සාමයික හා පාරිසරික ආචාරධර්ම (Buddhist Peace & Ecology)',
        '5. සාහිත්‍ය මූලාශ්‍ර හා ලක්දිව බුදුසසුනේ පරිණාමය (Chronicles of the Sasana)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. ක්‍රමලේඛනය - Python මූලික (Programming with Python)',
        '2. පාලන ව්‍යුහ හා ශ්‍රිත (Control Structures, Loops & Functions)',
        '3. දත්ත සමුදාය හා SQL විමසුම් (Databases & SQL Queries)',
        '4. වෙබ් නිර්මාණය - CSS & JavaScript (Modern Web Development)',
        '5. බහුමාධ්‍ය තාක්ෂණය (Multimedia Concepts & Design)',
        '6. තොරතුරු පද්ධති සංවර්ධන ජීවන චක්‍රය - SDLC (Systems Development Life Cycle)',
        '7. තොරතුරු ආරක්ෂාව හා සයිබර් නීතිය (Cyber Security & Intellectual Property)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    commerce: {
      units: [
        '1. වෙළඳාම හා වාණිජ්‍ය සේවා (Domestic & International Trade)',
        '2. පාරිභෝගික ආරක්ෂාව හා අයිතිවාසිකම් (Consumer Protection)',
        '3. බැංකු සැසඳුම් ප්‍රකාශනය (Bank Reconciliation Statement)',
        '4. අවසාන ගිණුම් පිළියෙළ කිරීම (Preparation of Final Accounts)',
        '5. ලාභාල ගිණුම හා මූල්‍ය තත්ත්ව ප්‍රකාශනය (Income Statement & Balance Sheet)',
        '6. නිෂ්පාදන ගිණුම් හා වැරදි නිවැරදි කිරීම (Manufacturing Accounts & Correction of Errors)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    geography: {
      units: [
        '1. භූගෝලීය තොරතුරු පද්ධති - GIS (Introduction to GIS)',
        '2. ලෝක ජනගහනය හා ප්‍රවණතා (World Population & Trends)',
        '3. ගෝලීය පාරිසරික ගැටලු (Global Warming & Climate Change)',
        '4. ශ්‍රී ලංකාවේ කෘෂිකාර්මික හා කාර්මික සංවර්ධනය (Development in Sri Lanka)',
        '5. තිරසාර සංවර්ධනය හා අනාගතය (Sustainable Development Goals)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    health: {
      units: [
        '1. මානසික සෞඛ්‍යය හා ආතති කළමනාකරණය (Mental Health & Stress Management)',
        '2. මත්ද්‍රව්‍ය හා දුම්කොළ භාවිතයේ ආදීනව (Substance Abuse Prevention)',
        '3. ප්‍රජනක සෞඛ්‍යය හා ලිංගික අධ්‍යාපනය (Reproductive Health)',
        '4. ප්‍රජා සෞඛ්‍යය හා සනීපාරක්ෂාව (Community Health & Sanitation)',
        '5. ක්‍රීඩා නීතිරීති හා ක්‍රීඩාශීලිත්වය (Sports Rules & Sportsmanship)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music: {
      units: [
        '1. රාග ප්‍රවීණතාව - යමන්, භූපාලි, අසාවරී, භෛරව් (Advanced Ragas & Swara)',
        '2. සංකීර්ණ තාල රූප හා ලයਕਾਰੀ (Jhaptal, Rupak & Layakari)',
        '3. නූර්ති හා නාඩගම් සංගීත ලක්ෂණ (Theatrical Music Traditions)',
        '4. ලෝක සංගීතය හා බටහිර ස්වර ලිපි හැඳින්වීම (Western Staff Notation)',
        '5. සංගීත රසවින්දනය හා ගීත විචාරය (Aesthetic Appreciation of Songs)',
        '6. තූර්ය වාදන හා වාද්‍ය වෘන්ද සංකල්ප (Orchestration & Ensemble)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    music_ol: {
      units: [
        '1. රාග ප්‍රවීණතාව - යමන්, භූපාලි, අසාවරී, භෛරව් (Advanced Ragas & Swara)',
        '2. සංකීර්ණ තාල රූප හා ලයਕਾਰੀ (Jhaptal, Rupak & Layakari)',
        '3. නූර්ති හා නාඩගම් සංගීත ලක්ෂණ (Theatrical Music Traditions)',
        '4. ලෝක සංගීතය හා බටහිර ස්වර ලිපි හැඳින්වීම (Western Staff Notation)',
        '5. සංගීත රසවින්දනය හා ගීත විචාරය (Aesthetic Appreciation of Songs)',
        '6. තූර්ය වාදන හා වාද්‍ය වෘන්ද සංකල්ප (Orchestration & Ensemble)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art: {
      units: [
        '1. නූතන කලාවේ ප්‍රවණතා හා ඝනවාදය (Cubism, Expressionism & Abstract Art)',
        '2. නිර්මාණාත්මක සංයුති නිර්මාණය හා විභාග සිතුවම් (O/L Composition Techniques)',
        '3. ලංකාවේ මූර්ති කලාව හා කැටයම් (Sandakada Pahana, Murti & Wood Carving)',
        '4. වාණිජ කලාව හා මුද්‍රණ ශිල්පය (Poster Art, Typography & Printmaking)',
        '5. කලා විචාරය හා කලාකෘති අගැයීම (Art Criticism & Appreciation)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    art_ol: {
      units: [
        '1. නූතන කලාවේ ප්‍රවණතා හා ඝනවාදය (Cubism, Expressionism & Abstract Art)',
        '2. නිර්මාණාත්මක සංයුති නිර්මාණය හා විභාග සිතුවම් (O/L Composition Techniques)',
        '3. ලංකාවේ මූර්ති කලාව හා කැටයම් (Sandakada Pahana, Murti & Wood Carving)',
        '4. වාණිජ කලාව හා මුද්‍රණ ශිල්පය (Poster Art, Typography & Printmaking)',
        '5. කලා විචාරය හා කලාකෘති අගැයීම (Art Criticism & Appreciation)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing: {
      units: [
        '1. උසස් වන්නම් ගායනා හා නර්තන විවරණය (Advanced Wannam Performances)',
        '2. සබරගමු හා පහතරට ශාන්තිකර්ම නර්තන (Sabaragamu & Low-country Rituals)',
        '3. නර්තන රංග වින්‍යාසය හා නූතන මුද්‍රා නාට්‍ය (Choreography & Ballet)',
        '4. බෙර වාදන ශිල්පයේ උසස් තාල හා කස්තිරම් (Drum Rudiments & Kasthiram)',
        '5. නර්තන ඉතිහාසය හා සාහිත්‍ය මූලාශ්‍ර (Historical Literary Sources of Dance)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    dancing_ol: {
      units: [
        '1. උසස් වන්නම් ගායනා හා නර්තන විවරණය (Advanced Wannam Performances)',
        '2. සබරගමු හා පහතරට ශාන්තිකර්ම නර්තන (Sabaragamu & Low-country Rituals)',
        '3. නර්තන රංග වින්‍යාසය හා නූතන මුද්‍රා නාට්‍ය (Choreography & Ballet)',
        '4. බෙර වාදන ශිල්පයේ උසස් තාල හා කස්තිරම් (Drum Rudiments & Kasthiram)',
        '5. නර්තන ඉතිහාසය හා සාහිත්‍ය මූලාශ්‍ර (Historical Literary Sources of Dance)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    drama: {
      units: [
        '1. රංග ශෛලීන් - තාත්වික හා නාට්‍යමය රංගනය (Realistic vs Stylized Acting)',
        '2. නාට්‍ය නිෂ්පාදනය හා අධ්‍යක්ෂණ ක්‍රියාවලිය (Play Production & Directing)',
        '3. නාට්‍ය පිටපත් විචාරය - මනමේ, සිංහබාහු, හුණුවටය (Script Analysis)',
        '4. අංගරචනය, රංග වස්ත්‍ර හා රංග භාණ්ඩ (Costume, Makeup & Properties)',
        '5. රංග ශාලා වාස්තුවිද්‍යාව හා ඉතිහාසය (Theatre Architecture & Evolution)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    citizen: {
      units: [
        '1. ආණ්ඩුක්‍රම ව්‍යවස්ථාව හා මැතිවරණ ක්‍රමය (Constitution & Electoral System)',
        '2. අධිකරණ පද්ධතිය හා මූලික අයිතිවාසිකම් නඩු (Fundamental Rights & Courts)',
        '3. රාජ්‍ය ප්‍රතිපත්ති හා යහපාලනය (Good Governance & Public Policy)',
        '4. ජාත්‍යන්තර මානව හිමිකම් හා ප්‍රඥප්ති (International Human Rights Charters)',
        '5. පරිසර සංරක්ෂණය හා තිරසාර පුරවැසිභාවය (Environmental Citizenship)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    agriculture: {
      units: [
        '1. ආරක්ෂිත ගෘහ තුළ බෝග වගාව (Poly-tunnel & Greenhouse Farming)',
        '2. ජල සම්පාදනය හා ක්ෂුද්‍ර ජල තාක්ෂණය (Drip & Sprinkler Irrigation)',
        '3. කාබනික ගොවිතැන හා පරිසර හිතකාමී කෘෂිකර්මය (Organic Farming)',
        '4. කෘෂි ව්‍යවසායකත්වය හා අලෙවිකරණය (Agri-business & Marketing)',
        '5. ජෛව තාක්ෂණය හා කෘෂිකාර්මික අනාගතය (Biotechnology in Agriculture)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    media: {
      units: [
        '1. මාධ්‍ය සාක්ෂරතාව හා විවේචනාත්මක චින්තනය (Media Literacy & Critical Thinking)',
        '2. රූපවාහිනී හා චිත්‍රපට නිෂ්පාදන මූලධර්ම (TV & Film Production Fundamentals)',
        '3. ඩිජිටල් ජනමාධ්‍ය හා සමාජීය බලපෑම (Impact of Digital Media on Society)',
        '4. විමර්ශනාත්මක පුවත්පත් කලාව (Investigative Journalism)',
        '5. ප්‍රචාරණය හා මහජන මතය හැසිරවීම (Propaganda & Public Opinion)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 12': {
    science: {
      units: [
        '1. ඒකක හා මාන (Units & Dimensions - Physics)',
        '2. දෛශික හා යාන්ත්‍ර විද්‍යාව (Vectors & Mechanics)',
        '3. පදාර්ථයේ ගුණ - දුස්ස්‍රාවිතාව, පෘෂ්ඨික ආතතිය (Properties of Matter)',
        '4. පරමාණුක ව්‍යුහය හා ආවර්තිතා නීතිය (Atomic Structure - Chemistry)',
        '5. රසායනික බන්ධන හා අණුක ව්‍යුහය (Chemical Bonding & VSEPR)',
        '6. වායු හා පදාර්ථයේ වායුමය අවස්ථාව (Gaseous State & Gas Laws)',
        '7. ජීව විද්‍යාව හැඳින්වීම හා සෛලීය ජීව විද්‍යාව (Cell Biology - Biology)',
        '8. ශාක හා සත්ත්ව පටක (Plant & Animal Tissues)',
        '9. ජීවීන්ගේ විවිධත්වය (Diversity of Organisms & Taxonomy)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. තාත්වික සංඛ්‍යා හා වීජ ගණිතය (Real Numbers & Algebra - Combined Maths)',
        '2. බහුපද හා ශේෂ ප්‍රමේයය (Polynomials & Remainder Theorem)',
        '3. වර්ගජ සමීකරණ හා ශ්‍රිත (Quadratic Equations & Functions)',
        '4. අසමානතා හා මාපාංක (Inequalities & Modulus)',
        '5. ත්‍රිකෝණමිතිය (Trigonometry - Identities & Equations)',
        '6. ඛණ්ඩාංක ජ්‍යාමිතිය - සරල රේඛාව (Straight Line Analytical Geometry)',
        '7. සීමා හා අවකලනය (Limits & Differentiation Intro)',
        '8. සරල රේඛීය චලිතය (Linear Motion - Applied Maths)',
        '9. බල සමතුලිතතාව (Equilibrium of Forces)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. තොරතුරු පද්ධති පිළිබඳ සංකල්ප (Concepts of ICT)',
        '2. දත්ත නිරූපණය හා තාර්කික පරිපථ (Data Representation & Logic Circuits)',
        '3. මතකය හා පරිගණක ගෘහ නිර්මාණ ශිල්පය (Computer Architecture & von Neumann)',
        '4. මෙහෙයුම් පද්ධති හා ක්‍රියාවලි කළමනාකරණය (Operating Systems & Processes)',
        '5. දත්ත සන්නිවේදනය හා ජාලකරණය (Data Communication & Networks - OSI)',
        '6. ක්‍රමලේඛනය - Python උසස් (Advanced Python Programming)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. සිංහල භාෂාවේ ප්‍රභවය හා ඓතිහාසික පරිණාමය',
        '2. අක්ෂර මාලාවේ විකාශය හා සෙල්ලිපි සිංහල (බ්‍රාහ්මී, මධ්‍යතන, නූතන)',
        '3. ධ්වනි විද්‍යාව හා උච්චාරණ ස්ථාන (Phonetics)',
        '4. නාම හා ක්‍රියා රූප විද්‍යාව (Morphology)',
        '5. වාක්‍ය විචාරය හා වාක්‍ය රටා (Syntax)',
        '6. [සාහිත්‍යය] අනුරාධපුර හා පොළොන්නරු යුගයේ සාහිත්‍ය ප්‍රවණතා',
        '7. [සාහිත්‍යය] මුවදෙව්දාවත හා සසදාවත විමර්ශනය',
        '8. [සාහිත්‍යය] අමාවතුර හා ධර්මප්‍රදීපිකාව (ගුරුළුගෝමී)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  },
  'Grade 13': {
    science: {
      units: [
        '1. තාප භෞතික විද්‍යාව (Thermal Physics)',
        '2. තරංග හා ප්‍රකාශ විද්‍යාව (Waves & Optics)',
        '3. විද්‍යුත් හා චුම්භක ක්ෂේත්‍ර (Electric & Magnetic Fields)',
        '4. ඉලෙක්ට්‍රොනික්ස් හා නවීන භෞතික විද්‍යාව (Electronics & Modern Physics)',
        '5. කාබනික රසායනය (Organic Chemistry & Mechanisms)',
        '6. චාලක රසායනය හා රසායනික සමතුලිතතාව (Kinetics & Equilibrium)',
        '7. අකාබනික රසායනය - s, p, d ගොනුව (Inorganic Chemistry: s, p, d Blocks)',
        '8. මානව ශරීර විද්‍යාව හා ස්නායු පද්ධතිය (Human Physiology & Neurobiology)',
        '9. ජාන විද්‍යාව හා අණුක ජීව විද්‍යාව (Genetics & Molecular Biology)',
        '10. පරිසර විද්‍යාව හා ජෛව තාක්ෂණය (Ecology & Biotechnology)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    maths: {
      units: [
        '1. අවකලනය හා යෙදීම් (Differentiation & Maxima/Minima)',
        '2. අනුකලනය හා වර්ගඵල (Integration & Applications)',
        '3. ඛණ්ඩාංක ජ්‍යාමිතිය - වෘත්තය (The Circle Analytical Geometry)',
        '4. සංකීර්ණ සංඛ්‍යා (Complex Numbers & Argand Diagrams)',
        '5. සංකරණ හා සංයෝජන (Permutations & Combinations)',
        '6. ද්විපද ප්‍රමේයය (Binomial Theorem)',
        '7. ප්‍රක්ෂිප්ත චලිතය (Projectiles - Applied Maths)',
        '8. චක්‍රාකාර චලිතය හා සරල අනුවර්තී චලිතය (Circular & SHM)',
        '9. සම්භාවිතාව හා සංඛ්‍යානය (Probability & Statistics for A/L)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    ict: {
      units: [
        '1. දත්ත සමුදාය කළමනාකරණ පද්ධති (Database Systems & Relational Normalization)',
        '2. පද්ධති විශ්ලේෂණය හා සැලසුම්කරණය (Systems Analysis & Design - OOAD)',
        '3. වෙබ් යෙදුම් සංවර්ධනය - PHP, SQL, JS (Web Applications)',
        '4. අන්තර්ජාල තාක්ෂණ හා ක්ලවුඩ් (Cloud Computing & IoT)',
        '5. තොරතුරු ආරක්ෂණය හා ගුප්ත ලේඛනය (Information Security & Cryptography)',
        '6. කෘතිම බුද්ධිය හා නවීන ප්‍රවණතා (AI & Modern Computing)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    },
    sinhala: {
      units: [
        '1. සම්භාව්‍ය සිංහල ගද්‍ය හා පද්‍ය විචාර සිද්ධාන්ත',
        '2. කව්සිළුමිණ මහා කාව්‍ය විචාරය',
        '3. සද්ධර්මරත්නාවලිය හා පූජාවලිය සාහිත්‍යමය අගය',
        '4. කෝට්ටේ යුගයේ සන්දේශ කාව්‍ය විමර්ශනය (සැළලිහිණිය, හංසය, ගිරා)',
        '5. නූතන සිංහල නවකතාවේ විකාශය (මාර්ටින් වික්‍රමසිංහ, කේ. ජයතිලක, ගුණදාස අමරසේකර)',
        '6. නූතන සිංහල කෙටිකතාව හා පද්‍ය කාව්‍ය විචාරය',
        '7. නූතන සිංහල නාට්‍ය කලාව (මනමේ, සිංහබාහු, මූදු පුත්තු, හුණුවටය)'
      ],
      textbookUrl: 'http://www.edupub.gov.lk/BooksDownload.php'
    }
  }
};

export const SUGGESTIONS = [
  "පහේ ශිෂ්‍යත්වයට වැදගත් ගණිත ගැටළු කිහිපයක් කියන්න?",
  "O/L විද්‍යාව විෂය නිර්දේශයේ ප්‍රභාසංස්ලේෂණය ගැන පැහැදිලි කරන්න.",
  "අනුරාධපුර යුගයේ රජවරු ගැන කෙටියෙන් කියන්න.",
  "Explain the difference between RAM and ROM in Sinhala.",
  "How to write a formal letter in English for A/L syllabus?"
];

/**
 * Accurately retrieves the official syllabus for a subject without ever mixing up subjects.
 * Never falls back to science if a subject isn't found.
 */
export const getSyllabusForSubject = (
  grade: string, 
  subjectId: string
): { units: string[]; textbookUrl?: string; literatureBookUrl?: string } | null => {
  if (!subjectId) return null;
  const normalizedId = subjectId.replace('_ol', '');
  
  // 1. Direct grade check - if the grade exists in syllabus data, ONLY return that grade's units
  const exactGrade = SYLLABUS_DATA[grade];
  if (exactGrade) {
    const directMatch = exactGrade[subjectId] || exactGrade[normalizedId];
    if (directMatch && directMatch.units && directMatch.units.length > 0) {
      return directMatch;
    }
    // If this specific grade does not teach this subject, return null so student is routed directly to Game Zone
    return null;
  }

  // 2. Generic O/L check only if grade was specified as 'O/L' or 'All'
  if (grade === 'O/L' || grade === 'All' || !grade) {
    const g10 = SYLLABUS_DATA['Grade 10'];
    if (g10 && (g10[subjectId] || g10[normalizedId])) {
      return g10[subjectId] || g10[normalizedId];
    }
    const g11 = SYLLABUS_DATA['Grade 11'];
    if (g11 && (g11[subjectId] || g11[normalizedId])) {
      return g11[subjectId] || g11[normalizedId];
    }
  }

  // Strictly return null - NEVER mix up subjects or grades!
  return null;
};
