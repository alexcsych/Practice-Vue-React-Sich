var studentsArray = [
  {
    fullName: 'Іванов Іван Іванович',
    group: 'РПЗ 20-1/9',
    birthYear: 2005,
    isPassedExam: true
  },
  {
    fullName: 'Петров Петро Петрович',
    group: 'РПЗ 20-2/9',
    birthYear: 2004,
    isPassedExam: false
  },
  {
    fullName: 'Сидорова Марія Олександрівна',
    group: 'РПЗ 20-1/9',
    birthYear: 2005,
    isPassedExam: true
  }
]

const { createApp, ref, computed } = Vue
createApp({
  setup () {
    let students = ref(studentsArray)
    let search = ref('')

    const deleteStudent = student => {
      students.value = [...students.value].filter(st => {
        return st !== student
      })
    }
    return { students, search, deleteStudent }
  }
}).mount('#app')

// new Vue({
//   el: '#app',
//   data: {
//     students: studentsArray,
//     search: ''
//   },
//   methods: {
//     deleteStudent (student) {
//       this.students = this.students.filter(st => {
//         return st !== student
//       })
//     }
//   }
// })
