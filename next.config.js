/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  trailingSlash: true,
  exportTrailingSlash: true,
  pwa: {
    dest: '/public',
    runtimeCaching,
  },
  compress:false
})
