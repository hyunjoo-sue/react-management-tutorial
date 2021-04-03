
import './App.css';
import Paper from '@material-ui/core/Paper'
import Customer from './components/Customer'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';

const styles = theme => ({
  root: {
    width: '100%',

    OverflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})


const customers = [{
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
  'name' : '이현주',
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
]

function App (props) {
    const classes = styles();
    return ( 
      <Paper className='styles.root'>
        <Table className='styles.table'>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers.map(customer => {
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
              }) 
            }
          </TableBody>

        </Table>

    </Paper>
    );
}

export default App;
