import React, { FC, useContext } from "react";
import styled from "styled-components";
import { nextDocument, previousDocument } from "../state/main/actions";
import { MainContext } from "../state/main/Context";

const DocumentNav: FC<{}> = () => {
  const {
    state: { currentFileNo, documents, currentDocument },
    dispatch,
  } = useContext(MainContext);

  if (documents.length <= 1 || !currentDocument) return null;

  let fileName = currentDocument.uri;

  const splitURL = fileName.split("/");
  if (splitURL.length) {
    fileName = splitURL[splitURL.length - 1];
  }

  return (
    <Container>
      <span>
        Document {currentFileNo + 1} of {documents.length}
      </span>

      <ButtonPrev
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        {"<"}
      </ButtonPrev>

      <ButtonNext
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        {">"}
      </ButtonNext>
    </Container>
  );
};

export default DocumentNav;

const Container = styled.div`
  flex-direction: row;
  margin: 0 10px;
  color: #fff;
`;

const Button = styled.button`
  width: 25px;
  /* height: 30px; */
  border-radius: 40px;
  /* font-size: 18px; */
  background-color: #fff;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  color: #999;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  border: 0;
  outline: none;
`;
const ButtonPrev = styled(Button)`
  margin: 0 5px 0 10px;
`;
const ButtonNext = styled(Button)`
  margin: 0 5px;
`;
