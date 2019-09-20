import React from "react";
import styled from "styled-components";
import CastawayCard from "../CastawayCard/CastawayCard";

const Tribe = ({
  tribe,
  episodeData,
  tribeData,
  formerTribeHighlight,
  setFormerTribeHighlight,
  removeFormerTribeHighlight,
}) => {
  const { castaways } = episodeData;

  const getTribeTitle = (tribeName) => {
    if (tribeName === `Extinction Island`) {
      return <i className="fas fa-skull-crossbones" />;
    }
    return tribeName;
  };

  const tribeClass = tribe.name === `Extinction Island` ? `extinction-island` : tribe.name.toLowerCase();

  return (
    <StyledTribe tribe={tribe.name} className={`tribe pa2 fl ${tribeClass}`}>
      <h1>{getTribeTitle(tribe.name)}</h1>
      <CastawayList tribeName={tribe.name}>
        {castaways
          && castaways
            .filter(
              castaway => castaway.tribe.replace(/ \d/g, ``) === tribe.name && castaway.currentBoot === false,
            )
            .map(castaway => (
              <CastawayCard
                tribeName={tribe.name}
                tribeColor={tribe.tribe_color}
                key={castaway.name}
                castaway={castaway}
                tribeData={tribeData}
                formerTribeHighlight={formerTribeHighlight}
                setFormerTribeHighlight={setFormerTribeHighlight}
                removeFormerTribeHighlight={removeFormerTribeHighlight}
                episodeId={episodeData.id}
              />
            ))}
      </CastawayList>
    </StyledTribe>
  );
};

const StyledTribe = styled.section`
  flex: ${props => (props.tribe === `Extinction Island` ? `0.1` : `1 1`)};
`;

const CastawayList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 800px;
  margin: auto;
`;

export default Tribe;
