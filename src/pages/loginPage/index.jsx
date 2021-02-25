import {Component} from "react";
import {Input} from "../../components/form/FormItems";
import {Button_1} from "../../components/utils/Buttons";
import AuthService from "../../controllers/AuthService";
import {Redirect} from "react-router-dom";
import {LoginForm} from "../../components/form/LoginForm";
import {AlertServer} from "../../components/utils/Alerts";
import DocumentMeta from "react-document-meta";
import styled from "styled-components"
import {colors} from "../../components/utils/Colors";

class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: '',
            },
            message: '',
            redirect: '',
            error:'',
            meta: {
                title: 'Login | blogs.',
                description: 'I am a description, and I can create multiple tags',
                canonical: '/login',
                meta: {
                    charset: 'utf-8',
                    name: {
                        keywords: 'react,meta,document,html,tags'
                    }
                },
            }
        };
    }
    componentDidMount() {
        /**/
    }
    login = async() =>{
        await AuthService.login(this.state.user.username, this.state.user.password).then(
            () => {
                this.setState({
                    redirect: "/"
                });
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
    onChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        const{user,error, meta} = this.state

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <LoginForm>
                <DocumentMeta {...meta} />
                <AlertServer error={error}/>
                <div className='Form'>
                    <label>Username</label>
                    <Input
                        name='username'
                        placeholder='*'
                        value={user.username}
                        onChange={this.onChange}
                        type='email'
                    />
                    <label>Password</label>
                    <Input
                        name='password'
                        placeholder='*'
                        value={user.password}
                        onChange={this.onChange}
                        type='password'
                    />
                    <Button_1 onClick={this.login}>Submit</Button_1>
                </div>
                <Demo>
                    <p>Username: test1@test.pl</p>
                    <p>Password: test123</p>
                </Demo>
            </LoginForm>
        )
    }
}
export default LoginPage;

const Demo = styled.div`
  background-color: ${colors.indigo};
  padding: .5rem 1rem;
  border-radius: 10px;
  p{
    color: ${colors.white};
    padding: .3rem;
  }
`
