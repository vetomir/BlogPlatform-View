

export function PostModuleSmallItem({post}) {
    return (
        <a href={`/posts?id=${post.id}`} className='Post' key={'moduleSmall ' + post.id}>
            <img
                src={post.photoUrl}
                alt={post.title}
            />
            <div className='Content'>
                <p className="Title">{post.title}</p>
                <p className="Date">{post.author.nickname} on {post.createdOn}</p>
            </div>
        </a>
    )
}
