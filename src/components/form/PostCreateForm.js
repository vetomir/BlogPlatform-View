import {Component} from "react";
import styled from "styled-components";
import {Button_1} from "../utils/Buttons";
import {ImageInput, Input, Select, TagInput, Textarea} from "./FormItems";
import {findSpace, validContent, validURL} from "../utils/Validations";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AiOutlineCloseCircle} from "react-icons/ai";
import {colors} from "../utils/Colors";
import {fonts} from "../utils/Fonts";
import Lightbox from "react-image-lightbox";
import AuthService from "../../controllers/AuthService";
import PostService from "../../controllers/PostService";
import CategoryService from "../../controllers/CategoryService";
import {Redirect} from "react-router-dom";
import DocumentMeta from "react-document-meta";
import {AlertServer} from "../utils/Alerts";
import {CKEditorConfig, EditorWrapper} from "./CKEditorConfig";
import {BiErrorAlt} from "react-icons/bi";

class PostCreateForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {username: ""},

            /*New Post*/
            newPost: {
                title: '',
                lead: '',
                content: '',
                photoUrl: '',
                photoSource: '',
                categoryId: '1',
                tags: [],
            },

            /*Category*/
            categories: [
                {
                    id: 0,
                    name: '',
                }
            ],

            error:'',
            meta: {
                title: 'Login | blogs.',
            }
        }

    }
    componentDidMount() {
        this.getUser()
        this.getCategories()

        /**/
        CKEditorConfig()
    }

    addPost = async() =>{
        await PostService.add(this.state.newPost).then(
            response => {
                console.log(this.state.newPost)
                console.log(response)
                this.setState({
                    redirect: "/profile/me"
                });
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

    getUser = async () =>{
        await AuthService.getCurrentUser().then(
            response => {
                this.setState({
                    currentUser: response.data,
                    userReady: true
                });
            },
            error => {
                this.setState({
                    redirect: "/login"
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

    onChange = e => {
        this.setState({
            newPost: {
                ...this.state.newPost,
                [e.target.name]: e.target.value
            }
        })
    }

    /*Content*/
    onChangeContent = (e, editor) => {
        const data = editor.getData()
        this.setState({
            newPost: {
                ...this.state.newPost,
                content: data
            }
        })
    }

    removeImage = () => {
        this.setState({
            newPost: {
                ...this.state.newPost,
                photoUrl: ""
            }
        });
    }

    /*Tags*/
    removeTag = (i) => {
        const newTags = [...this.state.newPost.tags];
        newTags.splice(i, 1);
        this.setState({
            newPost: {
                ...this.state.newPost,
                tags: newTags
            }
        });
    }

    tagAdd = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (findSpace(val)) {
                this.setState({
                    alertBackend: ["White space in Tag is not allowed"]
                })
                return;
            }
            if (this.state.newPost.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({
                newPost: {
                    ...this.state.newPost,
                    tags: [...this.state.newPost.tags, val]
                }
            });
            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.post.newPost.length - 1);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const {newPost, isOpen, meta, error, categories} = this.state
        return (
            <Wrapper>
                <DocumentMeta {...meta} />
                <AlertServer error={error}/>
                {/**/}

                <Top>Add New Post</Top>
                <Title>
                    <label>Title</label>
                    <Input
                        name='title'
                        placeholder='Title'
                        value={newPost.username}
                        onChange={this.onChange}
                        type='text'
                    />
                </Title>

                <Row>
                    <Left>
                        <label>Lead</label>
                        <Textarea
                            className='Lead'
                            name='lead'
                            placeholder='Lead'
                            value={newPost.username}
                            onChange={this.onChange}
                            type='text'
                        />
                        <label>Content</label>
                        <EditorWrapper>
                            <CKEditor
                                name="content"
                                editor={ClassicEditor}
                                value={newPost.content}
                                onChange={this.onChangeContent}
                            />
                            {newPost.content.length > 0 ? (
                                <div className='Error'><BiErrorAlt/> {validContent(newPost.content)}</div>
                            ) : (<></>)}
                        </EditorWrapper>
                    </Left>
                    <Right>
                        <Select
                            name='categoryId'
                            value={newPost.categoryId}
                            onChange={this.onChange}
                        >
                            {categories.map( category =>
                                <option value={category.id}>{category.name}</option>
                            )}

                        </Select>
                        <ImageInput>
                            <Input
                                placeholder='Photo URL...'
                                name="photoUrl"
                                value={newPost.photoUrl}
                                onChange={this.onChange}
                                type="text"
                            />
                            {validURL(newPost.photoUrl) ? (
                                <>
                                    <div className='Image'>
                                        <div className='Preview'>
                                            <img
                                                src={newPost.photoUrl}
                                                alt={newPost.title + ': Preview Image'}
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
                                                value={newPost.photoSource}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (<></>)}
                        </ImageInput>
                        <label>Tags</label>
                        <TagInput>
                            <Input
                                placeholder='Tags...'
                                type="text"
                                onKeyDown={this.tagAdd}
                                ref={c => {
                                    this.tagInput = c;
                                }}/>
                            {newPost.tags.map((tag, i) => (
                                <li className='TagItem' key={tag} onClick={() => {
                                    this.removeTag(i);
                                }}>
                                    {tag} <AiOutlineCloseCircle/>
                                </li>
                            ))}
                        </TagInput>
                    </Right>
                </Row>
                <Button_1 onClick={this.addPost}>Submit</Button_1>

                {isOpen && (
                    <Lightbox
                        mainSrc={newPost.photoUrl}
                        onCloseRequest={() => this.setState({isOpen: false})}
                    />
                )}
            </Wrapper>
        )
    }
}
export default PostCreateForm;

const Wrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem 1rem 1rem;
  label{
    color: ${colors.white};
    line-height: 2rem ;
  }
`;

const Top = styled.h1`
  color: ${colors.orange};
  font-family: ${fonts.secondary};
  margin: 1rem 0 2rem 0;
`;
const Title = styled.div`
  width: 100%;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  width: calc(70% - .5rem);
  .Lead{
    min-height: 150px;
  }
  .Content{
    min-height: 200px;
  }
`;
const Right = styled.div`
  width: calc(30% - .5rem);
`;

