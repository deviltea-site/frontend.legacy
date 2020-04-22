/* eslint-disable @typescript-eslint/no-non-null-assertion */
const metasDOM = Array.from(document.querySelectorAll('head>.meta')) as HTMLElement[]

const headPayloads = {
  title: metasDOM[0],
  description: metasDOM[1],
  'og:title': metasDOM[2],
  'og:description': metasDOM[3],
  'og:url': metasDOM[4],
  'og:image': metasDOM[5],
  'og:type': metasDOM[6],
  'og:site_name': metasDOM[7]
}

const defaultValue = {
  title: 'DevilTea',
  description: 'DevilTea 的個人網站',
  url: 'https://deviltea.me/',
  image: 'https://deviltea.me/images/og.png',
  type: 'blog'
}

const head = {
  reset () {
    headPayloads.title.innerText = defaultValue.title
    headPayloads.description.setAttribute('content', defaultValue.description)
    headPayloads['og:title'].setAttribute('content', defaultValue.title)
    headPayloads['og:description'].setAttribute('content', defaultValue.description)
    headPayloads['og:url'].setAttribute('content', defaultValue.url)
    headPayloads['og:image'].setAttribute('content', defaultValue.image)
    headPayloads['og:type'].setAttribute('content', defaultValue.type)
    headPayloads['og:site_name'].setAttribute('content', defaultValue.title)
  },
  title (text: string, withSuffix = true) {
    headPayloads.title.innerText = `${text}` + (withSuffix ? ` | ${defaultValue.title}` : '')
  },
  ogTitle (text: string, withSuffix = true) {
    headPayloads['og:title'].setAttribute('content', `${text}` + (withSuffix ? ` | ${defaultValue.title}` : ''))
  },
  description (text: string) {
    headPayloads.description.setAttribute('content', text)
  },
  ogDescription (text: string) {
    headPayloads['og:description'].setAttribute('content', text)
  },
  ogImage (link: string) {
    headPayloads['og:image'].setAttribute('content', link)
  },
  ogType (text: string) {
    headPayloads['og:type'].setAttribute('content', text)
  },
  ogUrl (link: string) {
    headPayloads['og:url'].setAttribute('content', link)
  }
}

export default head
