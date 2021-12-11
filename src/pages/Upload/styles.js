import styled from 'styled-components';
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2b2b2b;
  color: #d3d3d3;
  h1{
    margin-bottom: 20px;
  }
`;
export const Button = styled.button`
  width: 200px;
  height: 35px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b5b5b5;
  border-radius: 5px;
  background-color: ${props => props.inverted ? "transparent" : "#dd33dd"};
  border: 2px solid ${props => props.inverted ? "#dd33dd" : "transparent"};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: filter .2;
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  &:hover{
    filter: ${props => !props.disabled && "brightness(1.1)"};
  }
`
export const Image = styled.img`
  margin-top: 40px;
  width: 250px;
`;