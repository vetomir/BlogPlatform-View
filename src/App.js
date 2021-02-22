import {createGlobalStyle} from "styled-components";
import {fonts} from "./components/utils/Fonts";
import {colors} from "./components/utils/Colors";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./pages/homePage";
import PostPage from "./pages/postPage";
import SearchPage from "./pages/searchPage";
import PostCreatePage from "./pages/postCreatePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import UserPage from "./pages/userPage";
import AuthorizedUserPage from "./pages/authorizedUserPage";
import PostEditPage from "./pages/postEditPage";
import TopBar from "./components/topBar/TopBar";
import Footer from "./components/footer/Footer";

function App() {
  return (
      <>
          <GlobalStyle/>
          {/**/}
          <Router>
              <TopBar/>
              {/**/}
              <Switch>
                  <Route path='/' exact component={HomePage}/>
                  {/**/}
                  <Route path='/login' exact component={LoginPage}/>
                  <Route path='/register' exact component={RegisterPage}/>
                  <Route path='/profile' exact component={UserPage}/>
                  <Route path='/profile/my' exact component={AuthorizedUserPage}/>
                  {/*todo*/}
                  {/*<Route path='/admin' exact component={AdminPage}/>*/}
                  {/**/}
                  <Route path='/search' exact component={SearchPage}/>
                  <Route path='/posts' exact component={PostPage}/>
                  <Route path='/add-post' exact component={PostCreatePage}/>
                  <Route path='/posts/edit' exact component={PostEditPage}/>
                  {/*todo*/}
                  {/*<Route path='/comments/edit' exact component={CommentEditPage}/>*/}
              </Switch>
          </Router>
          {/**/}
          <Footer/>
      </>
  );
}
export default App;


const GlobalStyle = createGlobalStyle`
  body{
    padding: 0;
    font-family: ${fonts.main};
    background: ${colors.black};
    margin: 0;
  }
  Link{
    &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none !important;
    }
  }
  *,*::before, *::after{
    box-sizing: border-box;
  }
  p, a, h1, h2, h3, li, ul, li{
    margin: 0;
    padding: 0;
  }
  ul{
    list-style: none;
  }
  button, input, textarea, select{
    border: none;
    background: none;
    
    &:focus{
      outline: none;
    }
  }
  a{
    &:hover{
      text-decoration: none;  
    }
  }
`;
