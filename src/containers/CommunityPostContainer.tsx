import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { getBoardAsync, postBoardAsync } from '../modules/board';
import { getFestivalCategoryAsync } from '../modules/category';
import { postImageAsync } from '../modules/image';
import { useHistory } from 'react-router-dom';

const CommunityPostContainer = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [festivalId, setFestivalId] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { imageData } = useSelector((state: RootState) => state.image);

  // FESTIVAL 정보 받아와서 카테고리 만들어주기.
  const { data } = useSelector((state: RootState) => state.category.festival);
  const { login } = useSelector((state: RootState) => state.login.userInfo);

  useEffect(() => {
    dispatch(getFestivalCategoryAsync.request());
  }, []);

  // ---------------- POST IMAGE logic ---------------

  const fileRef: React.RefObject<HTMLInputElement> = React.createRef();
  const handleSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files !== null) {
      const fd = new FormData();
      fd.append('img', event.target.files[0]);
      dispatch(postImageAsync.request(fd));
    }
  };

  //------------------ POST BOARD logic ----------------
  const onSubmitHandler = () => {
    // if (category && festivalId && description && title) {
    const form = {
      festivalId: festivalId,
      boardCategoryId: category,
      title: title,
      description: description,
      image: imageData,
    };

    console.log(imageData);

    dispatch(
      postBoardAsync.request({
        postBoardData: form,
      }),
    );
    // }

    if (category === '60173438054e876dd74af2e3') {
      dispatch(getBoardAsync.request('60173438054e876dd74af2e3'));
      history.push(`/companion`);
    } else if (category === '60173438054e876dd74af2e4') {
      dispatch(getBoardAsync.request('60173438054e876dd74af2e4'));
      history.push(`/resell`);
    } else if (category === '602b843b018d510ec91de5c9') {
      dispatch(getBoardAsync.request('602b843b018d510ec91de5c9'));
      history.push(`/review`);
    }
  };

  return (
    <>
      {!window.localStorage.loggedInfo ? (
        <Error>Error.. 로그인하세요!</Error>
      ) : (
        <>
          <Container>
            <PostHead>POST</PostHead>
            <PostSub>새로운 글 등록</PostSub>
          </Container>
          <CompanionPost>
            <Post>
              <Post_Header>
                <Head_Title
                  type="text"
                  placeholder="제목을 입력하세요."
                  onChange={(e) => setTitle(e.target.value)}
                />
                Min. 10. Max. 80
                <Post_Type onChange={(e) => setCategory(e.target.value)}>
                  <option> 카테고리를 선택하세요. </option>
                  <option value="60173438054e876dd74af2e3">
                    * 동행 글 쓰기
                  </option>
                  <option value="60173438054e876dd74af2e4">
                    * 사고팔기 글 쓰기
                  </option>
                  <option value="602b843b018d510ec91de5c9">
                    * 리뷰 글 쓰기
                  </option>
                </Post_Type>
                <Head_Category onChange={(e) => setFestivalId(e.target.value)}>
                  <option value="placeholder">* 페스티벌 고르기</option>
                  {data?.map((el, index) => {
                    return (
                      <option value={el._id} key={index}>
                        {'#' + ' ' + el.name}
                      </option>
                    );
                  })}
                </Head_Category>
              </Post_Header>
              <Post_Article>
                {imageData ? <img src={imageData} alt=""></img> : <div />}
                <TextArea
                  placeholder="내용을 입력하세요."
                  onChange={(e) => setDescription(e.target.value)}
                />
                {category === '60173438054e876dd74af2e4' ||
                category === '602b843b018d510ec91de5c9' ? (
                  <File>
                    <File_Label htmlFor="input-file">UPLOAD</File_Label>
                    <File_upload
                      id="input-file"
                      ref={fileRef}
                      type={'file'}
                      accept="image/*"
                      onChange={handleSelectedImage}
                      style={{ display: 'none' }}
                    />
                  </File>
                ) : (
                  <div />
                )}
              </Post_Article>
              <Footer>
                <Footer_Btn
                  type="submit"
                  value="SUBMIT"
                  onClick={onSubmitHandler}
                />
                <Wall />
              </Footer>
            </Post>
          </CompanionPost>
        </>
      )}
    </>
  );
};

const Post_Type = styled.select`
  background-color: white;
  display: flex;
  font-size: 20px;
  padding: 10px;
  width: 100%;
  position: center;
  border-bottom: 1px solid #666;
  border-radius: 0.375rem;
`;

const TextArea = styled.textarea`
  font-size: 20px;
  padding: 10px;
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  border-radius: 0.375rem;
`;

const Post_Article = styled.article`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Head_Category = styled.select`
  background-color: white;
  display: flex;
  font-size: 20px;
  padding: 10px;
  width: 100%;
  position: center;
  border-bottom: 1px solid #666;
  border-radius: 0.375rem;
`;

const Head_Title = styled.input`
  background-color: white;
  display: flex;
  font-size: 20px;
  padding: 10px;
  width: 100%;
  position: center;
  border-bottom: 1px solid #666;
  border-radius: 0.375rem;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  background-color: rgb(46, 50, 51);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-bottom: 6.7rem;
`;

const Post_Header = styled.header`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
`;

const PostSub = styled.div`
  border-radius: 0.5rem;
  text-align: center;
  font-size: 16px;
`;

const File = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const File_Label = styled.label`
  background-color: orange;
  display: flex;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  width: auto;
  color: black;
`;

const File_upload = styled.input`
  position: absolute;
  width: 100px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const CompanionPost = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: #ccc;
  border-radius: 0.5rem;
  align-items: center;
`;

const Wall = styled.div`
  margin-left: 0.375rem;
  margin-right: 0.375rem;
`;

const Footer_Btn = styled.input`
  background-color: orange;
  padding: 10px;
  cursor: pointer;
  width: auto;
  border-radius: 0.5rem;
`;

const Footer = styled.footer`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
`;

const Category = styled.div``;

const PostHead = styled.div`
  font-size: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export default CommunityPostContainer;
