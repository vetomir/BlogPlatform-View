import React, {Component} from 'react';
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import {UserEntity} from "../../controllers/entities/UserEntity";
import AuthService from "../../controllers/AuthService";
import {Link, Redirect} from "react-router-dom";
import {BiHide, BiPlus, BiShow} from "react-icons/bi";
import {AiFillDelete, AiFillEdit, AiOutlineCloseCircle} from "react-icons/ai";
import {ImageInput, Input} from "../../components/form/FormItems";
import {validURL} from "../../components/utils/Validations";
import PostService from "../../controllers/PostService";
import UserService from "../../controllers/UserService";
import DocumentMeta from "react-document-meta";
import {AlertServer} from "../../components/utils/Alerts";

class AuthorizedUserPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: UserEntity,
            userReady: false,
            redirect: '',

            newCredentials:{
                username:'',
                password:'',
                passwordRepeat:'',
            },

            newProfile:{
                nickname:'',
                name:'',
                surname:'',
            },

            newPhoto:{
                photoUrl:'',
            },

            error:'',

            meta: {
                title: 'My Profile | blogs.',
                description: 'I am a description, and I can create multiple tags',
                canonical: '/login',
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
        this.getCurrentUser()
    }
    getCurrentUser = async () =>{
        await AuthService.getCurrentUser().then(
            response => {
                this.setState({
                    currentUser: response.data,
                    userReady: true
                });
                this.setState({
                    newCredentials:{
                        username:this.state.currentUser.email,
                    },

                    newProfile:{
                        nickname:this.state.currentUser.nickname,
                        name:this.state.currentUser.name,
                        surname:this.state.currentUser.surname,
                    },

                    newPhoto:{
                        photoUrl:this.state.currentUser.photoUrl,
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
    onChangeForNewCredentials = e => {
        this.setState({
            newCredentials: {
                ...this.state.newCredentials,
                [e.target.name]: e.target.value
            }
        })
    }
    onChangeForNewProfile = e => {
        this.setState({
            newProfile: {
                ...this.state.newProfile,
                [e.target.name]: e.target.value
            }
        })
    }
    onChangeForNewPhoto = e => {
        this.setState({
            newPhoto: {
                ...this.state.newPhoto,
                [e.target.name]: e.target.value
            }
        })
    }
    removeImage = () => {
        this.setState({
            newPhoto: {
                ...this.state.newPhoto,
                photoUrl: ""
            }
        });
    }

    updateCredentials = e => {
        e.preventDefault()
        const {currentUser , newCredentials} = this.state
        UserService.updateCredentials(currentUser.id, newCredentials).then(
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

    updateProfile = e => {

        e.preventDefault()
        const {currentUser , newProfile} = this.state
        UserService.updateProfile(currentUser.id, newProfile).then(
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
        const {currentUser , newPhoto} = this.state
        UserService.updatePhoto(currentUser.id, newPhoto).then(
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

    togglePublish = (id) => {
        PostService.togglePublish(id).then(
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

    deletePost = (id) => {
        PostService.delete(id).then(
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
        const {currentUser, newCredentials, newProfile, newPhoto, error, meta, redirect} = this.state

        if (redirect) {
            return <Redirect to={redirect}/>
        }

        return (
            <Wrapper>
                <DocumentMeta {...meta} />
                <AlertServer error={error}/>
                <Profile>
                    <User>
                        <div className='Photo'>
                            <img alt={currentUser.nickname} src={currentUser.photoUrl}/>
                        </div>
                        <div className='Details'>
                            <div className='Nickname'>
                                <p>{currentUser.nickname}</p>
                            </div>
                            <div className='FullName'>
                                <h1>{currentUser.name}</h1>
                                <h1>{currentUser.surname}</h1>
                            </div>
                        </div>
                    </User>
                    <Stats>
                        <div>
                            <h1>{currentUser.posts.length}</h1>
                            <p>Posts</p>
                        </div>
                        <div>
                            <h1>{currentUser.comments.length}</h1>
                            <p>Comments</p>
                        </div>
                    </Stats>
                </Profile>
                <Content>
                    <UserPostList>
                        <ul>
                            <AddPost to={'/add-post'}><BiPlus/> Add Post</AddPost>
                            {currentUser.posts.map( post =>
                                <li>
                                    <Link className='Title' to={`/posts?id=${post.id}`}>
                                        {post.title}
                                    </Link>
                                    <div className='Modify'>
                                        {post.published ? (
                                            <button className='Hide' title="Hide Post"
                                                    onClick={() => this.togglePublish(post.id)}>
                                                <BiHide/>
                                            </button>
                                        ):(
                                            <button className='Show' title="Show Post"
                                                    onClick={() => this.togglePublish(post.id)}>
                                                <BiShow/>
                                            </button>
                                        )}
                                        <Link to={`/posts/edit?id=${post.id}`} title="Edit Post"
                                              className='Edit'>
                                            <AiFillEdit/>
                                        </Link>
                                        <button className='Delete' title="Delete Post"
                                                onClick={() => this.deletePost(post.id)}>
                                            <AiFillDelete/>
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </UserPostList>
                    <Forms>
                        <div className='Form'>
                            <label>Credentials</label>
                            <Input
                                name='username'
                                placeholder='Username'
                                value={newCredentials.username}
                                onChange={this.onChangeForNewCredentials}
                                type='email'
                            />
                            <Input
                                name='password'
                                placeholder='Password'
                                value={newCredentials.password}
                                onChange={this.onChangeForNewCredentials}
                                type='password'
                            />
                            <Input
                                name='passwordRepeat'
                                placeholder='Repeat Password'
                                value={newCredentials.passwordRepeat}
                                onChange={this.onChangeForNewCredentials}
                                type='password'
                            />
                            <Button onClick={this.updateCredentials}>
                                <AiFillEdit/> Submit
                            </Button>
                        </div>
                        <div className='Form'>
                            <label>Profile</label>
                            <Input
                                name='nickname'
                                placeholder='Nickname'
                                value={newProfile.nickname}
                                onChange={this.onChangeForNewProfile}
                                type='text'
                            />
                            <Input
                                name='name'
                                placeholder='Name'
                                value={newProfile.name}
                                onChange={this.onChangeForNewProfile}
                                type='text'
                            />
                            <Input
                                name='surname'
                                placeholder='Surname'
                                value={newProfile.surname}
                                onChange={this.onChangeForNewProfile}
                                type='text'
                            />
                            <Button onClick={this.updateProfile}>
                                <AiFillEdit/> Submit
                            </Button>
                        </div>
                        <div className='Form'>
                            <label>Photo</label>
                            <ImageInput>
                                <Input
                                    placeholder='Photo URL...'
                                    name="photoUrl"
                                    value={newPhoto.photoUrl}
                                    onChange={this.onChangeForNewPhoto}
                                    type="text"
                                />
                                {validURL(newPhoto.photoUrl) ? (
                                    <>
                                        <div className='Image'>
                                            <div className='Preview'>
                                                <img
                                                    src={newPhoto.photoUrl}
                                                    alt={newPhoto.title + ': Preview Image'}
                                                    onClick={() => this.setState({isOpen: true})}
                                                />
                                                <span>
                                                    <AiOutlineCloseCircle onClick={() => {
                                                        this.removeImage();
                                                    }}/>
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ) : (<></>)}
                            </ImageInput>
                            <Button onClick={this.updatePhoto}>
                                <AiFillEdit/> Submit
                            </Button>
                        </div>

                    </Forms>
                </Content>
            </Wrapper>
        )
    }
}
export default AuthorizedUserPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  div{
    margin: 1rem 0 0 0;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`;
const User = styled.div`
  display: flex;
  .Photo{
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .Details{
    margin-left: 1rem;
    .Nickname{
      p{
        margin:0;
        padding: 0;
        color: ${colors.gray};
      }
    }
    .FullName{
      margin: 0;
      display: flex;
      h1{
        color: ${colors.white};
        margin: 0 .5rem 0 0;
        padding: 0;
      }
    }
  }
`;
const Stats = styled.div`
  display: flex;
  div{
    margin-left: 1rem;
    color: ${colors.white};
    width: 150px;
    padding: 1rem;
    text-align: center;
    border: 1px solid ${colors.indigo};
    border-radius: 10px;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Forms = styled.div`
  width: calc(30% - 1rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 800px;
    max-width: 100%;
  }
  .Form{
    width: 100%;
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid ${colors.indigo};
    input{
      width: 100%; 
      margin: 1rem 0;
      text-align: center;
    }
    label{
      font-size: 1.5rem;
      width: 100%;
      color: ${colors.white};
      text-align: center;
    }
  }
`;
const UserPostList = styled.div`
  width: calc(70% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  @media screen and (max-width: 1200px) {
    width: 800px;
    max-width: 100%;
  }
  ul{
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${colors.white};
      border-bottom:1px solid ${colors.indigo};
      padding: 1rem;
      .Title{
        color: ${colors.white};
        text-decoration: none;
        &:hover{
          color: ${colors.orange};
          transition: 500ms;
        }
      }
      .Modify{
        display: flex;
        margin: 0;
        a{
          cursor: pointer;
          border: 1px solid ${colors.indigo};
          padding: .5rem .5rem .3rem .5rem;
          color: ${colors.white};
          margin-left: .5rem;
          border-radius: 10px;
          font-size: 1rem;
          &:hover{
            color: ${colors.black};
            background: ${colors.orange};
            transition: 500ms;
          }
        }
        button{
          cursor: pointer;
          border: 1px solid ${colors.indigo};
          padding: .5rem .5rem .3rem .5rem;
          color: ${colors.white};
          margin-left: .5rem;
          border-radius: 10px;
          font-size: 1rem;
          &:hover{
            color: ${colors.black};
            background: ${colors.orange};
            transition: 500ms;
          }
        }
      }
    }
  }
`;
const AddPost = styled(Link)`
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
