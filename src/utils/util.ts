import { join } from 'path-browserify'

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
