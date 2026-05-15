export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, title_en, slug, publishedAt, excerpt, excerpt_en, mainImage, categories
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, title_en, slug, publishedAt, excerpt, excerpt_en, mainImage, body, body_en, categories
}`

export const projectsQuery = `*[_type == "project" && active == true] | order(order asc) {
  _id, title, title_en, slug, description, description_en, mainImage, active
}`

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id, name, role, role_en, team, bio, bio_en, photo
}`

export const pageQuery = `*[_type == "page" && pageId.current == $pageId][0] {
  _id, pageId, title_de, title_en, hero_subtitle_de, hero_subtitle_en, body_de, body_en
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteTitle, siteDescription_de, siteDescription_en,
  contactEmail, donationIban, instagramUrl, facebookUrl,
  footerText_de, footerText_en
}`
