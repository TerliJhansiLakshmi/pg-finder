import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPGById, contactOwner } from '../api';

export default function PGDetails() {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ name:'', phone:'', message:'' });
  const [ownerContact, setOwnerContact] = useState(null);

  useEffect(() => {
    fetchPGById(id).then(data => { setPg(data); setLoading(false); }).catch(()=>setLoading(false));
  }, [id]);

  const handleContact = async e => {
    e.preventDefault();
    try {
      const data = await contactOwner({ pgId:id, ...contactForm });
      setOwnerContact(data);
    } catch(err){
      alert('Error contacting owner');
      console.error(err);
    }
  };

  if(loading) return <p>Loading...</p>;
  if(!pg) return <p>PG not found</p>;

  return (
    <div style={{ padding:'20px' }}>
      <h2>{pg.name}</h2>
      <p>{pg.address}</p>
      <p>Rent: ₹{pg.rent}</p>
      <p>Gender: {pg.gender}</p>
      <p>Features: {pg.wifi?'Wi-Fi ':''}{pg.ac?'• AC ':''}{pg.washingMachine?'• Washing':''}</p>
      <p>Nearby: {pg.nearPlaces.join(', ')}</p>

      {ownerContact ? (
        <div style={{ marginTop:'20px', padding:'10px', border:'1px solid #ddd' }}>
          <h3>Owner Contact</h3>
          <p>Name: {ownerContact.ownerName}</p>
          <p>Phone: {ownerContact.ownerContact}</p>
          <p>{ownerContact.note}</p>
        </div>
      ) : (
        <form onSubmit={handleContact} style={{ marginTop:'20px' }}>
          <h3>Contact Owner</h3>
          <input type="text" placeholder="Your Name" value={contactForm.name} required
            onChange={e=>setContactForm({...contactForm,name:e.target.value})}/>
          <input type="text" placeholder="Phone Number" value={contactForm.phone} required
            onChange={e=>setContactForm({...contactForm,phone:e.target.value})}/>
          <textarea placeholder="Message" value={contactForm.message}
            onChange={e=>setContactForm({...contactForm,message:e.target.value})}/>
          <button type="submit" style={{ marginTop:'10px', padding:'5px 10px' }}>Send</button>
        </form>
      )}
    </div>
  );
}
