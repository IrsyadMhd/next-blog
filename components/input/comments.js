import { useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const notifCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);

    if (!showComments) {
      fetch('/api/comments/' + eventId)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(data => {
            throw new Error(data.message || 'something went wrong!');
          });
        })
        .then(data => setComments(data.comments))
        .catch(error => {
          notifCtx.showNotification({
            status: 'error',
            title: 'Error...',
            text: error.message,
          });
        });
    }
  }

  function addCommentHandler(commentData) {
    notifCtx.showNotification({
      status: 'pending',
      title: 'Sending...',
      text: 'Sending comment...',
    });

    // send data to API
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        notifCtx.showNotification({
          status: 'success',
          title: 'Success',
          text: 'Your comment saved',
        });
      })
      .catch(error => {
        notifCtx.showNotification({
          title: 'Error',
          text: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList commentItems={comments} />}
    </section>
  );
}

export default Comments;
