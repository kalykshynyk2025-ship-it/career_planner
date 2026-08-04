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
      title: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      salaryRange: "120 000 - 160 000 ₽",
      location: "Удаленка (РФ)",
      keySkills: ["Python", "PyTorch", "Pandas", "SQL", "CatBoost", "Scikit-Learn"],
      status: "Applied",
      link: "https://tbank.ru/career/vacancies/intern-ml",
      notes: "Целевая вакансия №1 под составление резюме на ML-стажера. Отклик отправлен."
    },
    {
      id: "v2",
      title: "Junior Data Scientist (NLP / LLM Search)",
      company: "Яндекс",
      salaryRange: "150 000 - 220 000 ₽",
      location: "Москва / Remote",
      keySkills: ["Python", "PyTorch", "Transformers", "HuggingFace", "SQL", "Math Stat"],
      status: "Interview",
      link: "https://yandex.ru/jobs/vacancies/junior-ds-nlp",
      notes: "Целевая вакансия №2 под резюме. Назначена техническая секция по ML/Python."
    },
    {
      id: "v3",
      title: "Junior ML Engineer (E-commerce Personalization)",
      company: "Ozon",
      salaryRange: "140 000 - 200 000 ₽",
      location: "Москва / Гибрид",
      keySkills: ["Python", "CatBoost", "Docker", "FastAPI", "A/B Testing", "SQL"],
      status: "Saved",
      link: "https://job.ozon.ru/vacancies/junior-ml-engineer",
      notes: "Разработка алгоритмов ранжирования и рекомендаций товаров на маркетплейсе."
    },
    {
      id: "v4",
      title: "Intern ML Engineer (Computer Vision & Moderation)",
      company: "Авито",
      salaryRange: "110 000 - 150 000 ₽",
      location: "Москва / Удаленка",
      keySkills: ["Python", "OpenCV", "PyTorch", "ResNet", "YOLO", "Git"],
      status: "Saved",
      link: "https://avito.tech/vacancies/intern-ml-cv",
      notes: "Модели компьютерного зрения для авто-модерации контента и распознавания объектов."
    },
    {
      id: "v5",
      title: "Junior Data Scientist (GigaChat & Predictive Analytics)",
      company: "Сбер",
      salaryRange: "130 000 - 190 000 ₽",
      location: "Москва / Гибрид",
      keySkills: ["Python", "MLflow", "Airflow", "Scikit-Learn", "PostgreSQL", "PEFT"],
      status: "Saved",
      link: "https://sbercareers.ru/vacancies/junior-ds",
      notes: "Предиктивная аналитика поведения пользователей и дообучение LLM моделей."
    },
    {
      id: "v6",
      title: "Intern ML / Deep Learning Developer (Audio & Video)",
      company: "ВК (VK)",
      salaryRange: "100 000 - 140 000 ₽",
      location: "Санкт-Петербург / Remote",
      keySkills: ["Python", "asyncio", "ONNX Runtime", "PyTorch", "Audio Signal Processing"],
      status: "Applied",
      link: "https://vk.company/ru/career/vacancies/intern-ml",
      notes: "Рекомендательные системы аудио и видео контента ВКонтакте."
    },
    {
      id: "v7",
      title: "Junior AI Research Engineer (Threat Detection ML)",
      company: "Лаборатория Касперского",
      salaryRange: "130 000 - 180 000 ₽",
      location: "Москва / Гибрид",
      keySkills: ["Python", "Isolation Forest", "Autoencoders", "Linux", "Docker", "Git"],
      status: "Saved",
      link: "https://careers.kaspersky.ru/vacancies/junior-ai-researcher",
      notes: "Применение ML для поиска скрытых аномалий в сетевых логах и файлах."
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
    /* Вакансия 1: Т-Банк — Intern Machine Learning Engineer */
    {
      id: "va_tbank_1",
      vacancyTitle: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      item: "Уверенное знание Python 3, библиотеки Pandas, NumPy и Scikit-Learn",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Базовый стек обработан на 100%. Выполнен проект по EDA и предсказанию оттока пользователей."
    },
    {
      id: "va_tbank_2",
      vacancyTitle: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      item: "Понимание баз данных PostgreSQL и написание сложных SQL-запросов (JOIN, GROUP BY, Window Functions)",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Решено 45 задач уровня Medium/Hard на LeetCode SQL & sql-ex.ru."
    },
    {
      id: "va_tbank_3",
      vacancyTitle: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      item: "Знание основы высшей математики, теории вероятностей и математической статистики",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Фундаментальный бакалавриат по прикладной математике, проработка конспектов ШАД."
    },
    {
      id: "va_tbank_4",
      vacancyTitle: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      item: "Разработка и валидация скоринговых ML-моделей кредитного риска (Gradient Boosting / CatBoost)",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Наставник",
      notes: "Пройти 3 менторские сессии с Senior DS за 2 недели; построить кредитный скоринг на датасете Home Credit (Kaggle) с фильтрацией лика признаков."
    },
    {
      id: "va_tbank_5",
      vacancyTitle: "Intern Machine Learning Engineer (Risk & Credit ML)",
      company: "Т-Банк",
      item: "Написание юнит-тестов и интеграционных тестов для ML-кода на pytest",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти курс 'Тестирование ML-пайплайнов на pytest' за 10 дней, покрыть тестами препроцессинг данных и инференс скоринга."
    },

    /* Вакансия 2: Яндекс — Junior Data Scientist */
    {
      id: "va_yandex_1",
      vacancyTitle: "Junior Data Scientist (NLP / LLM Search)",
      company: "Яндекс",
      item: "Опыт работы с фреймворками глубокого обучения PyTorch и Hugging Face Transformers",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти практический курс 'Deep Learning & PyTorch' на Stepik за 3 недели, выложить на GitHub модель классификации текстов."
    },
    {
      id: "va_yandex_2",
      vacancyTitle: "Junior Data Scientist (NLP / LLM Search)",
      company: "Яндекс",
      item: "Понимание архитектур Transformer (BERT, RoBERTa, GPT) и методик fine-tuning (LoRA, PEFT)",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Обучение",
      notes: "Пройти курс 'HuggingFace NLP & LLM Fine-Tuning' за 2.5 недели, дообучить Qwen 2.5 7B с помощью LoRA/PEFT под задачу классификации выписок."
    },
    {
      id: "va_yandex_3",
      vacancyTitle: "Junior Data Scientist (NLP / LLM Search)",
      company: "Яндекс",
      item: "Предобработка, чистка и токенизация текстовых корпусов больших объемов (NLP pipelines)",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Готовый пайплайн очистки, лемматизации (Natasha/pymorphy3) и BPE-токенизации 5 ГБ текстов."
    },
    {
      id: "va_yandex_4",
      vacancyTitle: "Junior Data Scientist (NLP / LLM Search)",
      company: "Яндекс",
      item: "Оценка качества ранжирования поисковой выдачи с использованием метрик NDCG, MRR, MAP",
      type: "Обязанность",
      status: "Не владею",
      achievementMethod: "Наставник",
      notes: "Изучить раздел 'Learning to Rank' в ШАД за 10 дней, наботать скрипт вычисления NDCG@10 и MRR с ментором из Яндекса."
    },

    /* Вакансия 3: Ozon — Junior ML Engineer */
    {
      id: "va_ozon_1",
      vacancyTitle: "Junior ML Engineer (E-commerce Personalization)",
      company: "Ozon",
      item: "Опыт построения рекомендательных систем (Collaborative Filtering, Two-Tower Models)",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Фриланс-проект",
      notes: "Пройти специализацию 'Recommender Systems' за 3 недели, сделать пет-проект рекомендатора e-commerce товаров (Two-Tower PyTorch model) на GitHub."
    },
    {
      id: "va_ozon_2",
      vacancyTitle: "Junior ML Engineer (E-commerce Personalization)",
      company: "Ozon",
      item: "Знание классических алгоритмов градиентного бустинга (CatBoost, LightGBM, XGBoost)",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Опыт подбора гипепараметров в CatBoost через Optuna, кастомные лосс-функции."
    },
    {
      id: "va_ozon_3",
      vacancyTitle: "Junior ML Engineer (E-commerce Personalization)",
      company: "Ozon",
      item: "Проведение A/B тестирования моделей рекомендаций и расчет статистической значимости",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти курс 'А/Б-тестирование в аналитике' от Strataplan за 2 недели, отработать расчёт p-value, мощности и бутстрап на Python."
    },
    {
      id: "va_ozon_4",
      vacancyTitle: "Junior ML Engineer (E-commerce Personalization)",
      company: "Ozon",
      item: "Упаковка ML-сервисов в Docker контейнеры и деплой REST/gRPC API на FastAPI",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Развернут асинхронный FastAPI микросервис с Docker-compose и валидацией Pydantic."
    },

    /* Вакансия 4: Авито — Intern ML Engineer */
    {
      id: "va_avito_1",
      vacancyTitle: "Intern ML Engineer (Computer Vision & Moderation)",
      company: "Авито",
      item: "Базовые знания компьютерного зрения (CV), работа с библиотеками OpenCV и torchvision",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти курс 'Computer Vision на PyTorch' за 2 недели, изучить методы предобработки и фильтрации изображений."
    },
    {
      id: "va_avito_2",
      vacancyTitle: "Intern ML Engineer (Computer Vision & Moderation)",
      company: "Авито",
      item: "Опыт работы с архитектурами свёрточных сетей CNN (ResNet, EfficientNet) и детекторов (YOLO)",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Стажировка",
      notes: "Освоить Ultralytics YOLOv8 за 10 дней, обучить модель детекции дефектов на 1000 изображений из объявления."
    },
    {
      id: "va_avito_3",
      vacancyTitle: "Intern ML Engineer (Computer Vision & Moderation)",
      company: "Авито",
      item: "Разметка, сбор и аугментация датасетов изображений для обучения нейросетей модерации",
      type: "Обязанность",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Опыт работы с библиотекой Albumentations (Cutout, RandomCrop, Rotation) для подготовки train/val выборок."
    },

    /* Вакансия 5: Сбер — Junior Data Scientist */
    {
      id: "va_sber_1",
      vacancyTitle: "Junior Data Scientist (GigaChat & Predictive Analytics)",
      company: "Сбер",
      item: "Работа с инструментами трекинга ML-экспериментов (MLflow, Weights & Biases)",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Фриланс-проект",
      notes: "За 1 неделю интегрировать MLflow Tracking и Model Registry в 2 существующих пет-проекта."
    },
    {
      id: "va_sber_2",
      vacancyTitle: "Junior Data Scientist (GigaChat & Predictive Analytics)",
      company: "Сбер",
      item: "Опыт проектирования Feature Store и оптимизации витрин признаков для ML",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Опыт на текущем месте",
      notes: "Изучить архитектуру Feast Feature Store за 2 недели, спроектировать прототип витрины фичей клиентского поведения."
    },
    {
      id: "va_sber_3",
      vacancyTitle: "Junior Data Scientist (GigaChat & Predictive Analytics)",
      company: "Сбер",
      item: "Разработка и оркестрация ML-пайплайнов в Apache Airflow",
      type: "Обязанность",
      status: "Не владею",
      achievementMethod: "Обучение",
      notes: "Пройти курс 'Apache Airflow для ML & Data Engineering' на Stepik за 2 недели, написать 3 регулярных DAG с PythonOperator."
    },

    /* Вакансия 6: ВК (VK) — Intern ML / Deep Learning Developer */
    {
      id: "va_vk_1",
      vacancyTitle: "Intern ML / Deep Learning Developer (Audio & Video)",
      company: "ВК (VK)",
      item: "Понимание работы асинхронного Python (asyncio) и микросервисной архитектуры",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Создание высоконагруженных эндпоинтов на asyncio и aiohttp."
    },
    {
      id: "va_vk_2",
      vacancyTitle: "Intern ML / Deep Learning Developer (Audio & Video)",
      company: "ВК (VK)",
      item: "Знание методов обработки цифровых сигналов и получения аудио/видео эмбеддингов",
      type: "Требование",
      status: "Не владею",
      achievementMethod: "Стажировка",
      notes: "Изучить Librosa & torchaudio за 2 недели, сделать экстрактор спектрограмм и эмбеддингов (Mel-Spectrogram)."
    },
    {
      id: "va_vk_3",
      vacancyTitle: "Intern ML / Deep Learning Developer (Audio & Video)",
      company: "ВК (VK)",
      item: "Оптимизация инференса моделей глубокого обучения с помощью ONNX Runtime и TensorRT",
      type: "Обязанность",
      status: "Не владею",
      achievementMethod: "Наставник",
      notes: "Пройти туториал ONNX Runtime за 10 дней с ментором, снизить латентность PyTorch модели инференса в 3 раза."
    },

    /* Вакансия 7: Лаборатория Касперского — Junior AI Research Engineer */
    {
      id: "va_kaspersky_1",
      vacancyTitle: "Junior AI Research Engineer (Threat Detection ML)",
      company: "Лаборатория Касперского",
      item: "Уверенное владение Git, Linux (Bash), Docker и принципами воспроизводимости ML-исследований",
      type: "Требование",
      status: "Владею",
      achievementMethod: "Уже владею",
      notes: "Ежедневная работа в Ubuntu Linux, Docker-контейнерах и ветках Git."
    },
    {
      id: "va_kaspersky_2",
      vacancyTitle: "Junior AI Research Engineer (Threat Detection ML)",
      company: "Лаборатория Касперского",
      item: "Знание алгоритмов обнаружения аномалий (Isolation Forest, Autoencoders, One-Class SVM)",
      type: "Требование",
      status: "Частично",
      achievementMethod: "Обучение",
      notes: "Пройти курс по 'Anomaly Detection & Deep Learning' за 2 недели, реализовать Autoencoder на PyTorch для поиска аномалий в данных."
    },
    {
      id: "va_kaspersky_3",
      vacancyTitle: "Junior AI Research Engineer (Threat Detection ML)",
      company: "Лаборатория Касперского",
      item: "Анализ системных логов и поиск аномальных паттернов с помощью алгоритмов ML",
      type: "Обязанность",
      status: "Частично",
      achievementMethod: "Опыт на текущем месте",
      notes: "Написать парсер логов Nginx/Syslog за 1 неделю, обучить IsolationForest для детекции DDoS-атак."
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
