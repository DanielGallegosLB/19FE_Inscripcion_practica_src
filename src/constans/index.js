import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  logoudla,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Funciones",
    url: "#features",
  },
  {
    id: "1",
    title: "Precios",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Como usar",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Registrarse",
    url: "/registrarse",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Iniciar sesión",
    url: "/iniciar-sesion",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [logoudla, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Básico",
    description: "Gestión de prácticas simplificada",
    price: "0",
    features: [
      "Acceso a la plataforma para la gestión de prácticas universitarias",
      "Envío y seguimiento de formularios de manera automatizada",
      "Centralización de la información de prácticas",
      "Acceso limitado a funciones básicas de evaluación y retroalimentación",
    ],
  },
  {
    id: "1",
    title: "Profesional",
    description:
      "Administración avanzada de prácticas y retroalimentación en tiempo real",
    price: "9.99",
    features: [
      "Todas las funcionalidades del plan Básico",
      "Evaluación de prácticas con rúbricas personalizadas",
      "Retroalimentación y seguimiento en tiempo real para estudiantes y supervisores",
      "Acceso a historial de prácticas y análisis de desempeño",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description:
      "Gestión completa de prácticas con análisis avanzado y soporte personalizado",
    price: null,
    features: [
      "Todas las funcionalidades del plan Profesional",
      "Análisis avanzado de datos para la toma de decisiones informadas",
      "Soporte personalizado y configuración a medida de la plataforma",
      "Integración con sistemas externos para una administración más completa",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Gestión eficiente",
    text: "Automatiza tareas repetitivas como la presentación de formularios y la comunicación de seguimiento, haciendo el proceso de gestión más rápido y eficiente.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Administración facilitada",
    text: "Permite a los profesores y coordinadores gestionar un gran número de estudiantes de manera más organizada y en tiempo real.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Acceso centralizado",
    text: "Centraliza los datos en un entorno accesible en línea, asegurando que todos los involucrados puedan acceder a la información relevante rápidamente.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Mejora en la toma de decisiones",
    text: "Mantiene un historial completo de prácticas pasadas, permitiendo a la universidad analizar y mejorar programas académicos.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Mejora la experiencia estudiantil",
    text: "Proporciona un proceso más transparente y eficiente para la solicitud y seguimiento de prácticas, con evaluaciones más rápidas.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Colaboración mejorada",
    text: "Facilita la comunicación y colaboración entre profesores, estudiantes y supervisores, mejorando la coordinación.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
