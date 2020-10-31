import React, { useState } from "react";
import Autocomplete from 'react-google-autocomplete';
 

const App = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onPlaceSelected = async ({ place }) => {
    const latValue = place && place.geometry.location.lat();
    const longValue = place && place.geometry.location.lang();
    setIsLoading(true);
    setError(null);
    try {
      const resp = await fetch("http://localhost:8080/api/findoutlet", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({lat: latValue, long: longValue}),
      });
      setName(resp);
      setIsLoading(false);
    }catch(err) {
      setIsLoading(true);
      setError(null);
    }
  };
  
  return (
    <div>
      <Autocomplete
        style={{width: '90%'}}
        onPlaceSelected={onPlaceSelected}
        types={['(regions)']}
      /><br></br>
      {isLoading}
      {name}
      {error}
    </div>
  );
};

export default App;
