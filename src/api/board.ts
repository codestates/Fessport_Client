import axios from 'axios';

// ----------- Get Board list
export async function getBoardData(
  boardId: string,
): Promise<BoardDataRes[] | void> {
  const response = await axios.get<BoardDataRes[]>(
    `https://fessport-server.com/board/list?boardCategoryId=${boardId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface BoardDataRes {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: BoardUser;
  festival: BoardFestival;
  createdAt: string;
  updatedAt: string;
  comments: comment[] | null;
  participants: participantlist[] | null;
}

export interface BoardFestival {
  _id: string;
  name: string;
}

export interface comment {
  _id: string;
  description: string;
  user: {
    _id: string;
    nickname: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface participantlist {
  _id: string;
  nickname: string;
  image: string;
}

export interface BoardUser {
  _id: string;
  image: string;
  nickname: string;
}

// ------------- Post & Edit Board -------------
export async function postBoardData(
  param: BoardRequest,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    `https://fessport-server.com/board/create`,
    param.postBoardData,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface BoardRequest {
  postBoardData: BoardInfo;
}

interface BoardInfo {
  festivalId: string;
  boardCategoryId: string;
  title: string;
  description: string;
  image: string | null;
}

export interface Imessage {
  message: string;
}

// ------------- delete Board -------------
export async function deleteBoardData(
  param: BoardDelete,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    `https://fessport-server.com/board/delete?boardId=${param.boardId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface BoardDelete {
  boardId: string;
}
