import classes from './comment-list.module.css';

function CommentList(props) {
  const { commentItems } = props;

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {commentItems.map(item => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
