import React from 'react'

type addTaskProps = {
  title : string,
  description : string,
  subtasks : string[],

}

export default function Addtask() {
  return (
    <div>
        <button>add task</button>
    </div>
  )
}
