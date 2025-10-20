import React, { useEffect } from 'react'
import CreateComment from './CreateComment';
import axios from 'axios';

const CreateSnippet = () => {
  const [title, setTitle] = React.useState('')
  const [code, setCode] = React.useState('')
  const [snippets, setSnippets] = React.useState({})


  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const res = await axios.get("http://localhost:8002/snippets");
    setSnippets(res.data);  
  }
  
  const createSnippet = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/v1/snippet/", { title, code });
    setSnippets((prevSnippets) => ({
      ...prevSnippets,
      [res.data.id]: res.data.snippet,
    }));
    setTitle('');
    setCode('');
  }

  return (
     <div className="mt-10">
      <form onSubmit={createSnippet} className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded px-2 py-1 w-fit"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="write a code snippets..."
          className="border rounded px-2 py-1"
        />
        <button className="w-fit bg-black text-white px-6 py-2 rounded cursor-pointer" type='submit'>
          Add
        </button>
      </form>

      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <CreateComment snippet={snippet}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateSnippet