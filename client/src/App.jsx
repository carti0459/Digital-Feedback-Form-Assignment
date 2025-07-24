import { useState, useEffect } from 'react';

function App() {
  const [page, setPage] = useState('feedback');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 'list') {
      fetchFeedbacks();
    }
  }, [page]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch {
      setError('Failed to load feedback.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (name.length < 2 || message.length < 5) {
      setError('Name must be at least 2 characters and message at least 5.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to submit feedback.');
        return;
      }
      setSuccess('Feedback submitted!');
      setName('');
      setMessage('');
    } catch {
      setError('Failed to submit feedback.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto">
        <nav className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <button onClick={() => setPage('feedback')} className={`w-full sm:w-auto px-4 py-2 rounded ${page === 'feedback' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Submit Feedback</button>
          <button onClick={() => setPage('list')} className={`w-full sm:w-auto px-4 py-2 rounded ${page === 'list' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>View Feedback</button>
        </nav>
        {page === 'feedback' && (
          <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded shadow w-full max-w-sm sm:max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Submit Feedback</h2>
            {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
            {success && <div className="mb-2 text-green-600 text-center">{success}</div>}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2" required minLength={2} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Message</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full border rounded px-3 py-2" required minLength={5} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Submit</button>
          </form>
        )}
        {page === 'list' && (
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">All Feedback</h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <div className="text-center">No feedback yet.</div>
                ) : (
                  feedbacks.map(fb => (
                    <div key={fb._id} className="bg-white p-3 sm:p-4 rounded shadow">
                      <div className="font-semibold break-words">{fb.name}</div>
                      <div className="text-gray-700 break-words">{fb.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(fb.createdAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
