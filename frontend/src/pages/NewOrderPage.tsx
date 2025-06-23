import React, { useState } from 'react';
import { createOrder, geocodeAddress, geocodeCoordinates } from '../api';

export const NewOrderPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [fromLat, setFromLat] = useState('');
  const [fromLng, setFromLng] = useState('');
  const [toLat, setToLat] = useState('');
  const [toLng, setToLng] = useState('');

  const handleGeocode = async (value: string, type: 'from' | 'to') => {
    setSuggestions(await geocodeAddress(value));
    const coords = await geocodeCoordinates(value);
    if (!coords) return;
    if (type === 'from') {
      setFromLat(coords.lat.toString());
      setFromLng(coords.lng.toString());
    } else {
      setToLat(coords.lat.toString());
      setToLng(coords.lng.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder({
      passenger_phone: phone,
      from_address: from,
      from_lat: parseFloat(fromLat),
      from_lng: parseFloat(fromLng),
      from_description: description,
      to_address: to,
      to_lat: parseFloat(toLat),
      to_lng: parseFloat(toLng),
      to_description: description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Order</h1>
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      <input
        value={from}
        onChange={e => {
          setFrom(e.target.value);
          handleGeocode(e.target.value, 'from');
        }}
        placeholder="From address"
      />
      <input value={fromLat} readOnly placeholder="From lat" />
      <input value={fromLng} readOnly placeholder="From lng" />
      <input
        value={to}
        onChange={e => {
          setTo(e.target.value);
          handleGeocode(e.target.value, 'to');
        }}
        placeholder="To address"
      />
      <input value={toLat} readOnly placeholder="To lat" />
      <input value={toLng} readOnly placeholder="To lng" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create</button>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
    </form>
  );
};
