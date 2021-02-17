import React, { MouseEvent, createRef } from 'react';
import styled from 'styled-components';
import { BoardUser, BoardFestival } from '../api/board';
import { BsTrash } from 'react-icons/bs';
import Moment from 'moment';
import 'moment/locale/en-nz';
import { deleteBoardAsync } from '../modules/board/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { useHistory } from 'react-router-dom';

interface Props {
  url: string;
  onClose: () => void;
  description: string;
  userInfo: BoardUser;
  festival: BoardFestival;
  time: string;
  _id: string;
}

interface ContainerProps {
  onClick: (event: MouseEvent) => void;
}

interface ImageProps {
  url: string;
}

const ImageModal = ({
  url,
  onClose,
  description,
  userInfo,
  festival,
  time,
  _id,
}: Props) => {
  const contentRef = createRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const history = useHistory();
  const nick = useSelector((state: RootState) => state.userInfo.data?.nickName);

  const handleClick = (event: MouseEvent) => {
    const { current } = contentRef;
    if (!current!.contains(event.target as HTMLElement)) {
      onClose();
    }
  };

  const deleteHandler = (): void => {
    console.log(_id);
    dispatch(deleteBoardAsync.request({ boardId: _id }));
    onClose();
    history.push('/review');
  };

  return (
    <DivContainer onClick={(event: MouseEvent) => handleClick(event)}>
      <Content ref={contentRef}>
        <ImageModalImage url={url} />
        <Container>
          <Head>
            <User>
              <UserImage src={userInfo.image} alt="" />{' '}
              <UserName>By {userInfo.nickname}</UserName>
            </User>
            <span className="wall" />
            <Festival># {festival.name}</Festival>
            <span className="wall" />
            <Time>{Moment(time).fromNow()}</Time>
            <TrashButton onClick={deleteHandler} />
          </Head>
          <Wall />
          <Article>
            <Description>{description}</Description>
          </Article>
        </Container>
      </Content>
    </DivContainer>
  );
};

const TrashButton = styled(BsTrash)`
  justify-self: flex-end;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 0;
  z-index: 10;
  color: #ccc;

  &:hover {
    color: white;
  }
`;

const Wall = styled.div`
  max-width: 100%;
  height: 1.5px;
  opacity: 0.5;
  position: relative;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(46, 50, 51);
  padding: 10px;
  border-radius: 0 0 0.5rem 0.5rem;
  max-width: 700px;

  .wall {
    display: inline;
    box-sizing: border-box;
    border: 0 solid #d2d6dc;
    margin-right: 4px;
    margin-left: 4px;
    padding: 0.5px;
    height: 1.5rem;
    background-color: #ccc;
  }
`;

const Head = styled.header`
  background-color: #1d2120;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
`;

const Festival = styled.div`
  font-size: 1rem;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

const UserName = styled.div`
  font-size: 1rem;
  align-items: center;
`;

const UserImage = styled.img`
  width: 2rem;
  height: auto;
  border-radius: 50%;
`;
const Time = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Article = styled.article`
  display: flex;
  padding: 10px;
  background-color: #1d2120;
  border-radius: 0.5rem;
`;

const Description = styled.div`
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivContainer = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageModalImage = styled.div<ImageProps>`
  width: 700px;
  height: 700px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: rgb(46, 50, 51);
  background-image: url(${(props) => props.url});
  border-radius: 0.5rem 0.5rem 0 0;
`;

export default ImageModal;
