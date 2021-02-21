import React, {Component} from "react";
import {Link} from "react-router-dom";
import {CommentEntity} from "../../../controllers/entities/CommentEntity";
import styled from "styled-components";
import {colors} from "../../utils/Colors";
import {fonts} from "../../utils/Fonts";

class CommentFeed extends Component {
    state = {
        comments: [
            CommentEntity
        ],
        error: ""
    }

    render() {
        const comments = this.props.comments
        return (
            <Wrapper>
                {comments.map( comment =>
                    <li key={comment.id}>
                        <Link to={`/profile?user=${comment.authorNickname}`} className='Author'>
                            <img alt={comment.id} src={comment.authorAvatar}/>
                            <div>
                                <p className="Name">{comment.authorNickname}</p>
                                <p className="Date">{comment.createdOn}</p>
                            </div>
                        </Link>
                        <div>
                            <div dangerouslySetInnerHTML={{__html : comment.content}}/>
                        </div>
                    </li>
                )}
            </Wrapper>
        )
    }
}

export default CommentFeed;

const Wrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding:1.5rem;
  margin: 0;
  li{
    border-bottom: 1px solid ${colors.lightGray};
    margin: 1rem;
    padding: 0 0 1rem 0;
    .Author{
      display: flex;
      text-decoration: none;
      width: fit-content;
      img{
        width: 3rem;
        height: 3rem;
        object-fit: cover;
        border-radius: 50%;
        &:hover{
          transform: scale(1.1);
          transition: 350ms;
        }
      }
      div{
        padding: 0 0 0 .5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
          margin: 0;
        }
        .Name{
          color: ${colors.black};
          font-weight: ${fonts.regular};
          &:hover{
            color: ${colors.orange};
            transition: 350ms;
          }
        }
        .Date{
          color: ${colors.gray};
        }
        
      }
    }
  }
`;
