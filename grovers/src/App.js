import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// to get items from local storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  // alert show help function
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter value mmm");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Content modified");
    } else {
      showAlert(true, "success", "Item added successfully");
      const newItem = { id: new Date().getTime().toString(), title: name }; //unique id by time
      setList([...list, newItem]);
      setName("");
    }
  };
  // delete all items
  const clearList = () => {
    showAlert(true, "danger", "List empty lol");
    setList([]);
  };
  // delete specific item
  const removeItem = (id) => {
    showAlert(true, "danger", "Item erased");
    setList(list.filter((item) => item.id !== id));
  };
  // to edit an item,
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]); //to persist data, we listen to list array and store in local storage
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery grovers</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="like something"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && ( //show clear button only when there is something on list
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
