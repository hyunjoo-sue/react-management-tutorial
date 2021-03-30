
import './App.css';
import Customer from './components/Customer'

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

function App() {
  return (
    <div>
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
  </div>
  );
}

export default App;
