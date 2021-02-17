import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoardAsync, getBoardAsync } from '..//modules/board/actions';
import { RootState } from '../modules';
import ImagePreview from '../components/ImagePreview';
import ImageModal from '../components/ImageModal';

interface KeyboardEvent {
  keyCode: number;
}

const ReviewContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.boardData.boardData);
  const [selected, setSelected] = useState(-1);

  const handleUserKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (selected === -1) return;
      const { keyCode } = event;

      if (keyCode === 37) {
        setSelected((selected + data.length - 1) % data.length);
      }

      if (keyCode === 39) {
        setSelected((selected + 1) % data.length);
      }
    },
    [selected],
  );

  useEffect(() => {
    dispatch(getBoardAsync.request('602b843b018d510ec91de5c9'));
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const onClose = () => {
    setSelected(-1);
  };

  return (
    <>
      <Container>
        <Header>
          <Head>Review</Head>
          <Sub>페스티벌에서 찍은 사진을 공유해보세요!</Sub>
        </Header>
        <Content>
          <DivContainer>
            <AppItemsContainer>
              {data.map((imageUrl, index) => (
                <AppItem key={index} onClick={() => setSelected(index)}>
                  <ImagePreview url={imageUrl.image} />
                </AppItem>
              ))}
            </AppItemsContainer>
            {selected !== -1 && (
              <ImageModal
                _id={data[selected]._id}
                url={data[selected].image}
                onClose={onClose}
                description={data[selected].description}
                userInfo={data[selected].user}
                festival={data[selected].festival}
                time={data[selected].createdAt}
              />
            )}
          </DivContainer>
        </Content>
      </Container>
    </>
  );
};

const DivContainer = styled.div`
  width: 100%;
`;

const AppItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AppItem = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  padding-left: 15%;
  padding-right: 15%;

  @media only screen and (max-width: 960px) {
    padding-left: 14vw;
    padding-right: 14vw;
  }
`;

const Sub = styled.div`
  display: block;
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
  margin-top: 1.75rem;
  margin-bottom: 3rem;
`;

const Head = styled.h2`
  display: block;
  text-align: center;
  font-size: 4rem;
  font-weight: 600;
  color: white;
`;

const Container = styled.div`
  height: 100px;
  display: center;
  padding-top: 5rem;
`;

const Header = styled.div`
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export default ReviewContainer;
