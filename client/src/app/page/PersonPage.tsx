import * as React from 'react';
import axios from 'axios';
import { PersonModel } from '../person/PersonModel';

export class PersonPage extends React.Component {
  state = {
    persons: Array<PersonModel>()
  };

  componentDidMount() {
    axios.get('api/person/all')
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
  }

  render() {
    return (
      <ul>
        {
          this.state.persons.map(person => <li key={person.id}>{person.firstName}</li>)}
        {
          <li id="Bacon">Bits</li>
        }
      </ul>
    );
  }
}