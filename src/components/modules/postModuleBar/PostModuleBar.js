import {Component} from "react";
import PostModuleBarItems from "./PostModuleBarItems";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {PostEntity} from "../../../controllers/entities/PostEntity";
import {AnimationLoadingHeaderBarWrapper, ModuleShowUp} from "../../utils/Loading";

class PostModuleBar extends Component {
    state = {
        posts: [
            PostEntity
        ]
    }
    render() {
        const posts = this.props.posts

        return (
            <Wrapper>
                {posts.length !== 0 ? (
                    <>
                        {posts.map(
                            post =>
                                <PostModuleBarItems post={post}/>

                        )}
                    </>
                ) : (
                    <AnimationLoadingHeaderBarWrapper>
                        <div/><div/><div/><div/>
                    </AnimationLoadingHeaderBarWrapper>
                )}
            </Wrapper>
        )
    }
}
export default PostModuleBar;

const Wrapper = styled.ul`
  animation: ${ModuleShowUp} 2000ms;
  margin: 1rem 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Post{
    width: 350px; 
    height: 100px;
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
    overflow: hidden;
    @media screen and (max-width: 1000px) {
      height: 100px;
    }
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
    }
    &:hover{
      background: ${colors.blue};
      transition: 350ms;
      .Image{
        transform: scale(1.1);
        transition: 350ms;
      }
      .Description {
        .Title{
          color: ${colors.black};
          transition: 350ms;
        }
        .Lead{
          color: ${colors.black};
          transition: 350ms;
        }
      }
    }
    .Image{
      width: 80px;
      object-fit: cover;
    }
    .Description{
      margin-left: .5rem;
      display: flex;
      flex-direction: column;
      font-size: .8rem;
      justify-content: center;
      line-height: 1rem;

      .Title{
        font-weight: bold;
        color: ${colors.white};
        margin: 0 0 .1rem 0;
        text-decoration: none;
      }
      .Lead{
        color: ${colors.lightGray};
        margin: 0;
        @media screen and (max-width: 1000px) {
          display: none;
        }
      }
    }
  }
`;
