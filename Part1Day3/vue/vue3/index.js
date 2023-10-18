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
    let fullName = ref('')
    let group = ref('')
    let birthYear = ref('')
    let isPassedExam = ref(false)

    const deleteStudent = student => {
      students.value = [...students.value].filter(st => {
        return st !== student
      })
    }

    const createStudent = () => {
      students.value.push({
        fullName: fullName.value,
        group: group.value,
        birthYear: birthYear.value,
        isPassedExam: isPassedExam.value
      })
      fullName.value = ''
      group.value = ''
      birthYear.value = ''
      isPassedExam.value = false
    }

    return {
      students,
      search,
      deleteStudent,
      fullName,
      group,
      birthYear,
      isPassedExam,
      createStudent
    }
  }
}).mount('#app')

// new Vue({
//   el: '#app',
//   data: {
//     students: studentsArray,
//     search: '',
//     fullName: '',
//     group: '',
//     birthYear: '',
//     isPassedExam: false
//   },
//   methods: {
//     deleteStudent (student) {
//       this.students = this.students.filter(st => {
//         return st !== student
//       })
//     },
//     createStudent () {
//       this.students.push({
//         fullName: this.fullName,
//         group: this.group,
//         birthYear: this.birthYear,
//         isPassedExam: this.isPassedExam
//       })
//       this.fullName = ''
//       this.group = ''
//       this.birthYear = ''
//       this.isPassedExam = false
//     }
//   }
// })
