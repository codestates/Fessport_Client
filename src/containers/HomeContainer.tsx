import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import CountrySection from '../components/CountrySection';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getMapDataAsync } from '../modules/map';

const HomeContainer = (): JSX.Element => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.map.mapData,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getMapDataAsync.request());
      console.log('HomeContainer useEffect');
    }
  }, []);

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
      {data && (
        <HomePresenter>
          <SubMapImage src={'/images/dots.png'} />
          <MapPresenter>
            <MapImage src={'/images/themap.jpg'} />
            <MapImage src={'/images/grid.png'} />
            {data.map((country) => (
              <CountrySection
                key={country.id}
                id={country.id}
                name={country.name}
                y={country.y}
                x={country.x}
                flageImage={country.flagImage}
                festival={country.festival}
              />
            ))}
          </MapPresenter>
        </HomePresenter>
      )}
    </>
  );
};

const HomePresenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const SubMapImage = styled.img`
  position: absolute;
  width: 1600px;
  height: 700px;
  z-index: 98;
`;

const MapPresenter = styled.div`
  position: relative;
  width: 1400px;
  height: 700px;
`;

const MapImage = styled.img`
  position: absolute;
  width: 1400px;
  height: 700px;
`;

export default withRouter(HomeContainer);