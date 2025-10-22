import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding:'10px 20px', display:'flex', justifyContent:'space-between', background:'#f8f8f8' }}>
      <Link to="/" style={{ fontSize:'24px', fontWeight:'bold', color:'#3b82f6' }}>PG Finder</Link>
      <nav>
        <Link to="/pgs" style={{ marginLeft:'15px', textDecoration:'none', color:'#555' }}>Browse PGs</Link>
      </nav>
    </header>
  );
}
