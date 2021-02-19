import {Link} from "react-router-dom";
import {BiComment} from "react-icons/bi";

export function PostModuleBigItem({post}) {
    return (
        <>
            <a to={`/posts?id=${post.id}`} className='Post' key={"header " + post.id}>
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
            </a>
        </>
    )
}
