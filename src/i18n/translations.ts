import type { Language } from '../types';

export interface TranslationSchema {
  brandName: string;
  nav: {
    home: string;
    chat: string;
    settings: string;
    about: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaStart: string;
    ctaAbout: string;
    imageAlt: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{
      index: string;
      title: string;
      description: string;
    }>;
  };
  chat: {
    title: string;
    messagesCountLabel: (count: number) => string;
    clearButton: string;
    clearConfirmTitle: string;
    clearConfirmDesc: string;
    confirmAction: string;
    cancelAction: string;
    emptyTitle: string;
    emptySubtitle: string;
    suggestions: string[];
    placeholder: string;
    sendButton: string;
    stopButton: string;
    thinking: string;
    copyMessage: string;
    copied: string;
    retryButton: string;
    offlineNotice: string;
    errorGeneric: string;
    errorApiKey: string;
  };
  settings: {
    title: string;
    subtitle: string;
    appearanceLabel: string;
    appearanceDesc: string;
    lightMode: string;
    darkMode: string;
    languageLabel: string;
    languageDesc: string;
    installLabel: string;
    installDesc: string;
    installAction: string;
    installedLabel: string;
    iosInstallTitle: string;
    iosInstallStep1: string;
    iosInstallStep2: string;
    close: string;
    dataLabel: string;
    dataDesc: string;
    clearChatOnly: string;
    resetAllData: string;
    resetConfirmTitle: string;
    resetConfirmDesc: string;
    dataClearedToast: string;
  };
  about: {
    title: string;
    subtitle: string;
    overviewTitle: string;
    overviewBody: string;
    pillars: Array<{
      index: string;
      title: string;
      body: string;
    }>;
    privacyTitle: string;
    privacyBody: string;
    ctaChat: string;
  };
  pwa: {
    installBtn: string;
    iosInstallBtn: string;
    offlineBanner: string;
  };
  footer: {
    rights: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  ar: {
    brandName: 'Doudi AI',
    nav: {
      home: 'الرئيسية',
      chat: 'الدردشة',
      settings: 'الإعدادات',
      about: 'حول',
    },
    hero: {
      kicker: 'مساعد ذكاء اصطناعي متكامل',
      title: 'Doudi AI — حوار أذكى، أسرع، ومصمم للعربية',
      subtitle:
        'رفيقك اليومي للكتابة، التحليل، البرمجة، وتوليد الأفكار بدقة عالية وواجهة عربية انسيابية تدعم العربية والفرنسية والإنجليزية.',
      ctaStart: 'ابدأ الدردشة',
      ctaAbout: 'تعرّف على Doudi AI',
      imageAlt: 'مجسم زجاجي أحمر ياقوتي وأسود يعبر عن هوية Doudi AI',
    },
    features: {
      sectionTitle: 'مصمم لسرعة الفهم وجودة الإجابة',
      sectionSubtitle: 'بنية حديثة تجمع بين قوة الذكاء الاصطناعي وتجربة استخدام متقنة على الهاتف والحاسوب.',
      items: [
        {
          index: '01.',
          title: 'دردشة فورية وسلسة',
          description:
            'تدفق مباشر للإجابات مع فهم عميق لسياق المحادثة ودعم تنسيق النصوص والأكواد البرمجية بوضوح تام.',
        },
        {
          index: '02.',
          title: 'ثلاث لغات باتجاه طبيعي',
          description:
            'دعم أصيل للغة العربية من اليمين لليسار (RTL)، مع إمكانية التبديل الفوري إلى الفرنسية والإنجليزية.',
        },
        {
          index: '03.',
          title: 'جاهز للتثبيت والخصوصية',
          description:
            'تطبيق ويب تقدمي (PWA) يُحفظ سجل محادثاتك محلياً على جهازك لسرعة الوصول والعمل كـ تطبيق أصلي.',
        },
      ],
    },
    chat: {
      title: 'محادثة Doudi AI',
      messagesCountLabel: (count: number) => `${count} رسالة`,
      clearButton: 'مسح المحادثة',
      clearConfirmTitle: 'مسح سجل المحادثة؟',
      clearConfirmDesc: 'سيتم حذف جميع الرسائل المحفوظة على هذا الجهاز نهائياً ولا يمكن التراجع عن ذلك.',
      confirmAction: 'نعم، امسح المحادثة',
      cancelAction: 'إلغاء',
      emptyTitle: 'مرحباً بك في Doudi AI',
      emptySubtitle: 'اكتب سؤالك أو اختر أحد الاقتراحات التالية للبدء فوراً.',
      suggestions: [
        'اكتب لي خطة أسبوعية لتعلم البرمجة وتطوير الويب',
        'لخّص أهم مبادئ تصميم واجهات المستخدم الحديثة',
        'ساعدني في صياغة رسالة بريد إلكتروني احترافية باللغة العربية',
        'اقترح 5 أفكار مشاريع تقنية إبداعية لهذا العام',
      ],
      placeholder: 'اكتب رسالتك هنا...',
      sendButton: 'إرسال',
      stopButton: 'إيقاف',
      thinking: 'يفكر Doudi AI...',
      copyMessage: 'نسخ النص',
      copied: 'تم النسخ',
      retryButton: 'إعادة المحاولة',
      offlineNotice: 'أنت غير متصل بالإنترنت حالياً. يمكنك تصفح المحادثات السابقة، ويتطلب الإرسال اتصالاً بالشبكة.',
      errorGeneric: 'تعذر الحصول على رد حالياً. يرجى المحاولة مرة أخرى.',
      errorApiKey: 'لم يتم إعداد مفتاح Gemini AI على الخادم بعد. يرجى التحقق من إعدادات البيئة.',
    },
    settings: {
      title: 'الإعدادات',
      subtitle: 'خصّص المظهر واللغة وإدارة بياناتك المحلية بسهولة.',
      appearanceLabel: 'المظهر',
      appearanceDesc: 'اختر بين الوضع الفاتح المريح نهاراً أو الوضع الداكن العميق.',
      lightMode: 'فاتح',
      darkMode: 'داكن',
      languageLabel: 'لغة الواجهة',
      languageDesc: 'تبديل لغة التطبيق واتجاه العرض تلقائياً.',
      installLabel: 'تثبيت التطبيق',
      installDesc: 'ثبّت Doudi AI على شاشتك الرئيسية للوصول السريع مثل التطبيقات الأصلية.',
      installAction: 'تثبيت الآن',
      installedLabel: 'التطبيق مثبت ويعمل بوضع التطبيق المستقل',
      iosInstallTitle: 'تثبيت على iPhone و iPad',
      iosInstallStep1: '1. اضغط على زر المشاركة (Share) في شريط Safari.',
      iosInstallStep2: '2. مرر للأسفل واختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).',
      close: 'إغلاق',
      dataLabel: 'إدارة البيانات',
      dataDesc: 'تُحفظ المحادثات والتفضيلات محلياً في متصفحك فقط.',
      clearChatOnly: 'مسح سجل الدردشة',
      resetAllData: 'مسح جميع البيانات',
      resetConfirmTitle: 'مسح جميع البيانات؟',
      resetConfirmDesc: 'سيتم حذف سجل الدردشة وإعادة ضبط اللغة والمظهر إلى الإعدادات الافتراضية.',
      dataClearedToast: 'تم مسح البيانات بنجاح',
    },
    about: {
      title: 'حول Doudi AI',
      subtitle: 'مساعد ذكي صُمم ليجمع بين أناقة التصميم وقوة المعالجة اللغوية.',
      overviewTitle: 'الرؤية والتجربة',
      overviewBody:
        'Doudi AI هو تطبيق مساعد ذكاء اصطناعي ودردشة متجاوب بُني من الصفر ليمنح المستخدم العربي تجربة تضاهي أرقى التطبيقات العالمية المدفوعة. يجمع بين السرعة الفائقة، دعم الاتجاه من اليمين لليسار، والهوية الحمراء الجريئة مع بنية PWA متوافقة مع الهواتف وأجهزة سطح المكتب.',
      pillars: [
        {
          index: '01.',
          title: 'محرك Gemini AI المدمج',
          body: 'تتم معالجة جميع المحادثات عبر الخادم بأمان تام دون تعريض أي مفاتيح أو بيانات اعتماد في الواجهة الأمامية.',
        },
        {
          index: '02.',
          title: 'هندسة الهاتف أولاً (PWA)',
          body: 'شريط تنقل سفلي مريح لليد الواحدة على الهاتف، وملف manifest.json و Service Worker جاهزان للتحويل إلى Android WebView.',
        },
        {
          index: '03.',
          title: 'ثلاث لغات متكاملة',
          body: 'تنقّل بسلاسة بين العربية (RTL) والفرنسية والإنجليزية (LTR) مع الحفاظ على تناسق الخطوط والتباين.',
        },
      ],
      privacyTitle: 'الخصوصية والحفظ المحلي',
      privacyBody:
        'تُخزّن محادثاتك وإعداداتك في ذاكرة متصفحك المحلية (localStorage) فقط، وتملك التحكم الكامل لمسحها في أي لحظة من صفحة الدردشة أو الإعدادات.',
      ctaChat: 'انتقل إلى الدردشة الآن',
    },
    pwa: {
      installBtn: 'تثبيت التطبيق',
      iosInstallBtn: 'طريقة التثبيت على iOS',
      offlineBanner: 'وضع عدم الاتصال — يتم عرض البيانات المحفوظة محلياً.',
    },
    footer: {
      rights: 'Doudi AI — صُمم بعناية لتجربة ذكاء اصطناعي عربية متكاملة.',
    },
  },
  fr: {
    brandName: 'Doudi AI',
    nav: {
      home: 'Accueil',
      chat: 'Discussion',
      settings: 'Paramètres',
      about: 'À propos',
    },
    hero: {
      kicker: 'Assistant IA nouvelle génération',
      title: 'Doudi AI — Des échanges plus intelligents et rapides',
      subtitle:
        'Votre compagnon quotidien pour rédiger, analyser, coder et structurer vos idées dans une interface soignée en arabe, français et anglais.',
      ctaStart: 'Démarrer le chat',
      ctaAbout: 'Découvrir Doudi AI',
      imageAlt: 'Sculpture architecturale rouge rubis et noire symbolisant Doudi AI',
    },
    features: {
      sectionTitle: 'Conçu pour la clarté et la réactivité',
      sectionSubtitle: 'Une architecture moderne alliant intelligence conversationnelle et ergonomie mobile.',
      items: [
        {
          index: '01.',
          title: 'Réponses en streaming',
          description:
            'Affichage fluide en temps réel avec compréhension du contexte et mise en forme claire du texte et du code.',
        },
        {
          index: '02.',
          title: 'Trilingue natif RTL & LTR',
          description:
            'Support natif de l’arabe de droite à gauche (RTL) et bascule instantanée vers le français ou l’anglais.',
        },
        {
          index: '03.',
          title: 'Prêt pour PWA & confidentialité',
          description:
            'Application web progressive installable avec sauvegarde locale de votre historique sur votre appareil.',
        },
      ],
    },
    chat: {
      title: 'Discussion Doudi AI',
      messagesCountLabel: (count: number) => `${count} message${count > 1 ? 's' : ''}`,
      clearButton: 'Effacer',
      clearConfirmTitle: 'Effacer la conversation ?',
      clearConfirmDesc: 'Tous les messages enregistrés sur cet appareil seront supprimés définitivement.',
      confirmAction: 'Oui, effacer',
      cancelAction: 'Annuler',
      emptyTitle: 'Bienvenue sur Doudi AI',
      emptySubtitle: 'Posez votre question ou sélectionnez une suggestion ci-dessous pour commencer.',
      suggestions: [
        'Prépare un plan hebdomadaire pour apprendre le développement web',
        'Résume les principes clés du design d’interface moderne',
        'Rédige un e-mail professionnel clair et poli en français',
        'Propose 5 idées de projets innovants avec l’IA',
      ],
      placeholder: 'Écrivez votre message ici...',
      sendButton: 'Envoyer',
      stopButton: 'Arrêter',
      thinking: 'Doudi AI réfléchit...',
      copyMessage: 'Copier',
      copied: 'Copié',
      retryButton: 'Réessayer',
      offlineNotice: 'Vous êtes hors ligne. Vous pouvez consulter l’historique, mais l’envoi nécessite une connexion.',
      errorGeneric: 'Impossible d’obtenir une réponse pour le moment. Veuillez réessayer.',
      errorApiKey: 'La clé Gemini AI n’est pas configurée sur le serveur.',
    },
    settings: {
      title: 'Paramètres',
      subtitle: 'Personnalisez le thème, la langue et gérez vos données locales.',
      appearanceLabel: 'Apparence',
      appearanceDesc: 'Choisissez entre le mode clair lumineux ou le mode sombre profond.',
      lightMode: 'Clair',
      darkMode: 'Sombre',
      languageLabel: 'Langue de l’interface',
      languageDesc: 'Changez la langue et la direction d’affichage automatiquement.',
      installLabel: 'Installer l’application',
      installDesc: 'Ajoutez Doudi AI sur votre écran d’accueil pour une expérience native.',
      installAction: 'Installer',
      installedLabel: 'Application déjà installée en mode autonome',
      iosInstallTitle: 'Installer sur iPhone / iPad',
      iosInstallStep1: '1. Touchez le bouton Partager dans la barre Safari.',
      iosInstallStep2: '2. Faites défiler et sélectionnez « Sur l’écran d’accueil ».',
      close: 'Fermer',
      dataLabel: 'Gestion des données',
      dataDesc: 'Vos conversations et préférences sont stockées localement sur votre navigateur.',
      clearChatOnly: 'Effacer l’historique du chat',
      resetAllData: 'Tout effacer',
      resetConfirmTitle: 'Effacer toutes les données ?',
      resetConfirmDesc: 'L’historique du chat sera supprimé et les préférences seront réinitialisées.',
      dataClearedToast: 'Données effacées avec succès',
    },
    about: {
      title: 'À propos de Doudi AI',
      subtitle: 'Un assistant intelligent pensé pour allier élégance visuelle et performance.',
      overviewTitle: 'Vision et architecture',
      overviewBody:
        'Doudi AI est un assistant conversationnel réactif conçu pour offrir une expérience fluide sur mobile comme sur ordinateur. Son identité rouge rubis, son support RTL natif pour l’arabe et sa compatibilité PWA facilitent son installation et son intégration Android WebView.',
      pillars: [
        {
          index: '01.',
          title: 'Intégration Gemini AI côté serveur',
          body: 'Toutes les requêtes passent par une route API sécurisée côté serveur, sans aucune clé exposée dans le navigateur.',
        },
        {
          index: '02.',
          title: 'Approche Mobile-First (PWA)',
          body: 'Barre de navigation inférieure ergonomique sur mobile, manifest.json et Service Worker actifs.',
        },
        {
          index: '03.',
          title: 'Expérience multilingue',
          body: 'Bascule fluide entre l’arabe (RTL), le français et l’anglais (LTR) avec typographie soignée.',
        },
      ],
      privacyTitle: 'Confidentialité locale',
      privacyBody:
        'Vos échanges et réglages restent dans le stockage local (localStorage) de votre appareil et peuvent être supprimés à tout moment.',
      ctaChat: 'Ouvrir la discussion',
    },
    pwa: {
      installBtn: 'Installer l’app',
      iosInstallBtn: 'Installer sur iOS',
      offlineBanner: 'Mode hors ligne — Données locales affichées.',
    },
    footer: {
      rights: 'Doudi AI — Conçu pour une assistance intelligente élégante et rapide.',
    },
  },
  en: {
    brandName: 'Doudi AI',
    nav: {
      home: 'Home',
      chat: 'Chat',
      settings: 'Settings',
      about: 'About',
    },
    hero: {
      kicker: 'Intelligent AI Assistant',
      title: 'Doudi AI — Sharper answers, crafted for speed',
      subtitle:
        'Your everyday partner for writing, reasoning, coding, and brainstorming in a refined interface supporting Arabic, French, and English.',
      ctaStart: 'Start Chat',
      ctaAbout: 'About Doudi AI',
      imageAlt: 'Crimson ruby glass and matte obsidian architectural sculpture for Doudi AI',
    },
    features: {
      sectionTitle: 'Built for clarity, speed, and control',
      sectionSubtitle: 'Modern full-stack architecture paired with mobile-first ergonomics.',
      items: [
        {
          index: '01.',
          title: 'Real-time streaming chat',
          description:
            'Fast streaming responses with context memory and clean formatting for structured prose and code.',
        },
        {
          index: '02.',
          title: 'Native RTL & LTR trilingual',
          description:
            'First-class right-to-left Arabic support with instant switching to French and English.',
        },
        {
          index: '03.',
          title: 'Installable PWA & local storage',
          description:
            'Install directly to your home screen with your chat history saved locally in your browser.',
        },
      ],
    },
    chat: {
      title: 'Doudi AI Chat',
      messagesCountLabel: (count: number) => `${count} message${count === 1 ? '' : 's'}`,
      clearButton: 'Clear Chat',
      clearConfirmTitle: 'Clear conversation history?',
      clearConfirmDesc: 'All messages saved on this device will be permanently removed.',
      confirmAction: 'Yes, clear chat',
      cancelAction: 'Cancel',
      emptyTitle: 'Welcome to Doudi AI',
      emptySubtitle: 'Ask anything or pick a starter prompt below to begin.',
      suggestions: [
        'Create a focused weekly study plan for modern web development',
        'Summarize the core principles of clean UI design',
        'Help me draft a clear and concise project proposal email',
        'Suggest 5 practical AI productivity project ideas',
      ],
      placeholder: 'Type your message here...',
      sendButton: 'Send',
      stopButton: 'Stop',
      thinking: 'Doudi AI is thinking...',
      copyMessage: 'Copy',
      copied: 'Copied',
      retryButton: 'Retry',
      offlineNotice: 'You are currently offline. Saved messages remain visible, and sending requires connectivity.',
      errorGeneric: 'Unable to get a response right now. Please try again.',
      errorApiKey: 'Gemini API key is not configured on the server.',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Customize appearance, language, and manage your local data.',
      appearanceLabel: 'Appearance',
      appearanceDesc: 'Switch between crisp daylight mode and deep dark obsidian.',
      lightMode: 'Light',
      darkMode: 'Dark',
      languageLabel: 'Interface Language',
      languageDesc: 'Switch application language and reading direction automatically.',
      installLabel: 'Install Application',
      installDesc: 'Install Doudi AI on your device for instant standalone access.',
      installAction: 'Install App',
      installedLabel: 'App is installed and running in standalone mode',
      iosInstallTitle: 'Install on iPhone & iPad',
      iosInstallStep1: '1. Tap the Share button in Safari’s toolbar.',
      iosInstallStep2: '2. Scroll down and tap "Add to Home Screen".',
      close: 'Close',
      dataLabel: 'Data Management',
      dataDesc: 'Chat history and preferences are stored locally in your browser.',
      clearChatOnly: 'Clear Chat History',
      resetAllData: 'Clear All Data',
      resetConfirmTitle: 'Clear all local data?',
      resetConfirmDesc: 'This will remove your chat history and reset language and theme preferences.',
      dataClearedToast: 'Data cleared successfully',
    },
    about: {
      title: 'About Doudi AI',
      subtitle: 'An AI assistant designed to pair editorial visual craft with fast reasoning.',
      overviewTitle: 'Design & Capability',
      overviewBody:
        'Doudi AI is a responsive conversational assistant engineered for a premium feel across mobile and desktop. Its crimson identity, native Arabic RTL layout, and PWA architecture make it effortless to install or wrap inside an Android WebView.',
      pillars: [
        {
          index: '01.',
          title: 'Server-side Gemini AI',
          body: 'All AI requests run securely through the backend API with zero client-side API key exposure.',
        },
        {
          index: '02.',
          title: 'Mobile-First PWA',
          body: 'Thumb-friendly bottom tab bar on mobile, plus manifest.json and Service Worker ready for installation.',
        },
        {
          index: '03.',
          title: 'Seamless Trilingual Switch',
          body: 'Switch effortlessly between Arabic (RTL), French, and English (LTR) with balanced typography.',
        },
      ],
      privacyTitle: 'Local-First Privacy',
      privacyBody:
        'Your conversation history and preferences live solely in your browser’s localStorage and can be wiped at any time.',
      ctaChat: 'Open Chat Workspace',
    },
    pwa: {
      installBtn: 'Install App',
      iosInstallBtn: 'Install on iOS',
      offlineBanner: 'Offline Mode — Showing locally cached data.',
    },
    footer: {
      rights: 'Doudi AI — Crafted for a refined, responsive AI chat experience.',
    },
  },
};
