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
