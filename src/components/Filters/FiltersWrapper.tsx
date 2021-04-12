import styled from "styled-components";

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    margin-bottom: 20px;
    &:first-child {
      margin-top: 20px;
    }
  }
  .DateRangePicker_picker {
    z-index: 1000;
  }
`;
export default FiltersWrapper;
