import {BiComment} from "react-icons/bi";
import React, {Component} from "react";
import {PostEntity} from "../../../controllers/entities/PostEntity";

export class PostFeedItems extends Component {
    state = {
        post:PostEntity
    }
    render() {
        const post = this.props.post

        return (
            <a href={`/posts?id=${post.id}`} className='Post' key={"moduleFull " + post.id}>
                <img
                    className='Image'
                    alt={post.title}
                    src={post.photoUrl}
                />
                <div className='Content'>
                    {post.category.name !== 'Uncategorized' ? (
                        <div className='Category'>{post.category.name}</div>
                    ):(
                        <></>
                    )}
                    <p className='Author'>
                        {post.author.nickname} on {post.createdOn}
                    </p>
                    <h4 className='Title'>
                        {post.title}
                    </h4>
                    <div className='Lead'>
                        <div dangerouslySetInnerHTML={{__html : post.lead.substring(0 , 100)+"..."}}/>
                    </div>
                    <div className='Comments'>
                        <BiComment/> {post.comments.length}
                    </div>
                </div>
            </a>
        )
    }
}
