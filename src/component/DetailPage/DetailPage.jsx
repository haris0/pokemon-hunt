import React from 'react';
import { useParams } from "react-router-dom";

function DetailPage() {

  const pokemon = useParams().name;

  return (
    <div>
      Pokemon name {pokemon}
    </div>
  );
}

export default DetailPage;