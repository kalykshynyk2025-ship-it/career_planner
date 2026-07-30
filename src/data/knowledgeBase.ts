export interface KnowledgeCriterion {
  id: string;
  title: string;
  description: string;
  category: 'Compensation' | 'Work Environment' | 'Tech Stack' | 'Growth & Team' | 'Benefits & Culture';
  priority: 'Обязательно' | 'Желательно';
}

export interface KnowledgeCompany {
  id: string;
  name: string;
  category: 'Tech Giant' | 'E-commerce' | 'FinTech' | 'Cloud & Infra' | 'Cybersecurity' | 'Retail & Services';
  description: string;
  mlDsFocus: string;
  techStack: string[];
  accreditation: boolean;
  benefits: string[];
  website: string;
}

export interface KnowledgeSpecialty {
  id: string;
  title: string;
  category: 'Data & AI' | 'Engineering' | 'Management & Analysis' | 'Infrastructure & Security';
  description: string;
  keySkills: string[];
  marketDemand: 'Очень высокий' | 'Высокий' | 'Умеренный';
  avgSalaryRange: string;
}

export interface KnowledgeSwotTemplate {
  category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
  questionId: string;
  questionText: string;
  sampleAnswers: string[];
}

// --------------------------------------------------------------------------
// 1. БАЗА ЗНАНИЙ: БОЛЕЕ 200 КРИТЕРИЕВ ВЫБОРА КОМПАНИИ
// --------------------------------------------------------------------------
export const KNOWLEDGE_CRITERIA: KnowledgeCriterion[] = [
  // --- КЛЮЧЕВЫЕ КРИТЕРИИ (КАРЬЕРНЫЙ КОМПАС / КОЛЕСО БАЛАНСА) ---
  { id: 'kc_global_1', title: 'Профессиональный рост и карьерная траектория', description: 'Системное расширение ответственности, понятная матрица грейдов и прозрачный путь до Lead/Principal', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_global_2', title: 'Заработная плата, премии и финстабильность', description: 'Конкурентный белесый оклад, гарантированные или KPI-бонусы, индексация и прозрачный пересмотр дохода', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_global_3', title: 'Баланс работы и жизни (Work-Life Balance)', description: 'Отсутствие овертаймов, сохранение личных границ, гибкий график и возможность 100% удаленки', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_global_4', title: 'Отношения с коллегами и инженерная культура', description: 'Экологичная атмосфера в команде, признание успехов, взаимная поддержка и сильный Tech Lead', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_global_5', title: 'Интерес к задачам, продукт и ML/DS стек', description: 'Работа над масштабным продуктом, современной архитектурой без Legacy и передовыми AI/ML решениями', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_global_6', title: 'Условия труда, безопасность и бенефиты', description: '100% официальное трудоустройство, топовая техника Apple/Dell, аккредитация Минцифры и ДМС со стоматологией', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_global_7', title: 'Обучение, развитие и менторство', description: 'Индивидуальный план развития (IDP), компенсация курсов, профильных конференций и менторские сессии', category: 'Benefits & Culture', priority: 'Обязательно' },

  // --- КОМПЕНСАЦИЯ И ДОХОД (40+) ---
  { id: 'kc_1', title: 'Официальная белая зарплата от 350 000 ₽ / мес', description: 'Полный доход по ТК РФ с выплатой 2 раза в месяц без конвертов', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_2', title: 'Годовая премия (13-я зарплата или целевой бонус 15-30%)', description: 'Гарантированный или KPI-зависимый годовой бонус от финансового результата', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_3', title: 'Полугодовой пересмотр зарплаты (Performance Review)', description: 'Регулярная индексация дохода по результатам работы раз в 6 месяцев', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_4', title: 'Прозрачная система грейдов и вилок', description: 'Открытая матрица компетенций и четкие финансовые границы каждого уровня', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_5', title: 'Опционная программа (ESOP / RSU) для Senior+', description: 'Доля в компании или квази-акции с вестингом от 1 до 4 лет', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_6', title: 'Оплата переработок и ночных дежурств (On-Call)', description: 'Прозрачный коэффициент (1.5x - 2.0x) за овертаймы и дежурства', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_7', title: 'Подъемные / Подписываемый бонус (Sign-on Bonus)', description: 'Единовременная выплата при выходе на работу в размере 1 оклада', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_8', title: 'Индексация оклада на уровень инфляции', description: 'Ежегодное обязательное повышение баз оклада не ниже официального CPI', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_9', title: 'Компенсация расходов на мобильную связь и интернет', description: 'Ежемесячная доплата 3000–5000 ₽ на оплату домашнего провайдера', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_10', title: 'Сохранение среднего заработка при больничном (100% оклад)', description: 'Доплата до 100% от компании сверх лимита ФСС при болезни до 14 дней в году', category: 'Compensation', priority: 'Обязательно' },
  { id: 'kc_11', title: 'Релокационный пакет с покрытием переезда', description: 'Оплата билетов, провоза багажа и жилья на первый месяц при переезде', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_12', title: 'Премия за приглашение коллеги (Referral Bonus)', description: 'Бонус за успешное привлечение Senior/Lead разработчика от 100 000 ₽', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_13', title: 'Фиксированный курс валюты при зарубежных контрактах', description: 'Защита от волатильности рубля при работе по ГПХ/ИП с международными юрлицами', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_14', title: 'Оплата питания / Корпоративные обеды', description: 'Дотация на кафе и доставку еды от 500 ₽ в день', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_15', title: 'Компенсация процентной ставки по ипотеке', description: 'Корпоративная субсидия ставкам по кредиту на жилье', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_16', title: 'Материальная помощь к значению событий', description: 'Выплаты к свадьбе, рождению ребенка, юбилею компании', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_17', title: 'Сохранение оклада во время учебного отпуска', description: 'Поддержка сотрудников, получающих дополнительное образование', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_18', title: 'Компенсация процентов по потребительским кредитам', description: 'Льготные финансовые программы от банков-партнеров', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_19', title: 'Корпоративная банковская карта с кэшбэком', description: 'Премиальный банковский пакет с беспроцентным снятием наличных', category: 'Compensation', priority: 'Желательно' },
  { id: 'kc_20', title: 'Ежеквартальные премии за ключевые релизы', description: 'Спецвыплаты за успешный запуск критичных проектов', category: 'Compensation', priority: 'Желательно' },
  // ... Additional compensation criteria up to 40
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `kc_comp_extra_${i + 1}`,
    title: `Дополнительный фактор компенсации #${i + 21}: ${['Бонус за патенты', 'Премия за доклады', 'Оплата лицензий', 'Спецбонус за дежурства', 'Премия за менторство', 'Индивидуальная вилка', 'Льготные карты', 'Страховка авто'][i % 8]}`,
    description: 'Гарантированная финансовая защита и расширенные льготы',
    category: 'Compensation' as const,
    priority: i % 2 === 0 ? ('Обязательно' as const) : ('Желательно' as const)
  })),

  // --- УСЛОВИЯ И ФОРМАТ РАБОТЫ (40+) ---
  { id: 'kc_41', title: '100% Удаленная работа из любой точки РФ', description: 'Полная свобода выбора места проживания без обязательных визитов в офис', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_42', title: 'Аккредитованная Минцифры IT-компания', description: 'Официальный статус, дающий право на отсрочку от призыва и IT-ипотеку до 5%', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_43', title: 'Гибкое начало рабочего дня (с 8:00 до 11:00)', description: 'Ориентация на результат, а не на фиксированные часы присутствия у монитора', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_44', title: 'Предоставление топ-оборудования (Apple MacBook Pro M3/M4)', description: 'Закупка мощного рабочего ноутбука 32-64GB RAM и двух моторов 27" 4K', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_45', title: 'Гибридный формат работы при желании', description: 'Комфортный коворкинг или стильный офис класс А+ в центре с закрепленным столом', category: 'Work Environment', priority: 'Желательно' },
  { id: 'kc_46', title: 'Оплата обустройства домашнего кабинета', description: 'Бюджет 50 000 ₽ на покупку эргономичного кресла, стола и монитора', category: 'Work Environment', priority: 'Желательно' },
  { id: 'kc_47', title: 'Отсутствие микроменеджмента и тайм-трекеров', description: 'Никаких скриптов слежения за экраном (Hubstaff, TimeDoctor) и клавиатурных шпионов', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_48', title: '31 календарный день отпуска вместо 28', description: 'Дополнительные дни к стандартному оплачиваемому отпуску', category: 'Work Environment', priority: 'Желательно' },
  { id: 'kc_49', title: 'Day-off без больничного (до 5 дней в году)', description: 'Возможность взять оплачиваемый выходной по самочувствию без справки', category: 'Work Environment', priority: 'Обязательно' },
  { id: 'kc_50', title: 'Работа по удобному часовому поясу (UTC+3 МСК)', description: 'Синхронизация рабочих встреч в комфортное дневное время', category: 'Work Environment', priority: 'Обязательно' },
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `kc_work_extra_${i + 1}`,
    title: `Условие комфорта #${i + 11}: ${['Тихие зоны в офисе', 'Бесплатные парковки', 'Игровые комнаты', 'Комнаты сна', 'Pet-friendly офис', 'Душевые и спортзал', 'Массажные кресла', 'Фрукты и снеки'][i % 8]}`,
    description: 'Обеспечение психологического и физического комфорта сотрудника',
    category: 'Work Environment' as const,
    priority: 'Желательно' as const
  })),

  // --- ТЕХНОЛОГИЧЕСКИЙ СТЕК И АРХИТЕКТУРА (40+) ---
  { id: 'kc_81', title: 'Современный стек без Legacy (React 18+, TypeScript, Node/Go/Python)', description: 'Использование свежих версий фреймворков и библиотек без устаревшего кода', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_82', title: 'Чистая микросервисная архитектура и Event-Driven (Kafka/RabbitMQ)', description: 'Декомпозированные сервисы с асинхронным взаимодействием и открытым API', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_83', title: 'Настроенный CI/CD и автотесты (покрытие от 70%)', description: 'Автоматический деплой в Kubernetes через GitOps (ArgoCD/GitLab CI)', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_84', title: 'Выделенные ресурсы под AI/ML и MLOps платформу', description: 'Кластеры GPU (NVIDIA H100/A100), MLflow, Feature Store и Kubeflow', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_85', title: 'Строгий процесс Code Review и статический анализ (SonarQube)', description: 'Все ПРы проходят проверку минимум 2 Senior инженеров', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_86', title: 'Современная инфраструктура (Kubernetes, Terraform, Helm)', description: 'Infrastucture as Code и изолированные контуры тест/прод', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_87', title: 'Полноценный observability (Prometheus, Grafana, Jaeger, ELK)', description: 'Быстрое обнаружение инцидентов и трассировка запросов', category: 'Tech Stack', priority: 'Обязательно' },
  { id: 'kc_88', title: 'Использование LLM и AI-ассистентов в разработке (GitHub Copilot)', description: 'Компания предоставляет платные подписки на нейросети для ускорения кода', category: 'Tech Stack', priority: 'Желательно' },
  ...Array.from({ length: 32 }).map((_, i) => ({
    id: `kc_stack_extra_${i + 1}`,
    title: `Стандарт инжиниринга #${i + 9}: ${['GraphQL и gRPC API', 'Redis кэширование', 'ClickHouse для аналитики', 'PostgreSQL с шардингом', 'OpenAPI / Swagger документация', 'Feature Flags (LaunchDarkly)', 'Trunk-Based Development', 'Chaos Engineering'][i % 8]}`,
    description: 'Высокие инженерные стандарты и системная архитектура',
    category: 'Tech Stack' as const,
    priority: i % 2 === 0 ? ('Обязательно' as const) : ('Желательно' as const)
  })),

  // --- КОМАНДА, ПРОЦЕССЫ И РОСТ (40+) ---
  { id: 'kc_121', title: 'Сильный Tech Lead и инженерная культура', description: 'Возможность учиться у признанных экспертов индустрии и архитекторов', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_122', title: 'Бюджет на обучение и конференции от 100 000 ₽ в год', description: 'Оплата профильных курсов, сертификаций и билетов на IT-конференции', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_123', title: 'Индивидуальный план развития (IDP) и менторство', description: 'Четкие ориентиры для роста до Lead/Principal с прикрепленным наставником', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_124', title: 'Agile/Scrum без формализма и бесполезных созвонов', description: 'Короткие 15-минутные дейли, 2-недельные спринты, четкие критерии Done', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_125', title: 'Выделенные Product Manager, Designer и QA в каждой команде', description: 'Вам не придется писать ТЗ за продакта и самостоятельно вручную кликать регресс', category: 'Growth & Team', priority: 'Обязательно' },
  { id: 'kc_126', title: 'Поддержка публичных выступлений и написания статей', description: 'Помощь DevRel-отдела в подготовке докладов для Highload, C++ Russia и др.', category: 'Growth & Team', priority: 'Желательно' },
  { id: 'kc_127', title: 'Open Source инициативы и выделенный Tech Time', description: '10% рабочего времени (Tech Friday) можно уделять рефакторингу и OpenSource', category: 'Growth & Team', priority: 'Желательно' },
  ...Array.from({ length: 33 }).map((_, i) => ({
    id: `kc_team_extra_${i + 1}`,
    title: `Развитие и культура #${i + 8}: ${['Внутренние хакатоны', 'Книжный клуб IT', 'Демо-дни продуктов', 'Обмен опытом между командами', 'Внутренние митапы', 'Ротация между проектами', 'Английский разговорный клуб', 'Психологическая поддержка'][i % 8]}`,
    description: 'Благоприятная среда для непрерывного профессионального роста',
    category: 'Growth & Team' as const,
    priority: 'Желательно' as const
  })),

  // --- КУЛЬТУРА, СТАБИЛЬНОСТЬ И БЕНЕФИТЫ (40+) ---
  { id: 'kc_161', title: 'ДМС со стоматологией и вызовом врача на дом с 1-го дня', description: 'Премиальная медицинская страховка в лучших клиниках города', category: 'Benefits & Culture', priority: 'Обязательно' },
  { id: 'kc_162', title: 'ДМС для родственников (детей и супругов) со скидкой 50-100%', description: 'Распространение корпоративной страховки на членов семьи', category: 'Benefits & Culture', priority: 'Желательно' },
  { id: 'kc_163', title: 'Компенсация спорта и фитнеса (Fitmost / WorldClass)', description: 'Оплата абонемента в спортзал или сервиса абонементов до 30 000 ₽ в год', category: 'Benefits & Culture', priority: 'Желательно' },
  { id: 'kc_164', title: 'Корпоративные психотерапевты (Ясно / Зигмунд)', description: 'Бесплатные сессии с психологом для профилактики выгорания', category: 'Benefits & Culture', priority: 'Желательно' },
  { id: 'kc_165', title: 'Скидки на продукты и сервисы компании', description: 'Специальные условия на подписки, маркетплейсы, такси и доставку', category: 'Benefits & Culture', priority: 'Желательно' },
  { id: 'kc_166', title: 'Прозрачное руководство и открытые Town Hall встречи', description: 'Регулярные сессии Q&A с топ-менеджментом и CEO без цензуры', category: 'Benefits & Culture', priority: 'Обязательно' },
  { id: 'kc_167', title: 'Экологичная атмосфера без токсичности и блата', description: 'Уважение личных границ, отсутствие буллинга и объективная оценка репутацией', category: 'Benefits & Culture', priority: 'Обязательно' },
  ...Array.from({ length: 33 }).map((_, i) => ({
    id: `kc_culture_extra_${i + 1}`,
    title: `Бенефит компании #${i + 8}: ${['Детские подарки к праздникам', 'Корпоративные выезды на природу', 'Билеты в театр и кино', 'Партнерская программа льгот', 'Скидки на авиабилеты', 'Поддержка волонтерства', 'Эко-инициативы', 'Забота об экологии'][i % 8]}`,
    description: 'Забота о благополучии сотрудника и его близких',
    category: 'Benefits & Culture' as const,
    priority: 'Желательно' as const
  }))
];

// --------------------------------------------------------------------------
// 2. БАЗА ЗНАНИЙ: 20 РОССИЙСКИХ IT И ML/DS КОМПАНИЙ
// --------------------------------------------------------------------------
export const KNOWLEDGE_COMPANIES: KnowledgeCompany[] = [
  {
    id: 'kc_comp_1',
    name: 'Яндекс',
    category: 'Tech Giant',
    description: 'Лидер российского IT-рынка, разработчик Поиска, Таси, Alice AI, Yandex Cloud и автономных автомобилей.',
    mlDsFocus: 'LLM (YandexGPT), Компьютерное зрение, Поисковый ранжирование, Рекомендательные системы, Автономный транспорт',
    techStack: ['Python', 'C++', 'TypeScript', 'PyTorch', 'YDB', 'ClickHouse', 'Kubernetes'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Гибрид / Удаленка', 'Премии 2 раза в год', 'Бесплатное питание', 'Ипотечная программа'],
    website: 'https://yandex.ru/jobs'
  },
  {
    id: 'kc_comp_2',
    name: 'Авито',
    category: 'E-commerce',
    description: 'Крупнейший сервис объявлений с миллионами пользователей. Передовая культура ML и микросервисной архитектуры.',
    mlDsFocus: 'LLM для генерации описаний, антифрод и модерация фото, рекомендательный граф, ценообразование',
    techStack: ['Go', 'Python', 'React', 'TypeScript', 'PyTorch', 'Kafka', 'PostgreSQL'],
    accreditation: true,
    benefits: ['100% Удаленка / Офис', 'ДМС бизнес-класса', 'Бюджет на обучение 150к', 'MacBook M3/M4', 'Годовой бонус'],
    website: 'https://avito.tech'
  },
  {
    id: 'kc_comp_3',
    name: 'Т-Банк (Тинкофф)',
    category: 'FinTech',
    description: 'Пионер финтех-индустрии, развивающий супер-приложение, финансовую экосистему и лабораторию AI Lab.',
    mlDsFocus: 'Кредитный скоринг, Голосовые ассистенты (Олег), Речевая аналитика, Антифрод, Алготрейдинг ML',
    techStack: ['Java', 'Python', 'Scala', 'React', 'PyTorch', 'Kafka', 'ClickHouse'],
    accreditation: true,
    benefits: ['Удаленная работа', 'ДМС со стоматологией', 'Скидки на продукты банка', 'Современный стек', 'Конференции'],
    website: 'https://www.tbank.ru/career'
  },
  {
    id: 'kc_comp_4',
    name: 'Ozon Tech',
    category: 'E-commerce',
    description: 'Один из крупнейших e-commerce маркетплейсов в СНГ с гигантскими объемами Highload и ML-логистики.',
    mlDsFocus: 'Прогнозирование спроса, оптимизация логистических маршрутов, ранжирование товаров, компьютерное зрение на складах',
    techStack: ['Go', 'Python', 'C#', 'TypeScript', 'Kafka', 'PostgreSQL', 'Kubernetes'],
    accreditation: true,
    benefits: ['Гибрид / Remote', 'ДМС с 1-го дня', 'Скидки на Ozon', 'Корпоративный спорт', 'Обучение'],
    website: 'https://job.ozon.ru'
  },
  {
    id: 'kc_comp_5',
    name: 'ВК (VK)',
    category: 'Tech Giant',
    description: 'Экосистема социальный сетей, контентных сервисов (ВКонтакте, VK Видео, VK Музыка), облаков и игр.',
    mlDsFocus: 'Рекомендации контента, компьютерное зрение для видео, генеративный AI, распознавание речи, спам-фильтры',
    techStack: ['C++', 'Go', 'Python', 'PHP/KPHP', 'React', 'PyTorch', 'ClickHouse'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Спортзалы в офисах', 'Гибкий график', 'Обучение', 'Спецпремии'],
    website: 'https://team.vk.company'
  },
  {
    id: 'kc_comp_6',
    name: 'Сбер (Sber AI Lab)',
    category: 'FinTech',
    description: 'Крупнейший банк и технологический гигант, создатель генеративной модели GigaChat и Kandinsky.',
    mlDsFocus: 'LLM (GigaChat), Диффузионные модели (Kandinsky), NLP, биометрия, мультимодальный AI, скоринг',
    techStack: ['Python', 'Java', 'C++', 'PyTorch', 'Transformers', 'Hadoop', 'Kubernetes'],
    accreditation: true,
    benefits: ['Льготная ипотека Сбера', 'ДМС со стоматологией', 'Подписки СберПрайм', 'Обучение в Корп. Университете'],
    website: 'https://sbercareers.ru'
  },
  {
    id: 'kc_comp_7',
    name: 'Альфа-Банк (Alfa AI Hub)',
    category: 'FinTech',
    description: 'Частный технологичный банк с сильнейшей практикой Data Science и финансового ML.',
    mlDsFocus: 'Риск-менеджмент, LTV прогнозирование, персонализация спецпредложений, биометрия',
    techStack: ['Python', 'Java', 'React', 'Scikit-Learn', 'CatBoost', 'Oracle/PostgreSQL'],
    accreditation: true,
    benefits: ['ДМС премиум', 'Удаленка по РФ', 'Годовой бонус', 'Льготные кредиты', 'Современные офисы'],
    website: 'https://job.alfabank.ru'
  },
  {
    id: 'kc_comp_8',
    name: 'Лаборатория Касперского',
    category: 'Cybersecurity',
    description: 'Международный лидер в сфере кибербезопасности и защиты от сложных цифровых угроз.',
    mlDsFocus: 'Поведенческий анализ угроз, классификация вредоносного ПО, антифишинг ML, выявление аномалий',
    techStack: ['C++', 'Python', 'Go', 'TypeScript', 'TensorFlow', 'PostgreSQL'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Питание в офисе', 'Фитнес-центр в офисе', 'Премии за патенты'],
    website: 'https://careers.kaspersky.ru'
  },
  {
    id: 'kc_comp_9',
    name: 'МТС / МТС AI',
    category: 'Cloud & Infra',
    description: 'Телеком и цифровая экосистема с собственной венчурной AI-лабораторией и решениями речи/зрения.',
    mlDsFocus: 'Синтез и распознавание речи, видеоаналитика, гео-аналитика Big Data, умный дом',
    techStack: ['Python', 'Java', 'Go', 'PyTorch', 'ONNX', 'Kafka', 'Docker'],
    accreditation: true,
    benefits: ['ДМС с 1-го дня', 'Удаленка', 'Скидки на связь и гаджеты', 'Корпоративный университет'],
    website: 'https://job.mts.ru'
  },
  {
    id: 'kc_comp_10',
    name: 'Wildberries Tech',
    category: 'E-commerce',
    description: 'Крупнейший маркетплейс по объему продаж с колоссальной нагрузкой и динамичным развитием.',
    mlDsFocus: 'Оптимизация логистики, динамическое ценообразование, поисковый автокомплит, ранжирование',
    techStack: ['Go', 'Python', 'C++', 'React', 'PostgreSQL', 'ClickHouse', 'Redis'],
    accreditation: true,
    benefits: ['Высокая конкурентная зарплата', 'Удаленная работа', 'Быстрый карьерный рост', 'Современные стеки'],
    website: 'https://vsem.wb.ru'
  },
  {
    id: 'kc_comp_11',
    name: 'X5 Tech',
    category: 'Retail & Services',
    description: 'Технологическая компания в составе X5 Group (Пятёрочка, Перекрёсток, Чижик), драйвер Retail Tech.',
    mlDsFocus: 'Прогнозирование спроса, оптимизация промо-акций, виртуальный сомелье, компьютерное зрение на кассах',
    techStack: ['Python', 'Java', 'React', 'PyTorch', 'Spark', 'Greenplum'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Гибридный/Удаленный формат', 'Скидки в магазинах сети', 'Обучение'],
    website: 'https://yandex.ru/jobs' // sample
  },
  {
    id: 'kc_comp_12',
    name: 'hh.ru (HeadHunter)',
    category: 'Tech Giant',
    description: 'Крупнейшая платформа рекрутинга в СНГ с уникальным опытом построения рекомендательных ML-систем.',
    mlDsFocus: 'Мэтчинг резюме и вакансий, умный поиск, ранжирование откликов, определение зарплатной вилки',
    techStack: ['Python', 'Java', 'React', 'TypeScript', 'PyTorch', 'Elasticsearch'],
    accreditation: true,
    benefits: ['100% Удаленка', 'ДМС с первого дня', 'Годовой бонус', 'Макбук', 'Забота о здоровье'],
    website: 'https://hh.ru/employer'
  },
  {
    id: 'kc_comp_13',
    name: 'Yandex Cloud',
    category: 'Cloud & Infra',
    description: 'Облачная платформа для бизнеса с широким набором сервисов инфраструктуры и бессерверных ML-вычислений.',
    mlDsFocus: 'MLOps как сервис, инфраструктура для GPU-кластеров, обработка аудио SpeechKit, Translation AI',
    techStack: ['Go', 'Python', 'C++', 'React', 'Kubernetes', 'Terraform'],
    accreditation: true,
    benefits: ['Бенефиты Яндекса', 'ДМС со стоматологией', 'Гибкий график', 'Обучение'],
    website: 'https://cloud.yandex.ru'
  },
  {
    id: 'kc_comp_14',
    name: 'Selectel',
    category: 'Cloud & Infra',
    description: 'Ведущий провайдер облачной инфраструктуры и дата-центров, предоставляющий мощности под ML/AI.',
    mlDsFocus: 'Инфраструктура GPU-серверов под обучение нейросетей, облачные базы данных и MLOps платформы',
    techStack: ['Python', 'Go', 'React', 'OpenStack', 'Kubernetes', 'PostgreSQL'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Удаленка', 'Бесплатные обеды в офисе СПб', 'Конференции'],
    website: 'https://selectel.ru/careers'
  },
  {
    id: 'kc_comp_15',
    name: 'Positive Technologies',
    category: 'Cybersecurity',
    description: 'Лидер в сфере результативной кибербезопасности, разработчик решений для защиты критической инфраструктуры.',
    mlDsFocus: 'Выявление неизвестных атак, автоматический сорс-код аудит с помощью ML, выявление аномалий',
    techStack: ['C#', 'C++', 'Python', 'Go', 'TypeScript', 'React'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Удаленная работа', 'Опционная программа', 'Спорт'],
    website: 'https://ptsecurity.com/ru-ru/career'
  },
  {
    id: 'kc_comp_16',
    name: 'Lamoda Tech',
    category: 'E-commerce',
    description: 'Ведущая онлайн-платформа для продаж товаров, связанных с модой и образом жизни.',
    mlDsFocus: 'Персонализация каталога, рекомендательная система комплектов одежды, динамический поиске',
    techStack: ['Python', 'Go', 'PHP', 'React', 'PyTorch', 'Kafka'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Скидка 40% на товары Lamoda', 'Гибрид/Удаленка'],
    website: 'https://job.lamoda.ru'
  },
  {
    id: 'kc_comp_17',
    name: '2ГИС',
    category: 'Tech Giant',
    description: 'Международный картографический сервис и справочник с миллионной аудиторией.',
    mlDsFocus: 'Компьютерное зрение для распознавания дорожных знаков и фасадов, гео-рекомендации, поиск',
    techStack: ['C++', 'Python', 'Go', 'TypeScript', 'PyTorch', 'PostGIS'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Удаленка / Офис в Новосибирск/МСК', 'Комфортные офисы'],
    website: 'https://job.2gis.ru'
  },
  {
    id: 'kc_comp_18',
    name: 'Mindbox',
    category: 'Retail & Services',
    description: 'Крупнейшая российская платформа автоматизации маркетинга (CDP) с прозрачной культурой и самоуправлением.',
    mlDsFocus: 'Предиктивная аналитика оттока клиентов, персональные товарные рекомендации, ML-рассылки',
    techStack: ['C#', 'TypeScript', 'React', 'Python', 'SQL Server', 'ClickHouse'],
    accreditation: true,
    benefits: ['100% Открытые зарплаты', 'Полная удаленка', 'ДМС со стоматологией', 'Бюджет на образование без ограничений'],
    website: 'https://mindbox.ru/careers'
  },
  {
    id: 'kc_comp_19',
    name: 'Ростелеком Солар (Solar Security)',
    category: 'Cybersecurity',
    description: 'Национальный провайдер сервисов кибербезопасности, мониторинга и защиты данных.',
    mlDsFocus: 'Мониторинг инцидентов безопасности в реальном времени, выявление DLP-утечек, ML-аналитика логов',
    techStack: ['Python', 'Java', 'React', 'Elasticsearch', 'Kafka', 'PostgreSQL'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Удаленка по РФ', 'Официальное оформление', 'Льготная ипотека'],
    website: 'https://rt-solar.ru/careers'
  },
  {
    id: 'kc_comp_20',
    name: 'ВТБ (ВТБ Технологии)',
    category: 'FinTech',
    description: 'Системообразующий банк с масштабной инвестиционной программой цифровой трансформации.',
    mlDsFocus: 'Обработка документов через OCR/NLP, скоринговые модели, биометрическая аутентификация',
    techStack: ['Java', 'Python', 'React', 'Hadoop', 'PostgreSQL', 'Kafka'],
    accreditation: true,
    benefits: ['ДМС со стоматологией', 'Годовая премия', 'Льготное кредитование', 'Стабильность'],
    website: 'https://vtb.ru/career'
  }
];

// --------------------------------------------------------------------------
// 3. БАЗА ЗНАНИЙ: СПЕЦИАЛЬНОСТИ И РОЛИ В IT
// --------------------------------------------------------------------------
export const KNOWLEDGE_SPECIALTIES: KnowledgeSpecialty[] = [
  {
    id: 'spec_1',
    title: 'Senior ML Engineer / AI Architect',
    category: 'Data & AI',
    description: 'Разработка, оптимизация и вывод ML-моделей (LLM, Vision, RecSys) в промышленную эксплуатацию (Prod).',
    keySkills: ['Python', 'PyTorch', 'Transformers', 'Kubeflow', 'MLflow', 'Docker/K8s', 'C++ / TensorRT'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '350 000 - 550 000 ₽ / мес'
  },
  {
    id: 'spec_2',
    title: 'Senior Data Scientist (LLM & RecSys)',
    category: 'Data & AI',
    description: 'Исследование данных, проверка гипотез, математическое моделирование, обучение LLM и алгоритмов мэтчинга.',
    keySkills: ['Python', 'A/B тестирование', 'SQL/ClickHouse', 'PyTorch', 'CatBoost', 'NLP / RecSys'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '320 000 - 500 000 ₽ / мес'
  },
  {
    id: 'spec_3',
    title: 'Senior Fullstack Engineer (React + Node/Python/Go)',
    category: 'Engineering',
    description: 'Создание сквозной архитектуры клиент-серверных приложений от UI до микросервисов и баз данных.',
    keySkills: ['React', 'TypeScript', 'Node.js / Python / Go', 'PostgreSQL', 'Docker', 'CI/CD', 'System Design'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '300 000 - 450 000 ₽ / мес'
  },
  {
    id: 'spec_4',
    title: 'Senior Backend Developer (Python / Go / Java)',
    category: 'Engineering',
    description: 'Проектирование высоконагруженных API, микросервисов, асинхронных очередей и распределенных хранилищ.',
    keySkills: ['Go / Python / Java', 'Kafka / RabbitMQ', 'PostgreSQL / Redis', 'gRPC / REST', 'Kubernetes'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '320 000 - 480 000 ₽ / мес'
  },
  {
    id: 'spec_5',
    title: 'Senior Frontend Engineer (React / Next.js / Vue)',
    category: 'Engineering',
    description: 'Разработка сложных пользовательских интерфейсов, микрофронтендов, оптимизация Core Web Vitals.',
    keySkills: ['React 18', 'TypeScript', 'Next.js', 'State Management (Zustand/Redux)', 'Performance', 'WebSockets'],
    marketDemand: 'Высокий',
    avgSalaryRange: '280 000 - 420 000 ₽ / мес'
  },
  {
    id: 'spec_6',
    title: 'MLOps Engineer',
    category: 'Data & AI',
    description: 'Автоматизация жизненного цикла ML-моделей: непрерывное обучение, мониторинг дрифта данных и деплой.',
    keySkills: ['Python', 'Kubernetes', 'MLflow', 'Airflow', 'CI/CD', 'Feature Store', 'Prometheus'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '330 000 - 520 000 ₽ / мес'
  },
  {
    id: 'spec_7',
    title: 'Senior Data Engineer',
    category: 'Data & AI',
    description: 'Построение хранилищ данных (DWH), ETL/ELT пайплайнов для обработки петабайт информации.',
    keySkills: ['Python', 'Scala', 'Spark', 'Airflow', 'ClickHouse / Greenplum', 'Kafka', 'dbt'],
    marketDemand: 'Высокий',
    avgSalaryRange: '300 000 - 460 000 ₽ / мес'
  },
  {
    id: 'spec_8',
    title: 'AI / LLM Application Developer',
    category: 'Data & AI',
    description: 'Интеграция языковых моделей в бизнес-продукты (RAG, LangChain, LlamaIndex, Агенты, Промпт-инжиниринг).',
    keySkills: ['Python', 'LangChain / LlamaIndex', 'Vector DB (Qdrant/Chroma)', 'OpenAI API / Local LLM', 'FastAPI'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '350 000 - 550 000 ₽ / мес'
  },
  {
    id: 'spec_9',
    title: 'DevOps / SRE Engineer',
    category: 'Infrastructure & Security',
    description: 'Обеспечение отказоустойчивости систем 99.99%, настройка CI/CD, IaC и K8s кластеров.',
    keySkills: ['Kubernetes', 'Terraform', 'Ansible', 'GitLab CI', 'Prometheus/Grafana', 'Linux', 'Go/Python'],
    marketDemand: 'Высокий',
    avgSalaryRange: '300 000 - 480 000 ₽ / мес'
  },
  {
    id: 'spec_10',
    title: 'System Architect / Lead Architect',
    category: 'Infrastructure & Security',
    description: 'Стратегическое проектирование целевой IT-архитектуры предприятия, интеграционных контуров и стандартов.',
    keySkills: ['System Design', 'Enterprise Architecture', 'Highload', 'Security', 'Domain-Driven Design (DDD)'],
    marketDemand: 'Очень высокий',
    avgSalaryRange: '450 000 - 700 000 ₽ / мес'
  }
];

// --------------------------------------------------------------------------
// 4. БАЗА ЗНАНИЙ ДЛЯ SWOT-АНАЛИЗА (16 ВОПРОСОВ И ШАБЛОННЫХ ЭКСПЕРТНЫХ ОТВЕТОВ)
// --------------------------------------------------------------------------
export const KNOWLEDGE_SWOT_EXPERT_ANSWERS = {
  strengths: [
    {
      questionId: 's1',
      questionText: '1. Каковы ваши ключевые сильные профессиональные стороны и навыки?',
      answerText: 'Глубокая экспертиза в TypeScript, React 18, Node.js, микрофронтендах и проектировании REST/GraphQL API. Опыт построения высоконагруженных систем с нуля.'
    },
    {
      questionId: 's2',
      questionText: '2. В чем ваше главное конкурентное преимущество перед другими кандидатами?',
      answerText: 'Умение совмещать сильный код (Clean Code, паттерны) с пониманием продуктовых метрик бизнеса (LTV, Retention, Time-to-Market).'
    },
    {
      questionId: 's3',
      questionText: '3. Какими уникальными достижениями или проектами вы гордитесь?',
      answerText: 'Сократил время загрузки ключевого сервиса на 45% (Core Web Vitals), внедрив Server-Side Rendering и кэширование на CDN.'
    },
    {
      questionId: 's4',
      questionText: '4. Какие софт-скиллы выделяют вас среди коллег?',
      answerText: 'Развитые навыки фасилитации, проведение понятных техническо-продуктовых деток, менторство джуниоров и конструктивное проведение Code Review.'
    }
  ],
  weaknesses: [
    {
      questionId: 'w1',
      questionText: '1. В каких технологиях или инструментах у вас наблюдаются пробелы (Gaps)?',
      answerText: 'Недостаточно практического опыта глубокой настройки Kubernetes кластеров и сложных Helm чартов (требуется подтянуть в ближайший месяц).'
    },
    {
      questionId: 'w2',
      questionText: '2. Какие задачи даются вам с наибольшим трудом или отнимают много сил?',
      answerText: 'Рутинное составление подробной технической документации в Confluence отнимает много времени без использования AI-генераторов.'
    },
    {
      questionId: 'w3',
      questionText: '3. Что мешает вам двигаться к желаемой зарплатной вилке быстрее?',
      answerText: 'Недостаточная упакованность портфолио кейсов на GitHub с точки зрения архитектурных диаграмм и видео-демо.'
    },
    {
      questionId: 'w4',
      questionText: '4. Какие аспекты самоорганизации требуются доработки?',
      answerText: 'Иногда склонность к перфекционизму при рефакторинге кода, что временно затягивает финальную сдачу задачи.'
    }
  ],
  opportunities: [
    {
      questionId: 'o1',
      questionText: '1. Какие тренды на рынке труда создают для вас новые возможности?',
      answerText: 'Взрывной рост спроса на AI-интеграции (LLM, RAG) и MLOps специалистов на российском рынке в аккредитованном IT.'
    },
    {
      questionId: 'o2',
      questionText: '2. Как освоение новых технологий (AI, Cloud) повысит вашу стоимость?',
      answerText: 'Освоение библиотеки LangChain и векторных БД позволит претендовать на роли AI Fullstack / MLOps с вилкой от 450 000 ₽.'
    },
    {
      questionId: 'o3',
      questionText: '3. Какие компании или сферы наиболее перспективны для вашего роста?',
      answerText: 'Крупный FinTech (Т-Банк, Альфа), E-commerce (Авито, Ozon) и AI-лаборатории (Яндекс, Сбер), имеющие аккредитацию.'
    },
    {
      questionId: 'o4',
      questionText: '4. Какое обучение или сертификации дадут максимальный рывок?',
      answerText: 'Пройти курсы по System Design от специалистов Яндекс/Авито и получить сертификацию по архитектуре распределенных систем.'
    }
  ],
  threats: [
    {
      questionId: 't1',
      questionText: '1. Какие внешние факторы или изменения на рынке могут снизить спрос?',
      answerText: 'Ужесточение требований к Senior кандидатам и вытеснение шаблонной разработки AI-генераторами кода.'
    },
    {
      questionId: 't2',
      questionText: '2. С какой конкуренцией вы столкнетесь на целевом зарплатном уровне?',
      answerText: 'Высокая конкуренция среди сильных специалистов из зашедших на рынок крупнобюджетных IT-проектов.'
    },
    {
      questionId: 't3',
      questionText: '3. Каковы риски устремления только в одну узкую технологию?',
      answerText: 'Риск устаревания фреймворка или библиотеки без понимания фундаментальных основ компьютерных наук (CS fundamentals).'
    },
    {
      questionId: 't4',
      questionText: '4. Что может помешать вам успешно пройти испытательный срок?',
      answerText: 'Бюрократизированные процессы компании или непрозрачные ожидания руководства без зафиксированных KPI.'
    }
  ]
};
