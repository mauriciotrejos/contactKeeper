import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, updateContact, clearCurrent } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current, contactContext]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current) updateContact(contact);
    else addContact(contact);
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add new contact'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        onClick={onChange}
        checked={type === 'personal'}
      />
      Personal &nbsp;&nbsp;&nbsp;
      <input
        type='radio'
        name='type'
        value='professional'
        onClick={onChange}
        checked={type === 'professional'}
      />
      Professional
      <input
        type='submit'
        value={current ? 'Update Contact' : 'Add new contact'}
        className='btn btn-primary btn-block'
      />
      {current && (
        <button className='btn btn-light btn-block' onClick={clearAll}>
          Clear
        </button>
      )}
    </form>
  );
};

export default ContactForm;
