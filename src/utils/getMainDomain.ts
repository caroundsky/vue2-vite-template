export default function getMainDomain() {
  const hostname = window.location.hostname
  const match = hostname.match(/\w+\.\w+$/)
  return match ? match[0] : hostname
}
