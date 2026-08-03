import { WorkflowStepDef, CareerState } from '../types';

export const WORKFLOW_STEPS: WorkflowStepDef[] = [
  {
    id: 1,
    title: "STEP_1",
    titleRu: "Карьерное направление & Рынок",
    objective: "Определить долгосрочные карьерные ориентиры, грейды, финансовые и профессиональные ожидания.",
    keyOutputs: ["Целевой грейд", "Ожидаемая вилка дохода", "Формат работы (Remote/Relocation)", "Дедлайн поиска"],
    promptTemplate: "Проанализируй мои карьерные цели и дай рекомендации по сбалансированности требований и реальности рынка."
  },
  {
    id: 2,
    title: "STEP_2",
    titleRu: "Анализ должностей & Ролей",
    objective: "Сравнительный анализ и фиксация основной должности и резервной роли.",
    keyOutputs: ["Выбранная основная позиция", "Смежные альтернативные роли", "Плюсы и минусы позиционирования"],
    promptTemplate: "Помоги выбрать точное позиционирование и названия ролей для поиска на выбранном рынке."
  },
  {
    id: 3,
    title: "STEP_3",
    titleRu: "Доска №1: Критерии выбора компании",
    objective: "Составление жестокого списка критических требований к работодателю.",
    keyOutputs: ["Интерактивный чек-лист критериев выбора компании"],
    promptTemplate: "Помоги сформировать список критериев фильтрации компаний."
  },
  {
    id: 4,
    title: "STEP_4",
    titleRu: "Маппинг целевых компаний",
    objective: "Формирование списка целевых компаний (Tier 1 / Tier 2) в целевых регионах.",
    keyOutputs: ["Список компаний по тирам", "Стек технологий компаний", "Наличие визовой поддержки/спонсорства"],
    promptTemplate: "Сформируй подборку целевых компаний, наймующих специалистов с моим профилем."
  },
  {
    id: 5,
    title: "STEP_5",
    titleRu: "Анализ актуальных вакансий",
    objective: "Сбор и системное ведение отслеживаемых вакансий в ATS-трекере со статусами откликов.",
    keyOutputs: ["Управляемая воронка поиска в трекере"],
    promptTemplate: "Проанализируй вакансии и выдели ключевые требования."
  },
  {
    id: 6,
    title: "STEP_6",
    titleRu: "Подписка на карьерные рассылки",
    objective: "Настройка автоматического пассивного получения вакансий из каналов и дайджестов.",
    keyOutputs: ["Реестр подписок и каналов с быстрыми ссылками"],
    promptTemplate: "Предложи подборку карьерных дайджестов и Telegram-каналов."
  },
  {
    id: 7,
    title: "STEP_7",
    titleRu: "SWOT-анализ профиля",
    objective: "Комплексная оценка Сильных сторон, Слабых мест, Возможностей и Рисков.",
    keyOutputs: ["SWOT-матрица (4 квадранта)", "Ответы на экспертные стратегические вопросы"],
    promptTemplate: "Сформируй детальный SWOT-анализ моего карьерного профиля для целевого рынка."
  },
  {
    id: 8,
    title: "STEP_8",
    titleRu: "Финальный карьерный отчет",
    objective: "Сборка всех наработок в единый консолидированный Карьерный Документ и его экспорт в PDF.",
    keyOutputs: ["Полный Итоговый Документ в формате PDF"],
    promptTemplate: "Сформируй итоговый единый отчет для импорта в PDF со всеми заполненными разделами."
  }
];

export const INITIAL_CAREER_STATE: CareerState = {
  appName: "ML & DS Career OS",
  current_step: 1,
  completed_steps: [1, 2, 3],
  goals: {
    primaryGoal: "Переход на позицию Senior ML & DS Engineer с вилкой 380 000 ₽ - 550 000 ₽ / мес",
    currentGrade: "Middle+",
    targetGrade: "Senior ML / AI Architect",
    targetLocation: "Удаленка / Гибрид",
    expectedSalary: "380 000 - 550 000 ₽ / мес",
    timeline: "3-6 месяцев",
    hardSkillsSummary: "Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training (DeepSpeed), Vector DBs (Qdrant), System Design",
    softSkillsSummary: "Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations, Cross-functional Communication"
  },
  selected_market: "РФ / Global Remote",
  currency: 'RUB',
  selected_position: "Senior ML & DS Engineer / AI Architect",
  selected_companies: [
    {
      id: "c1",
      name: "Яндекс",
      tier: "BigTech",
      techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker"],
      sponsorship: true,
      careerLink: "https://yandex.ru/jobs",
      notes: "Сильная инженерная культура, интересные высоконагруженные сервисы."
    },
    {
      id: "c2",
      name: "Авито",
      tier: "BigTech",
      techStack: ["React", "TypeScript", "Go", "PostgreSQL", "Kafka"],
      sponsorship: true,
      careerLink: "https://avito.tech",
      notes: "Отличный Work-Life Balance, прозрачные вилки и регулярный перфоманс-ревью."
    },
    {
      id: "c3",
      name: "Т-Банк",
      tier: "Tier 1",
      techStack: ["TypeScript", "React", "Node.js", "Microservices"],
      sponsorship: true,
      careerLink: "https://tbank.ru/career",
      notes: "Гибкая удаленка, аккредитованная ИТ-компания, ДМС со стоматологией."
    },
    {
      id: "c4",
      name: "Ozon",
      tier: "BigTech",
      techStack: ["React", "TypeScript", "Go", "Docker", "Kubernetes"],
      sponsorship: true,
      careerLink: "https://job.ozon.ru",
      notes: "Огромный e-commerce масштаб, фокус на скорость и UI перформанс."
    },
    {
      id: "c5",
      name: "ВК (VK)",
      tier: "Tier 1",
      techStack: ["React", "TypeScript", "Node.js", "C++", "VKUI"],
      sponsorship: false,
      careerLink: "https://vk.company/ru/career",
      notes: "Большой выбор проектов: соцсети, облака, видеоплатформы."
    }
  ],
  selected_vacancies: [
    {
      id: "v1",
      title: "Senior Fullstack Engineer (React / Node.js)",
      company: "Авито",
      salaryRange: "320 000 - 420 000 ₽",
      location: "Москва / Удаленка",
      keySkills: ["TypeScript", "React", "Node.js", "System Design", "CI/CD"],
      status: "Interview",
      link: "https://avito.tech/vacancies/fullstack-senior",
      notes: "Пройден первый HR-скрининг, готовится секция по системному дизайну"
    },
    {
      id: "v2",
      title: "Lead Frontend Engineer (Web Platform)",
      company: "Яндекс",
      salaryRange: "350 000 - 450 000 ₽",
      location: "Москва / Remote",
      keySkills: ["React 18+", "Micro-frontends", "Performance", "Mentorship"],
      status: "Applied",
      link: "https://yandex.ru/jobs/vacancies/lead-frontend",
      notes: "Отклик отправлен через реферала"
    },
    {
      id: "v3",
      title: "Senior React Developer (Core Banking UI)",
      company: "Т-Банк",
      salaryRange: "300 000 - 400 000 ₽",
      location: "Удаленка",
      keySkills: ["TypeScript", "React", "State Management", "Jest/RTL"],
      status: "Saved",
      link: "https://tbank.ru/career/vacancies/senior-react",
      notes: "Хорошие отзывы о процессах в команде"
    },
    {
      id: "v4",
      title: "Senior Frontend Engineer (E-commerce Core)",
      company: "Ozon",
      salaryRange: "310 000 - 410 000 ₽",
      location: "Москва / Гибрид",
      keySkills: ["React", "TypeScript", "GraphQL", "Module Federation", "Web Vitals"],
      status: "Saved",
      link: "https://job.ozon.ru/vacancies/senior-frontend",
      notes: "Фокус на оптимизацию загрузки витрины товаров"
    },
    {
      id: "v5",
      title: "Senior Web Application Engineer (VK Video)",
      company: "ВК (VK)",
      salaryRange: "290 000 - 390 000 ₽",
      location: "Санкт-Петербург / Remote",
      keySkills: ["TypeScript", "WebSockets", "WebRTC", "VKUI", "Performance"],
      status: "Applied",
      link: "https://vk.company/ru/career/vacancies/video-web",
      notes: "Интересный стек вокруг видео-стриминга и плеера"
    },
    {
      id: "v6",
      title: "Tech Lead Fullstack (Fintech UI & BFF)",
      company: "Альфа-Банк",
      salaryRange: "360 000 - 480 000 ₽",
      location: "Москва / Удаленка",
      keySkills: ["Node.js", "React", "BFF Architecture", "PostgreSQL", "Kafka"],
      status: "Saved",
      link: "https://alfabank.ru/about/careers/vacancies/tech-lead",
      notes: "Руководство стримом разработки банковского фронтенда"
    },
    {
      id: "v7",
      title: "Senior Frontend Architect (Security Products)",
      company: "Лаборатория Касперского",
      salaryRange: "330 000 - 430 000 ₽",
      location: "Москва / Гибрид",
      keySkills: ["TypeScript", "React", "Architecture", "Security Standards", "SDK Design"],
      status: "Saved",
      link: "https://careers.kaspersky.ru/vacancies/frontend-architect",
      notes: "Создание архитектурного фреймворка для внутренних дашбордов"
    }
  ],
  newsletters: [
    {
      id: "n1",
      companyName: "Яндекс Карьера",
      title: "Дайджест ИТ-вакансий и мероприятий Яндекс Технологии",
      frequency: "Еженедельно",
      subscribed: true,
      link: "https://t.me/yandex_jobs",
      lastIssueDate: "2026-07-20",
      notes: "Рассылка свежих Senior-вакансий и анонсов Tech-Talks."
    },
    {
      id: "n2",
      companyName: "Авито Tech",
      title: "Авито Технологии & Карьерная рассылка",
      frequency: "Ежемесячно",
      subscribed: true,
      link: "https://avito.tech/newsletter",
      lastIssueDate: "2026-07-15",
      notes: "Дайджест статей по веб-архитектуре и разбор открытых вакансий."
    }
  ],
  vacancy_analyses: [
    /* Вакансия 1: Авито */
    {
      id: "va_avito_1",
      vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
      company: "Авито",
      item: "Уверенное владение React 18, TypeScript, Next.js и SSR",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "4+ года разработки на продуктовых React/TS проектах"
    },
    {
      id: "va_avito_2",
      vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
      company: "Авито",
      item: "Проектирование архитектуры микрофронтендов и System Design",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Наставник",
      notes: "Проработка паттернов шардинга и с ментором по архитектуре"
    },
    {
      id: "va_avito_3",
      vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
      company: "Авито",
      item: "Проведение код-ревью, кросс-ревью архитектурных решений и митапов",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Опыт проведения ревью на текущем месте работы"
    },

    /* Вакансия 2: Яндекс */
    {
      id: "va_yandex_1",
      vacancyTitle: "Lead Frontend Engineer (Web Platform)",
      company: "Яндекс",
      item: "Оптимизация Core Web Vitals, профилирование производительности и память",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти курс по углубленному браузерному перформансу Chrome DevTools"
    },
    {
      id: "va_yandex_2",
      vacancyTitle: "Lead Frontend Engineer (Web Platform)",
      company: "Яндекс",
      item: "Развитие общекорпоративной дизайн-системы и UI-кита компонентов",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Создавал библиотеку компонентов на Storybook и Tailwind"
    },

    /* Вакансия 3: Т-Банк */
    {
      id: "va_tbank_1",
      vacancyTitle: "Senior React Developer (Core Banking UI)",
      company: "Т-Банк",
      item: "Соблюдение правил безопасной веб-разработки OWASP Top 10",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Обучение",
      notes: "Пройти сертифицированный воркшоп по веб-безопасности и XSS/CSRF защите"
    },
    {
      id: "va_tbank_2",
      vacancyTitle: "Senior React Developer (Core Banking UI)",
      company: "Т-Банк",
      item: "Проектирование сложного состояния с асинхронными потоками (RxJS / Zustand)",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Уверенный практический опыт с Zustand и Redux Toolkit"
    },

    /* Вакансия 4: Ozon */
    {
      id: "va_ozon_1",
      vacancyTitle: "Senior Frontend Engineer (E-commerce Core)",
      company: "Ozon",
      item: "Опыт работы с GraphQL / REST API и сгенерированными типом клиентов",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Интегрировал GraphQL Apollo Client на нескольких проектах"
    },
    {
      id: "va_ozon_2",
      vacancyTitle: "Senior Frontend Engineer (E-commerce Core)",
      company: "Ozon",
      item: "Настройка Module Federation (Webpack/Vite) для независимых релизов",
      type: "Обязанность",
      status: "Не владею",
      achievementMethod: "Фриланс-проект",
      notes: "Сделать тестовый пет-проект с двумя микрофронтендами через Vite Module Federation"
    },

    /* Вакансия 5: ВК (VK) */
    {
      id: "va_vk_1",
      vacancyTitle: "Senior Web Application Engineer (VK Video)",
      company: "ВК (VK)",
      item: "Разработка высоконагруженных веб-плееров, WebSockets и WebRTC соединения",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Стажировка",
      notes: "Принять участие в хакатоне или внутреннем пилоте по WebSockets & видео"
    },
    {
      id: "va_vk_2",
      vacancyTitle: "Senior Web Application Engineer (VK Video)",
      company: "ВК (VK)",
      item: "Кроссбраузерная и кроссплатформенная верстка с поддержкой Touch & TV",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Опыт на текущем месте",
      notes: "Взять на текущей работе задачи по адаптации под планшеты и мобильные web"
    },

    /* Вакансия 6: Альфа-Банк */
    {
      id: "va_alfa_1",
      vacancyTitle: "Tech Lead Fullstack (Fintech UI & BFF)",
      company: "Альфа-Банк",
      item: "Проектирование Node.js BFF (Backend For Frontend) сервисов и PostgreSQL",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Опыт на текущем месте",
      notes: "Инициировать внедрение BFF слоя в текущем продуктовом спринте"
    },
    {
      id: "va_alfa_2",
      vacancyTitle: "Tech Lead Fullstack (Fintech UI & BFF)",
      company: "Альфа-Банк",
      item: "Управление продуктовой командой разработки от 5 человек, проведение 1:1",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Наставник",
      notes: "Регулярные сессии с ментором-тимлидом по soft skills и менеджменту"
    },

    /* Вакансия 7: Лаборатория Касперского */
    {
      id: "va_kaspersky_1",
      vacancyTitle: "Senior Frontend Architect (Security Products)",
      company: "Лаборатория Касперского",
      item: "Написание строго типизированных библиотек, плагинов и внешних SDK",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Опубликовал несколько npm пакетов со строгими типов TypeScript"
    },
    {
      id: "va_kaspersky_2",
      vacancyTitle: "Senior Frontend Architect (Security Products)",
      company: "Лаборатория Касперского",
      item: "Внедрение автоматических статических анализаторов и контролей безопасности",
      type: "Обязанность",
      status: "Не владею",
      achievementMethod: "Обучение",
      notes: "Изучить интеграцию SonarQube и Snyk в CI/CD пайплайн"
    }
  ],
  swot_answers: {
    strengths: [
      {
        questionId: "s1",
        questionText: "Какие свойства выделяют тебя на фоне остальных? (навыки, образование, связи)",
        answerText: "Глубокая экспертиза в экосистеме TypeScript/React, опыт решения нестандартных архитекторских задач, умение писать чистый поддерживаемый код и развитая инженерная интуиция."
      },
      {
        questionId: "s2",
        questionText: "Какие ресурсы имеются в наличии и какие могут быть получены при надобности?",
        answerText: "Имеется качественное техническое портфолио, опыт работы с продуктовой аналитикой, а также контактные связи с сильными коллегами из BigTech для получения рефералов."
      },
      {
        questionId: "s3",
        questionText: "Какое качество является твоей сильной стороной по мнению окружающих?",
        answerText: "Коллеги и менеджеры отмечают высокую надежность (ownership), умение доводить сложнейшие задачи до деплоя без срыва сроков и понятную прозрачную коммуникацию."
      },
      {
        questionId: "s4",
        questionText: "Какими достижениями ты можешь похвастаться на данный момент?",
        answerText: "Успешный рефакторинг монолита на микрофронтенды, ускорение загрузки ключевых страниц сервиса на 45%, проведение онбординга 5 инженеров."
      }
    ],
    weaknesses: [
      {
        questionId: "w1",
        questionText: "Какие задачи тебе некомфортно выполнять?",
        answerText: "Бывает некомфортно заниматься рутинной поддержкой устаревшего легаси без четкой перспективы переписывания на современный стек."
      },
      {
        questionId: "w2",
        questionText: "Какие твои качества считают слабым местом окружающие?",
        answerText: "Перфекционизм при проектировании архитектуры на начальных этапах, из-за чего иногда трачу лишнее время на полировку кода."
      },
      {
        questionId: "w3",
        questionText: "Есть ли у тебя негативные привычки, касающиеся работы? (опоздания, стрессоустойчивость и т.д.)",
        answerText: "Склонность засиживаться за решением сложных багов во внерабочее время, что повышает риск выгорания при высоких нагрузках."
      },
      {
        questionId: "w4",
        questionText: "Есть ли у тебя особенности характера, блокирующие движение к цели?",
        answerText: "Иногда синдром самозванца мешает подавать отклики в топ-компании без 100% совпадения со всеми опциональными требованиями."
      }
    ],
    opportunities: [
      {
        questionId: "o1",
        questionText: "В каком состоянии сейчас пребывает сфера твоей деятельности? Какое преимущество это представляет?",
        answerText: "Сфера фронтенда и веб-разработки стремительно усложняется (AI-интеграции, Server Components), поэтому специалисты с глубокой базой очень востребованы."
      },
      {
        questionId: "o2",
        questionText: "Какие инновационные технологии ускорят достижение цели?",
        answerText: "Использование AI-ассистентов для ускорения написания юнит-тестов и документации, освоение Next.js 15 App Router и инфраструктуры Yandex Cloud."
      },
      {
        questionId: "o3",
        questionText: "Какие изменения и закономерности наблюдаются в индустрии и стране в целом?",
        answerText: "Активный рост ИТ-сектора, спрос на качественные отечественные B2B и B2C сервисы в условиях импортозамещения, высокие зарплатные вилки."
      },
      {
        questionId: "o4",
        questionText: "Какие ошибки ты можешь выделить из неудачного опыта других людей?",
        answerText: "Не стоит готовиться только теоретически: критически важно проходить мок-интервью и регулярно решать задачи по алгоритмам и системному дизайну."
      }
    ],
    threats: [
      {
        questionId: "t1",
        questionText: "С какими трудностями ты сталкиваешься при выполнении рабочих обязанностей?",
        answerText: "Высокая плотность контекст-свитчинга между продуктовыми фичами, багфиксами и архитектурным проектированием."
      },
      {
        questionId: "t2",
        questionText: "Есть ли у тебя прямые конкуренты? (например, за повышение или оффер)",
        answerText: "Высокая конкуренция среди сильных Middle+ / Senior инженеров на топовые удаленные вакансии с вилками от 350 000 ₽."
      },
      {
        questionId: "t3",
        questionText: "Могут ли твои слабые стороны застопорить движение к цели?",
        answerText: "Недостаточная тренированность быстро решать сложные задачи на LeetCode в условиях ограничений по времени на интервью может отсеять на 1-м этапе."
      }
    ]
  },
  skills: [
    {
      id: "s1",
      name: "React & TypeScript",
      category: "Hard Skill",
      level: "Senior",
      evidence: "4+ года коммерческого опыта, проектировал сложную UI архитектуру"
    },
    {
      id: "s2",
      name: "Node.js & Express / REST API",
      category: "Hard Skill",
      level: "Middle",
      evidence: "Создавал API микросервисы, интеграции с внешними бэкендами"
    },
    {
      id: "s3",
      name: "System Design & Architecture",
      category: "Architecture",
      level: "Middle",
      evidence: "Проектировал монорепозитории и кеширование на клиенте"
    },
    {
      id: "s4",
      name: "Agile & Mentorship",
      category: "Process/Agile",
      level: "Middle",
      evidence: "Вел спринты, проводил код-ревью и онбординг джунов"
    }
  ],
  missing_skills: [
    {
      id: "m1",
      skillName: "System Design для масштабируемых систем",
      priority: "High",
      effort: "High",
      targetDate: "Месяц 1-2",
      actionPlan: "Разбор кейсов System Design interviews, проектирование микрофронтендов"
    },
    {
      id: "m2",
      skillName: "Live Coding & Data Structures (LeetCode Medium)",
      priority: "High",
      effort: "Medium",
      targetDate: "Месяц 1",
      actionPlan: "Решать 2 задачи LeetCode в день (Focus: Graphs, Trees, Dynamic Programming)"
    }
  ],
  swot: {
    strengths: [
      "Сильный коммерческий бэкграунд в React/TypeScript",
      "Опыт построения UI архитектур в финтех/SaaS",
      "Хорошее понимание продуктовых метрик"
    ],
    weaknesses: [
      "Недостаточная практика прохождения алгоритмических секций (LeetCode)",
      "Скромный опыт в профилировании производительности Node.js"
    ],
    opportunities: [
      "Высокий спрос на Senior Fullstack разработчиков с вилками 300 000 - 450 000 ₽",
      "Возможность работы на удаленке в ИТ-компаниях Tier-1"
    ],
    threats: [
      "Высокая конкуренция на сильные позиции",
      "Усложнение этапов интервью в BigTech"
    ]
  },
  roadmap: [
    {
      id: "r1",
      sprint: "Спринт 1 (Недели 1-2)",
      task: "Подготовка базового репозитория и выравнивание LeetCode базы",
      category: "Skill Gap",
      status: "In Progress",
      metric: "Решено 20 задач LeetCode Medium",
      quarter: "Q1"
    },
    {
      id: "r2",
      sprint: "Спринт 2 (Недели 3-4)",
      task: "Упаковка резюме в формате STAR/XYZ и настройка профиля",
      category: "CV/Portfolio",
      status: "Backlog",
      metric: "Оценка CV ревьюерами > 9/10",
      quarter: "Q1"
    },
    {
      id: "r3",
      sprint: "Спринт 3 (Недели 5-6)",
      task: "Системный дизайн (System Design) и подборка кейсов",
      category: "Interview Prep",
      status: "Backlog",
      metric: "Проведено 3 мок-интервью по System Design",
      quarter: "Q2"
    }
  ],
  notion_criteria: [
    {
      id: "c1",
      title: "Удаленная работа (Full Remote / Hybrid Flex)",
      description: "Возможность работать из любой локации без привязки к конкретному офису.",
      checked: true,
      category: "Work Environment",
      priority: "Обязательно"
    },
    {
      id: "c2",
      title: "Официальное оформление и белая зарплата (от 380 000 ₽)",
      description: "Полная финансовая прозрачность, отсутствие серых выплат, своевременная индексация.",
      checked: true,
      category: "Compensation",
      priority: "Обязательно"
    },
    {
      id: "c3",
      title: "Медицинская страховка (ДМС со стоматологией)",
      description: "Покрытие коммерческих клиник, стоматологии и страховки для семьи.",
      checked: true,
      category: "Compensation",
      priority: "Обязательно"
    },
    {
      id: "c4",
      title: "Современный ML & DS стек (Python, PyTorch, LLM, RecSys, CUDA)",
      description: "Современные GPU кластеры (A100/H100), MLOps инфру (Kubeflow, MLflow, Triton), Python, PyTorch.",
      checked: true,
      category: "Tech Stack",
      priority: "Обязательно"
    },
    {
      id: "c5",
      title: "Прозрачная матрица компетенций и рост (Career Ladder)",
      description: "Понятные критерии перехода на следующий грейд (Senior ML -> Lead -> Staff / AI Architect).",
      checked: true,
      category: "Growth & Team",
      priority: "Обязательно"
    },
    {
      id: "c6",
      title: "Сильная инженерная команда & Менторство",
      description: "Опытные тимлиды, регулярные код-ревью, архитектурные комитеты и обмен знаниями.",
      checked: true,
      category: "Growth & Team",
      priority: "Обязательно"
    },
    {
      id: "c7",
      title: "Work-Life Balance & Отсутствие овертаймов",
      description: "Уважение к личным границам, асинхронная коммуникация, нормальный режим работы.",
      checked: true,
      category: "Work Environment",
      priority: "Обязательно"
    },
    {
      id: "c8",
      title: "Бюджет на обучение и конференции (L&D Budget)",
      description: "Ежегодный софинансируемый лимит на курсы, профильные книги, сертификации и митапы.",
      checked: true,
      category: "Growth & Team",
      priority: "Желательно"
    },
    {
      id: "c9",
      title: "Аккредитованная ИТ-компания / льготы",
      description: "ИТ-аккредитация, льготные программы и социальные гарантии.",
      checked: true,
      category: "Work Environment",
      priority: "Обязательно"
    },
    {
      id: "c10",
      title: "Регулярные Performance Review & Годовые бонусы",
      description: "Оценка перформанса раз в 6 месяцев с пересмотром компенсации и премий.",
      checked: true,
      category: "Compensation",
      priority: "Желательно"
    },
    {
      id: "c11",
      title: "Доступ к Compute & GPU ресурсы без бюрократии",
      description: "Быстрый доступ к квотам вычислительных ресурсов и облачным кластерам для гипотез.",
      checked: true,
      category: "Tech Stack",
      priority: "Обязательно"
    },
    {
      id: "c12",
      title: "Прямое влияние на продуктовые метрики (Data-Driven)",
      description: "A/B тестирование моделей на миллионной аудитории с прозрачным бизнес-эффектом.",
      checked: true,
      category: "Growth & Team",
      priority: "Обязательно"
    },
    {
      id: "c13",
      title: "Поддержка Open Source и публикаций статей",
      description: "Возможность публиковать исследовательские статьи и выступать на AI конференциях (Habr, NeurIPS).",
      checked: true,
      category: "Growth & Team",
      priority: "Желательно"
    },
    {
      id: "c14",
      title: "Топовая рабочая техника (MacBook Pro M3 Max / Workstation)",
      description: "Предоставление мощного рабочего ноутбука для разработчика с первого дня.",
      checked: true,
      category: "Work Environment",
      priority: "Обязательно"
    }
  ],
  stepOutputs: {}
};
