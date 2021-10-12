import React, { Component } from 'react';

import Form from './components/Form/Form';
import Title from './components/Title/Title';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = contact => {
    this.state.contacts.forEach(el => {
      if (el.name.toLowerCase() === contact.name.toLowerCase()) {
        contact.name = 'repeat';
        return alert('contact already exist at phonebook');
      }
    });
    if (contact.name === 'repeat') {
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  handleRemove = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getvisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const visibleContacts = this.getvisibleContacts();

    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit} />
        {contacts.length ? <Title title="Contacts" /> : null}
        <Filter value={filter} onChange={this.changeFilter} />

        <ul>
          {visibleContacts.map(contact => (
            <ContactList
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              handleClick={this.handleRemove}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
