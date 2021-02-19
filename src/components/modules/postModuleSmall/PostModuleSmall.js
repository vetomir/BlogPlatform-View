import styled from "styled-components";
import {PostEntity} from "../../../controllers/entities/PostEntity";
import React, {Component} from 'react';
import {fonts} from "../../utils/Fonts";
import {colors} from "../../utils/Colors";
import {PostModuleSmallItem} from "./PostModuleSmallItems";

const Wrapper = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .Post {
    text-decoration: none;
    display: flex;
    width: 100%;
    align-items: center;
    margin: .5rem 0;
    overflow: hidden;
    &:hover{
      background: ${colors.orange};
      transition: 500ms;
      img{
        transform: scale(1.1);
        transition: 500ms;
      }
      div{
        .Title{
          color: ${colors.white};
        }
        .Date{
          color: ${colors.white};
        }
      }
    }
    
    img{
      width: 5rem;
      height: 5rem;
      object-fit: cover;
    }
    div{
      margin-left: .5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      p{
        margin: 0;
      }
      .Title{
        color: ${colors.black};
        font-weight: ${fonts.regular};
      }
      .Date{
        color: ${colors.gray};
        font-size: .8rem;
      }
    }
    
    
  }

`;

class PostModuleSmall extends Component {
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
                    <PostModuleSmallItem post={post}/>
                )}

            </Wrapper>
        )
    }

}
export default PostModuleSmall;
