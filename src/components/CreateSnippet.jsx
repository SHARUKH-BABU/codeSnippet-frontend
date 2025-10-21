import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';

const CreateSnippet = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [snippets, setSnippets] = useState([]);

  // Fetch snippets from query service
  const fetchSnippets = async () => {
    try {
      const res = await axios.get("https://cs-bknd-query.vercel.app/snippets");
      // convert object to array
      setSnippets(Object.values(res.data));
    } catch (err) {
      console.error('Failed to fetch snippets:', err.message);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  // Create new snippet via snippet service
  const createSnippet = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    try {
      await axios.post(
        "https://cs-bknd-snippet.vercel.app/api/v1/snippet/",
        { title, code }
      );
      // Fetch updated snippets from query service
      fetchSnippets();
      setTitle('');
      setCode('');
    } catch (err) {
      console.error('Failed to create snippet:', err.message);
    }
  };

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
          placeholder="Write a code snippet..."
          className="border rounded px-2 py-1"
        />
        <button
          type="submit"
          className="w-fit bg-black text-white px-6 py-2 rounded cursor-pointer"
        >
          Add
        </button>
      </form>

      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
              <code>{snippet.code}</code>
            </pre>
            <CreateComment snippet={snippet} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSnippet;
