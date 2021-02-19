import {Component} from "react";
import {PostEntity} from "../../controllers/entities/PostEntity";

class Item extends Component {
    state = {
        post:PostEntity
    }
    render() {
        const post = this.props.post
        return (
            <a href={`/posts?id=${post.id}`} className='Post' key={'headerBar' + post.id}>
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
export default Item;
