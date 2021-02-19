import React, {Component} from "react";
import {Link} from "react-router-dom";
import {BiComment} from "react-icons/bi";
import {PostEntity} from "../../../controllers/entities/PostEntity";

export class HeaderItemBig extends Component {
    state = {
        post:PostEntity
    }
    render() {
        const post = this.props.post

        return (
            <Link to={`/posts?id=${post.id}`} className='FirstPost Post' key={'Header ' + post.id}>
                <img
                    alt={post.title + ": main article"}
                    className='Image'
                    src={post.photoUrl}
                />
                <div className='Content'>
                    <p className='Author'>
                        {post.author.nickname} on {post.createdOn}
                    </p>
                    <h4 className='Title'>
                        {post.title}
                    </h4>
                    <p className='Comments'>
                        <BiComment/> {post.comments.length}
                    </p>
                </div>
            </Link>
        )
    }
}
export function HeaderItemSmall({post}) {
    return (
        <>
            <Link to={`/posts?id=${post.id}`} className='Post' key={"header " + post.id}>
                <img
                    alt={post.title + ": article"}
                    className='Image'
                    src={post.photoUrl}
                />
                <div className='Content'>
                    <p className='Author'>
                        {post.author.nickname} on {post.createdOn}
                    </p>
                    <h4 className='Title'>
                        {post.title}
                    </h4>
                    <p className='Comments'>
                        <BiComment/> {post.comments.length}
                    </p>
                </div>
            </Link>
        </>
    )
}
