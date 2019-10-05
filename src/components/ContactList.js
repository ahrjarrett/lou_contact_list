import React, { Component } from 'react'

import ContactItem from './ContactItem'

function ContactList({ input }) {
  return (
    <div style={{ width: 400 }}>
      {input.map((contact, idx) => (
        <ContactItem key={idx} {...contact} />
      ))}
    </div>
  )
}

export default ContactList
