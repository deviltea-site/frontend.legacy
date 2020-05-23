import { join } from 'path-browserify'
import { Route } from 'vue-router'

export function isProduction () {
  return process.env.NODE_ENV === 'production'
}

export function delay (ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms) })
}

export function getFullUrl (relativeUrl = ''): string {
  // this condition is for running scripts in node environment without 'window'
  if (typeof window === 'undefined') return 'https://google.com'
  if (isProduction()) {
    return `https://${join(`deviltea.me${process.env.BASE_URL}`, relativeUrl).toString()}`
  }
  return `${window.location.protocol}//${join(`${window.location.host}${process.env.BASE_URL}`, relativeUrl).toString()}`
}

export function saveFile (filename: string, content: string, type = 'text/plain;charset=utf-8') {
  const element = document.createElement('a')
  element.setAttribute('href', `data:${type},${encodeURIComponent(content)}`)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export function isSameRoute (to: Route, from?: Route) {
  return from && to.fullPath === from.fullPath
}

interface ScrollToOptions {
  container?: HTMLElement | null;
  from?: HTMLElement | number | null;
  to: HTMLElement | number | null;
  duration?: number;
  offsetTop?: number;
  onComplete?: () => void;
}

function easeInOutQuad (currentTime: number, start: number, delta: number, duration: number) {
  currentTime /= duration / 2
  if (currentTime < 1) return delta / 2 * currentTime * currentTime + start
  currentTime--
  return -delta / 2 * (currentTime * (currentTime - 2) - 1) + start
}

export function scrollTo (options: ScrollToOptions) {
  return new Promise((resolve) => {
    if (options.to === null) return
    const container: HTMLElement = options.container || document.body
    const from: number = options.from ? (typeof options.from === 'number' ? options.from : (options.from.parentElement === container ? options.from.scrollTop : container.scrollTop)) : container.scrollTop
    const { offsetTop = 0 } = options
    const to: number | null = typeof options.to === 'number' ? options.to + offsetTop : options.to.offsetTop + offsetTop
    if (to === null) return
    const { duration = 500 } = options
    const { onComplete } = options
    const delta: number = to - from
    const increment = 20
    let currentTime = 0

    const animateScroll = () => {
      currentTime += increment
      const value = easeInOutQuad(currentTime, from, delta, duration)
      container.scrollTo(0, value)
      if (currentTime < duration) {
        window.setTimeout(animateScroll, increment)
      } else {
        resolve()
        if (onComplete) onComplete()
      }
    }
    animateScroll()
  })
}
