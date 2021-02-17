import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { useHistory } from 'react-router-dom';
import { BoardFestival, comment, participantlist } from '../api/board';
import { getBoardAsync, deleteBoardAsync } from '../modules/board/actions';
import Moment from 'moment';
import 'moment/locale/en-nz';
import {
  postCommentAsync,
  deleteCommentAsync,
} from '../modules/comment/actions';
interface detailProps {
  image: string;
  festival: BoardFestival;
  comments: comment[] | null;
  description: string;
  boardId: string;
  _id: string;
}
const ResellDetail = ({
  image,
  festival,
  comments,
  description,
  boardId,
  _id,
}: detailProps): JSX.Element => {
  const [detail, setDetail] = useState<boolean>(false);
  const handleDetail = () => setDetail(!detail);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo.data);
  const { login } = useSelector((state: RootState) => state.login.userInfo);
  const history = useHistory();
  const [commentId, setCommentId] = useState<string>('');

  const deleteCommentHandler = () => {
    const dele = { commentId: commentId };
    dispatch(
      deleteCommentAsync.request({
        commentData: dele,
      }),
    );
    history.push('/resell');
  };
  //---------------------- DELETE BOARD logic
  const deleteBoardHandler = (): void => {
    if (login) {
      dispatch(
        deleteBoardAsync.request({
          boardId: boardId,
        }),
      );
      history.push('/resell');
    }
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
    dispatch(getBoardAsync.request('60173438054e876dd74af2e4'));
  };
  return (
    <>
      {!detail ? (
        <ResellShowBtn>
          {_id === userInfo?._id ? (
            <input type="submit" value="Delete" onClick={deleteBoardHandler} />
          ) : (
            <div />
          )}
          <input type="submit" value="SHOW" onClick={handleDetail} />
        </ResellShowBtn>
      ) : (
        <ContentContainer>
          <Content>
            <div className="image-container">
              {image !== '' && image === null ? (
                <div>이미지가 없습니다.</div>
              ) : (
                <img className="image" src={image} alt="" />
              )}
            </div>
            <div className="description">
              <div>{description}</div>
            </div>
          </Content>
          <Comment>
            <div className="comment-header"> COMMENT </div>
            <div className="break"></div>
            <div className="comment-container">
              {comments?.map((el, index) => {
                return (
                  <div className="comment-box" key={index}>
                    <div className="comment-attribute">
                      <img
                        className="comment-image"
                        src={`https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`}
                        alt=""
                      />
                      <div key={index}>{el.user.nickname}</div>
                    </div>
                    <div className="comment_box">
                      <div>{el.description}</div>
                      <div>{Moment(el.createdAt).fromNow()}</div>
                      {_id === userInfo?._id ? (
                        <input
                          type="submit"
                          value="x"
                          className="comment_delete"
                          onMouseOver={() => setCommentId(el._id)}
                          onClick={() => deleteCommentHandler()}
                        />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="footer">
              <input
                type="text"
                className="text-box"
                placeholder="Leave a comment..."
                onChange={(e) => setComment(e.target.value)}
              ></input>
              <input
                type="submit"
                className="input"
                value="SUBMIT"
                onClick={commentHandler}
              ></input>
              <input
                type="submit"
                className="input"
                value="HIDE"
                onClick={handleDetail}
              />
            </div>
          </Comment>
        </ContentContainer>
      )}
    </>
  );
};
const Comment = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
  border-radius: 0.5rem;
  .comment-container {
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 10px;
    display: flex;
  }
  .comment-header {
    text-align: center;
    padding: 10px;
    font-size: 1.5rem;
  }
  .comment-image {
    display: flex;
    max-width: 2.5vh;
    min-width: 2.5vh;
    max-height: 2.5vh;
    min-height: 2.5vh;
    border-radius: 5rem;
    justify-content: center;
    align-items: center;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 10px;
  }
  .text-box {
    font-size: 1rem;
    width: 100%;
    background-color: white;
  }
  .text-submit {
    cursor: pointer;
    padding: 10px;
    background-color: orange;
  }
  .comment-box {
    height: 100%;
    gap: 10%;
    border-radius: 0.5rem;
    display: flex;
    width: 100%;
    flex-direction: colum;
    box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
      2px 2px 4px -1px rgb(0 0 0 / 10%);
    padding: 10px;
    margin: 5px;
    font-size: 1rem;
  }
  .comment_box {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .comment_delete {
    color: white;
    background-color: #1d2120;
    cursor: pointer;
    :hover {
      transform: scale(1.2);
    }
  }
  .comment-attribute {
    display: flex;
    width: 30%;
    align-items: center;
    gap: 10px;
  }
  .input {
    background-color: orange;
    padding: 10px;
    cursor: pointer;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1d2120;
  .break {
    max-width: 100%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
`;
const Content = styled.article`
  border-radius: 0.5rem;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);
  display: flex;
  padding: 10px;
  margin-top: 10px;
  flex-direction: column;
  gap: 20px;
  .image {
    max-width: 300px;
    max-height: auto;
  }
  .image-container {
    max-width: 300px;
    max-height: auto;
  }
  .description {
    font-size: 1.5rem;
  }
`;
const ResellShowBtn = styled.div`
  // padding-top: 5px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #1d2120;
  input {
    background-color: orange;
    padding: 10px;
    cursor: pointer;
    // margin-right: 18px;
  }
`;
export default ResellDetail;
