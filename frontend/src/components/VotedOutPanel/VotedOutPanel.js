import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CastawayCard from '../CastawayCard/CastawayCard';

const GlobalStyle = createGlobalStyle`
  .votedout .prejury img {
    filter: grayscale(100%);
  }

  .voted-out-panel img {
    width: 64px;
  }

  .voted-out-panel .card-nameplate {
    display:none;
  }

  .voted-out-panel .tribe-circle-container {
    display: none;
  }
`;

const VotedOutPanel = ({ episodeData, formerTribeHighlight, tribeData }) => {
  const { castaways } = episodeData;
  const juryStarted = !!(castaways && castaways.some(castaway => castaway.juryMember));

  const Wrapper = styled.section`
    background-color: #333;
    position: sticky;
    bottom: 0;
    width: 100%;
    z-index: 1;
    height: 80px;
  `;

  const VotedOutList = styled.div`
    height: 100%;
    justify-content: flex-start;
    flex-flow: row;
    overflow-x: auto;
    overflow-y: hidden;
  `;

  const JuryTitle = styled.span`
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    font-family: 'Londrina Solid', sans-serif;
    font-weight: 350;
    color: white;
  `;

  if (
    episodeData.castaways
    && episodeData.castaways.some(castaway => castaway.tribe === 'out' || castaway.currentBoot)
  ) {
    return (
      <Wrapper className="voted-out-panel animated slideInUp">
        <GlobalStyle />
        <VotedOutList className="castawayList votedout">
          {castaways
            && castaways
              .filter(
                castaway => (castaway.tribe === 'out' || castaway.currentBoot) && !castaway.juryMember,
              )
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <CastawayCard
                  key={castaway.name}
                  castaway={castaway}
                  classNames="animated fadeIn prejury"
                  tribeData={tribeData}
                  episodeId={episodeData.id}
                />
              ))}
          {juryStarted && <JuryTitle>JURY</JuryTitle>}
          {juryStarted
            && castaways
              .filter(castaway => castaway.juryMember)
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <CastawayCard
                  key={castaway.name}
                  castaway={castaway}
                  formerTribeHighlight={formerTribeHighlight}
                  classNames="animated fadeIn jury"
                  tribeData={tribeData}
                  episodeId={episodeData.id}
                />
              ))}
        </VotedOutList>
      </Wrapper>
    );
  }
  return null;
};

export default VotedOutPanel;
