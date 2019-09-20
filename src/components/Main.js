import React, { useState, useEffect } from "react";
import { format } from "path";

function Main() {
  let form = new FormData();

  // For the JSON version of the form
  const [formData, setFormData] = useState({});

  const API =
    "https://lvf7rxafk8.execute-api.us-west-2.amazonaws.com/dev/tasks";

  function _handleChangeUpload(event) {
    let value = event.target.files ? event.target.files[0] : event.target.value;
    form.set(event.target.name, value);
  }

  function _handleChange(event) {
    setFormData( {...formData, [event.target.name]:event.target.value});
  }
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then(data => data.json())
      .then(fetchedTasks => setTasks(fetchedTasks));
  }

  function _upload(event, task) {
    event.preventDefault();
    fetch(`${API}/${task.id}/images`, {
      method: "POST",
      mode: "no-cors",
      body: form
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  }

  function _handleSubmit(event) {
    event.preventDefault();
    //fetch (`${API}/tasks`)
    fetch(`${API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
  }

  useEffect(_getTasks, []);

  return (
    <div className="container-fluid">
      <div className="list-group">
      
        <h4>Json Submit Form</h4>
        <form onSubmit={_handleSubmit}>
          <label>
            <span>Title</span>
            <input onChange={_handleChange} name="title" placeholder="title" />
          </label>
          <label>
            <span>Description</span>
            <input
              onChange={_handleChange}
              name="description"
              type="text"
              placeholder="description"
            />
          </label>
          <label>
            <span>Assignee</span>
            <input
              onChange={_handleChange}
              name="assignee"
              type="text"
              placeholder="assignee"
            />
          </label>
          <button>Save</button>
        </form>
        <br />
        {tasks.map((task, idx) => {
          return (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              key={task.id}
            >
              <details>
                <summary>
                  Task:<span>{task.title} </span>
                  <br />
                  {displayThumbnail(task.pic)}
                  <br />
                  <br />
                  {/* <span>{task.pic}</span> */}
                  <img src={task.pic} alt="image" />
                  <br />
                  <br />
                  <form
                    onSubmit={e => _upload(e, task)}
                    action={API + `/${task.id}/images`}
                    method="post"
                    encType="multipart/form-data"
                  >
                    <label>
                      <span>Upload image</span>
                      <input onChange={_handleChangeUpload} name="file" type="file" />
                    </label>
                    <button> Save</button>
                  </form>
                </summary>
                History: <History history={task.historyList} />
              </details>
            </a>
          );
        })}
      </div>
    </div>
  );

  function History(props) {
    return (
      <ol>
        {props.history.map((record, idx) => {
          return (
            <li key={idx}>
              <span>{record.date}</span>
              <span>{record.action}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  //Display thumbnail pictures
  function displayThumbnail(picUrl) {
    console.log(picUrl);
    return (
      // <img src={`https://resized-pictures.s3-us-west-2.amazonaws.com/resized` + `resized-pictures-` + {srcKey} />

      <img src="https://resized-pictures.s3-us-west-2.amazonaws.com/resized-pictures-1568418587416-12.jpg" />
    );
  }
}
export default Main;
