import Vue from 'vue'

function serverErrors (field) {
  console.log(Vue.prototype)
  return true
  // return errors === null && errors[field] === 'undefined'
}

export { serverErrors }
