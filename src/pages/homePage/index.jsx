import {Component} from "react";
import PostService from "../../controllers/PostService";
import AuthService from "../../controllers/AuthService";
import {Pagination} from "../../components/utils/Pagination";
import styled from "styled-components"
import Header from "../../components/modules/header/Header";
import PostModuleBar from "../../components/modules/postModuleBar/PostModuleBar";
import CommentBar from "../../components/modules/commentBar/CommentBar";
import CommentService from "../../controllers/CommentService";
import PostFeed from "../../components/modules/postfeed/PostFeed";
import {colors} from "../../components/utils/Colors";
import DocumentMeta from 'react-document-meta';

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            headerBar:[],
            headerFull:[],
            commentsBar: [],
            newsFeed: [],
            error: "",
            page: 0,
            /**/
            currentUser: {},
            userReady: false,
            /**/
            meta: {
                title: 'Home Page | blogs.',
            }
        }
    }
    componentDidMount() {
        this.checkUser()
        this.header()
        this.newsFeed()
        this.headerBar()
        this.commentsBar()
        this.getServerStatus()

    }

    getServerStatus = async() =>{
        await AuthService.getServerStatus().then(
            response => {
                console.log(response.data)
            },
            error => {
                this.setState({
                    userReady: false
                });
            }
        );
    }


    checkUser = async() =>{
        await AuthService.getCurrentUser().then(
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
    headerBar = async() => {
        await PostService.getAll(null, null, null, null, 4).then(
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

    header = async() => {
        await PostService.getAll(null, 1, null, 'id', 5).then(
            response => {
                this.setState({
                    headerFull: response.data
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
    commentsBar = async () =>{
        await CommentService.getAll(null, "DESC", null,3).then(
            response => {
                this.setState({
                    commentsBar: response.data
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

    newsFeed = async() => {
        let page = new URLSearchParams(this.props.location.search).get("page")
        if(page > 0){
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.page = page
        }

        await PostService.getAll(null, this.state.page, null, null, 10).then(
            response => {
                this.setState({
                    newsFeed: response.data
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
        const { headerBar, headerFull, commentsBar, newsFeed, page, meta} = this.state

        return (
            <>
                <DocumentMeta {...meta} />
                <DarkBg>
                    <Wrapper>
                        <Module>
                            <PostModuleBar posts={headerBar}/>
                        </Module>
                        <Module>
                            <Header posts={headerFull}/>
                        </Module>
                        <Module>
                            <CommentBar comments={commentsBar}/>
                        </Module>
                    </Wrapper>
                </DarkBg>
                {newsFeed.length > 1 ? (
                    <LightBg>
                        <Wrapper>
                            <Module>
                                <PostFeed posts={newsFeed}/>
                            </Module>
                            <Module>
                                <Pagination page={page} feed={newsFeed}/>
                            </Module>
                        </Wrapper>
                    </LightBg>
                ) : (
                    <></>
                )}
            </>
        )
    }
}
export default HomePage;


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
const Module = styled.div`
  margin: 1rem;
  position: relative;
`;
