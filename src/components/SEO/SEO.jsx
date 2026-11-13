
import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'EasyGest'
const SITE_URL = 'https://easygesterp.vercel.app'

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  noIndex = false
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : 'Gestão Empresarial Simplificada | EasyGest'

  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Helmet>
  )
}
