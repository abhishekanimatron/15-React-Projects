import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" type="button">
                <FaEdit />
              </button>
              <button className="delete-btn" type="button">
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
