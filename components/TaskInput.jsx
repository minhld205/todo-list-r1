import { useState } from 'react'
import Button from '@material-ui/core/Button'
import IndexedDB from '../pages/api/IndexedDB'

export default ({ onAdd }) => {
  const [taskTitle, updateTaskTitle] = useState('')
  let indexedDB = IndexedDB()
  const addTask = () => {
    if (onAdd && taskTitle) {
      let item = {
        id: Date.now(),
        title: taskTitle,
        status: 'todo'
      }
      // no need to add item munually, just update the indexedDb
      // onAdd(item)
      if (indexedDB) {
        indexedDB.saveIndexedDB(item.id, {title: taskTitle, status: 'todo'});
        // console.log('loadIndexedDB', indexedDB.loadIndexedDB(67890, (resp) => {
        //   console.log(resp)
        // }))
      }
    }
    updateTaskTitle('')
  }
  return (
    <>
      <form className="container" onSubmit={(e) => {
        e.preventDefault()
        addTask()
      }} >
        <input className="task-input" type="text" value={taskTitle} onChange={(e) => updateTaskTitle(e.currentTarget.value)} />
      </form>
      <style jsx>{`
      .container {
        display: flex;
        margin: 16px 0px;
      }
      .task-input {
        appearance: none;
        padding: 8px 4px;
        display: block;
        flex: 1;
        border: 1px solid #dedede;
        border-radius: 2px;
      }
      `}</style>
    </>
  )
}
