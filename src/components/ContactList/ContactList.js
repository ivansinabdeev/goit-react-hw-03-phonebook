import React, { Component } from 'react';

import s from './ContactList.module.css';

class ContactList extends Component {
  handleClick = () => {
    const { id, handleClick } = this.props;
    handleClick(id);
  };

  render() {
    const { id, name, number } = this.props;
    return (
      <li key={id}>
        {name}:{number}
        <button className={s.buttonDelete} onClick={this.handleClick}>
          Delete
        </button>
      </li>
    );
  }
}

export default ContactList;
