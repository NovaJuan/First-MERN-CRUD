import React,{Component} from 'react'

class SignUp extends Component{
  constructor(){
    super();
    this.state={
      username:'',
      email:'',
      password:'',
      errors:[]
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
    e.preventDefault(e);
    fetch('/api/users/signup',{
      method:'POST',
      headers:{
        "Accept":"application/json",
        "Content-type":"application/json"
      },
      body:JSON.stringify(this.state)
    }).then(res => res.json())
      .then(data => {
        if(data.errors){
          this.setState({
            errors: data.errors
          })
        }else{
          this.setState({
            username:'',
            email:'',
            password:'',
            errors: []
          })
          this.props.history.push('/users/login')
        }
      })
      .catch(err => console.log(err))
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

    const errors =this.state.errors ? (
      this.state.errors.map((error,i) =>{
      return <p className='text-danger' key={i}>{error}</p> 
      })
    ) : (null)

    return(
      <div className="Signup container mt-4 col-md-4">
        <div className="card">
          <div className="card-header">
            <h1>Sign Up</h1>
          </div>
          <div className="card-body">
            <form autoComplete='off' onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="email" onChange={this.handleChange} name="email" placeholder='Email' id="email" className="form-control" required/>
              </div>
              <div className="form-group">
                <input type="text" onChange={this.handleChange} name="username" placeholder='Username' id="username" className="form-control" required/>
              </div>
              <div className="form-group">
                <input type="password" onChange={this.handleChange} name="password" placeholder='Password' id="password" className="form-control" required/>
              </div>
              <div className="form-group">
                <button type="submit" className='btn btn-primary btn-block'>Sign Up</button>
              </div>
              <div className="form-group">
                {errors}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;