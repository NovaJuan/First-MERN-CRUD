import React , {Component} from 'react';

class Dashboard extends Component{

  constructor(){
    super();
    this.state = {
      authorID:'',
      title: '',
      description: '',
      priority: '',
      todos:[],
      id: ''
    }

    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  addTask(e){
    e.preventDefault();

    if(this.state.id){
      fetch(`/api/todos/${this.state.id}`, {
        method:'PUT',
        headers:{
          "Accept": "application/json",
          "Content-type":"application/json"
        },
        body:JSON.stringify(this.state)
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      
      this.setState({
        title:'',
        description:'',
        priority:'',
        id:''
      });

      this.fetchTodos();
    
    }else{
      fetch('/api/todos',{
        method:'POST',
        headers: {
          "Accept": "application/json",
          "Content-type":"application/json"
        },
        body:JSON.stringify(this.state)
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      
      this.setState({
        title:'',
        description:'',
        priority:''
      });

      this.fetchTodos();
    }

  }

  deleteTodo(id){
    fetch(`/api/todos/${id}`, {
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      }
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    this.fetchTodos();
  }

  editTodo(id){
    this.setState({id})
    fetch(`/api/todos/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const {title,description,priority} = data;
        this.setState({
          title,
          description,
          priority
        });
      })
      .catch(err => console.log(err));
  }

  fetchTodos(){
    fetch(`/api/todos/${this.state.authorID}`)
      .then(res => res.json())
      .then(data => this.setState({todos:JSON.parse(data)}))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    console.log(this.state.todos)
    fetch(`/api/users/auth/${document.cookie.split('=')[1]}`)
      .then(res => res.json())
      .then(data => {
        if(data.isLogged){
          this.setState({authorID:data.userID})
          this.fetchTodos();
        }else{
          this.setState({authorID:''})
          this.props.history.push('/login')
        }
      })
  }

  handleChange(e){
    const {name,value} = e.target;
    this.setState({
      [name]:value
    });
  }

  render(){

    const todoList = (this.state.todos.length) ? (
      this.state.todos.map((todo,i)=>{
        return(
          <div className="col-md-4 mt-4" key={i}>
            <div className="card text-center">
              <div className="card-header">
                <h3 className='card-title'>{todo.title}</h3>
              </div>
              <div className="card-body">
                <p className='card-text'>{todo.description}</p>
                <hr/>
                <span className="badge badge-pill badge-warning p-2">{todo.priority}</span>
              </div>
              <div className="card-footer">
                <button className='btn btn-danger mr-4' onClick={()=>this.deleteTodo(todo._id)} >Delete</button>
                <button className='btn btn-primary' onClick={()=>this.editTodo(todo._id)} >Edit</button>
              </div>
            </div>
          </div>  
        )
      })
    ) : (
          <div className='col-md-10 mt-4'>
            <div className="card text-center">
              <h3 className='card-body'>There's no Todos for now :)</h3>
            </div> 
          </div>
        )

    return(
      <div className="Dashboard">
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-5 justify-content-center">
              <div className="card">
                <div className="card-header">
                  <h1>Todo App <span className='badge badge-success'>{this.state.todos.length}</span></h1>
                </div>
                <div className="card-body">
                  <form onSubmit={this.addTask} autoComplete='off'>
                    <div className="form-group">
                      <input type="text" value={this.state.title} required onChange={this.handleChange} name="title" placeholder='Todo Title' className='form-control form-control-lg' />
                    </div>
                    <div className="form-group">
                      <textarea name="description" value={this.state.description} required onChange={this.handleChange} placeholder='Todo Description' className='form-control form-control-lg' />
                    </div>
                    <div className="form-group">
                      <label htmlFor="priority">Priority:</label>
                      <select name="priority" value={this.state.priority} required onChange={this.handleChange} id='priority' className="form-control form-control-lg">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">{this.state.id ? 'Update':'Add'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row justify-content-center">
                  {todoList}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;