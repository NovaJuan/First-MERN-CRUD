const {connect} = require('mongoose')

connect('mongodb://juanrm:jr071201@ds249035.mlab.com:49035/first-mern-crud',{useNewUrlParser:true})
  .then(()=>console.log('DB is ON'))
  .catch(err => console.log(err))

module.exports = connect;