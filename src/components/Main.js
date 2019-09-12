import React, {useState, useEffect} from 'react';

const API = 'http://taskmaster1-dev1.us-west-2.elasticbeanstalk.com/api1/v2/tasks';

function Main() {
  const[tasks, setTasks] = useState([]);

  function _getTasks(){
    fetch(API)
    .then(data => data.json())
    .then (fetchedTasks => setTasks(fetchedTasks));
  }

  useEffect(_getTasks, []);

  return (
    <div className="container-fluid"> 
      <div className="list-group">
        {tasks.map((task, idx) => {
          return (
            <a href="#" className="list-group-item list-group-item-action" key={task.id}>
              <details>
                <summary>
                  Task:<span>{task.title} </span>
                </summary>
                History: <History history={task.historyList}/>
              </details>
            </a>
          )
        })}
      </div>
    </div>
  )
}

function History(props){
  return (
    <ol>
      {props.history.map((record, idx) => {
        return (
          <li key={idx}>
            <span>{record.date}</span>
            <span>{record.action}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default Main;
