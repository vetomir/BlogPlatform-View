import {Component} from "react";
import PostService from "../../controllers/PostService";
import {PostEntity} from "../../controllers/entities/PostEntity";
import styled from "styled-components";
import {colors} from "../../components/utils/Colors";
import PostFeed from "../../components/modules/postfeed/PostFeed";
import {PaginationSearch} from "../../components/utils/Pagination";
import {NoContent} from "../../components/utils/Alerts";

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [PostEntity],
            page:0
        }
    }
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search).get("query")
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.query = query

        let page = new URLSearchParams(this.props.location.search).get("page")
        if(page > 0){
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.page = page
        }
        this.searchPosts()
    }

    searchPosts = async() =>{
        await PostService.searchPosts( this.state.query,this.state.page, null, null, 10).then(
            response => {
                this.setState({
                    posts: response.data
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
        const { page, query, headerBar, posts} = this.state
        return (
            <>
                <DarkBg>
                    <Wrapper>
                        <SearchResult>
                            <h2>Search:</h2>
                            <h1>{query}</h1>
                        </SearchResult>
                    </Wrapper>
                </DarkBg>
                <LightBg>
                    <Wrapper>
                        {posts.length > 0 ? (
                          <>
                              <Module>
                                  <PostFeed posts={posts}/>
                              </Module>
                              <Module>
                                  <PaginationSearch page={page} feed={posts} query={query}/>
                              </Module>
                          </>
                        ):(
                          <NoContent>
                              <p>No results</p>
                          </NoContent>
                        )}
                    </Wrapper>
                </LightBg>
            </>
        )
    }
}
export default SearchPage;


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
const Module = styled.div`
  margin: 1rem;
  position: relative;
`;
const SearchResult = styled.div`
  padding: 2rem;
  display: flex;
  h2{
    color: ${colors.lightGray};
    margin: 0;
    padding: 0;
    line-height: 2rem;
    font-size: 2rem;
  }
  h1{
    color: ${colors.orange};
    margin: 0 0 0 .5rem;
    border-bottom: 3px solid ${colors.orange};
    padding: 0;
    line-height: 2rem;
    font-size: 2rem;
  }
`
