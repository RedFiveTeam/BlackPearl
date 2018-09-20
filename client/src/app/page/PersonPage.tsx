import * as React from 'react';
import axios from 'axios';
import { PersonModel } from '../person/PersonModel';

class MyForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.addPerson}>
        <input type="textarea" id="firstName" placeholder="First Name"/>
        <input type="textarea" id="lastName" placeholder="Last Name"/>
        <button type="submit">Add Person</button>
      </form>
    );
  }

  addPerson() {
    alert();
  }
}

export class PersonPage extends React.Component {
  state = {
    persons: Array<PersonModel>()
  };

  componentDidMount() {
    axios.get('api/person/all')
      .then(res => {
        const persons = res.data;
        this.setState({persons});
      });
  }

  render() {
    return (
    <div>
      <ul>
          {this.state.persons.map(person => <li key={person.id}>{person.firstName}</li>)}
        </ul>
      <MyForm />
      </div>
    );
  }
}