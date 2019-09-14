import React, {useState, useEffect} from 'react';
import { format } from 'path';

let form = new FormData();
const API = 'http://taskmaster1-dev1.us-west-2.elasticbeanstalk.com/api1/v2/tasks';

function _handleChange(event) {
  let value = event.target.files ? event.target.files[0] : event.target.value;
  form.set(event.target.name, value);

}


function Main() {
  const[tasks, setTasks] = useState([]);
  
  function _getTasks(){
    fetch(API)
    .then(data => data.json())
    .then (fetchedTasks => setTasks(fetchedTasks));
  }
  
            function _upload(event, task) {
              event.preventDefault();
              fetch(`${API}/${task.id}/images`, {
                method: "POST",
                mode: 'no-cors',
                body: form,
              })
              .then (response => response.json())
              .catch(error => console.error('Error:', error))
              .then(response => console.log('Success:', response));
               
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
                  Task:<span>{task.title} </span><br />
                  {/* <span>{task.pic}</span> */}
                  <img src={task.pic} alt="image" />
                  <form onSubmit={ (e) => _upload(e, task)} action={API+`/${task.id}/images`} method="post" encType="multipart/form-data">
                    <label>
                      <span>Upload image</span>
                      <input onChange={_handleChange} name ="file" type = "file" />
                    </label>
                    <button> Save</button>
                  </form>
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
