import Head from 'next/head'
import { useState, useEffect } from 'react'
import TaskList from '../components/TaskList'
import TaskListItem from '../components/TaskListItem'
import TaskInput from '../components/TaskInput'

import IndexedDB from './api/IndexedDB'

export default function Home() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    let indexedDB = IndexedDB()
    if (indexedDB) {
      indexedDB.getAllStoreIndexedDB((data) => {
        // console.log('data', data)
        setTasks(data.map((item) => {
          return {
            id: item.id,
            title: item.data.title,
            status: item.data.status
          }
        }))
      })
    }
  });
  return (
    <div className='container'>
      <Head>
        <title>Todo Task Web App</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Roboto+Mono:400,500|Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <main style={{ maxWidth: '966px', margin: 'auto' }}>
        <TaskInput onAdd={(task) => setTasks([...tasks, task])} />
        <TaskList>
          {tasks.map((task) => {
            return (
              <TaskListItem key={task.id} task={task}>
                {task.title}
              </TaskListItem>
            )
          })}
        </TaskList>
      </main>
    </div>
  )
}
