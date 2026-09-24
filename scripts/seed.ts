import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.log(`
ℹ️ No SANITY_API_WRITE_TOKEN provided in environment.
To seed real initial data into Sanity project 'i1zx9y9l' (dataset 'production'), run:
  $env:SANITY_API_WRITE_TOKEN="<your-sanity-write-token>"; npx tsx scripts/seed.ts

Or launch the Sanity Studio admin dashboard by running:
  npm run dev (inside agora_admin_dashboard)
and create/edit content interactively through the Studio interface.
`);
  process.exit(0);
}

const client = createClient({
  projectId: 'i1zx9y9l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function seed() {
  console.log('🌱 Seeding initial Agora learning content to Sanity...');

  // 1. Authors
  const aristotle = await client.createIfNotExists({
    _id: 'author-aristotle',
    _type: 'author',
    name: 'Aristotle',
    slug: { _type: 'slug', current: 'aristotle' },
    role: 'Classical Philosopher & Polymath',
    organization: 'Lyceum, Athens',
    bio: 'Aristotle was an Ancient Greek philosopher and polymath whose writings covered many subjects including physics, biology, zoology, metaphysics, psychology, ethics, and aesthetics.',
    isVisible: true,
  });

  const danielKahneman = await client.createIfNotExists({
    _id: 'author-daniel-kahneman',
    _type: 'author',
    name: 'Daniel Kahneman',
    slug: { _type: 'slug', current: 'daniel-kahneman' },
    role: 'Psychologist & Nobel Laureate',
    organization: 'Princeton University',
    bio: 'Daniel Kahneman was an Israeli-American author and psychologist notable for his work on the psychology of judgment and decision-making, as well as behavioral economics.',
    isVisible: true,
  });

  const schoolOfLife = await client.createIfNotExists({
    _id: 'author-school-of-life',
    _type: 'author',
    name: 'The School of Life',
    slug: { _type: 'slug', current: 'the-school-of-life' },
    role: 'Educational Organization',
    organization: 'Global Humanities Collective',
    bio: 'An educational organization offering advice on life issues, philosophy, emotional intelligence, and culture.',
    isVisible: true,
  });

  console.log('✓ Authors seeded');

  // 2. Categories & Tags
  const catResearch = await client.createIfNotExists({
    _id: 'cat-research',
    _type: 'category',
    title: 'Research',
    slug: { _type: 'slug', current: 'research' },
    badgeColor: '#B78B4A',
  });

  const catStudentLife = await client.createIfNotExists({
    _id: 'cat-student-life',
    _type: 'category',
    title: 'Student Life',
    slug: { _type: 'slug', current: 'student-life' },
    badgeColor: '#B78B4A',
  });

  const catEvents = await client.createIfNotExists({
    _id: 'cat-events',
    _type: 'category',
    title: 'Events',
    slug: { _type: 'slug', current: 'events' },
    badgeColor: '#B78B4A',
  });

  const catAcademics = await client.createIfNotExists({
    _id: 'cat-academics',
    _type: 'category',
    title: 'Academics',
    slug: { _type: 'slug', current: 'academics' },
    badgeColor: '#B78B4A',
  });

  console.log('✓ Categories seeded');

  // 3. Subjects
  const psychologySubject = await client.createIfNotExists({
    _id: 'subject-psychology',
    _type: 'subject',
    title: 'Psychology',
    slug: { _type: 'slug', current: 'psychology' },
    subtitle: 'Understand the mind, behavior, and emotions. Improve well-being and build meaningful connections.',
    aboutText: 'Welcome to the Psychology section. This section is designed for anyone curious about the human mind and behavior, from newcomers exploring the field to university students seeking a deeper dive. Here, we discuss the myriad branches of psychology, covering Cognitive Psychology, Developmental Psychology, Social Psychology, Clinical Psychology, Personality Psychology, Biological Psychology, Educational Psychology, Industrial-Organizational Psychology, Counseling Psychology, Cross-Cultural Psychology and Forensic Psychology. Along the way, we examine influential psychological theories, classic and contemporary research, and real-world applications.',
    iconType: 'brain',
    colorTheme: 'space-cadet',
    order: 1,
    isFeatured: true,
    isVisible: true,
    stats: {
      paths: '10',
      resources: '100+',
      articles: '70+',
      videos: '50+',
    },
    topics: [
      'Cognitive Psychology',
      'Development',
      'Social Psychology',
      'Personality',
      'Abnormal Psychology',
      'Neuroscience',
      'Behavior Therapy',
      'Mental Health',
    ],
    quote: {
      _type: 'quote',
      text: 'Knowing yourself is the beginning of all wisdom.',
      author: 'Aristotle',
      role: 'Philosopher',
    },
  });

  const philosophySubject = await client.createIfNotExists({
    _id: 'subject-philosophy',
    _type: 'subject',
    title: 'Philosophy',
    slug: { _type: 'slug', current: 'philosophy' },
    subtitle: 'Explore fundamental questions about existence, knowledge, ethics, and reality.',
    aboutText: 'Welcome to the Philosophy section. This section aims to introduce Philosophy for general audience as well as university students. In this section, we explore the diverse domains of philosophy that includes Axiology, Teleology, Metaphysics, Epistemology, Aesthetics, Logic, and many other branches.',
    iconType: 'landmark',
    colorTheme: 'space-cadet',
    order: 2,
    isFeatured: true,
    isVisible: true,
    stats: {
      paths: '12',
      resources: '120+',
      articles: '90+',
      videos: '60+',
    },
    topics: [
      'Axiology',
      'Teleology',
      'Metaphysics',
      'Epistemology',
      'Aesthetics',
      'Logic',
      'Ethics',
      'Political Philosophy',
    ],
    quote: {
      _type: 'quote',
      text: 'The unexamined life is not worth living.',
      author: 'Socrates',
      role: 'Philosopher',
    },
  });

  const economicsSubject = await client.createIfNotExists({
    _id: 'subject-economics',
    _type: 'subject',
    title: 'Economics',
    slug: { _type: 'slug', current: 'economics' },
    subtitle: 'Understand how societies produce, distribute, and use resources.',
    aboutText: 'Welcome to the Economics section. Here, we explore the diverse domains of economic study, including Microeconomics, Macroeconomics, International Economics, Political Economy, Public Economics, Game Theory, and Behavioral Economics.',
    iconType: 'trending',
    colorTheme: 'warm-brown',
    order: 3,
    isFeatured: true,
    isVisible: true,
    stats: {
      paths: '8',
      resources: '80+',
      articles: '60+',
      videos: '40+',
    },
    topics: [
      'Microeconomics',
      'Macroeconomics',
      'Game Theory',
      'Behavioral Economics',
      'Political Economy',
      'Financial Economics',
    ],
    quote: {
      _type: 'quote',
      text: 'The real price of everything is the toil and trouble of acquiring it.',
      author: 'Adam Smith',
      role: 'Moral Philosopher & Economist',
    },
  });

  const liberalArtsSubject = await client.createIfNotExists({
    _id: 'subject-liberal-arts',
    _type: 'subject',
    title: 'Liberal Arts',
    slug: { _type: 'slug', current: 'liberal-arts' },
    subtitle: 'A broad education that cultivates critical thinking, creativity, and communication.',
    aboutText: 'Welcome to the Liberal Arts section, a space designed for those willing to explore and delve into the world of multi-disciplinary and inter-disciplinary studies. The resources are universal and available to students from various disciplines to expand their knowledge bases.',
    iconType: 'book',
    colorTheme: 'warm-brown',
    order: 4,
    isFeatured: true,
    isVisible: true,
    stats: {
      paths: '12',
      resources: '120+',
      articles: '90+',
      videos: '60+',
    },
    topics: ['History', 'Philosophy', 'Literature', 'Art History', 'Writing', 'Ethics'],
    quote: {
      _type: 'quote',
      text: 'The mind is not a vessel to be filled, but a fire to be kindled.',
      author: 'Plutarch',
      role: 'Philosopher & Essayist',
    },
  });

  console.log('✓ Subjects seeded');

  // 4. Articles
  const articleInterdisciplinary = await client.createIfNotExists({
    _id: 'article-future-interdisciplinary-learning',
    _type: 'article',
    title: 'The Future of Interdisciplinary Learning',
    slug: { _type: 'slug', current: 'the-future-of-interdisciplinary-learning' },
    summary: 'How breaking disciplinary boundaries between arts, humanities, and sciences creates groundbreaking insights.',
    type: 'article',
    readTime: '8 min read',
    publishedAt: new Date('2024-05-10T10:00:00Z').toISOString(),
    isFeatured: true,
    isVisible: true,
    order: 1,
    author: { _type: 'reference', _ref: 'author-school-of-life' },
    subject: { _type: 'reference', _ref: 'subject-liberal-arts' },
    categories: [{ _type: 'reference', _ref: 'cat-research', _key: 'cat-ref-1' }],
    tags: ['Interdisciplinary', 'Education', 'Future'],
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Interdisciplinary learning represents a fundamental evolution in human education. Rather than confining inquiry to isolated academic silos, it invites thinkers to synthesize cognitive psychology, moral philosophy, economic theory, and historical analysis.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Why Siloed Thinking Limits Innovation',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's3',
            text: 'When we examine pressing global challenges—such as artificial intelligence ethics or sustainable economics—no single discipline possesses all the answers. Technical systems require ethical frameworks; economic models depend on human psychological drivers.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b4',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            _key: 's4',
            text: 'The true mark of an educated mind is the ability to entertain an idea across multiple fields of knowledge simultaneously.',
          },
        ],
      },
    ],
  });

  const articleCognitivePsychology = await client.createIfNotExists({
    _id: 'article-how-we-think-and-decide',
    _type: 'article',
    title: 'How We Think: Systems of Cognition and Judgment',
    slug: { _type: 'slug', current: 'how-we-think-and-decide' },
    summary: 'A deep dive into cognitive biases, heuristic reasoning, and how our brains process complex information.',
    type: 'article',
    readTime: '12 min read',
    publishedAt: new Date('2024-05-06T14:00:00Z').toISOString(),
    isFeatured: true,
    isVisible: true,
    order: 2,
    author: { _type: 'reference', _ref: 'author-daniel-kahneman' },
    subject: { _type: 'reference', _ref: 'subject-psychology' },
    categories: [{ _type: 'reference', _ref: 'cat-research', _key: 'cat-ref-2' }],
    tags: ['Cognition', 'Decisions', 'Mind'],
    body: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Human decision-making operates through two distinct modes of thought: fast, automatic, intuitive thinking (System 1) and slow, deliberate, analytical reasoning (System 2).',
          },
        ],
      },
    ],
  });

  console.log('✓ Articles seeded');

  // 5. Events
  const event1 = await client.createIfNotExists({
    _id: 'event-ethics-ai',
    _type: 'event',
    title: 'The Ethics of AI & Machine Consciousness',
    category: 'Online Lecture',
    dateDay: '24',
    dateMonth: 'MAY',
    eventDate: new Date('2026-05-24T15:00:00Z').toISOString(),
    time: '11:00 AM (EST)',
    locationOrPlatform: 'Agora Virtual Lecture Hall',
    order: 1,
    isFeatured: true,
    isVisible: true,
  });

  const event2 = await client.createIfNotExists({
    _id: 'event-the-republic-plato',
    _type: 'event',
    title: 'The Republic by Plato: Justice in the City',
    category: 'Reading Group',
    dateDay: '30',
    dateMonth: 'MAY',
    eventDate: new Date('2026-05-30T20:00:00Z').toISOString(),
    time: '4:00 PM (EST)',
    locationOrPlatform: 'Agora Seminar Room',
    order: 2,
    isFeatured: true,
    isVisible: true,
  });

  const event3 = await client.createIfNotExists({
    _id: 'event-freedom-responsibility',
    _type: 'event',
    title: 'Freedom & Moral Responsibility in Modern Society',
    category: 'Philosophy Café',
    dateDay: '05',
    dateMonth: 'JUN',
    eventDate: new Date('2026-06-05T23:00:00Z').toISOString(),
    time: '7:00 PM (EST)',
    locationOrPlatform: 'Agora Live Dialogue',
    order: 3,
    isFeatured: true,
    isVisible: true,
  });

  console.log('✓ Events seeded');

  // 6. Site Settings Singleton
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'Agora',
    heroHeadline: 'Explore \nArts & Humanities.',
    heroSubheadline: 'What would you like to learn today?',
    featuredSubjects: [
      { _type: 'reference', _ref: 'subject-psychology', _key: 'fsub-1' },
      { _type: 'reference', _ref: 'subject-philosophy', _key: 'fsub-2' },
      { _type: 'reference', _ref: 'subject-economics', _key: 'fsub-3' },
      { _type: 'reference', _ref: 'subject-liberal-arts', _key: 'fsub-4' },
    ],
    aboutSection: {
      title: 'About Us',
      content:
        'Agora is a collaborative space for those curious about the world of arts and humanities. Bringing together students, thinkers, and learners from diverse academic backgrounds, Agora connects people with meaningful resources, ideas, and pathways to explore beyond the boundaries of a classroom. From philosophy and psychology to economics, literature, history, and the liberal arts, our platform makes learning more accessible, interdisciplinary, and engaging.',
      buttonText: 'Learn More About Us',
      buttonLink: '/about',
    },
    featuredArticles: [
      { _type: 'reference', _ref: 'article-future-interdisciplinary-learning', _key: 'fa-1' },
      { _type: 'reference', _ref: 'article-how-we-think-and-decide', _key: 'fa-2' },
    ],
    upcomingEvents: [
      { _type: 'reference', _ref: 'event-ethics-ai', _key: 'fe-1' },
      { _type: 'reference', _ref: 'event-the-republic-plato', _key: 'fe-2' },
      { _type: 'reference', _ref: 'event-freedom-responsibility', _key: 'fe-3' },
    ],
    bottomBanner: {
      title: 'Learn More',
      subtitle: 'Discover courses, resources, and opportunities to grow.',
      buttonText: 'Explore Now',
      buttonLink: '/subjects',
    },
  });

  console.log('✓ Site settings seeded');
  console.log('🎉 Seeding completed successfully!');
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
