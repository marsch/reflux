import localforage from 'localforage'

export default function() {
  this.$get = function() {
    return localforage
  }
}
