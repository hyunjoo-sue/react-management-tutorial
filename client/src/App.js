import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    OverflowX: "auto"
  },
  table: {
    minWidth: 1080
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
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    console.log(body);
    return body;
  }

  render() {
    const {classes} = this.props
    return ( 
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
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(customer => {
                return(
                  <Customer
                    key={customer.id}
                    id= {customer.id}
                    img= {customer.image}
                    name = {customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                />
                )
              }) : "" }
          </TableBody>
        </Table>
    </Paper>
    );
  }
}

//export default App;
export default withStyles(styles)(App);