/* eslint-disable @typescript-eslint/no-non-null-assertion */
const titleDOM = document.querySelector('head>title') as HTMLElement
const metaDOM = Array.from(document.querySelectorAll('head>meta')) as HTMLElement[]

const headPayloads = {
  title: titleDOM,
  'og:title': metaDOM[3],
  'og:description': metaDOM[4],
  'og:url': metaDOM[5],
  'og:image': metaDOM[6],
  'og:type': metaDOM[7],
  'og:site_name': metaDOM[8]
}

const defaultValue = {
  title: 'DevilTea',
  description: 'DevilTea 的個人網站',
  url: 'https://deviltea.me/',
  image: 'https://deviltea.me/images/og.png',
  type: 'website'
}

const head = {
  reset () {
    headPayloads.title.innerText = defaultValue.title
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
