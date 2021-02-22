import {Component} from "react";
import styled from 'styled-components'
import {colors} from "../utils/Colors";

class Footer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {

        return (
            <Wrapper>
                Footer
            </Wrapper>
        )
    }
}
export default Footer;

const Wrapper = styled.div`
  width: 100%;
  color: ${colors.indigo};
  display: flex;
  align-items: center;
  justify-content: center;
`
