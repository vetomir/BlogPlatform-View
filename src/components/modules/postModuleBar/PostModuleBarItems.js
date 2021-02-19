import {Component} from "react";
import {PostEntity} from "../../../controllers/entities/PostEntity";

class PostModuleBarItems extends Component {
    state = {
        post:PostEntity
    }
    render() {
        const post = this.props.post
        return (
            <a href={`/posts?id=${post.id}`} className='Post' key={'postModuleBar' + post.id} >
                <img
                    alt={post.title}
                    className='Image'
                    src={post.photoUrl}
                />
                <div className='Description'>
                    <h4 className='Title'>
                        {post.title}
                    </h4>
                    <p className='Lead'>
                        {post.lead.substring(0 , 50)} ...
                    </p>
                </div>
            </a>
        )
    }
}
export default PostModuleBarItems;
