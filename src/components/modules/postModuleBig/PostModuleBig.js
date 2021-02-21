import {Component} from "react";
import {PostModuleBigItem} from "./PostModuleBigItems";
import {PostEntity} from "../../../controllers/entities/PostEntity";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";

class PostModuleBig extends Component {
    state = {
        posts: [
            PostEntity
        ],
        error: ""
    }

    render() {
        const posts = this.props.posts
        return (
            <Wrapper>
                {posts.map( post =>
                    <PostModuleBigItem post={post}/>
                )}
            </Wrapper>
        )
    }
}
export default PostModuleBig;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .Post {
    position: relative;
    text-decoration: none;
    display: flex;
    width: 100%;
    height: 250px;
    align-items: center;
    margin: 0 0 1rem 0;
    overflow: hidden;
    @media screen and (max-width: 1200px) {
      width: calc(50% - .5rem);
    }
    &:hover{
      background: ${colors.blue};
      transition: 350ms;
      img{
        transform: scale(1.1);
        transition: 350ms;
        opacity: .1;
      }
      div{
        
        .Date{
          color: ${colors.white};
      }
      .Title{
        color: ${colors.white};
      }
      .Lead{
        color: ${colors.white};
      }
      .Comments{
        color: ${colors.white};
        svg{
          color: ${colors.white};
        }
      }
      }
    }
    img{
      width: 100%;
      height: 100%;
      opacity: .3;
      object-fit: cover;
    }
    div{
      position: absolute;
      margin-left: .5rem;
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3rem 1rem 1rem 1rem;
      
      p{
        margin: 0;
        color:${colors.white};
      }
      .Date{
        color: ${colors.lightGray};
        text-align: center;
        font-size: .8rem;
      }
      .Title{
        color: ${colors.white};
        font-weight: ${fonts.regular};
        text-align: center;
        margin: .5rem 0;
      }
      .Lead{
        color: ${colors.lighterGray};
        font-size: .8rem;
        text-align: center;
      }
      .Comments{
        margin: 1rem 0 0 0 ;
        color: ${colors.white};
        svg{
          color: ${colors.orange};
        }
      }
    }
  }
`;
