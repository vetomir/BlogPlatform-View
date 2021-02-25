import {Component} from "react";
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import PostService from "../../controllers/PostService";
import CommentService from "../../controllers/CommentService";
import DocumentMeta from "react-document-meta";

import {Link} from "react-router-dom";
import Lightbox from "react-image-lightbox";
import PostModuleSmall from "../../components/modules/postModuleSmall/PostModuleSmall";
import {validComment} from "../../components/utils/Validations";
import PostModuleBig from "../../components/modules/postModuleBig/PostModuleBig";
import {CommentAddForm} from "../../components/form/CommentAddForm";
import CommentFeed from "../../components/modules/commentFeed/CommentFeed";
import {PostSingle} from "../../components/modules/postSingle/PostSingle";
import {TextareaWhite} from "../../components/form/FormItems";
import {AnimationLoadingPostSingleWrapper, AnimationLoadingWrapper} from "../../components/utils/Loading";
import {NoContent} from "../../components/utils/Alerts";

class PostPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            /**/
            post: {
                id : 0,
                title : '',
                lead : '',
                content : '',
                photoUrl : '',
                photoSource : '',
                published : '',
                createdOn : '',
                author : {},
                category : {},
                tags : [],
                comments : [
                    {
                        id:'',
                        authorNickname:'',
                        authorAvatar:'',
                        content:'',
                        createdOn:''
                    }
                ],

            },
            /**/
            newComment : {
                content:'',
                postId: ''
            },
            /**/
            moduleBig: [],
            moduleSmall: [],
            /**/
            currentUser: {},
            userReady: false,
            /**/
            meta: {
                title: 'Loading... | blogs.',
                description: 'I am a description, and I can create multiple tags',
                canonical: '/posts?id=',
                meta: {
                    charset: 'utf-8',
                    name: {
                        keywords: 'react,meta,document,html,tags'
                    }
                },
            }
        }
    }
    componentDidMount() {
        let pathId = new URLSearchParams(this.props.location.search).get("id")
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id = pathId

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.newComment.postId = pathId

        //

        this.getPost()
        this.postModuleBig()
        this.postModuleSmall()
    }

    getPost(){

        PostService.getSingle(this.state.id).then(
            response => {
                const post = response.data
                this.setState({
                    post: post
                });
                this.setState({

                    meta: {
                        ...this.state.meta,
                        title: post.title + " | blogs.",
                    }
                });
            },
            error => {
                this.setState({
                    error:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    postModuleBig(){
        PostService.getAll(null, 0, null, null, 4).then(
            response => {
                this.setState({
                    moduleBig: response.data
                });
            },
            error => {
                this.setState({
                    error:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    postModuleSmall(){
        PostService.getAll(null, 0, null, null, 6).then(
            response => {
                this.setState({
                    moduleSmall: response.data
                });
            },
            error => {
                this.setState({
                    error:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    onChangeAddComment = e => {

        this.setState({
            newComment: {
                content: e.target.value
            }
        })
    }

    addComment = () =>{
        CommentService.add(this.state.id, this.state.newComment, null).then(
            response => {
                console.log("Comment Added!")
                window.location.reload()
            },
            error => {
                this.setState({
                    error:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        const { post, moduleSmall, moduleBig, newComment, isOpen ,meta} = this.state

        return (
            <>
                <DocumentMeta {...meta} />
                <DarkBg>
                    <Wrapper>
                        <Row>
                            <Left>
                                {post.id !== 0 ? (
                                    <Module>
                                        <PostSingle>
                                            <div className='Top' onClick={() => this.setState({isOpen: true})} >
                                                <img
                                                    src={post.photoUrl}
                                                    alt={post.id}
                                                />
                                                <div className='Content'>
                                                    <Link to={'/'} className='Category'>{post.category.name}</Link>
                                                    <h1 className='Title'>{post.title}</h1>
                                                    <div className='Author'>
                                                        <Link to={`/profile?user=${post.author.nickname}`}>{post.author.nickname}</Link>
                                                        <p> on {post.createdOn}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='Text'>
                                                <h3 className='Lead'>
                                                    <div dangerouslySetInnerHTML={{__html : post.lead}}/>
                                                </h3>
                                                <div className='Content'>
                                                    <div dangerouslySetInnerHTML={{__html : post.content}}/>
                                                </div>
                                            </div>
                                        </PostSingle>
                                    </Module>
                                ) : (
                                    <AnimationLoadingPostSingleWrapper>
                                        <div><h1/><p/></div><h1/><h1/><h1/><p/><p/><p/><p/><p/>
                                    </AnimationLoadingPostSingleWrapper>
                                )}


                            </Left>
                            <Right>
                                {post.id !== 0 ? (
                                    <Module>
                                        <PostModuleBig posts={moduleBig}/>
                                    </Module>
                                ) : (
                                    <AnimationLoadingWrapper/>
                                )}
                            </Right>
                        </Row>
                    </Wrapper>
                </DarkBg>
                {post.id !== 0 ? (
                    <LightBg>
                        <Wrapper>
                            <Row>
                                <Left>
                                    <Module>
                                        <CommentAddForm>
                                            <TextareaWhite
                                                name='content'
                                                placeholder='Add comment...'
                                                value={newComment.content}
                                                onChange={this.onChangeAddComment}
                                            />
                                            {newComment.content.length > 0 ? (
                                                <p>{validComment(newComment.content)}</p>
                                            ) : (<></>)}
                                            <button onClick={this.addComment} type="button">Submit</button>
                                        </CommentAddForm>
                                    </Module>
                                    {post.comments.length > 0 ? (
                                        <Module>
                                            <CommentFeed comments={post.comments}/>

                                        </Module>
                                    ) : (
                                        <NoContent>
                                            <p>No comments</p>
                                        </NoContent>
                                    )}
                                </Left>
                                <Right>
                                    <Module>
                                        <PostModuleSmall posts={moduleSmall}/>
                                    </Module>
                                </Right>
                            </Row>
                        </Wrapper>
                    </LightBg>
                ) : (
                    <></>
                )}

                {isOpen && (
                    <Lightbox
                        mainSrc={post.photoUrl}
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                )}
            </>
        )
    }
}
export default PostPage;


const DarkBg = styled.div`
  background: ${colors.black};
  width: 100%;
  height: auto;
`;

const LightBg = styled.div`
  background: ${colors.lighterGray};
  width: 100%;
  height: auto;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  width: calc(70% - .5rem);
  position: relative;
  min-height: 70vh;
  margin-right: 1rem;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: calc(30% - .5rem);
  position: relative;
  min-height: 70vh;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Module = styled.div`
  margin: 1rem 0 1rem 1rem;
  position: relative;
  @media screen and (max-width: 1200px) {
    margin: 1rem;
  }
`;
