import styled from "styled-components";

const SearchInputWrapper = styled.div`
  display: flex;

  border: 1px solid #ccc;
  input {
    width: 100%;
    height: 40px;
    padding: 3px 35px 0 10px;
    border-bottom: 3px solid $color-grey;
    font-size: 14px;
    border: none;
  }
  button {
    padding: 2px 20px 0 20px;
    vertical-align: top;
    text-align: center;
    color: #000;
    background-color: #ffe256;
    border: none;
    font-size: 14px;
  }
`;
export default SearchInputWrapper;
