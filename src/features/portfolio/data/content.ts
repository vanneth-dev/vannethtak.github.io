import { type IconName } from "@/shared/ui/Icon";

export const profile = {
  name: "Vanneth Tak",
  roles: ["Full-Stack Developer", "Freelancer", "Software Engineer"],
  tagline:
    "Dedicated and passionate Software Engineer with a focus on building scalable web applications.",
  location: "Phnom Penh, Cambodia",
  address: "Mean Chay, Phnom Penh, Cambodia",
  phone: "010 296 011",
  phoneHref: "tel:+85510296011",
  email: "vanneth.dev@gmail.com",
  website: "https://vanneth-dev.github.io",
  birthday: "18 July 2003",
  birthYear: 2003,
  birthMonth: 7,
  birthDay: 18,
  degree: "Software Engineering",
  freelance: "Available",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vannethtak/",
    },
    {
      label: "GitHub",
      href: "https://github.com/vanneth-dev",
    },
    {
      label: "Telegram",
      href: "https://t.me/vannethtak",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/vannethtak/",
    },
  ],
};

export const techTicker = [
  "Laravel",
  "Node.js",
  "TypeScript",
  "React",
  "NestJS",
  "Express.js",
  "Angular",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "Bootstrap",
  "Cloud Computing",
  "Git & GitHub",
  "REST API",
  "Docker",
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: IconName;
};

export const stats: Stat[] = [
  {
    value: 1,
    suffix: "",
    label: "Freelance Projects",
    icon: "smile",
  },
  {
    value: 20,
    suffix: "+",
    label: "Projects Completed",
    icon: "journal",
  },
  {
    value: 8,
    suffix: "",
    label: "Hours of Support",
    icon: "headset",
  },
  {
    value: 10,
    suffix: "+",
    label: "Full-Stack Projects",
    icon: "award",
  },
];

export const skills = [
  {
    name: "Laravel",
    level: 80,
  },
  {
    name: "React",
    level: 80,
  },
  {
    name: "Tailwind & Bootstrap",
    level: 80,
  },
  {
    name: "Version Control (Git)",
    level: 80,
  },
  {
    name: "NestJS",
    level: 70,
  },
  {
    name: "Cloud Computing",
    level: 70,
  },
];

export type Interest = {
  name: string;
  color: string;
  icon: IconName;
};

export const interests: Interest[] = [
  {
    name: "Coding",
    color: "#f5b759",
    icon: "code",
  },
  {
    name: "Music",
    color: "#5b8cff",
    icon: "music",
  },
  {
    name: "Travel",
    color: "#f0568c",
    icon: "globe",
  },
  {
    name: "Football",
    color: "#b07cff",
    icon: "ball",
  },
];

export type Project = {
  image: string;
  id: string;
  title: string;
  description: string;
  variant: "table" | "chart" | "enroll" | "rings" | "jobs" | "admin";
  accent: string;
  tags: string[];
  context: string;
};

export const projects: Project[] = [
  {
    id: "tvet-main",
    image: "/images/work-tvet-main.png",
    title: "TVET Main",
    description:
      "TVET MIS — the Ministry of Labour & Vocational Training management and information system.",
    variant: "table",
    accent: "#18d06e",
    tags: ["Angular"],
    context: "Ministry of Labour & Vocational Training",
  },
  {
    id: "tvet-15m",
    image: "/images/work-tvet-15m.png",
    title: "TVET 15M",
    description:
      "កម្មវិធីបណ្តុះបណ្តាលជំនាញវិជ្ជាជីវៈ និងបច្ចេកទេសដល់យុវជនមកពីគ្រួសារក្រីក្រ និងគ្រួសារងាយរងហានិភ័យចំនួន ១,៥លាននាក់",
    variant: "chart",
    accent: "#ffc24b",
    tags: ["Express", "Angular", "MongoDB"],
    context: "Ministry of Labour & Vocational Training",
  },
  {
    id: "tvet-program",
    image: "/images/work-tvet-program.png",
    title: "TVET Program",
    description: "កម្មវិធីបណ្តុះបណ្តាលជំនាញបច្ចេកទេស និងវិជ្ជាជីវៈទូទៅ",
    variant: "enroll",
    accent: "#58a6ff",
    tags: ["Express", "Angular", "MongoDB"],
    context: "Ministry of Labour & Vocational Training",
  },
  {
    id: "tvet-rpl",
    image: "/images/work-tvet-rpl.png",
    title: "TVET RPL",
    description:
      "ប្រព័ន្ធវាយតម្លៃផអែកលើសមត្ថភាព និងការផ្តល់គុណវុឌ្ឍិសម្រាប់កម្ពុជា",
    variant: "rings",
    accent: "#f0568f",
    tags: ["Express", "Angular", "MongoDB"],
    context: "Ministry of Labour & Vocational Training",
  },
  {
    id: "job-portal",
    image: "/images/work-jobseeker.png",
    title: "Job Seeker & Job Provider",
    description: "ប្រព័ន្ធឈ្មោះរកការងារ និង ប្រព័ន្ធរើសកម្លាំងពលកម្ម",
    variant: "jobs",
    accent: "#c07aff",
    tags: ["Laravel", "MySQL"],
    context: "Ministry of Labour & Vocational Training",
  },
  {
    id: "krt-admin",
    image: "/images/work-krt388.png",
    title: "KRT388FUN Admin Dashboard",
    description:
      "Freelance project — KRT388FUN admin dashboard with analytics and user management.",
    variant: "admin",
    accent: "#34d399",
    tags: ["React", "FastAPI", "REST API"],
    context: "Freelance Client",
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  description: string;
  url: string;
};

export const certificates: Certificate[] = [
  {
    id: "js",
    title: "Programming with JavaScript",
    issuer: "Coursera",
    description: "Coursera Programming with JavaScript",
    url: "https://www.coursera.org/account/accomplishments/verify/WTZZ66KB46D5",
  },
  {
    id: "frontend",
    title: "Front-End Development",
    issuer: "Coursera",
    description: "Coursera Front-End Development",
    url: "https://www.coursera.org/account/accomplishments/verify/V24NFUPLKBJW",
  },
  {
    id: "version-control",
    title: "Version Control",
    issuer: "Coursera",
    description: "Coursera Version Control",
    url: "https://www.coursera.org/account/accomplishments/verify/GR6CYPFDAUNY",
  },
];

export type Service = {
  title: string;
  body: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    body: "Build scalable web applications with Laravel, Node.js, React, Angular, Tailwind CSS and Bootstrap.",
    icon: "layers",
  },
  {
    title: "RESTful API Development",
    body: "Design and build RESTful APIs with Laravel, Express.js and NestJS for reliable application integration.",
    icon: "api",
  },
  {
    title: "Backend Development",
    body: "Develop clean and maintainable backend systems using PHP, Laravel, Node.js, Express.js and NestJS.",
    icon: "server",
  },
  {
    title: "Database Design",
    body: "Design and manage MySQL and MongoDB databases for application data, reporting and system growth.",
    icon: "database",
  },
  {
    title: "Cloud & Deployment",
    body: "Work with AWS and Docker to support cloud infrastructure, deployment and modern application environments.",
    icon: "cloud",
  },
  {
    title: "Maintenance & Support",
    body: "Resolve bugs, add new features and maintain live systems while working closely with technical requirements.",
    icon: "wrench",
  },
];

export type ResumeBlock = {
  heading?: string;
  items?: string[];
  text?: string;
};

export type ResumeItem = {
  title: string;
  period: string;
  org: string;
  orgHref?: string;
  orgLabel?: string;
  lead?: string;
  bullets?: string[];
  blocks?: ResumeBlock[];
};

export const experience: ResumeItem[] = [
  {
    title: "Full-Stack Developer",
    period: "February 2024 — Present",
    org: "Ministry of Labour & Vocational Training, Phnom Penh, Cambodia",
    orgHref: "https://www.mlvt.gov.kh/",
    orgLabel: "website",
    bullets: [
      "Built and maintained TVET MIS, TVET 1.5M, TVET RPL and the Ministry M&E System using Express.js, Laravel and Angular.",
      "Designed RESTful APIs and structured MongoDB and MySQL databases for reporting and data management.",
      "Resolved system bugs, added new features, and aligned with ministry departments on technical requirements.",
      "TVET 1.5M: កម្មវិធីបណ្តុះបណ្តាល ១.៥លាននាក់",
      "TVET Program: កម្មវិធីបណ្តុះបណ្តាលបច្ចេកទេសនិងវិជ្ជាជីវៈ",
      "TVET RPL: ប្រព័ន្ធវាយតម្លៃជំនាញមុនការងារនិងការទទួលស្គាល់ជំនាញ",
      "Ministry M&E System: ប្រព័ន្ធតាមដានត្រួតពិនិត្យនិងវាយតម្លៃ",
    ],
  },
  {
    title: "Assistant Lecturer",
    period: "March 2023 — December 2023",
    org: "Beltei International University, Phnom Penh, Cambodia",
    orgHref: "https://web.facebook.com/belteiuniversity",
    orgLabel: "facebook page",
    bullets: [
      "Assistant Lecturer at Beltei International University, Phnom Penh, Cambodia.",
      "Specializing in software engineering with a focus on major programming languages.",
      "Actively involved in curriculum development and delivery of engaging lectures.",
      "Provides hands-on guidance and mentorship to students.",
      "Aims to inspire and equip aspiring software engineers with practical knowledge and skills.",
    ],
  },
];

export const education: ResumeItem[] = [
  {
    title: "Bachelor of Software Engineering",
    period: "December 2022 — August 2026",
    org: "Beltei International University, Phnom Penh, Cambodia",
    orgHref: "https://web.facebook.com/belteiuniversity",
    orgLabel: "facebook page",
    blocks: [
      {
        heading: "Core Areas",
        items: [
          "Advanced Programming Language",
          "Web Development (Bootstrap, JavaScript, ReactJS, .NET Framework, Laravel — Full-stack & REST API)",
          "Database Management (MySQL, DBMS, SQL Microsoft Server)",
          "Mathematics for Computing, Data Structures and Algorithms",
        ],
      },
      {
        heading: "Practical Exposure",
        items: [
          "Field trips at the end of each semester",
          "Practice training for hands-on experience",
          "Communication Skills: emphasis on effective written and verbal communication",
        ],
      },
    ],
  },
  {
    title: "Short Course on iOS Application",
    period: "March 2024 — August 2024",
    org: "ADITI Academy — studied at CamTech, Phnom Penh, Cambodia",
    orgHref: "https://www.aditi.com.kh/en",
    orgLabel: "website",
    blocks: [
      {
        heading: "Technology Focus",
        items: ["Swift Programming Language", "iOS App Development"],
      },
      {
        heading: "Provided by",
        items: ["ADITI Academy"],
      },
      {
        heading: "Sponsored by",
        items: [
          "មូលនិធិ ស.អ. នៃ ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍ (Ministry of Posts and Telecommunication)",
        ],
      },
      {
        heading: "Supported by",
        items: [
          "Ministry of Education, Youth and Sports — MoYES (ក្រសួងអប់រំ យុវជន និងកីឡា)",
        ],
      },
    ],
  },
  {
    title: "Short Course on Web Development",
    period: "August 2023 - October 2023",
    org: "ADITI Academy — studied at Paragon, Phnom Penh, Cambodia",
    orgHref: "https://www.aditi.com.kh/en",
    orgLabel: "website",
    blocks: [
      {
        heading: "Skills Covered",
        items: [
          "Full-Stack Web Development",
          "PHP",
          "Laravel Framework",
          "Database Management",
        ],
      },
      {
        heading: "Emphasis On",
        items: ["Soft Skills", "Hands-on Technical Skills"],
      },
    ],
  },
  {
    title: "High School",
    period: "2019 — 2022",
    org: "Bak Touk High School, Phnom Penh, Cambodia",
    blocks: [
      {
        text: "Cambodian high school spans three years, offering a well-rounded curriculum focusing on key subjects and holistic development. Activities like sports and arts, along with national exams, shape students' academic paths. The system aims to build a strong foundation in knowledge and critical thinking, preparing students for higher education or the workforce.",
      },
    ],
  },
];

export const aboutSummary =
  "Dedicated and passionate Software Engineer with a focus on building scalable web applications. Proficient in modern JavaScript frameworks and PHP ecosystems. Transitioning into specialized backend architectures with NestJS, while leveraging AWS for cloud infrastructure. Committed to writing clean, efficient code and continuous technical growth. Available for freelance projects.";
