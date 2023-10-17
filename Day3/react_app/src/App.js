import React, { useState } from 'react'
import styles from './App.module.css'
import students from './students.json'

function App () {
  const [search, setSearch] = useState('')
  const [studentList, setStudentList] = useState(students)
  const [fullName, setFullName] = useState('')
  const [group, setGroup] = useState('')
  const [birthYear, setBirthYear] = useState(NaN)
  const [isPassedExam, setIsPassedExam] = useState(false)

  const checkboxHandler = index => {
    const updatedStudents = [...studentList]
    updatedStudents[index].isPassedExam = !updatedStudents[index].isPassedExam
    setStudentList(updatedStudents)
  }

  const deleteStudent = index => {
    const updatedStudents = [...studentList]
    updatedStudents.splice(index, 1)
    setStudentList(updatedStudents)
  }

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  const filteredStudents = studentList.filter(student =>
    student.fullName.includes(search)
  )

  const createStudent = e => {
    e.preventDefault()
    setStudentList([
      ...studentList,
      { fullName, group, birthYear, isPassedExam }
    ])
    setFullName('')
    setGroup('')
    setBirthYear('')
    setIsPassedExam(false)
  }

  return (
    <div className={styles.App}>
      <h1>Пошук</h1>
      <input
        type='text'
        name='search'
        onChange={handleSearchChange}
        value={search}
      />
      <table>
        <thead>
          <tr>
            <th>ПІБ</th>
            <th>Група</th>
            <th>Рік народження</th>
            <th>Здав практичну</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td
                className={
                  student.fullName.includes(search) && search !== ''
                    ? styles.red
                    : styles.black
                }
              >
                {student.fullName}
              </td>
              <td>{student.group}</td>
              <td>{student.birthYear}</td>
              <td>
                <input
                  type='checkbox'
                  name='isPassedExam'
                  checked={student.isPassedExam}
                  onChange={() => checkboxHandler(index)}
                />
              </td>
              <td>
                <button onClick={() => deleteStudent(index)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Додати учня</h2>
      <form onSubmit={createStudent} class={styles.studentForm}>
        <div class={styles.formGroup}>
          <label for='fullName'>ПІБ</label>
          <input
            type='text'
            id='fullName'
            name='fullName'
            onChange={e => setFullName(e.target.value)}
            value={fullName}
            required
          />
        </div>

        <div class={styles.formGroup}>
          <label for='group'>Група</label>
          <input
            type='text'
            id='group'
            name='group'
            onChange={e => setGroup(e.target.value)}
            value={group}
            required
          />
        </div>

        <div class={styles.formGroup}>
          <label for='birthYear'>Рік народження</label>
          <input
            type='number'
            id='birthYear'
            name='birthYear'
            onChange={e => setBirthYear(e.target.value)}
            value={birthYear}
            required
          />
        </div>

        <div class={styles.formGroup}>
          <label for='isPassedExam'>Здав</label>
          <input
            type='checkbox'
            id='isPassedExam'
            name='isPassedExam'
            onChange={e => setIsPassedExam(e.target.value)}
            value={isPassedExam}
          />
        </div>

        <button type='submit' class={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
