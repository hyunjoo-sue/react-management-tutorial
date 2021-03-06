import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

import './App.css';
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    OverflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})


/* const customers = [
  {
    'id' : 1,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '이현주',
    'birthday' : '961222',
    'gender' : '여자',
    'job' : '학생'
  },
  {
    'id' : 2,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '이현주2',
    'birthday' : '961222',
    'gender' : '여자',
    'job' : '학생2'
  },
  {
    'id' : 3,
    'image' : 'https://placeimg.com/64/64/any',
    'name' : '이현주3',
    'birthday' : '961222',
    'gender' : '여자',
    'job' : '학생3'
  }
] */

class App  extends Component {
  //state : 컴포넌트 내에서 변경가능한 변수를 정의

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed:0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers : '',
      completed : 0
    })

    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err))
  }         

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();

    return body;
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: (completed >= 100? 0 : completed + 1)})
  }


  render() {
    const {classes} = this.props
    return ( 
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호1</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(customer => {
                  return(
                    <Customer
                      stateRefresh={this.stateRefresh}
                      key={customer.id}
                      id= {customer.id}
                      img= {customer.image}
                      name = {customer.name}
                      birthday={customer.birthday}
                      gender={customer.gender}
                      job={customer.job}
                  />
                  )
                }) : 
                <TableRow> 
                  <TableCell colSpan = "6" align="center">
                  {this.state.completed}
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
                
                }   
            </TableBody>
          </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
    );
  }
}

//export default App;
export default withStyles(styles)(App);