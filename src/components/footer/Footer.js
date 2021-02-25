import {Component} from "react";
import styled from 'styled-components'
import {colors} from "../utils/Colors";
import {AiFillGithub} from "react-icons/ai";

class Footer extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {

        return (
            <Wrapper>
                <li>
                    <a href="https://github.com/vetomir/BlogPlatformView">
                        <AiFillGithub/>
                        <p>Frontend</p>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/vetomir/BlogPlatformApi">
                        <AiFillGithub/>
                        <p>Backend</p>
                    </a>
                </li>
            </Wrapper>
        )
    }
}
export default Footer;

const Wrapper = styled.ul`
  width: 100%;
  height: 20vh;
  color: ${colors.black};
  background: ${colors.indigo};
  display: flex;
  align-items: center;
  justify-content: center;
  li{
    a{
      display: flex;
      color: ${colors.black};
      font-size: 1.5rem;
      text-decoration: none;
      border: 2px solid ${colors.black};
      padding: .5rem 1rem;
      margin: 0 1rem;
      border-radius: 10px;
      p{
        margin-left: .5rem;
      }
      &:hover{
        color: ${colors.white};
        border: 2px solid ${colors.white};
        transition: 500ms;
      }
    }
  }
`;
