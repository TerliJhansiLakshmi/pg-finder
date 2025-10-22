import React from 'react';

export default function Footer() {
  return (
    <footer style={{ textAlign:'center', padding:'10px', background:'#f8f8f8', marginTop:'20px', fontSize:'12px', color:'#777' }}>
      © {new Date().getFullYear()} PG Finder
    </footer>
  );
}
