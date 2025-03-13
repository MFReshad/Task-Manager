
import './App.css';
import React, {Component} from 'react';
import Modal from "./components/Modal";
import axios from 'axios';


/*
function App() {
  return (
    <div className="App">
       <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
      Konnichiwa
    </div>
  );
}


const tasks = [
  {
    id: 1,
    title: "Hello",
    details: 'snaoidaoisa',
    complete: true,
  },
  {
    id: 2,
    title: "World",
    details: 'sncbaso hosaica oaoidaoisa',
    complete: false,
  },
]
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      modal: false,
      viewCompleted:false,
      // taskList: tasks, 
      activeItem: {
        title: "",
        details: "",
        complete: false
      },
      todoList : []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
    .get("http://localhost:8000/api/tasks/")
    .then(res => this.setState({ todoList: res.data }))
    .catch(err => console.log(err))
  }

  // Create toggle Property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList())
        .catch(err => {
          console.log('Error:', err.response ? err.response.data : err.message);
        });
    } else {
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
    // alert('Saved!' + JSON.stringify(item));
    }
  };
  handleDelete= item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList())
    // alert('Deleted!' + JSON.stringify(item));
  };

  createItem = () => {
    const item = { title: "", details: "", complete: false };
    this.setState({ activeItem: item }, this.toggle); // Open modal after setting item
  };  

  editItem = item => {
    this.setState({ activeItem: item , modal: !this.state.modal });
  };



  displayCompleted = status => {

    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  }

  renderTabList  = () => {
    return (
      <div className='my-5 tab-list'>
        <span
          onClick={()=> this.displayCompleted(true)}
          className={this.state.viewCompleted ? 'active' : ""}
        >
          Completed
        </span>
        <span
          onClick={()=> this.displayCompleted(false)}
          className={this.state.viewCompleted ? '' : "active"}
        >
          Incompleted
        </span>
      </div>
    )
  }

  //  Rendering items in the list {completed || incompleted}
  renderItems = () => {
    const { viewCompleted } = this.state;
    // const newItems = this.state.taskList.filter(
    const newItems = this.state.todoList.filter(
      item => item.complete === viewCompleted
    );
    return newItems.map(item => (
      <li key ={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-title me-2 ${this.state.viewCompleted ? "completed-todo" : "" }`}
          title={item.title}>
          {item.title}
        </span>
        <span>
          <button className='btn btn-info me-2' onClick={() => this.editItem(item)}>Edit</button>
          <button className='btn btn-danger me-2' onClick={() => this.handleDelete(item)}>Delete</button>

        </span>
      </li>
    ));
  };

  

  render() {
    return (
      <main className='content p-3 mb-2 bg-info'>
        <h1 className='text-black text-center my-4'>Todo List</h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className='btn btn-warning' onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className='my-5 mb-2 bg-info text-white text-center'>
          Copyright 2025 &copy; All Rights Reserved
        </footer>
        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
        ): null}
      </main>
    )
  }

}

export default App;
