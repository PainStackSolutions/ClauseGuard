import { onMounted } from 'vue'

export function useSEO(seoData) {
  const updateMetaTags = () => {
    // Update title
    if (seoData.title) {
      document.title = seoData.title
      updateMetaTag('property', 'og:title', seoData.title)
      updateMetaTag('name', 'twitter:title', seoData.title)
    }

    // Update description
    if (seoData.description) {
      updateMetaTag('name', 'description', seoData.description)
      updateMetaTag('property', 'og:description', seoData.description)
      updateMetaTag('name', 'twitter:description', seoData.description)
    }

    // Update keywords
    if (seoData.keywords) {
      updateMetaTag('name', 'keywords', seoData.keywords)
    }

    // Update canonical URL
    if (seoData.url) {
      updateCanonicalLink(seoData.url)
      updateMetaTag('property', 'og:url', seoData.url)
      updateMetaTag('name', 'twitter:url', seoData.url)
    }

    // Update image
    if (seoData.image) {
      updateMetaTag('property', 'og:image', seoData.image)
      updateMetaTag('name', 'twitter:image', seoData.image)
    }

    // Update type
    if (seoData.type) {
      updateMetaTag('property', 'og:type', seoData.type)
    }
  }

  const updateMetaTag = (attribute, name, content) => {
    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attribute, name)
      element.setAttribute('content', content)
      document.getElementsByTagName('head')[0].appendChild(element)
    }
  }

  const updateCanonicalLink = (url) => {
    let element = document.querySelector('link[rel="canonical"]')
    if (element) {
      element.setAttribute('href', url)
    } else {
      element = document.createElement('link')
      element.setAttribute('rel', 'canonical')
      element.setAttribute('href', url)
      document.getElementsByTagName('head')[0].appendChild(element)
    }
  }

  onMounted(() => {
    updateMetaTags()
  })

  return {
    updateMetaTags,
  }
}

// Predefined SEO data for different pages
export const seoPages = {
  home: {
    title: 'ClauseGuard - AI-Powered Contract Review Made Simple | Legal Document Analysis',
    description:
      "Transform your contract review process with ClauseGuard's AI technology. Instantly identify risky clauses, missing signatures, and renewal deadlines. Save time and reduce legal risks with automated contract analysis.",
    keywords:
      'AI contract review, legal document analysis, contract automation, risk assessment, clause analysis, legal tech, document review software, contract management, AI legal assistant, automated contract analysis, legal compliance, contract security',
    url: 'https://clauseguardai.org/',
    image: 'https://clauseguardai.org/logo.svg',
    type: 'website',
  },
  about: {
    title: 'About ClauseGuard - AI Contract Review Technology | Our Mission',
    description:
      "Learn about ClauseGuard's mission to revolutionize contract review with AI technology. Discover how we help businesses identify risks, ensure compliance, and streamline legal document analysis.",
    keywords:
      'ClauseGuard about, AI legal technology, contract review company, legal tech innovation, automated document analysis, contract compliance, legal risk management',
    url: 'https://clauseguardai.org/about',
    image: 'https://clauseguardai.org/logo.svg',
    type: 'website',
  },
  upload: {
    title: 'Upload Contract for AI Analysis | ClauseGuard Contract Review',
    description:
      'Upload your contracts for instant AI-powered analysis. Get comprehensive risk assessment, identify missing signatures, and flag potential issues in seconds with ClauseGuard.',
    keywords:
      'upload contract, AI contract analysis, document upload, contract review tool, legal document scanner, risk assessment upload, contract analyzer',
    url: 'https://clauseguardai.org/upload',
    image: 'https://clauseguardai.org/logo.svg',
    type: 'website',
  },
}
