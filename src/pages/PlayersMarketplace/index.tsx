import * as React from 'react';
import { Box } from 'grommet';
import { Button, DisableWrap, Loader, Select, Title } from 'components/Base';
import { BaseContainer, PageContainer } from 'components';
import { PlayerCard } from './PlayerCard';
import { useStores } from 'stores';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { PLAYERS_FILTER } from '../../stores/SoccerPlayersList';

export const PlayersMarketplace = observer(() => {
  const { soccerPlayers, user } = useStores();

  useEffect(() => {
    soccerPlayers.setMaxDisplay(20);

    soccerPlayers.getList();
  }, []);

  return (
    <BaseContainer>
      <PageContainer>
        <Box
          direction="row"
          justify="between"
          align="center"
          margin={{ vertical: '30px' }}
        >
          {/*<Title*/}
          {/*  bold*/}
          {/*  size="large"*/}
          {/*  color="white"*/}
          {/*  style={{*/}
          {/*    boxShadow: 'box-shadow: 0 0 20px rgba(0,0,0,0.4)',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Collect your team*/}
          {/*</Title>*/}
          <Box direction="row" gap="20px" justify="center">
            <Button
              style={{
                background:
                  soccerPlayers.filter === PLAYERS_FILTER.ALL
                    ? 'rgb(12, 132, 132)'
                    : 'black',
              }}
              onClick={() => soccerPlayers.setFilter(PLAYERS_FILTER.ALL)}
            >
              All art cards
            </Button>
            <Button
              style={{
                background:
                  soccerPlayers.filter === PLAYERS_FILTER.TOP
                    ? 'rgb(12, 132, 132)'
                    : 'black',
              }}
              onClick={() => soccerPlayers.setFilter(PLAYERS_FILTER.TOP)}
            >
              TOP 5 art cards
            </Button>
            <Button
              style={{
                background:
                  soccerPlayers.filter === PLAYERS_FILTER.MY
                    ? 'rgb(12, 132, 132)'
                    : 'black',
              }}
              disabled={!user.isAuthorized}
              onClick={() => soccerPlayers.setFilter(PLAYERS_FILTER.MY)}
            >
              My art cards
            </Button>
          </Box>

          <Box gap="20px" direction="row" align="end">
            <Title
              size="small"
              color="white"
              style={{
                boxShadow: 'box-shadow: 0 0 20px rgba(0,0,0,0.4)',
              }}
            >
              sort by
            </Title>
            <Select
              size="medium"
              onChange={soccerPlayers.setSort}
              value={soccerPlayers.sort}
              options={[
                {
                  text: 'high price',
                  value: 'highPrice',
                },
                {
                  text: 'low price',
                  value: 'lowPrice',
                },
                {
                  text: 'card number',
                  value: 'internalPlayerId',
                },
              ]}
            />
          </Box>
        </Box>

        {soccerPlayers.status === 'first_fetching' ? (
          <Loader />
        ) : (
          <Box
            direction="row"
            justify={
              soccerPlayers.filteredList.length < 10 ? 'center' : 'between'
            }
            align="center"
            wrap
            gap={soccerPlayers.filteredList.length < 10 ? '20px' : '10x'}
            style={{ minHeight: 600 }}
          >
            {soccerPlayers.filteredList.map((item, idx) => (
              <PlayerCard
                key={item.player.internalPlayerId}
                player={item.player}
                emptyPlayer={item.emptyPlayer}
                onEnterViewport={() => {
                  if (idx + 10 > soccerPlayers.maxDisplay) {
                    soccerPlayers.setMaxDisplay(soccerPlayers.maxDisplay + 20);
                    return;
                  }

                  // if (idx + 10 < 20) {
                  //   soccerPlayers.setMaxDisplay(20);
                  //   return
                  // }
                  //
                  // if (idx + 10 < soccerPlayers.maxDisplay) {
                  //   if (idx + 10 < 20) {
                  //     soccerPlayers.setMaxDisplay(20);
                  //     return
                  //   }
                  //
                  //   if (idx + 10 < 40) {
                  //     soccerPlayers.setMaxDisplay(40);
                  //     return
                  //   }
                  // }
                  //
                  // if (idx + 10 < 60) {
                  //   soccerPlayers.setMaxDisplay(60);
                  //   return
                  // }
                  //
                  // if (idx + 10 < 80) {
                  //   soccerPlayers.setMaxDisplay(80);
                  // }
                }}
              />
            ))}
          </Box>
        )}
      </PageContainer>
    </BaseContainer>
  );
});
