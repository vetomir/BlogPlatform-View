import {Component} from "react";
import {Redirect} from "react-router-dom";
import {Input} from "../../components/form/FormItems";
import {Button_1} from "../../components/utils/Buttons";
import {RegisterForm} from "../../components/form/RegisterForm";
import AuthService from "../../controllers/AuthService";
import {AlertServer} from "../../components/utils/Alerts";
import DocumentMeta from "react-document-meta";

class RegisterPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newUser: {
                username: '',
                nickname: '',
                name: '',
                surname: '',
                password: '',
                passwordRepeat: '',
            },
            message: '',
            error: {
                messages:[],
            },
            redirect: '',
            meta: {
                title: 'Register | blogs.',
                description: 'I am a description, and I can create multiple tags',
                canonical: '/register',
                meta: {
                    charset: 'utf-8',
                    name: {
                        keywords: 'react,meta,document,html,tags'
                    }
                },
            }
        }
    }
    componentDidMount() {
        /**/
    }
    register = async() =>{
        await AuthService.register(this.state.newUser).then(
            response => {
                console.log(this.state.newUser)
                console.log(response)
                this.setState({
                    redirect: "/login"
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
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        const{newUser, error, meta} = this.state

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <RegisterForm>
                <DocumentMeta {...meta} />
                <AlertServer error={error}/>
                <div className='Form'>
                    <label>Username</label>
                    <Input
                        name='username'
                        placeholder='*'
                        value={newUser.username}
                        onChange={this.onChange}
                        type='text'
                    />
                    <label>Nickname</label>
                    <Input
                        name='nickname'
                        placeholder='*'
                        value={newUser.nickname}
                        onChange={this.onChange}
                        type='text'
                    />
                    <label>Name</label>
                    <Input
                        name='name'
                        placeholder='*'
                        value={newUser.name}
                        onChange={this.onChange}
                        type='text'
                    />
                    <label>Surname</label>
                    <Input
                        name='surname'
                        placeholder='*'
                        value={newUser.surname}
                        onChange={this.onChange}
                        type='text'
                    />
                    <label>Password</label>
                    <Input
                        name='password'
                        placeholder='*'
                        value={newUser.password}
                        onChange={this.onChange}
                        type='password'
                    />
                    <label>Password Repeat</label>
                    <Input
                        name='passwordRepeat'
                        placeholder='*'
                        value={newUser.passwordRepeat}
                        onChange={this.onChange}
                        type='password'
                    />
                    <Button_1 onClick={this.register}>Submit</Button_1>
                </div>
            </RegisterForm>
        )
    }
}
export default RegisterPage;
