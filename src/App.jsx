import { useState } from "react";
import contactsData from "./contacts.json";
import "./App.css"; 

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(
    contactsData.slice(5)
  );

  const addRandomContact = () => {
    remainingContacts.length === 0
      ? alert("No more contacts!")
      : (() => {
          const randomIndex = Math.floor(
            Math.random() * remainingContacts.length
          );
          const randomContact = remainingContacts[randomIndex];

          setContacts((prevContacts) => [...prevContacts, randomContact]);
          setRemainingContacts((prevRemaining) =>
            prevRemaining.filter((contact) => contact.id !== randomContact.id)
          );
        })();
  };

  const sortByName = () => {
    setContacts((prevContacts) =>
      [...prevContacts].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  const sortByPopularity = () => {
    setContacts((prevContacts) =>
      [...prevContacts].sort((a, b) => b.popularity - a.popularity)
    );
  };

  const removeContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (
    <div>
      <h1>IronContacts ✨</h1>
      <div className="button-container">
        <button className="action-button" onClick={addRandomContact}>
          Add Random Contact
        </button>
        <button className="action-button" onClick={sortByName}>
          Sort by Name
        </button>
        <button className="action-button" onClick={sortByPopularity}>
          Sort by Popularity
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture 🕶️</th>
            <th>Name 🔡</th>
            <th>Popularity 🎉</th>
            <th>Won an Oscar 🏆</th>
            <th>Won an Emmy 🥇</th>
            <th>Action 🧨</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50px",
                  }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? "🏆" : null}</td>
              <td>{contact.wonEmmy ? "🌟" : null}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => removeContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
