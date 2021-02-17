import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { loginAsync, signupAsync } from '../modules/sign';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignModal = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const outsideRef = React.useRef(null);
  const [showSignup, setSignUp] = useState<boolean>(true);
  const handleSignup = () => setSignUp(!showSignup);
  const { login, error } = useSelector(
    (state: RootState) => state.login.userInfo,
  );

  //---------------- animation ------------------
  const animation = useSpring({
    config: {
      duration: 300,
    },
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  // ---------------- SIGN IN logic ----------------------

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validation, setValidation] = useState<string>('');

  const onSubmitHandler = (): void => {
    if (!email && !password) {
      setValidation('이메일과 비밀번호를 확인하세요');
    } else {
      const userInfo = {
        email: email,
        password: password,
      };
      dispatch(loginAsync.request({ userInfo: userInfo }));
      localStorage.setItem('loggedInfo', email);
      onClose();
    }
    if (error) {
      setValidation('로그인을 실패했습니다. 이메일과 비밀번호를 확인하세요.');
    }
  };

  // ---------------- SIGN UP logic ----------------------
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpNick, setSignUpNick] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [signUpCPassword, setSignUpCPassword] = useState<string>('');

  const onSignUpHandler = (e: any) => {
    if (signUpCPassword !== signUpPassword) {
    }
    e.preventDefault();
    const userInfo = {
      email: signUpEmail,
      nickname: signUpNick,
      password: signUpPassword,
    };
    dispatch(signupAsync.request({ userInfo: userInfo }));
    handleSignup();
  };

  return (
    <>
      {isOpen ? (
        <Background>
          <animated.div style={animation}>
            <ModalWrapper>
              <CloseModalButton onClick={onClose} />
              <ModalIntro>
                <ModalImg src={'/images/Fessport.png'} alt="Logo" />
              </ModalIntro>
              <ModalContent>
                {showSignup ? (
                  <>
                    <Attribute>
                      <ModalList>
                        <Label> EMAIL: </Label>
                        <Input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </ModalList>
                      <ModalList>
                        <Label> PASSWORD: </Label>
                        <Input
                          defaultValue=""
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </ModalList>
                    </Attribute>
                    <Attribute>
                      <Error>{validation}</Error>
                    </Attribute>
                    <ModalFooter>
                      <ModalList>
                        <LoginButton type="submit" onClick={onSubmitHandler}>
                          로그인
                        </LoginButton>
                      </ModalList>
                      <ModalList>
                        <ModalChange
                          onClick={handleSignup}
                          value="가입"
                          readOnly
                        ></ModalChange>
                      </ModalList>
                    </ModalFooter>
                  </>
                ) : (
                  <>
                    <Attribute>
                      <ModalList>
                        <Label>* EMAIL: </Label>
                        <Input
                          defaultValue=""
                          type="email"
                          onChange={(e) => setSignUpEmail(e.target.value)}
                        />
                      </ModalList>
                      <ModalList>
                        <Label>* NICK NAME: </Label>
                        <Input
                          defaultValue=""
                          type="text"
                          onChange={(e) => setSignUpNick(e.target.value)}
                        />
                      </ModalList>
                    </Attribute>
                    <Attribute>
                      <ModalList>
                        <Label>* PASSWORD: </Label>
                        <Input
                          defaultValue=""
                          type="password"
                          onChange={(e) => setSignUpPassword(e.target.value)}
                        />
                      </ModalList>
                      <ModalList>
                        <Label>* CONFIRM YOUR PASSWORD: </Label>
                        <Input
                          defaultValue=""
                          type="password"
                          onChange={(e) => setSignUpCPassword(e.target.value)}
                        />
                      </ModalList>
                    </Attribute>
                    <ModalFooter>
                      <ModalList>
                        <SignUpButton type="submit" onClick={onSignUpHandler}>
                          회원가입
                        </SignUpButton>
                      </ModalList>
                      <ModalList>
                        <ModalChange
                          onClick={handleSignup}
                          value="뒤로"
                          readOnly
                        ></ModalChange>
                      </ModalList>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Error = styled.div`
  color: orange;
  font-size: 0.8rem;
`;

const Break = styled.div`
  max-width: 95%;
  height: 1px;
  opacity: 0.5;
  position: relative;
  margin-bottom: 45px;
  background: linear-gradient(to right, white 0%, #999 100%);
`;

const SignUpButton = styled.button`
  width: auto;
  min-width: 150px;
  max-width: 150px;
  font-size: 14px;
  cursor: pointer;
  padding: 12px 24px;
  background-color: #94f2ff;
  border: 1px solid;

  &:hover {
    background-color: white;
  }
`;

const ModalChange = styled.input`
  font-size: 1rem;
  color: #ccc;
  cursor: pointer;
  width: 36px;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom: 1.5px solid #666;

  &: hover {
    border-bottom: 1.5px solid #7fff00;
    transition: all 0.2s ease-out;
  }
`;

const LoginButton = styled.button`
  width: auto;
  min-width: 150px;
  max-width: 150px;
  font-size: 14px;
  cursor: pointer;
  padding: 12px 24px;
  background-color: #94f2ff;
  border: 1px solid;

  &:hover {
    background-color: white;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: start;
  max-height: 200px;
  gap: 10%;
  padding-left: 20px;
  padding-right: 20px;
`;

const Attribute = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-height: 200px;
  gap: 10%;
  padding-left: 20px;
  padding-right: 20px;
`;

const ModalList = styled.li`
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 1rem;
  text-align: start;
  color: white;
`;

const Input = styled.input`
  font-size: 1.2rem;
  background: none;
  color: #b8e3f4;
  box-sizing: border-box;
  padding: 5px;
  border: 0px;
  border-bottom: 1px solid #666;
  padding: 10px;

  &: hover {
    border-bottom: 1px solid #fff;
    transition: all 0.3s ease-out;
  }
`;

const ModalIntro = styled.div`
  display: flex;
  flex-direction: row;
  background-color: none;
  color: white;
  height: 100%;
  font-size: 3rem;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  heigth: 100vhh;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrapper = styled.div`
  padding: 5px;
  width: 768px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
`;

const ModalImg = styled.img`
  width: 50%;
  height: 50%;
  background-color: none;
`;

const ModalContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #141414;
  justify-content: center;
  min-height: 400px;
`;

const CloseModalButton = styled(MdClose)`
  justify-self: flex-end;
  align-self: flex-end;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: #ccc;

  &:hover {
    color: white;
    transform: rotate(90deg);
    transition: all 0.2s ease-out;
  }
`;
