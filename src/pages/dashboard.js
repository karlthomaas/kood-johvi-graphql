import Transactions from 'components/transactions';
import User from 'components/user';

export default function Dashboard() {
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <User />
      <Transactions />
    </div>
  );
}
