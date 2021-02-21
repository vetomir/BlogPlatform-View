import {Component} from "react";
import {HeaderItemBig, HeaderItemSmall} from "./HeaderItems";
import {PostEntity} from "../../../controllers/entities/PostEntity";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";
import {AnimationLoadingHeaderWrapper, ModuleShowUp} from "../../utils/Loading";

class Header extends Component {
    state = {
        posts: [
            PostEntity
        ]
    }
    render() {
        const posts = this.props.posts

        let firstPost
        posts.length ? (
            firstPost = posts[0]
        ) : (
            firstPost = PostEntity
        )
        return (
            <Wrapper>
                {posts.length !== 0 ? (
                    <>
                        <HeaderItemBig post={firstPost}/>
                        <div className='Items'>
                            {posts.slice(1).map(
                                post => <HeaderItemSmall post={post}/>
                            )}
                        </div>
                    </>
                ) : (
                    <AnimationLoadingHeaderWrapper>
                        <div className='big'>
                            <p/>
                            <h1/>
                            <p/>
                            <h2/>
                        </div>
                        <div className='small'>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </AnimationLoadingHeaderWrapper>
                )}
            </Wrapper>
        )
    }
}

export default Header;

const Wrapper = styled.div`
  animation: ${ModuleShowUp} 2000ms;
  width: 100%;
  height: 516px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1000px) {
    height: auto;
    flex-direction: column;
  }
  .Items {
    display: flex;
    width: 50%;
    height: 516px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  .Post {
    margin-left: 1rem;
    position: relative;
    width: calc(50% - 1rem);
    height: 250px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    @media screen and (max-width: 1000px) {
      width: calc(50% - 1rem);
      margin-bottom: 1rem;
      margin-left: 0;
    }
    &:hover{
      background: ${colors.orange};
      transition: 350ms;
      .Image{
        opacity: .1;
        transform: scale(1.1);
        transition: 350ms;
      }
      .Content {
        .Author {
          color: ${colors.white};
        }
        .Comments {
          svg {
            color: ${colors.white};
          }
        }
      }
    }
    .Image {
      width: 100%;
      height: auto;
      object-fit: cover;
      opacity: .21;
    }
    .Content {
      position: absolute;
      left: 0;
      right: 0;
      margin-top: 1rem;
      padding: 2rem;
      width: 100%;
      height: 100%;
      margin-left: .5rem;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      justify-content: center;
      align-items: center;
      line-height: 1rem;
      text-align: center;

      .Author {
        color: ${colors.gray};
        margin: 0;
        font-size: .7rem;
        font-weight: 600;
      }
      
      .Title {
        font-family: ${fonts.secondary};
        font-size: 1rem;
        line-height: 1rem;
        font-weight: bold;
        color: ${colors.white};
        margin: .5rem 0;

      }

      .Lead {
        color: ${colors.lightGray};
        margin: 0;
        text-align: center;
      }
      .Comments {
        color: ${colors.white};
        align-items: baseline;
        display: flex;
        font-size: .8rem;
        font-weight: ${fonts.regular};
        svg {
          stroke-width: 2px;
          color: ${colors.orange};
          width: .8rem;
          height: .8rem;
          margin-right: .2rem;
        }
      }
    }
  }
  .FirstPost {
    width: 828px;
    height: 516px;
    margin: 0;
    @media screen and (max-width: 1000px) {
      width: 100%;
      margin-bottom: 1rem;
    }
    .Content{
      padding: 5rem;
      font-size: 1.1rem;
      .Title {
        font-size: 3rem;
        line-height: 3rem;
      }
      .Author {
        font-size: 1rem;
        font-weight: 600;
      }
      .Comments {
        font-size: 1.5rem;
        svg {
          stroke-width: 2px;
          color: ${colors.orange};
          width: 1.5rem;
          height: 1.5rem;
          margin-right: .5rem;
        }
      }
    }
  }
}
`;

