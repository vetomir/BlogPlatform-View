import styled from "styled-components";
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {colors} from "../../utils/Colors";
import {AnimationLoadingCommentBarWrapper, ModuleShowUp} from "../../utils/Loading";

class CommentBar extends Component {
    state = {
        comments: [
            {
                content: '',
                createdOn: '',
                author: {
                    nickname: '',
                },
                commentedPost: {
                    id: 0,
                }
            }
        ],
        error: ""
    }


    render() {

        const comments = this.props.comments
        return (
            <Wrapper>
                {comments.length !== 0 ? (
                    <>
                        {comments.map(
                            comment =>
                                <Link to={`/posts?id=${comment.commentedPost.id}`} className='Comment' key={'commentbar ' + comment.id}>
                                    <h4 className='Author'>
                                        {comment.commentedPost.title}
                                    </h4>
                                    <p className='Content'
                                       dangerouslySetInnerHTML={{__html: comment.author.nickname + ": " + comment.content.substring(0, 100) + "..."}}
                                    >
                                    </p>
                                </Link>
                        )}
                    </>
                ) : (
                    <AnimationLoadingCommentBarWrapper>
                        <div/><div/><div/>
                    </AnimationLoadingCommentBarWrapper>
                )}

            </Wrapper>
        )
    }
}
export default CommentBar;

const Wrapper = styled.div`
  animation: ${ModuleShowUp} 2000ms;
  box-sizing: border-box;
  margin: 1rem 0;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .Comment{
    width: 30%;
    border-left: 1px solid ${colors.gray};
    padding-left: 1rem;
    box-sizing: border-box;
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
    }
    &:hover{
      transition: 350ms;
      border-color: ${colors.orange};
      .Content{
        transition: 350ms;
        color: ${colors.orange};
      }
    }
    .Author{
      font-size: .8rem;
      color: ${colors.blue};
      margin: 0;
    }
    .Content{
      font-size: .8rem;
      line-height: .8rem;
      color: ${colors.white};
      margin: .5rem 0 0 0;
    }
  }
`;

