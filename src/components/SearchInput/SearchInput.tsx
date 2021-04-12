import React, { useState } from "react";
import SearchInputWrapper from "./SearchInputWrapper";

type SearchInputProp = {
  handleSearchInput: (word: string) => void;
};

const SearchInput = ({ handleSearchInput }: SearchInputProp) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <SearchInputWrapper>
      <input
        type="text"
        className="searchBox"
        placeholder="Search"
        value={searchWord}
        onChange={(evt) => {
          setSearchWord(evt.target.value);
        }}
        autoComplete="off"
      />

      <button type="submit" onClick={() => handleSearchInput(searchWord)}>
        search
      </button>
    </SearchInputWrapper>
  );
};

export default SearchInput;
