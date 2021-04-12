import styled from "styled-components";

const EventCardWrapper = styled.div`
  .card{
    font-size: 12px;
    line-height: 14px;
    width: 450px;
    color: white;
    flex-direction: column;
    position: relative;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #d8d8d8;
    background-color: #161633;
    margin-bottom: 1em;
    &>:not(:last-child){
        margin-bottom:8px;
    }
    &>:last-child{
        margin-bottom:20px;
    }
        img {
        border-radius:4px;
        width: 100%;
        height: 110px;
        }
    .title {
        font-family: Roboto;
        font-size: 13px;
        line-height: 14px;
        width: 100%;
        font-weight: 500;
        border-bottom: 1px solid #ccc;
        color: #fff;
        padding-bottom: 8px;
        }
    }
  }
`;
export default EventCardWrapper;
