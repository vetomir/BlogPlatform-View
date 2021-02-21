import {Component} from "react";
import styled from "styled-components";
import PostCreateForm from "../../components/form/PostCreateForm";
import {colors} from "../../components/utils/Colors";

class PostCreatePage extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {

        return (
            <DarkBg>
                <Wrapper>
                    <PostCreateForm/>
                </Wrapper>
            </DarkBg>
        )
    }
}
export default PostCreatePage;

const DarkBg = styled.div`
  background: ${colors.black};
  max-width: 100%;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  
  margin: 0 auto;
`;
