import React , {Component} from 'react';
import Navbar from './components/navbar'
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Signup from './components/signup';
import LogIn from './components/login';

class App extends Component{

  constructor(){
    super();
    this.state = {
      username:'',
      userID:'',
      isLogged: false
    }
    this.handleLogging = this.handleLogging.bind(this)
  }

  handleLogging(){
    fetch(`/api/users/auth/${document.cookie.split('=')[1]}`)
      .then(res => res.json())
      .then(data => {
        if(data.isLogged == true){
          this.setState({
            username:data.username,
            userID:data.userID,
            isLogged:true
          })
        }else{
          this.setState({
            username:'',
            userID:'',
            isLogged:false
          })
          this.props.history.push('/login')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.handleLogging()
  }


  render(){
    return(
      <BrowserRouter>
        <div className="App">
            <Navbar isAuthed={this.state} />
            <Switch>
              <Route exact path='/' render={(props) => <Dashboard {...props} isAuthed={this.state} />} />
              <Route path='/signup' render={(props) => <Signup {...props} handleLogging ={this.handleLogging} isAuthed={this.state} />} />
              <Route path='/login' render={(props) => <LogIn {...props} handleLogging ={this.handleLogging}  />}  />
              <Redirect to='/' />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;