import styled, {keyframes} from "styled-components";
import {colors} from "./Colors";
import {BiError} from "react-icons/bi";

export function AlertServer({error}){
    return (
        <AlertServerWrapper>
            {error ? (
                error.messages.map( e =>
                    <li>
                        <BiError/> {e}
                    </li>
                )
            ) : (
                <></>
            )}
        </AlertServerWrapper>
    )
}

const light = keyframes`
  0%{
    box-shadow: 0 0 5px ${colors.black};
  }
  10%{
    box-shadow: 0 0 5px ${colors.orange};
    
  }
  40%{
    box-shadow: 0 0 5px ${colors.black};
  }
`

export const AlertServerWrapper = styled.ul`
  position: fixed;
  z-index: 999;
  bottom: 1rem;
  right: 1rem;
  li{
    display: flex;
    align-items: center;
    font-size: 1rem;
    line-height: 2rem;
    margin-top: 1rem;
    padding: 1rem 2rem;
    color: ${colors.white};
    background: ${colors.indigo};
    border-radius: 10px;
    animation: ${light} 5000ms infinite;
    svg{
      color: ${colors.white};
      font-size: 1.5rem;
      margin-right: .2rem;
    }
  }
`
/**/
export const NoContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10rem;
  p{
    font-size: 1rem;
    color: ${colors.lightGray};
  }
`;
