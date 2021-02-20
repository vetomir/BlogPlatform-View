import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";

export const PostSingle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .Top {
    cursor: pointer;
    position: relative;
    width: 100%;
    color: ${colors.white};

    &:hover {
      img {
        opacity: .5;
        transition: 500ms;
      }
    }

    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      opacity: .2;

    }

    .Content {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 70%;

      .Category {
        margin: 0 0 .4rem 0;
        width: fit-content;
        text-decoration: none;
        color: ${colors.orange};
        font-weight: ${fonts.regular};
        border: 2px solid ${colors.orange};
        border-radius: 10px;
        padding: .5rem;

        &:hover {
          color: ${colors.black};
          background-color: ${colors.white};
          border-color: ${colors.white};
          transition: 500ms;
        }
      }

      .Title {
        margin: 0;
      }

      .Author {
        display: flex;
        margin: .5rem 0 0 0;

        a {
          margin: 0;
          text-decoration: none;
          font-weight: ${fonts.regular};
          color: ${colors.orange};

          &:hover {
            transition: 500ms;
            color: ${colors.white};
          }
        }

        p {
          margin: 0 0 0 .2rem;
          color: ${colors.lighterGray};
        }

      }
    }
  }
  .Text{
    display: flex;
    flex-direction: column;
    padding: 0 1rem 1rem 1rem;
    .Lead{
      margin: 1rem 0;
      color: ${colors.lightGray};
    }
    .Content{
      margin: 0 0 2rem 0;
      color: ${colors.white};
    }  
  }
`;
