import { WorkflowStepDef, CareerState } from '../types';

export const WORKFLOW_STEPS: WorkflowStepDef[] = [
  {
    id: 1,
    title: "STEP_1",
    titleRu: "Постановка целей и инициализация проекта",
    objective: "Определить долгосрочные карьерные ориентиры, грейды, финансовые и профессиональные ожидания.",
    keyOutputs: ["Целевой грейд", "Ожидаемая вилка дохода", "Формат работы (Remote/Relocation)", "Дедлайн поиска"],
    promptTemplate: "Проанализируй мои карьерные цели и дай рекомендации по сбалансированности требований и реальности рынка."
  },
  {
    id: 2,
    title: "STEP_2",
    titleRu: "Анализ рынка и целевых локаций",
    objective: "Оценить целевой рынок (US, EU, MENA, LatAm, Global Remote) и тренды найма.",
    keyOutputs: ["Сравнение рынков (таблица)", "Визовые условия & релокация", "Медианные вилки зарплат", "Выбранный рынок"],
    promptTemplate: "Сравни целевые рынки для моей роли и предложи оптимальный рынок с плюсами и минусами."
  },
  {
    id: 3,
    title: "STEP_3",
    titleRu: "Выбор целевых позиций и ролей",
    objective: "Сформулировать четкое позиционирование (Senior/Lead/Architect) под рынок.",
    keyOutputs: ["Выбранная основная позиция", "Смежные альтернативные роли", "Плюсы и минусы позиционирования"],
    promptTemplate: "Помоги выбрать точное позиционирование и названия ролей для поиска на выбранном рынке."
  },
  {
    id: 4,
    title: "STEP_4",
    titleRu: "Формирование списка целевых компаний",
    objective: "Составить маппинг компаний (BigTech, Tier-1, Tier-2, Startups) для точечного отклика.",
    keyOutputs: ["Список компаний по тирам", "Стек технологий компаний", "Наличие визовой поддержки/спонсорства"],
    promptTemplate: "Сформируй подборку целевых компаний, наймующих специалистов с моим профилем."
  },
  {
    id: 5,
    title: "STEP_5",
    titleRu: "Анализ вакансий и требований",
    objective: "Декомпозировать 5-10 реальных вакансий для выявления повторяющихся ключевых паттернов.",
    keyOutputs: ["Анализ повторяющихся требований", "Пул ключевых слов под ATS", "Критичные Hard & Soft skills"],
    promptTemplate: "Проанализируй вакансии и выдели ключевые хард- и софт-скиллы, обязательные для прохождения ATS."
  },
  {
    id: 6,
    title: "STEP_6",
    titleRu: "Инвентаризация текущих навыков",
    objective: "Провести честную самооценку текущих Hard & Soft компетенций с доказательной базой (кейсами).",
    keyOutputs: ["Матрица навыков (таблица)", "Уровень владения", "Доказательства (проекты, метрики)"],
    promptTemplate: "Помоги структурировать мой стек и опыт в удобную матрицу навыков с доказательствами."
  },
  {
    id: 7,
    title: "STEP_7",
    titleRu: "Анализ разрывов навыков (Skill Gap Analysis)",
    objective: "Сопоставить требования рынка с текущими навыками и выявить пробелы.",
    keyOutputs: ["Таблица гэпов", "Приоритет устранения (High/Med/Low)", "Трудоемкость и дедлайны"],
    promptTemplate: "Сопоставь мои текущие навыки с требованиями вакансий и составь таблицу разрывов (Skill Gap)."
  },
  {
    id: 8,
    title: "STEP_8",
    titleRu: "SWOT-анализ карьерного профиля",
    objective: "Оценить Сильные и Слабые стороны, Возможности и Угрозы профиля.",
    keyOutputs: ["Матрица SWOT (4 квадранта)", "Стратегия усиления сильных сторон", "Нивелирование рисков"],
    promptTemplate: "Сформируй детальный SWOT-анализ моего карьерного профиля для целевого рынка."
  },
  {
    id: 9,
    title: "STEP_9",
    titleRu: "Разработка карьерной дорожной карты (Roadmap)",
    objective: "Сформировать Agile-дорожную карту подготовки со спринтами и конкретными результатом.",
    keyOutputs: ["Спринты (Agile Roadmap)", "Эпики и задачи", "Метрики готовности (Done Criteria)"],
    promptTemplate: "Создай пошаговый Agile Roadmap со спринтами для закрытия всех гэпов и выходя на рынок."
  },
  {
    id: 10,
    title: "STEP_10",
    titleRu: "Оптимизация резюме и LinkedIn",
    objective: "Подготовить резюме по формуле Google XYZ / STAR и выстроить позиционирование в LinkedIn.",
    keyOutputs: ["Структура CV (STAR/XYZ)", "Headline & About в LinkedIn", "Ключевые слова под ATS"],
    promptTemplate: "Помоги составить блоки резюме по методологии STAR/XYZ и оптимизировать заголовок LinkedIn."
  },
  {
    id: 11,
    title: "STEP_11",
    titleRu: "Стратегия нетворкинга и откликов",
    objective: "Подготовить холодные скрипты для LinkedIn/Email и реферальную стратегию.",
    keyOutputs: ["Шаблоны сообщений (Cold/Referral)", "План аутрича (кол-во контактов в день)", "Каналы поисков"],
    promptTemplate: "Сформулируй скрипты писем рекрутерам, найминг-менеджерам и потенциальным рефералам."
  },
  {
    id: 12,
    title: "STEP_12",
    titleRu: "Подготовка к собеседованиям",
    objective: "Разработать план подготовки к Live Coding, System Design, Behavioral и HR раундам.",
    keyOutputs: ["Банк частых вопросов", "Behavioral кейсы (STAR)", "Чек-лист System Design"],
    promptTemplate: "Составь структурированный план подготовки ко всем этапам собеседований для моей роли."
  },
  {
    id: 13,
    title: "STEP_13",
    titleRu: "Финальный обзор, PDF-экспорт и ретроспектива",
    objective: "Сконсолидировать все данные проекта Career Planner в единую бакет-базу данных и настроить Agile-контроль.",
    keyOutputs: ["Итоговый карьерный документ PDF", "Трекер спринтов и откликов", "План регулярных ретроспектив"],
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
    {
      id: "va1",
      vacancyTitle: "Senior Fullstack Engineer",
      company: "Авито",
      item: "Уверенное владение React 18, TypeScript и Next.js",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "4 года опыта на коммерческих проектах"
    },
    {
      id: "va2",
      vacancyTitle: "Senior Fullstack Engineer",
      company: "Авито",
      item: "Проектирование архитектуры микрофронтендов и System Design",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Наставник",
      notes: "Требуется подтянуть паттерны распределенного кэширования"
    },
    {
      id: "va3",
      vacancyTitle: "Lead Frontend Engineer",
      company: "Яндекс",
      item: "Оптимизация Core Web Vitals и производительности сложных UI",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Изучить детально профилирование через Chrome Performance Profiler"
    },
    {
      id: "va4",
      vacancyTitle: "Senior React Developer",
      company: "Т-Банк",
      item: "Опыт проведения код-ревью и менторинга джуниор разработчиков",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Регулярно менторил 2 разработчиков в текущей компании"
    },
    {
      id: "va5",
      vacancyTitle: "Senior React Developer",
      company: "Т-Банк",
      item: "Настройка сложных CI/CD пайплайнов и Docker-контейнеризация",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Фриланс-проект",
      notes: "Сделать свой пет-проект с развертыванием в Yandex Cloud через GitHub Actions"
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
