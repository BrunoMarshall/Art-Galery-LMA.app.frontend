import * as React from 'react';
import { Box } from 'grommet';
import { observer } from 'mobx-react-lite';
import { Title, Text, Button } from 'components/Base';
import cn from 'classnames';
import * as styles from './wallet-balances.styl';
import { formatWithTwoDecimals, ones } from 'utils';
import { useStores } from '../../stores';

const AssetRow = props => {
  return (
    <Box className={cn(styles.walletBalancesRow, styles.underline)}>
      <Box>
        <Text bold={false}>{props.asset}</Text>
      </Box>

      <Box direction="row">
        <Box className={styles.priceColumn} margin={{ right: '10px' }}>
          <Text bold={true}>{props.value}</Text>
        </Box>

        <Button style={{ width: '60px' }} transparent={true} onClick={() => {}}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export const WalletBalances = observer(() => {
  const { user } = useStores();

  return (
    <Box direction="column" className={styles.walletBalances}>
      <Title>Wallet Balances</Title>

      <Box className={styles.container}>
        <AssetRow
          asset="ONE"
          value={formatWithTwoDecimals(ones(user.balance))}
        />
        <AssetRow asset="DAI" value={formatWithTwoDecimals(user.balanceDai)} />
      </Box>
    </Box>
  );
});
