import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { 
  client, 
  searchQuery,
  feedQuery 
} from '../services/sanity.client';
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setloading] = useState<boolean>(true);
  const [pins, setpins] = useState<any>(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setloading(true);
    if (categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then(data => {
          setpins(data);
          setloading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then(data => {
          setpins(data);
          setloading(false);
        })
    }
  }, [categoryId])

  if (loading) return <Spinner message="We are adding a new idea to your feed!" />;
  return (
    <div>
      { pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed