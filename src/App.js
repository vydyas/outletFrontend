import React, { useCallback, useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onPlaceSelected = useCallback( async (place) => {

    const latValue = place && place.geometry && place.geometry.location.lat();
    const longValue = place && place.geometry && place.geometry.location.lang();

    try {
      setIsLoading(true);
      const respone = await axios.post("http://localhost:8080/api/findoutlet",{long: longValue, lat: latValue})
      setName(respone.data.outlet || "No Outlet Found");
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(err);
    }

  })
  
  return (
      <>
        <Autocomplete
          style={{width: '90%'}}
          onPlaceSelected = {onPlaceSelected}
          types={['(places)']}
        /><br/><br/>
        {name}
        {isLoading}
        {error}
      </>
  );
};

export default App;
