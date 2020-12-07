import React from 'react';
import { Box } from 'grommet';
import { Title } from './Base/components/Title';

export const Info = () => (
  <Box pad={{ horizontal: 'large', top: 'large' }}>
    <Title>About LMA art cards</Title>
    <div>
      <p>
        This art gallery contains unique non-fungible tokens (NFT) ART cards on
        Harmony Network. Non-fungible tokens are used to create verifiable
        digital scarcity, as well as digital ownership.
      </p>

      <p>
        <a href="https://seeswap.one/" target="_blank">
          LMA-ART-GALLERY.com
        </a>{' '}
        gives you the chance to buy and own ART NFTs Cards. If someone buy your
        LMA Art card, you will receive 50% reward and 50% will be used to buy
        and burn LMA tokens. The Art cards price increases 100% each time a user
        buy it.
      </p>

      <p>
        LMA token is the first deflationary token on Harmony Network and can be
        traded on SeeSwap DEX
      </p>

      <p>
        <ul>
          <li>There were originally 1,000,000 LMA minted</li>
          <li>
            Every month the LMA CEO account will buy back and burn LMA tokens
          </li>
          <li>There will never be newly minted LMA tokens.</li>
          <li>
            LMA tokens NEVER will be airdropped, all tokens need to be bought
            and price will increase over time (only decrease if investor sell
            with lost)
          </li>
          <li>
            LMA can be traded on SeeSwap{' '}
            <a href="https://seeswap.one/" target="_blank">
              https://seeswap.one
            </a>
          </li>
        </ul>
      </p>

      <p>LMA Token contract 0x7d0546dBb1Dca8108d99Aa389A8e9Ce0C40B2370</p>
    </div>
  </Box>
);
