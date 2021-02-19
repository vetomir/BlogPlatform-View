import {Component} from "react";
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import AuthService from "../../controllers/AuthService";
import PostService from "../../controllers/PostService";
import CommentService from "../../controllers/CommentService";
import DocumentMeta from "react-document-meta";
import PostModuleBar from "../../components/modules/postModuleBar/PostModuleBar";
import Header from "../../components/modules/header/Header";
import CommentBar from "../../components/modules/commentBar/CommentBar";
import PostFeed from "../../components/modules/postfeed/PostFeed";
import {Pagination} from "../../components/utils/Pagination";
import {Link} from "react-router-dom";
import Lightbox from "react-image-lightbox";
import PostModuleSmall from "../../components/modules/postModuleSmall/PostModuleSmall";
import {validComment} from "../../components/utils/Validations";
import PostModuleBig from "../../components/modules/postModuleBig/PostModuleBig";
import PostSingle from "../../components/modules/postSingle/PostSingle";
import {CommentAddForm} from "../../components/form/CommentAddForm";
import CommentFeed from "../../components/modules/commentFeed/CommentFeed";

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
`;

const Row = styled.div`
  display: flex;  
`;
const Left = styled.div`
  width: calc(70% - .5rem);
`;
const Right = styled.div`
  width: calc(30% - .5rem);
`;

const Module = styled.div`
  margin: 1rem;
  position: relative;
`;
const NoContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  p{
    font-size: 1rem;
    color: ${colors.lightGray};
  }
`;
const meta = {
    title: ': Home Page',
    description: 'I am a description, and I can create multiple tags',
    canonical: '/',
    meta: {
        charset: 'utf-8',
        name: {
            keywords: 'react,meta,document,html,tags'
        }
    }
};
class PostPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            /**/
            post: {
                id : '',
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
            headerBar:[],
            moduleBig: [],
            moduleSmall: [],
            /**/
            currentUser: {},
            userReady: false,
            /**/
            meta: {
                title: ': ',
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

        this.headerBar()
        this.getPost()
        this.postModuleBig()
        this.postModuleSmall()
    }

    getPost(){

        PostService.getSingle(this.state.id).then(
            response => {
                this.setState({
                    post: response.data
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

    headerBar(){
        PostService.getAll(null, null, null, null, 4).then(
            response => {
                this.setState({
                    headerBar: response.data
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
        CommentService.add(this.state.id, this.state.newComment).then(
            response => {
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
        const { post, headerBar, moduleSmall, moduleBig, newComment, isOpen } = this.state

        return (
            <>
                <DocumentMeta {...meta} />
                <DarkBg>
                    <Wrapper>
                        <Module>
                            <PostModuleBar posts={headerBar}/>
                        </Module>
                        <Row>
                            <Left>
                                <Module>
                                    <PostSingle post={post}/>
                                </Module>
                            </Left>
                            <Right>
                                <Module>
                                    <PostModuleBig posts={moduleBig}/>
                                </Module>
                            </Right>
                        </Row>
                    </Wrapper>
                    {isOpen && (
                        <Lightbox
                            mainSrc={post.photoUrl}
                            onCloseRequest={() => this.setState({isOpen: false})}
                        />
                    )}
                </DarkBg>
                <LightBg>
                    <Wrapper>
                        <Left>
                            <Module>
                                <CommentAddForm>
                                    <textarea
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
                    </Wrapper>
                </LightBg>
            </>
        )
    }
}
export default PostPage;

