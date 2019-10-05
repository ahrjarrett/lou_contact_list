import React from "react";

const ContactItem = ({ firstName, lastName, phone }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee"
      }}
    >
      <p>
        {firstName} <strong>{lastName}</strong>
      </p>
      <p>{phone}</p>
    </div>
  );
};

export default ContactItem;
