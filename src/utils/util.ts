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

type Vector2D = { x: number; y: number }
interface ScrollToOptions {
  container?: HTMLElement | null;
  from?: HTMLElement | Vector2D | null;
  to: HTMLElement | Vector2D | null;
  duration?: number;
  offset?: Vector2D;
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
    const from: Vector2D = options.from ? (options.from instanceof HTMLElement ? (options.from.parentElement === container ? { x: options.from.scrollLeft, y: options.from.scrollTop } : { x: container.scrollLeft, y: container.scrollTop }) : options.from) : { x: container.scrollLeft, y: container.scrollTop }
    const { offset = { x: 0, y: 0 } } = options
    const to: Vector2D | null = options.to instanceof HTMLElement ? { x: options.to.offsetLeft + offset.x, y: options.to.offsetTop + offset.y } : { x: options.to.x + offset.x, y: options.to.y + offset.y }
    if (to === null) return
    const { duration = 500 } = options
    const delta = { x: to.x - from.x, y: to.y - from.y }
    const increment = 10
    let currentTime = 0

    function animateScroll () {
      currentTime += increment
      const value = {
        x: easeInOutQuad(currentTime, from.x, delta.x, duration),
        y: easeInOutQuad(currentTime, from.y, delta.y, duration)
      }
      container.scrollTo(value.x, value.y)

      if (currentTime < duration) {
        window.setTimeout(() => requestAnimationFrame(animateScroll), increment)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(animateScroll)
  })
}
