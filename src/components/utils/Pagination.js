import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import styled from "styled-components";
import {colors} from "./Colors";
import {fonts} from "./Fonts";
const Pages = styled.div`
  padding:1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  .Arrow{
    display: flex;
    font-size: 1rem;
    line-height: 2rem;
    text-decoration: none;
    border: 2px solid ${colors.indigo};
    padding: .5rem 1rem;
    color: ${colors.indigo};
    margin: 0 2rem;
    border-radius: 10px;
    font-weight: ${fonts.regular};
    align-items: center;
    justify-content: center;
    width: 150px;
    &:hover{
      color: ${colors.white};
      border-color: ${colors.orange};
      background-color: ${colors.orange};
      transition: 500ms;
    }
  }
`;

export function Pagination({page , feed}){
    return (
        <Pages>
            {page > 0 ? (
                <a className='Arrow' href={`?page=` + (page - 1)}><AiOutlineLeft/> Previous</a>
            ) : (<></>) }
            {feed.length === 10 ? (
                <a className='Arrow' href={`?page=` + (page + 1)}>Next <AiOutlineRight/></a>
            ) : (<></>) }
        </Pages>
    )
}
