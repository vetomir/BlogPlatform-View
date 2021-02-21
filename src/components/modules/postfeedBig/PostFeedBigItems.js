import React, {Component} from "react";
import {PostEntity} from "../../../controllers/entities/PostEntity";

export class PostFeedBigItems extends Component {
    state = {
        post:PostEntity
    }
    render() {
        const post = this.props.post

        return (
            <a href={`/posts?id=${post.id}`} className='Post' key={'newsFeedQuery' + post.id}>
                <img
                    className='Image'
                    src={post.photoUrl}
                    alt={post.title}
                />
                <div className='Content'>

                    <h4 className='Title'>
                        {post.title}
                    </h4>
                    <div className='Category'>{post.categoryName}</div>
                    <p className='Author'>
                        {post.createdOn}
                    </p>
                    <div className='Lead'>
                        <div dangerouslySetInnerHTML={{__html : post.lead}}/>
                    </div>
                </div>
            </a>
        )
    }
}
