import { ReactNode } from 'react';
import InfoBox from '@/components/info-box/info-box';
import { Button } from '@/components/ui/button';
import PackageBox from '@/components/package-box/package-box';
import { packagesOptions } from '@/components/packages/packages';
import { useGetUserByIdQuery } from '@/redux/services/users.service';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';

const PackagesPage = (): ReactNode => {
  const router = useRouter();
  const { user } = useAppSelector((store) => store.appState);
  const { data, refetch, isLoading } = useGetUserByIdQuery(
    { id: user.id },
    { skip: !user?.id },
  );

  if (!data?.user) {
    return <div className="mt-6">Loading....</div>;
  }

  const onAddFundsClick = async () => {
    await router.push('/deposit');
  };

  const balance = data?.user?.balance || 0;
  const packageId = data?.user?.membership?.id;
  return (
    <div className="mt-6">
      <h1 className="text-3xl">Packages</h1>
      <div className="my-6 flex items-center">
        <InfoBox title="Balance amount" value={`${balance} USDC`} />
        <Button onClick={onAddFundsClick}>Deposit funds</Button>
      </div>
      <div>
        {packagesOptions.map((membership: any) => {
          const { id, name, price, dailyIncome } = membership;
          return (
            <PackageBox
              key={`pack-${id}`}
              id={id}
              name={name}
              price={price}
              dailyIncome={dailyIncome}
              packageId={packageId}
              balance={balance}
              refetch={refetch}
              user={data?.user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PackagesPage;
