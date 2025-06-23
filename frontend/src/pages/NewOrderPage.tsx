import React, { useState } from 'react';
import { createOrder, geocodeAddress } from '../api';

export const NewOrderPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGeocode = async (value: string) => {
    setSuggestions(await geocodeAddress(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOrder({ phone, from_address: from, to_address: to, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Order</h1>
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      <input
        value={from}
        onChange={e => {
          setFrom(e.target.value);
          handleGeocode(e.target.value);
        }}
        placeholder="From address"
      />
      <input
        value={to}
        onChange={e => {
          setTo(e.target.value);
          handleGeocode(e.target.value);
        }}
        placeholder="To address"
      />
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
