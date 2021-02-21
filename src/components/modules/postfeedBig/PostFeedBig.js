import {Component} from "react";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";
import {PostFeedBigItems} from "./PostFeedBigItems";
import {PostEntity} from "../../../controllers/entities/PostEntity";

class PostFeedBig extends Component {
    state = {
        posts: [
            PostEntity
        ]
    }
    render() {
        const posts = this.props.posts
        return (
            <Wrapper>
                {posts.map(post => <PostFeedBigItems post={post}/>)}
            </Wrapper>
        )
    }
}
export default PostFeedBig;

const Wrapper = styled.div`
  margin: -6rem 0 0 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .Post{
    position: relative;
    width: 100%;
    height: 250px;
    display: flex;
    background: ${colors.white};
    overflow: hidden;
    &:hover{
      background: ${colors.blue};
      .Image{
        transform: scale(1.1);
        padding-right: 5%;
        transition: 500ms;
      }
      .Content{
        .Category{
          border-color: ${colors.white};
          color: ${colors.white};
          transition: 500ms;
        }
        .Comments{
          color: ${colors.white};
          transition: 500ms;
          svg{
            color: ${colors.white};
            transition: 500ms;
          }
        }
        .Author{
          color: ${colors.white};
          transition: 500ms;
        }
        .Title{
          color: ${colors.white};
          transition: 500ms;
        }
        .Lead{
          color: ${colors.white};
          transition: 500ms;
        }
      }
    }
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
    }
    .Image{
      width: 50%;
      height: auto;
      object-fit: cover;
    }
    .Content{
      width: 50%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 1rem;
      align-content: center;
      .Category{
        z-index: 200;
        font-weight: ${fonts.regular};
        margin-right: .3rem;
        font-size: .7rem;
        font-weight: ${fonts.bold};
        color: ${colors.orange};
        box-sizing: border-box;
        width: fit-content;
        padding: .5rem;
        border-radius: 10px;
      }
      .Author{
        font-size: .8rem;
        margin:0;
        color: ${colors.gray};
      }

      .Title{
        font-size: 1.2rem;
        font-weight: 200;
        margin:0;
        font-family: ${fonts.secondary};
        color: ${colors.black};
      }
      .Lead{
        font-size: .8rem;
        color: ${colors.gray};
        margin:0;
      }
      .Comments{
        color: ${colors.white};
        align-items: baseline;
        display: flex;
        margin:0;
        font-weight: ${fonts.regular};
        font-size: .9rem;
        color: ${colors.gray};
        svg{
          stroke-width: 2px;
          color: ${colors.orange};
          width: .8rem;
          height: .8rem;
          margin-right: .3rem;

        }
      }
    }
  }
`;
