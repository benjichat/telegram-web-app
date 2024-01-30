import axios from 'axios';
import React, { useState, FormEvent } from 'react';

type CoinSubmissionFormProps = {
  username: string | null;
};

const CoinSubmissionForm: React.FC<CoinSubmissionFormProps> = ({ username }) => {
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/submit-coin', { name, url, username });
      setName('');
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
      <div className="mb-4">
        <label htmlFor="coin" className="block text-sm font-medium text-gray-700">
          Coin Name:
        </label>
        <input
          type="text"
          id="coin"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25"
          placeholder="Enter coin name"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL:
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25"
          placeholder="Enter URL"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Submit
      </button>
    </form>
  );
};

export default CoinSubmissionForm;
