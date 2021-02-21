import {Component} from "react";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";
import {PostFeedItems} from "./PostFeedItems";
import {PostEntity} from "../../../controllers/entities/PostEntity";
import {ModuleShowUp} from "../../utils/Loading";

class PostFeed extends Component {
    state = {
        posts: [
            PostEntity
        ]
    }
    render() {
        const posts = this.props.posts
        return (
            <Wrapper>
                {posts.map(post => <PostFeedItems post={post}/>)}
            </Wrapper>
        )
    }
}
export default PostFeed;

const Wrapper = styled.div`
  animation: ${ModuleShowUp} 2000ms;
  margin:0;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .Post{
    position: relative;
    width: calc(50% - 1rem);
    height: 250px;
    display: flex;
    background: ${colors.white};
    overflow: hidden;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
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
        position: absolute;
        right: .5rem;
        top: .5rem;
        font-weight: ${fonts.regular};
        margin-right: .3rem;
        font-size: .7rem;
        font-weight: ${fonts.bold};
        color: ${colors.orange};
        box-sizing: border-box;
        border: 2px solid ${colors.orange};
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
  .FirstPost{
    position: relative;
    border-bottom: 0 solid white;
    background: ${colors.indigo};
    &:hover{
      background: ${colors.orange};
      .Author{
        color: ${colors.white};
      }
      .Image{
        opacity: .1;
        padding-right: 0;
      }
      .Content{
        .Category{
          border: 2px solid ${colors.white};
          color: ${colors.white};
          transition: 500ms;
        }
      }
    }
    .Title{

      color: ${colors.white} !important;
      text-align: center;
      font-size: 1.2rem!important;
      line-height: 1.2rem;
      margin-bottom: .5rem;
    }
    .Image{
      width: 100%;
      height: 100%;
      opacity: .21;
    }
    .Content{
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 3rem;
      align-content: center;
      align-items: center;
      
      margin:0;
      background: none;
    }
    .Category{
      position: absolute;
      top: .5rem;
      left: .5rem;
      font-weight: ${fonts.regular};
      margin-right: .1rem;
      border-radius: 10px;
      padding: .5rem;
      border: 1px solid ${colors.orange};
      color: ${colors.orange};
    }
    .Lead{
      text-align: center;
      color: ${colors.white}!important;
    }
    .Comments{
      color: ${colors.white}!important;
    }
  }
`;
