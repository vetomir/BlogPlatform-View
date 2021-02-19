import React from "react";
import styled from "styled-components";
import {fonts} from "../utils/Fonts";
import {colors} from "../utils/Colors";

export const CommentAddForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea{
    width: 100%;
    resize: vertical;
    min-height: 100px;
    font-family: ${fonts.main};
    padding: 1rem;
  }
  button{
    cursor: pointer;
    width: fit-content;
    margin: 1rem 0;
    padding: .7rem 1rem;
    border: 1px solid ${colors.gray};
    background: none;
    border-radius: 10px;
    &:focus{
      outline: none;
    }
    &:hover{
      border-color: ${colors.orange};
      color: ${colors.white};
      background: ${colors.orange};
      transition: 500ms;
    }
  }
`;
