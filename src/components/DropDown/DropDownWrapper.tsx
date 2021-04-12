import styled from "styled-components";

const DropDownWrapper = styled.div`
  display: flex;
  position: relative;

  button.dropdown-box {
    vertical-align: top;
    text-align: center;
    color: #000;
    background-color: #e4e3db;
    border: 2px solid #.;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    height: 40px;
    padding: 3px 35px 0 10px;
    border: 1px solid #ccc;
  }
  .dropdown-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1000;
    max-height: 350px;
    overflow-y: auto;
    top: 40px;
    button {
      cursor: pointer;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-top: none;
      height: 24px;
      &:hover {
        background-color: #e4e3db;
      }
      &.active {
        background-color: #ffe256;
      }
    }
  }
`;
export default DropDownWrapper;
