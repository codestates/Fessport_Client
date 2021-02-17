import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { postParticAsync } from '../modules/participant';
import { useHistory } from 'react-router-dom';
import {
  deleteCommentAsync,
  getCommentAsync,
  postCommentAsync,
} from '../modules/comment';
import { deleteBoardAsync, getBoardAsync } from '../modules/board/actions';
import { RootState } from '../modules';
import { comment, participantlist } from '../api/board';
import Moment from 'moment';
import 'moment/locale/en-nz';

interface JoinProps {
  boardId: string;
  _id: string;
  nick: string;
  participants: participantlist[] | null;
  comments: comment[] | null;
}

const CompanionJoin = ({
  boardId,
  nick,
  participants,
  comments,
  _id,
}: JoinProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const handleShowUp = () => setShow(!show);
  const dispatch = useDispatch();
  const history = useHistory();

  //------------------------ DELETE comment logic -----------------------
  const [commentId, setCommentId] = useState<string>('');
  const deleteCommentHandler = () => {
    const dele = { commentId: commentId };
    console.log(commentId);
    dispatch(
      deleteCommentAsync.request({
        commentData: dele,
      }),
    );
    history.push('/companion');
  };

  // ----------------------- DELETE board logic --------------------------

  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const userInfo = useSelector((state: RootState) => state.userInfo.data);

  const deleteHandler = (): void => {
    console.log('board id: !!', boardId);
    dispatch(deleteBoardAsync.request({ boardId: boardId }));
    history.push(`/companion`);
    dispatch(getBoardAsync.request('60173438054e876dd74af2e3'));
  };

  // ----------------------- Participants logic --------------------------
  const joinHandler = (): void => {
    const particInfo = {
      boardId: boardId,
    };
    dispatch(
      postParticAsync.request({
        postParticData: particInfo,
      }),
    );
  };

  // ----------------------- comment logic --------------------------
  const { data } = useSelector(
    (state: RootState) => state.commentData.commentData,
  );
  const [comment_post, setComment] = useState<string>('');
  const commentHandler = () => {
    const commentForm = { boardId: boardId, description: comment_post };
    dispatch(
      postCommentAsync.request({
        commentData: commentForm,
      }),
    );
    dispatch(getBoardAsync.request('60173438054e876dd74af2e3'));
  };

  return (
    <>
      {!show ? (
        <Button>
          {_id === userInfo?._id ? (
            <CompanionShowBtn
              type="submit"
              value="Delete"
              onClick={deleteHandler}
            />
          ) : null}
          <CompanionShowBtn type="submit" value="SHOW" onClick={handleShowUp} />
        </Button>
      ) : (
        <ParticipantContainer>
          <Header>
            <div>
              <Participate
                type="submit"
                className="participate"
                value="JOIN"
                onClick={joinHandler}
              />
            </div>
          </Header>
          <Content>
            <ParticipantContent>
              <ContentHeader> LIST </ContentHeader>
              <Break />
              <ParticipantLists>{nick}</ParticipantLists>
              {participants?.map((el, index) => {
                return (
                  <ParticipantLists key={index}>{el.nickname}</ParticipantLists>
                );
              })}
            </ParticipantContent>
            <ContentComment>
              <CommentHeader>COMMENT</CommentHeader>
              <Break />
              {comments?.map((el, index) => {
                return (
                  <CommentContainer key={index}>
                    <CommentUser>
                      <CommentUserImage
                        src={
                          el.user.image !== ''
                            ? el.user.image
                            : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                        }
                        alt=""
                      />
                      <CommentNick>{el.user.nickname}</CommentNick>
                    </CommentUser>
                    <CommentDescription>
                      <div>{el.description}</div>
                      <CommentDate>
                        {Moment(el.createdAt).fromNow()}
                      </CommentDate>
                      {_id === userInfo?._id ? (
                        <CommentDelete
                          type="submit"
                          value="x"
                          onMouseOver={() => setCommentId(el._id)}
                          onClick={() => deleteCommentHandler()}
                        />
                      ) : (
                        <div />
                      )}
                    </CommentDescription>
                  </CommentContainer>
                );
              })}
            </ContentComment>
          </Content>
          <Break />
          <Footer>
            <CommentBox
              type="text"
              placeholder="Leave a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <Wall />
            <CompanionHideBtn
              type="submit"
              value="SUBMIT"
              onClick={commentHandler}
            />
            <Wall />
            <CompanionHideBtn
              type="submit"
              value="HIDE"
              onClick={handleShowUp}
            />
          </Footer>
        </ParticipantContainer>
      )}
    </>
  );
};

const Button = styled.div`
  gap: 10px;
  display: flex;
  padding-right: 5px;
`;

const CommentDelete = styled.input`
  color: white;
  background-color: #1d2120;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

const CommentDate = styled.div`
  display: flex;
  color: #64706c;
  align-items: center;
`;

const CommentBox = styled.input`
  display: flex;
  width: 52%;
  font-size: 14px;
  color: black;
  background-color: white;
`;

const CommentDescription = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
`;

const CommentNick = styled.div`
  color: #64706c;
  display: flex;
  padding: 10px;
  height: 100%;
  font-size: 14px;
  justify-content: center;
  align-items: center;
`;

const CommentUserImage = styled.img`
  display: flex;
  max-width: 2.5vh;
  min-width: 2.5vh;
  max-height: 2.5vh;
  min-height: 2.5vh;
  border-radius: 5rem;
  justify-content: center;
  align-items: center;
`;

const CommentUser = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-start;
`;

const CommentContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 50px;
  height: 100%;
  padding: 10px;
  display: flex;
`;

const ContentComment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
  border-radius: 0.5rem;
`;

const CommentHeader = styled.div`
  text-align: center;
  background-color: none;
  font-size: 20px;
  padding: 10px;
  width: 100%;
`;

const Participate = styled.input`
  background-color: orange;
  display: flex;
  padding: 10px;
  cursor: pointer;
  width: auto;
`;

const ParticipantLists = styled.div`
  padding: 15px;
  text-align: center;
`;

const ContentHeader = styled.div`
  flex-direction: column;
  padding: 10px;
  text-align: center;
  font-size: 20px;
`;

const ParticipantContent = styled.div`
  padding: 10px;
  width: 100%;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
`;

const Content = styled.div`
  background-color: none;
  border-radius: 1rem;
  display: grid;
  grid-template-columns: 25% auto;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
  border-radius: 0.5rem;
`;

const Header = styled.div`
  background-color: none;
  display: flex;
  padding: 5px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
`;

const Break = styled.div`
  max-width: 95%;
  height: 1.2px;
  opacity: 0.5;
  position: relative;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const Footer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
  border-radius: 0.5rem;
`;

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #ccc;
  background-color: #1d2120;
  border-radius: 0.5rem;

  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);

  .bx bx-hot {
    width: 100px;
    height: 100px;
  }

  .image {
    margin-left: 20px;
    min-width: 20vh;
  }

  .header_container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .title {
    display: flex;
    padding: 10px;
    width: 100%;
  }
  .festival {
    display: flex;
    width: 100%;
    font-size: 20px;
  }
`;

const Wall = styled.div`
  margin-left: 0.375rem;
  margin-right: 0.375rem;
`;

const CompanionHideBtn = styled.input`
  cursor: pointer;
  padding: 10px;
  background-color: orange;
`;

const CompanionShowBtn = styled.input`
  background-color: orange;
  padding: 10px;
  cursor: pointer;
`;

export default CompanionJoin;
