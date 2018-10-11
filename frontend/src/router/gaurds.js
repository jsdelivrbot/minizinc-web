import firebase from 'firebase'
export function isLoggedIn (to, from, next) {
  if (firebase.auth().currentUser) return next()
  return next({ name: 'login' })
}

export function isLoggedOut (to, from, next) {
  if (!firebase.auth().currentUser) return next()
  return next({ name: 'ide' })
}
