import React, { useState } from 'react'
import styles from './App.module.css'
import students from './students.json'

function App () {
  const [search, setSearch] = useState('')
  const [studentList, setStudentList] = useState(students)

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
    </div>
  )
}

export default App
