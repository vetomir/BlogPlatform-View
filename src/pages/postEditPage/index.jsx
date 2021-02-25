import React, {Component} from "react";
import AuthService from "../../controllers/AuthService";
import PostService from "../../controllers/PostService";
import CategoryService from "../../controllers/CategoryService";
import DocumentMeta from "react-document-meta";
import {AlertServer} from "../../components/utils/Alerts";
import {Redirect} from "react-router-dom";
import {ImageInput, Input, Select, Textarea} from "../../components/form/FormItems";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {validURL} from "../../components/utils/Validations";
import {CKEditorConfig, EditorWrapper} from "../../components/form/CKEditorConfig";
import {AiFillEdit, AiOutlineCloseCircle} from "react-icons/ai";
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import UserService from "../../controllers/UserService";

class PostEditPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,

            post: {
                id:0,
                title:'',
                content:'',
                lead:'',
                category: {
                    id:0
                },
                tags: [
                    {
                        id:0,
                        name:''
                    }
                ],
                author:{
                    id:0,
                }
            },
            newPostText:{
                title:'',
                lead:'',
                content:'',
            },
            newPostCategory:{
                categoryId:0,
            },
            newPostPhoto:{
                photoUrl:'',
                photoSource:'',
            },
/*            newPostTags:[
                {
                    name:'',
                },
            ],*/

            allCategories: [
                {
                    label: '',
                    value: 0,
                }
            ],
            categories: [
                {
                    id: 0,
                    name: '',
                }
            ],


            currentUser: {},
            userReady: false,
            redirect: null,

            error:'',
            meta: {
                title: 'Edit Post | blogs.',
            }
        }
    }
    componentDidMount() {
        let pathId = new URLSearchParams(this.props.location.search).get("id")
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.id = pathId

        this.getPost()
        this.getCategories()

        /**/
        CKEditorConfig()
    }
    getPost = async () =>{
        await PostService.getSingle(this.state.id).then(
            response => {
                const currentPost = response.data
                this.checkUser(currentPost.author.id)
                this.setState({
                    post: currentPost,
                });
                this.setState({
                    newPostText:{
                        title: currentPost.title,
                        lead: currentPost.lead,
                        content: currentPost.content,
                    },
                    newPostPhoto:{
                        photoUrl: currentPost.photoUrl,
                        photoSource: currentPost.photoSource,
                    },
                    newPostCategory:{
                        categoryId: currentPost.category.id,
                    },
                })
            },
            error => {
                const resMessage = error.response.data
                console.log(resMessage)

                this.setState({
                    redirect: '/login'
                });
            }
        );
    }
    checkUser = async (id) =>{
        await AuthService.getCurrentUser().then(
            response => {
                const user = response.data
                console.log(user.id + " " + id)
                if(user.id !== id){
                    this.setState({
                        redirect: '/'
                    });
                }
            },
            error => {
                const resMessage = error.response.data
                console.log(resMessage)

                this.setState({
                    redirect: '/'
                });
            }
        );
    }
    getCategories = async() => {
        await CategoryService.getAllQuery().then(
            response => {
                this.setState({
                    categories: response.data
                });
                this.setState({
                    newPost: {
                        ...this.state.newPost,
                        categoryId: this.state.categories[0].id
                    }
                })
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

    onChangeNewPostText = e => {
        this.setState({
            newPostText: {
                ...this.state.newPostText,
                [e.target.name]: e.target.value
            }
        })
    }
    onChangeContent = (e, editor) => {
        const data = editor.getData()
        this.setState({
            newPost: {
                ...this.state.newPost,
                content: data
            }
        })
    }
    onChangeNewPostPhoto = e => {
        this.setState({
            newPostPhoto: {
                ...this.state.newPostPhoto,
                [e.target.name]: e.target.value
            }
        })
    }

    onChangeCategory = e => {
        this.setState({
            newPostCategory: {
                ...this.state.newPostCategory,
                categoryId: e.target.value
            }
        })
    }

    updateText = e => {
        e.preventDefault()
        const {post , newPostText} = this.state
        PostService.updateTitleLeadAndContent(post.id, newPostText).then(
            response => {
                window.location.reload()
            },
            error => {
                const resMessage = error.response.data
                console.log(resMessage)

                this.setState({
                    error: resMessage
                });
            }
        );
    }
    updatePhoto = e => {
        e.preventDefault()
        const {post , newPostPhoto} = this.state
        PostService.updatePhoto(post.id, newPostPhoto).then(
            response => {
                window.location.reload()
            },
            error => {
                const resMessage = error.response.data
                console.log(resMessage)

                this.setState({
                    error: resMessage
                });
            }
        );
    }
    updateCategory = e => {
        e.preventDefault()
        const {post , newPostCategory} = this.state
        PostService.updateCategory(post.id, newPostCategory.categoryId).then(
            response => {
                window.location.reload()
            },
            error => {
                const resMessage = error.response.data
                console.log(resMessage)

                this.setState({
                    error: resMessage
                });
            }
        );
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {post, newPostText, newPostCategory, newPostPhoto, isOpen, meta, error, categories} = this.state

        return (
            <Wrapper>
                <DocumentMeta {...meta} />
                <AlertServer error={error}/>
                <Left>
                    <Form>
                        <div>
                            <label>Title</label>
                            <Input
                                name='title'
                                placeholder='Title'
                                value={newPostText.title}
                                onChange={this.onChangeNewPostText}
                                type='text'
                            />
                        </div>
                        <div>
                            <label>Lead</label>
                            <Textarea
                                name='lead'
                                placeholder='Lead'
                                value={newPostText.lead}
                                onChange={this.onChangeNewPostText}
                                type='text'
                            />
                        </div>
                        <EditorWrapper>
                            <label>Content</label>
                            <CKEditor
                                name="content"
                                editor={ClassicEditor}
                                value={newPostText.content}
                                onChange={this.onChangeContent}
                                data={newPostText.content}
                            />
                        </EditorWrapper>
                        <Button onClick={this.updateText}>
                            <AiFillEdit/> Edit Text
                        </Button>
                    </Form>
                </Left>
                <Right>
                    <Form>
                        <Select
                            name='categoryId'
                            value={newPostCategory.categoryId}
                            onChange={this.onChangeCategory}
                        >
                            {categories.map( category =>
                                <option value={category.id}>{category.name}</option>
                            )}

                        </Select>
                        <Button onClick={this.updateCategory}>
                            <AiFillEdit/> Edit Category
                        </Button>
                    </Form>
                    <Form>
                        <ImageInput>
                            <Input
                                placeholder='Photo URL...'
                                name="photoUrl"
                                value={newPostPhoto.photoUrl}
                                onChange={this.onChange}
                                type="text"
                            />
                            {validURL(newPostPhoto.photoUrl) ? (
                                <>
                                    <div className='Image'>
                                        <div className='Preview'>
                                            <img
                                                src={newPostPhoto.photoUrl}
                                                alt={post.title + ': Preview Image'}
                                                onClick={() => this.setState({isOpen: true})}
                                            />
                                            <span>
                                                    <AiOutlineCloseCircle onClick={() => {
                                                        this.removeImage();
                                                    }}/>
                                                </span>
                                        </div>
                                        <div className='Source'>
                                            <label>Source</label>
                                            <Input
                                                type="text"
                                                name="photoSource"
                                                placeholder='Photo Source...'
                                                value={newPostPhoto.photoSource}
                                                onChange={this.onChangeNewPostPhoto}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (<></>)}
                        </ImageInput>
                        <Button onClick={this.updatePhoto}>
                            <AiFillEdit/> Edit Photo
                        </Button>

                    </Form>

                </Right>

            </Wrapper>
        )
    }
}
export default PostEditPage;
const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  margin:3rem auto 0 auto;
  @media screen and (max-width: 1200px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
const Left = styled.div`
  width: calc(70% - .5rem);
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
const Right = styled.div`
  width: calc(30% - .5rem);
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  h1{
    color: ${colors.orange};
    text-align: center;
    margin: 1rem;
  }
  div{
    width: 100%;
  }
  input, textarea{
    width: 100%;
  }
  label{
    margin: 1rem 0;
    display: block;
    font-size: 1rem;
    width: 100%;
    color: ${colors.white};
  }
`;
const Button = styled.button`
  cursor: pointer;
  display: block;
  width: fit-content;
  padding: 1rem;
  font-size: 1rem;
  color: ${colors.orange};
  border: 2px solid ${colors.orange};
  line-height: 1rem;
  text-decoration: none;
  border-radius: 10px;
  margin: 1rem 0;
  &:hover{
    color: ${colors.black};
    background: ${colors.orange};  
    border-color: ${colors.orange};
    transition: 350ms;
  }
`;
