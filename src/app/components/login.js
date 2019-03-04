import React,{Component} from 'react'

class LogIn extends Component{
  constructor(){
    super();
    this.state={
      username:'',
      password:'',
      error:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    fetch('/api/users/login', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify(this.state)
    }).then(res => res.json())
      .then(data =>{
        if(!data.error){
          this.setState({
            error:''
          })
          this.props.handleLogging()
          this.props.history.push('/');
        }else{
          this.setState({
            error:data.error
          })
        }
      })
  }

  componentDidMount(){
    fetch(`/api/users/auth/${document.cookie.split('=')[1]}`)
      .then(res => res.json())
      .then(data => {
        if(data.isLogged == true){
          this.props.history.push('/');
        }
      })
      .catch(err => console.log(err))
  }


  render(){


    return(
      <div className="Signup container mt-4 col-md-4">
        <div className="card">
          <div className="card-header">
            <h1>Log In</h1>
          </div>
          <div className="card-body">
            <form autoComplete='off' onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" onChange={this.handleChange} name="username" placeholder='Username' id="username" className="form-control" required/>
              </div>
              <div className="form-group">
                <input type="password" onChange={this.handleChange} name="password" placeholder='Password' id="password" className="form-control" required/>
              </div>
              <div className="form-group">
                <button type="submit" className='btn btn-primary btn-block'>Log In</button>
              </div>
              <div className="form-group">
                <p className='text-danger'>{this.state.error}</p>
              </div>
              <div className="form-group">
                <p className='text-danger'>{this.state.error}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn;