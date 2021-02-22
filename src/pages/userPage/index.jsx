import {Component} from "react";
import UserService from "../../controllers/UserService";
import {UserEntity} from "../../controllers/entities/UserEntity";
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import PostFeedBig from "../../components/modules/postfeedBig/PostFeedBig";

class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: UserEntity
        }
    }
    componentDidMount() {
        let page = new URLSearchParams(this.props.location.search).get("page")
        if(page > 0){
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.page = page
        }
        let nickname = new URLSearchParams(this.props.location.search).get("user")
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.nickname = nickname

        this.getUser()
    }
    getUser = async() => {
        await UserService.getSingle( this.state.nickname ).then(
            response => {
                this.setState({
                    user: response.data
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
    render() {
        const {user} = this.state
        return (
            <>
                <DarkBg>
                    <Wrapper>
                        <Profile>
                            <User>
                                <div className='Photo'>
                                    <img alt={user.nickname} src={user.photoUrl}/>
                                </div>
                                <div className='Details'>
                                    <div className='Nickname'>
                                        <p>{user.nickname}</p>
                                    </div>
                                    <div className='FullName'>
                                        <h1>{user.name}</h1>
                                        <h1>{user.surname}</h1>
                                    </div>
                                </div>
                            </User>
                            <Stats>
                                <div>
                                    <h1>{user.posts.length}</h1>
                                    <p>Posts</p>
                                </div>
                                <div>
                                    <h1>{user.comments.length}</h1>
                                    <p>Comments</p>
                                </div>
                            </Stats>
                        </Profile>


                    </Wrapper>
                </DarkBg>
                <LightBg>
                    <Wrapper>
                       <PostFeedBig posts={user.posts}/>
                    </Wrapper>
                </LightBg>
            </>
        )
    }
}
export default UserPage;


const DarkBg = styled.div`
  background: ${colors.black};
  max-width: 100%;
  height: auto;
`;

const LightBg = styled.div`
  background: ${colors.lighterGray};
  max-width: 100%;
  height: auto;
`;
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
