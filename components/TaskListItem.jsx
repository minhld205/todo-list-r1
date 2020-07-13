import { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
const icons = {
  'todo': 'assignment',
  'in-progress': 'autorenew',
  'done': 'assignment_turned_in',
  'deleted': 'delete',
  'canceled': 'cancel'
}
const colors = {
  'todo': 'grey',
  'in-progress': 'blue',
  'done': 'green',
  'deleted': 'red',
  'canceled': 'black'
}
const statusFlow = {
  'todo': {'start': 'in-progress', 'delete': 'deleted'},
  'in-progress': {'done': 'done', 'cancel': 'canceled'},
  'done': {'delete': 'deleted'},
  'deleted': {},
  'canceled': {'delete': 'deleted'}
}
const buttonVisibilityCondition = {
  'start': ['todo'],
  'done': ['in-progress'],
  'cancel': ['in-progress'],
  'delete': ['todo', 'done', 'canceled']
}
export default ({ children, task }) => {
  const [taskStatus, setTaskStatus] = useState(task.status)
  const changeStatus = (task, action) => setTaskStatus(statusFlow[taskStatus][action])
  return (
    <>
      <li className="task-list__item">
        <Icon style={{ color: colors[taskStatus], margin: 'auto 4px auto 0px' }}>{icons[taskStatus]}</Icon>
        <p className="title">{children}</p>
        <div className="btn-group">
          {buttonVisibilityCondition['start'].indexOf(taskStatus) >= 0 ?
            (<Button type="button" color="primary"
            onClick={() => changeStatus(task, 'start')}>Start</Button>) : null}
          {buttonVisibilityCondition['done'].indexOf(taskStatus) >= 0 ?
            (<Button type="button" color="secondary"
            onClick={() => changeStatus(task, 'done')}>Done</Button>) : null}
          {buttonVisibilityCondition['cancel'].indexOf(taskStatus) >= 0 ?
            (<Button type="button"
            onClick={() => changeStatus(task, 'cancel')}>Cancel</Button>) : null}
          {buttonVisibilityCondition['delete'].indexOf(taskStatus) >= 0 ?
            (<Button type="button"
            onClick={() => changeStatus(task, 'delete')}>Delete</Button>) : null}
        </div>
      </li>
      <style jsx>{
        `
        .task-list__item {
          padding: 4px 8px;
          margin: 2px 0px;
          display: flex;
          background: #fff;
        }
        .title {
          flex: 1;
          margin: auto 0;
        }
        .btn-group {
          display: flex;
        }
        `
      }</style>
    </>
  )
}
