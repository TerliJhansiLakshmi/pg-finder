import React from 'react';
import { Link } from 'react-router-dom';

export default function PGCard({ pg }) {
  return (
    <div style={{ border:'1px solid #ddd', padding:'10px', borderRadius:'6px', marginBottom:'10px', display:'flex', justifyContent:'space-between' }}>
      <div>
        <h3>{pg.name}</h3>
        <p>{pg.address}</p>
        <p>Rent: ₹{pg.rent}</p>
        <p>Gender: {pg.gender}</p>
        <p>{pg.wifi ? 'Wi-Fi ' : ''}{pg.ac ? '• AC ' : ''}{pg.washingMachine ? '• Washing' : ''}</p>
      </div>
      <Link to={`/pgs/${pg._id}`} style={{ color:'#3b82f6', alignSelf:'center' }}>View</Link>
    </div>
  );
}
