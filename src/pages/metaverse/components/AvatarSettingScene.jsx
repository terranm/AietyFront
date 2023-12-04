import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LobbyBackground from "assets/images/lobby_background.png";
import { avatarApis } from "../apis/avatarApis";
import XButton from "assets/images/x_button.png";

const AvatarSettingScene = ({
  children,
  showLoadingModal,
  userName,
  sendMessage,
  layoutType,
  setLayoutType,
  avatar,
  originalAvatarItem,
  setOriginalAvatarItem,
}) => {
  const [HairList, setHairList] = useState();
  const [FaceList, setFaceList] = useState();
  const [TopList, setTopList] = useState();
  const [BottomList, setBottomList] = useState();
  const [ShoesList, setShoesList] = useState();
  const [hairItem, setHairItem] = useState(avatar?.hairCode);
  const [faceItem, setFaceItem] = useState(avatar?.faceCode);
  const [topItem, setTopItem] = useState(avatar?.topCode);
  const [bottomItem, setBottomItem] = useState(avatar?.bottomCode);
  const [shoesItem, setShoesItem] = useState(avatar?.shoesCode);

  //카테고리 선택창에서 선택되어있는 아이템
  const [itemList, setItemList] = useState();

  const category = [
    { categoryName: "헤어", categoryList: HairList },
    { categoryName: "꾸미기", categoryList: FaceList },
    { categoryName: "상의", categoryList: TopList },
    { categoryName: "하의", categoryList: BottomList },
    { categoryName: "신발", categoryList: ShoesList },
  ];

  useEffect(() => {
    if (avatar) {
      setHairItem(avatar.hairCode);
      setFaceItem(avatar.faceCode);
      setTopItem(avatar.topCode);
      setBottomItem(avatar.bottomCode);
      setShoesItem(avatar.shoesCode);
    }
    getAvatarCategory();
  }, [avatar]);

  const getAvatarCategory = async () => {
    try {
      const res = await avatarApis.category();

      if (res.resultCode === "0000") {
        setHairList(res.data.hairList);
        setFaceList(res.data.faceList);
        setTopList(res.data.topList);
        setBottomList(res.data.bottomList);
        setShoesList(res.data.shoesList);
        setItemList(res.data.hairList);
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  const chooseItem = (item) => {
    switch (itemList) {
      case HairList:
        setHairItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: item,
              face: faceItem,
              top: topItem,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case FaceList:
        setFaceItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: item,
              top: topItem,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case TopList:
        setTopItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: item,
              bottom: bottomItem,
              shoes: shoesItem,
            })
          )
        );
        break;
      case BottomList:
        setBottomItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: topItem,
              bottom: item,
              shoes: shoesItem,
            })
          )
        );
        break;
      case ShoesList:
        setShoesItem(
          item,
          sendMessage(
            "ReactCommunicator",
            "SetAvatar",
            JSON.stringify({
              hair: hairItem,
              face: faceItem,
              top: topItem,
              bottom: bottomItem,
              shoes: item,
            })
          )
        );
        break;
    }
  };

  const closeAvatarSettingNotSave = async () => {
    console.log({
      hair: originalAvatarItem.hairCode,
      face: originalAvatarItem.faceCode,
      top: originalAvatarItem.topCode,
      bottom: originalAvatarItem.bottomCode,
      shoes: originalAvatarItem.shoesCode,
    });

    setHairItem(originalAvatarItem.hairCode);
    setFaceItem(originalAvatarItem.faceCode);
    setTopItem(originalAvatarItem.topCode);
    setBottomItem(originalAvatarItem.bottomCode);
    setShoesItem(originalAvatarItem.shoesCode);

    sendMessage(
      "ReactCommunicator",
      "SetAvatar",
      JSON.stringify({
        hair: originalAvatarItem.hairCode,
        face: originalAvatarItem.faceCode,
        top: originalAvatarItem.topCode,
        bottom: originalAvatarItem.bottomCode,
        shoes: originalAvatarItem.shoesCode,
      })
    );

    setLayoutType("LOBBY");
    sendMessage(
      "ReactCommunicator",
      "avatarSetting",
      JSON.stringify({
        open: false,
      })
    );
  };

  const closeAvatarSetting = async () => {
    try {
      const res = await avatarApis.save({
        hairCode: hairItem,
        faceCode: faceItem,
        topCode: topItem,
        bottomCode: bottomItem,
        shoesCode: shoesItem,
        hatCode: null,
      });

      if (res.resultCode === "0000") {
        setLayoutType("LOBBY");
        sendMessage(
          "ReactCommunicator",
          "avatarSetting",
          JSON.stringify({
            open: false,
          })
        );
      } else {
        alert(res.resultMessage);
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <AvatarWrapper style={{ display: !showLoadingModal ? "flex" : "none" }}>
      <div>
        <img src={LobbyBackground} alt="img"></img>
      </div>
      <div className="overlay"></div>
      {/* 아바타 선택 화면 */}
      <AvatarFlexModal>
        <SelectModal>
          <button className="close" onClick={closeAvatarSettingNotSave}>
            <img alt="btn" src={XButton}></img>
          </button>
          <h3>나를 표현할 캐릭터를 만들어 주세요.</h3>
          <div className="modalBox">
            <div className="modalInBox" style={{ backgroundColor: "#d9d9d9" }}>
              {children}
            </div>
            <div className="modalInBox itemBox">
              <AvatarCategory>
                {category.map((item, index) => {
                  if (itemList == item.categoryList) {
                    return (
                      <div
                        key={index}
                        className="categoryActive"
                        onClick={() => {
                          setItemList(item.categoryList);
                        }}
                      >
                        {item.categoryName}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="category"
                        onClick={() => {
                          setItemList(item.categoryList);
                        }}
                      >
                        {item.categoryName}
                      </div>
                    );
                  }
                })}
              </AvatarCategory>
              <AvatarItemList>
                {itemList?.map((item, index) => {
                  if (
                    (itemList == HairList && hairItem == item.itemName) ||
                    (itemList == FaceList && faceItem == item.itemName) ||
                    (itemList == TopList && topItem == item.itemName) ||
                    (itemList == BottomList && bottomItem == item.itemName) ||
                    (itemList == ShoesList && shoesItem == item.itemName)
                  ) {
                    return (
                      <SelectedAvatarItem
                        key={index}
                        onClick={() => {
                          chooseItem(item.itemName);
                        }}
                      >
                        <img width="100%" src={item.itemUrl}></img>
                      </SelectedAvatarItem>
                    );
                  } else {
                    return (
                      <AvatarItem
                        key={index}
                        onClick={() => {
                          chooseItem(item.itemName);
                        }}
                      >
                        <img width="100%" src={item.itemUrl}></img>
                      </AvatarItem>
                    );
                  }
                })}
              </AvatarItemList>
            </div>
          </div>
        </SelectModal>
        {layoutType == "AVATAR" && (
          <NickNameModal>
            <input
              placeholder="닉네임을 입력해 주세요."
              value={userName}
              readOnly
            ></input>
            <button onClick={closeAvatarSetting}>등록</button>
          </NickNameModal>
        )}
      </AvatarFlexModal>
    </AvatarWrapper>
  );
};

export default AvatarSettingScene;

const AvatarWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  & > div > img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarFlexModal = styled.div`
  display: flex;
  width: 980px;
  min-height: 700px;
  max-height: 760px;
  height: 80%;
  /* align-items: ; */
  flex-wrap: wrap;
`;

const SelectModal = styled.div`
  /* width: 980px; */
  width: 100%;
  height: 613px;
  border-radius: 18px;
  background: #fff;
  z-index: 20;
  padding: 0 30px;
  & > h3 {
    color: #000;
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    padding: 25px 0 15px 0;
  }
  & > .modalBox {
    display: flex;
    justify-content: space-between;
  }
  & > .modalBox > .modalInBox {
    width: 450px;
    height: 500px;
    border-radius: 8px;
    border: 1px solid #d9d9d9;
    overflow: hidden;
  }
  & > .modalBox > .itemBox {
    padding: 28px 0;
  }
  position: relative;
  & > .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 30px;
    cursor: pointer;
  }
`;

const NickNameModal = styled.div`
  width: 100%;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  & > input {
    width: 500px;
    height: 60px;
    border-radius: 8px;
    border: 1px solid rgba(102, 102, 102, 0.8);
    background: #fff;
    color: #000;
    font-size: 20px;
    font-weight: 500;
    padding: 15px 30px;
    margin-right: 18px;
  }
  & > input:focus {
    outline: none;
  }
  & > button {
    width: 140px;
    height: 60px;
    border-radius: 30px;
    background: #3546d1;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
  }
`;

const AvatarCategory = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    width: 98px;
    text-align: center;
    padding-bottom: 9px;
    cursor: pointer;
  }
  & > .category {
    color: #9e9e9e;
    border-bottom: 1px solid #e6e6e6;
  }
  & > .categoryActive {
    color: #f6a901;
    font-weight: 700;
    border-bottom: 2px solid #f6a901;
  }
`;

const AvatarItemList = styled.div`
  padding: 30px;
  height: 448px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  align-content: flex-start;
  gap: 22px;
  overflow-y: scroll;
  /* 수직 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9; /* 스크롤바 썸의 배경색을 투명으로 설정합니다. */
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;
const SelectedAvatarItem = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  border: 2px solid #f6a901;
  cursor: pointer;
`;
const AvatarItem = styled.div`
  border: 2px solid #fff;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: pointer;
`;
