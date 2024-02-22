import Transactions from 'components/transactions';
import XpProgression from 'components/xp-progression';

import User from 'components/user';

export default function Dashboard() {
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <User />
      <XpProgression />
    </div>
  );
}
