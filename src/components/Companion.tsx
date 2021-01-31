import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CompanionJoin from './CompanionJoin';

import { Link } from 'react-router-dom';
import { BoardDataRes } from '../api/board';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync } from '../modules/board/actions';
import { getUserInfoAsync } from '../modules/userInfo/actions';
import Moment from 'moment';
import 'moment/locale/en-nz';

const mockData = [
  {
    _id: '1',
    title: '5tardium 동행 구해요~~',
    description: '같이 페스티벌가서 재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '600933f077e53b45bf46b7db',
      image:
        'https://first-project-image-bucket.s3.ap-northeast-2.amazonaws.com/array+method.png',
      nickName: '홍인자',
    },
    festival: {
      _id: '1',
      name: '5tardium',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
        image: '',
      },
      {
        _id: '3',
        nickName: '짱귀희석',
        description: '좋아요!',
        image: '',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환', image: '' },
      { _id: '3', nickName: '짱귀희석', image: '' },
    ],
    createdAt: '2021-01-31T01:18:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '2',
    title: '울트라 동행 구해요~~',
    description: '재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '2',
      image: '',
      nickName: '짱정환',
    },
    festival: {
      _id: '60085af05593303ca99f24e1',
      name: '울트라',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
        image: '',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환', image: '' },
      { _id: '3', nickName: '짱귀희석', image: '' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '3',
    title: '이태원',
    description: '썰파가실?',
    image: 'img.jpg',
    user: {
      _id: '3',
      image: '',
      nickName: '짱귀희석',
    },
    festival: {
      _id: '3',
      name: '썰파',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
        image: '',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환', image: '' },
      { _id: '3', nickName: '짱귀희석', image: '' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
  {
    _id: '1',
    title: '5tardium 동행 구해요~~',
    description: '같이 페스티벌가서 재밌게 놀아요!',
    image: 'img.jpg',
    user: {
      _id: '600933f077e53b45bf46b7db',
      image:
        'https://first-project-image-bucket.s3.ap-northeast-2.amazonaws.com/array+method.png',
      nickName: '홍인자',
    },
    festival: {
      _id: '1',
      name: '썰파',
    },
    comments: [
      {
        _id: '2',
        nickName: '짱정환',
        description: '좋아요!',
        image: '',
      },
      {
        _id: '3',
        nickName: '짱귀희석',
        description: '좋아요!',
        image: '',
      },
    ],
    participants: [
      { _id: '2', nickName: '짱정환', image: '' },
      { _id: '3', nickName: '짱귀희석', image: '' },
    ],
    createdAt: '2021-01-21T16:22:16.358Z',
    updatedAt: '2021-01-21T16:22:16.358Z',
  },
];

const Companion = (): JSX.Element => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.boardData.boardData,
  );
  const [category, setCategory] = useState('all');
  const { login } = useSelector((state: RootState) => state.login.userInfo);

  useEffect(() => {
    getBoardAsync.request('601252586adcbda1c23a9302');
  }, []);

  console.log(Moment(mockData[0].createdAt).fromNow());

  const filtered = mockData.reduce<any>((acc, cur) => {
    if (cur.festival.name in acc) {
      acc[cur.festival.name]++;
    } else {
      acc[cur.festival.name] = 1;
    }
    return acc;
  }, {});
  const dataForCategory = [];
  for (const key in filtered) {
    dataForCategory.push(key + ` (${filtered[key]})`);
  }

  return (
    <>
      <ContentContainer>
        <Content>
          <Category>
            <div className="category_header">Category</div>
            <div className="category_container">
              <div
                className="category_list"
                onClick={() => {
                  setCategory('all');
                }}
              >
                # all
              </div>
            </div>
            {dataForCategory.map((el, index) => {
              return (
                <div className="category_container" key={index}>
                  <div
                    className="category_list"
                    onClick={() => {
                      setCategory(el.slice(0, el.indexOf('(') - 1));
                    }}
                  >
                    {`# ` + el}
                  </div>
                </div>
              );
            })}
          </Category>
          <CompanionLists>
            {mockData
              .filter((el) => {
                if (category === 'all') {
                  return el;
                } else {
                  return el.festival.name === category;
                }
              })
              .map((el, index) => {
                return (
                  <CompanionItem key={index}>
                    <CompanionContent>
                      <div className="element">
                        <div className="element_text">{el.title}</div>
                        <div className="modal__break"></div>
                        <div className="element_attribute">
                          <div>{'in '}</div>
                          <div className="element_festival">
                            {`# ` + el.festival.name}
                          </div>
                          <span className="wall" />
                          <div className="element_nickname">
                            {`by ` + el.user.nickName}
                          </div>
                          <span className="wall" />
                          <div className="element_attribute_date">
                            {Moment(el.createdAt).fromNow()}
                          </div>
                        </div>
                        <div className="modal__break"></div>
                      </div>
                      <div className="element_image">
                        <img
                          className="image"
                          src={
                            el.user.image !== ''
                              ? el.user.image
                              : `https://d2ljmlcsal6xzo.cloudfront.net/assets/fallback/temporary_profile-65c08fd0b2bb95434e40fa62b682df18417765c3b0ac165dcb5b3e9035f01b98.png`
                          }
                          alt=""
                        ></img>
                      </div>
                    </CompanionContent>
                    <div className="footer_btn">
                      <CompanionJoin
                        boardId={el._id}
                        img={el.user.image}
                        nick={el.user.nickName}
                        participants={el.participants}
                        comments={el.comments}
                        festival={el.festival}
                        _id={el.user._id}
                      />
                    </div>
                  </CompanionItem>
                );
              })}
          </CompanionLists>
          <div className="link">
            <div className="category_header">
              {login ? (
                <Link to={`/post`} className="links">
                  글쓰기
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </Content>
      </ContentContainer>
    </>
  );
};

const CompanionContent = styled.div`
  background-color: #1d2120;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
  width: 100%;
  padding: 10px;
  box-shadow: 2px 4px 6px -1px rgb(0 0 0 / 10%),
    2px 2px 4px -1px rgb(0 0 0 / 10%);

  .wall {
    display: inline;
    box-sizing: border-box;
    border: 0 solid #d2d6dc;
    margin-right: 4px;
    margin-left: 4px;
    padding: 0.5px;
    height: 80%;
    background-color: #ccc;
  }

  .modal__break {
    max-width: 95%;
    height: 1px;
    opacity: 0.5;
    position: relative;
    background: linear-gradient(to right, white 0%, #999 100%);
  }
  .element {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .element_text {
    display: block;
    font-size: 30px;
    padding: 5px;
    :hover {
      color: white;
    }
  }

  .element_attribute {
    color: #64706c;
    gap: 4px;
    padding: 5px;
    font-size: 15px;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-direction: space-between;
  }

  .element_nickname {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    font-weight: 400;
  }

  .element_attribute_date {
    padding: 5px;
    font-weight: 400;
  }

  .element_image {
    // border: 1px solid #dee2e6;
    display: flex;
    // flex-wrap: nowrap;
    // width: 100%;
    height: 100%;
    align: center;
    justify-direction: center;
  }

  .image {
    display: flex;
    // flex-wrap: nowrap;
    align: center;
    justify-direction: center;
    width: 90px;
    height: 90px;
    border-radius: 5rem;
  }
`;

const CompanionItem = styled.div`
  background-color: rgb(46, 50, 51);
  display: grid;
  grid-template-rows: repeat(2, auto);
  margin-bottom: 0.75rem;
  padding: 5px;
  flex-direction: column;
  border-radius: 0.5rem;

  :hover {
    transform: scale(1.02);
  }

  .footer_btn {
    background-color: #1d2120;
    border-radius: 0.5rem;
    display: flex;
    justify-content: flex-end;
    padding-top: 5px;
  }
`;

const Content = styled.div`
  color: #ccc;
  display: grid;
  grid-template-columns: 15% 45% 5%;
  grid-gap: 1.5rem;
  justify-content: center;
`;

const Category = styled.div`
  display: block;
  box-sizing: border-box;
  color: #ccc;
  padding: 10px;

  .category_header {
    background-color: #1d2120;
    padding: 15px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    border-radius: 0.5rem;
    // margin: 5px;
  }

  .category_container {
    border-radius: 0.5rem;
    padding: 5px;
    padding-left: 20px;
    background-color: #1d2120;
    // background-color: rgb(46, 50, 51);
    margin-top: 5px;
    margin-bottom: 5px;
    :hover {
      color: white;
    }
  }

  .category_list {
    display: block;
    font-size: 20px;
    cursor: pointer;
  }
`;

const CompanionLists = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  // box-sizing: border-box;
`;

const ContentContainer = styled.div`
  padding-left: 10rem;
  padding-right: 10rem;
  background: url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80);
  min-height: 1280px;

  .links {
    color: black;
    font-size: 12px;
    border-radius: 0.5rem;
    background-color: orange;
    padding: 10px;
    cursor: pointer;
    margin-right: 18px;
  }

  .link {
    width: 150px;
    padding-top: 20px;
    box-sizing: border-box;
    border: 0 solid #d2d6dc;
    display: block;
  }
`;

export default Companion;
