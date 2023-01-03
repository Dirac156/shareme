import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../services/sanity.client';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setloading] = useState(true);
  if (loading) return <Spinner message="We are adding a new idea to your feed!" />;
  return (
    <div>Feed</div>
  )
}

export default Feed