import styled from "styled-components";
import {Link} from "react-router-dom";
import {colors} from "./Colors";

export const ButtonLink = styled(Link)`
    cursor: pointer;
    text-decoration: none;
    color: ${colors.orange};
    font-size: 1rem;
    padding: .7rem 2rem;
    border-radius: 10px;
    font-weight: 700;
    background: ${colors.black};
    border: 3px solid ${colors.orange};
    box-sizing: border-box;
    &:hover{
      color: ${colors.indigo};
      background: ${colors.orange};
      box-shadow: 0 1px 5px ${colors.orange};
      transition: 350ms;
    }
  }
`;
export const Button = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.orange};
  font-size: 1rem;
  padding: 1.5rem 3rem;
  border-radius: 10px;
  font-weight: 700;
  background:none;
  border: 3px solid ${colors.orange};
  box-sizing: border-box;
  &:hover{
    color: ${colors.indigo};
    background: ${colors.orange};
    box-shadow: 0 1px 5px ${colors.orange};
    transition: 350ms;
  }
  &:focus {
    outline: none;
  }
}
`;
