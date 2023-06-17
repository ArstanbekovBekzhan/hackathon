import React from 'react';
import { useParams } from 'react-router-dom';

const PublicServicesDynamic = () => {
  const { serviceEng } = useParams();
  console.log(serviceEng);
  return (
    <div>
      <h2>Страница PublicServicesDynamic</h2>
      <p>Service Eng: {serviceEng}</p>
    </div>
  );
};

export {PublicServicesDynamic};
