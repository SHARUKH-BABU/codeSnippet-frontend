import React, { useEffect } from 'react'
import axios from 'axios';

const CreateComment = ({ snippet }) => {

  const [text, setText] = React.useState('')
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    setComments(snippet.comments || []);
  }, [snippet.comments]);


  const addComment = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://cs-bknd-comments.vercel.app/api/v1/snippet/${snippet.id}/comment`, {text : text});
      const newComment = response.data.comment;
      setComments([...comments, newComment]);
      setText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }


  return (
    <div className="mt-3">
      {comments.map((comment) => (
        <li key={comment.id} className="py-2 text-gray-500 text-left mx-4">{comment.content}</li>
      ))}
      <form onSubmit={addComment} className="flex mt-3  items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment"
          className="border rounded px-2 text-sm py-1 "
        />
        <button className="hover:bg-black hover:text-white px-4 py-1 rounded bg-white text-black border transition-all transform hover:scale-105 " type='submit'>Add</button>
      </form>
    </div>
  )
}

export default CreateComment