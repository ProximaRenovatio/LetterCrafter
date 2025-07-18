import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [cv, setCv] = useState('');
  const [job, setJob] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const generateLetter = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', { cv, job });
      setLetter(res.data.letter);
    } catch (err) {
      console.error(err);
      setLetter("Error generating letter.");
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h1>LetterCrafter</h1>
      <textarea rows="5" placeholder="Paste your CV summary..." value={cv} onChange={e => setCv(e.target.value)} />
      <textarea rows="5" placeholder="Paste the job description..." value={job} onChange={e => setJob(e.target.value)} />
      <button onClick={generateLetter} disabled={loading}>{loading ? 'Generating...' : 'Generate Letter'}</button>
      <pre>{letter}</pre>
      <a href="https://ko-fi.com/proxima_centauri" target="_blank" rel="noopener noreferrer">
        Support me on Ko-fi
      </a>
    </main>
  );
}