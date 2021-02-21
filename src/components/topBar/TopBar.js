import {Component} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {colors} from "../utils/Colors";
import {fonts} from "../utils/Fonts";
import {FaReact, FaSearch} from "react-icons/fa";
import AuthService from "../../controllers/AuthService";
import {ButtonLink} from "../utils/Buttons";
import Navigation from "../navigation/Navigation";

class TopBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: {},
            userReady: false,
            searchQuery: ''
        }
    }

    logOut = async () => {
        AuthService.logout();
    }

    getCurrentUser = async () =>{
        AuthService.getCurrentUser().then(
            response => {
                this.setState({
                    currentUser: response.data,
                    userReady: true
                });

            },
            error => {
                this.setState({
                    userReady: false
                });
            }
        );
    }
    componentDidMount() {
        this.getCurrentUser()
    }

    onChangeSearchQuery = e => {
        this.setState({
            searchQuery: e.target.value
        });
    }
    render() {
        const { userReady , currentUser, searchQuery } = this.state
        if(userReady){
            console.log('Hello ' + currentUser.nickname)
        }

        return (
            <>
                <Navigation/>
                <Wrapper>
                    <a href={'/'} className='Logo'><FaReact/>blogs.</a>
                    <Right>
                        <Search>
                            <input
                                className='Input'
                                type='text'
                                name='search'
                                placeholder='Seach'
                                value={searchQuery}
                                onChange={this.onChangeSearchQuery}
                            />
                            <a className='submit' href={`/search?query=${searchQuery}`}><FaSearch/></a>
                        </Search>
                        {!userReady ? (
                            <>
                                <Link to={'/register'} className='Register'>Become a member</Link>
                                <ButtonLink to={'/login'} className='Login'>Login</ButtonLink>
                            </>
                        ):(
                            <>
                                <Profile to={'/profile/my'}>
                                    <img
                                        className='Avatar'
                                        src={currentUser.photoUrl}
                                        alt={currentUser.id}
                                    />
                                </Profile>
                                <ButtonLink to={'/'} onClick={this.logOut} className='Login'>Logout</ButtonLink>
                            </>
                        )}
                    </Right>
                </Wrapper>
            </>
        )
    }
}
export default TopBar;

const Wrapper = styled.div`
  margin: 1rem auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  @media screen and (max-width: 1400px) {
    width: 100%;  
    padding: 0 1rem 0 5rem;
  }
  .Logo{
    color: ${colors.white};
    font-size: 2rem;
    text-decoration: none;
    font-weight: bold;
    &:hover{
      color:${colors.orange};
      transition: 500ms;
      svg{
        transform: rotate(180deg);
        transition: 500ms;
      }
    }
  }
  .Register{
    cursor: pointer;
    color: ${colors.orange};
    border: none;
    background: none;
    margin: 0 1rem;
    text-decoration: none;
    font-size: 1rem;
    &:hover{
      color: ${colors.white};
      transition: 350ms;
    }
  }
  .Login{
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Search = styled.div`
  display: flex;
  font-size:1.5rem;
  color: ${colors.lightGray};
  justify-content: center;
  align-items: center;
  height: 3rem;
  border-bottom: 1px solid ${colors.lightGray};
  &:hover{
    transition: 500ms;
    border-color: ${colors.white};
    input{
    }
    .submit{
      transition: 500ms;
      color: ${colors.white};
    }
  }
  input{
    background: none;
    border: none;
    color: ${colors.orange};
    height: 2rem;
    font-weight: ${fonts.regular};
    font-size: 1rem;
    line-height: 2rem;
    padding: 0 1rem;
    &:focus{
      outline: none;
    }
    &:hover{
     /* color: ${colors.white};
      transition: 500ms;*/
    }
  }
  .submit{
    cursor: pointer;
    display: flex;
    font-size:1.5rem;
    color: ${colors.lightGray};
    justify-content: center;
    align-items: center;
    height: 3rem;
    background: none;
    border: none;
    &:focus{
      outline: none;
    }
    &:hover{
      color: ${colors.orange};
      transition: 500ms;
    }
  }
`;
const Profile = styled(Link)`
  height: 3rem;
  width: 3rem;
  display: block;
  margin: 0 1rem;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: border-box;
  &:hover{
    box-shadow: 0 0 4px ${colors.orange};
    transform: scale(1.1);
    transition: 500ms;
  }
  .Avatar{
    height: 3rem;
    width: 3rem;  
    object-fit: cover;
  }
`;
