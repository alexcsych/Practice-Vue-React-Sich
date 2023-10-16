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

new Vue({
  el: '#app',
  data: {
    students: studentsArray,
    search: ''
  },
  methods: {
    deleteStudent (student) {
      this.students = this.students.filter(st => {
        return st !== student
      })
    }
  }
})
