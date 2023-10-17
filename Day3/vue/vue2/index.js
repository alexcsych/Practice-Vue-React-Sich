// varvm = new Vue({
//   el: '#databinding',
//   data: {
//     num1: 100,
//     num2: 200,
//     total: '',
//     styleobj: {
//       width: '100px',
//       height: '100px',
//       backgroundColor: 'red'
//     }
//   },
//   methods: {
//     changebgcolor: function () {
//       this.styleobj.backgroundColor = 'green'
//     },
//     originalcolor: function () {
//       this.styleobj.backgroundColor = 'red'
//     }
//   }
// })
const { createApp, ref, computed } = Vue
createApp({
  setup () {
    let num1 = ref(100)
    let num2 = ref(200)
    let styleobj = ref({
      width: '100px',
      height: '100px',
      backgroundColor: 'red'
    })
    const changebgcolor = () => {
      styleobj.value.backgroundColor = 'green'
    }
    const originalcolor = () => {
      styleobj.value.backgroundColor = 'red'
    }
    return { num1, num2, styleobj, changebgcolor, originalcolor }
  }
}).mount('#databinding')
