import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getUserAudits } from 'lib/graphql/queries';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from 'lib/utils';

export const AuditsRatio = () => {
  const { data } = useQuery({
    queryKey: ['getAuditRatio'],
    queryFn: async () => fetchGraphQL(getUserAudits),
  });

  const convertByteToMb = (bytes) => {
    return Math.round((bytes / 1000000) * 100) / 100;
  };

  if (data) {
    const { auditRatio, totalUp, totalDown } = data.user[0];

    const totalUpMb = convertByteToMb(totalUp);
    const totalDownMb = convertByteToMb(totalDown);
    const formatedAuditRatio = Math.round(auditRatio * 10) / 10;

    return (
      <div className='h-[310px] w-full rounded-lg border border-border p-4 flex flex-col space-y-4'>
        <div className='text-2xl'>Audits Ratio</div>
        <div className='flex flex-col space-y-3'>
          <div className='tracking-wider flex items-center justify-between space-x-7'>
            <div className='h-[15px] w-full rounded-full bg-primary basis-[70%]' />
            <div className='flex flex-col basis-[20%]'>
                <div className='flex ml-auto'>{totalUpMb.toFixed(2)} <span className='ml-1'>Mb</span></div>
                <div className='flex space-x-1 ml-auto'>Done <ArrowUp/></div>
            </div>
          </div>
          <div className='tracking-wider flex items-center justify-between space-x-7'>
            <div className='h-[15px] w-full rounded-full bg-secondary basis-[70%]' />
            <div className='flex flex-col basis-[20%]'>
              <div className='flex space-x-1'>Received <ArrowDown/></div>
              <div className='flex ml-auto'>{totalDownMb.toFixed(2)} <span className='ml-1'>Mb</span></div>
            </div>
          </div>
        </div>
        <div
          className={cn('text-[75px] tracking-wider', {
              'text-green-400': formatedAuditRatio > 1,
              'text-yellow-400': formatedAuditRatio <= 1,
              'text-red-400': formatedAuditRatio <= 0.5,
          })}
        >
          {formatedAuditRatio.toFixed(1)}
        </div>
      </div>
    );
  }
};
