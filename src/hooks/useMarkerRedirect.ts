import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useMainStore from "../stores/main";
import usePositionStore from "../stores/position";

const useMarkerRedirect = () => {
  const navigate = useNavigate();
  const { setSelectedMarker, setShowLostGoods } = useMainStore();
  const { setLatitude, setLongitude } = usePositionStore();

  return useCallback((showLostGoods: boolean, lat: number, lng: number, name: string) => {
    setSelectedMarker(undefined);
    setShowLostGoods(showLostGoods);
    setLatitude(lat);
    setLongitude(lng);
    navigate("/", {
      state: {
        target: name
      }
    });
  }, []);
};

export default useMarkerRedirect;
