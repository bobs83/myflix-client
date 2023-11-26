import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../search-view/search-view.scss";

export const SearchView = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState("");

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchItem(newSearch);

    if (newSearch === "") {
      onSearch("");
    } else {
      onSearch(newSearch);
    }
  };

  // onsearch is not a function error

  return (
    <Form className="ml-auto navbar-search">
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchItem}
          className="search-input"
          onChange={handleSearchChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </Form>
  );
};
