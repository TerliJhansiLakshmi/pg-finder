import React, { useState, useEffect, useCallback } from 'react';
import PGCard from '../components/PGCard';
import axios from 'axios';

export default function PGListPage() {
  const savedFilter = JSON.parse(localStorage.getItem('filter') || '{}');
  const [query, setQuery] = useState(savedFilter);
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPGs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...query };

      // Convert checkboxes to strings for backend
      if (params.wifi === true) params.wifi = 'true';
      if (params.ac === true) params.ac = 'true';
      if (params.washingMachine === true) params.washingMachine = 'true';

      const res = await axios.get('http://localhost:5000/api/pgs', { params });
      setPgs(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching PGs');
    }
    setLoading(false);
  }, [query]);

  useEffect(() => {
    loadPGs();
  }, [loadPGs]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available PGs</h2>
      {loading ? (
        <p>Loading PGs...</p>
      ) : (
        <>
          {pgs.length === 0 && <p>No PGs found for selected filters.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {pgs.map(pg => (
              <PGCard key={pg._id} pg={pg} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
