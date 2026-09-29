// Documents
import { subject } from './documents/subject'
import { learningPath } from './documents/learningPath'
import { article } from './documents/article'
import { resource } from './documents/resource'
import { author } from './documents/author'
import { category } from './documents/category'
import { tag } from './documents/tag'
import { event } from './documents/event'
import { siteSettings } from './documents/siteSettings'
import { communitySubmission } from './documents/communitySubmission'

// Objects
import { seo } from './objects/seo'
import { quote } from './objects/quote'
import { pteImage } from './objects/pteImage'
import { learningStep } from './objects/learningStep'

export const schemaTypes = [
  // Singleton / Settings
  siteSettings,

  // Core Learning Entities
  subject,
  learningPath,
  article,
  resource,

  // Taxonomy & Creators
  author,
  category,
  tag,
  event,

  // Community
  communitySubmission,

  // Object Types
  seo,
  quote,
  pteImage,
  learningStep,
]
