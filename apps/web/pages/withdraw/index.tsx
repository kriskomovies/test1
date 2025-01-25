import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InfoBox from '@/components/info-box/info-box';
import { useGetUserByIdQuery } from '@/redux/services/users.service';
import { useAppSelector } from '@/redux/store';
import { Wallet } from '@/components/icons/wallet';
import { Clock } from '@/components/icons/clock';

const WithdrawPage = (): ReactNode => {
  const { user } = useAppSelector((store) => store.appState);
  const { data } = useGetUserByIdQuery({ id: user.id }, { skip: !user?.id });

  if (!data?.user) {
    return <div className="mt-6">Loading....</div>;
  }

  const balance = data?.user?.balance || 0;
  const pendingWithdraws = data?.user?.pendingWithdraws || 0;

  return (
    <div className="mt-6 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Withdraw Funds
      </h1>
      <p className="text-gray-400 text-sm md:text-base mb-4">
        Withdraw your earnings to your external wallet by submitting a request.
        Our team will review and process your withdrawal within 24 hours.
      </p>

      <div className="my-4 md:my-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <InfoBox title="Available amount" value={`${balance} USDC`} />
        <InfoBox
          title="Pending withdraws"
          value={pendingWithdraws.toString()}
        />
      </div>

      <div className="relative rounded-xl border-2 border-gray-800 transition-all p-4 md:p-6 backdrop-blur-sm bg-white/5">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          Request Withdrawal
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <Input
              type="number"
              placeholder="0"
              className="bg-transparent border-gray-700 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Withdraw wallet
            </label>
            <Input
              type="text"
              placeholder="Public key..."
              className="bg-transparent border-gray-700 focus:border-blue-500"
            />
            <p className="mt-2 text-xs text-orange-400 flex items-center">
              <span className="mr-2">⚠️</span>
              The provided address must be on: Solana Network
            </p>
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input
              type="checkbox"
              id="confirm"
              className="mt-1 rounded border-gray-700 bg-transparent"
            />
            <label htmlFor="confirm" className="text-sm text-gray-400">
              I confirm that the details provided are correct
            </label>
          </div>

          <Button variant="secondary" className="w-full mt-6">
            WITHDRAW
          </Button>
        </div>
      </div>

      <div className="mt-6 relative rounded-xl border-2 border-orange-900/50 transition-all p-4 md:p-6 backdrop-blur-sm bg-orange-500/5">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-orange-400 mb-1">No Tax Fees</h3>
            <p className="text-sm text-orange-300/80">
              We do not charge any tax or service fees for withdrawals. However,
              please note that a small{' '}
              <span className="text-orange-400">
                Solana blockchain network fee
              </span>{' '}
              will be deducted to process your transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
