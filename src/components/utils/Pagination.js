import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import styled from "styled-components";
import {colors} from "./Colors";
import {fonts} from "./Fonts";

export function Pagination({page , feed}){
    return (
        <Wrapper>
            {page > 0 ? (
                <a className='Arrow' href={`?page=` + (page - 1)}><AiOutlineLeft/> Previous</a>
            ) : (<></>) }
            {feed.length === 10 ? (
                <a className='Arrow' href={`?page=` + (page + 1)}>Next <AiOutlineRight/></a>
            ) : (<></>) }
        </Wrapper>
    )
}
export function PaginationSearch({page , feed , query}){
    return (
        <Wrapper>
            {page > 0 ? (
                <a className='Arrow' href={`/search?query=` + query + `&page=` + (page - 1)}><AiOutlineLeft/> Previous</a>
            ) : (<></>) }
            {feed.length === 10 ? (
                <a className='Arrow' href={`/search?query=` + query + `&page=` + (page + 1)}>Next <AiOutlineRight/></a>
            ) : (<></>) }
        </Wrapper>
    )
}
const Wrapper = styled.div`
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
