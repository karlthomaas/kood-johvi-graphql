import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getUserAudits } from 'lib/graphql/queries';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from 'lib/utils';
import { useCookies } from 'react-cookie';
import demoData from 'data/demo/getAuditRatio.json';

export const AuditsRatio = () => {
  const [cookies] = useCookies();

  const { data } = useQuery({
    queryKey: ['getAuditRatio'],
    queryFn: async () => {
      if (cookies.token === 'demo') {
        return demoData.data;
      }
      return fetchGraphQL(getUserAudits);
    },
  });

  const convertByteToMb = (bytes) => {
    return Math.round((bytes / 1000000) * 100) / 100;
  };

  if (data) {
    const { auditRatio, totalUp, totalDown } = data.user[0];

    const totalUpMb = convertByteToMb(totalUp);
    const totalDownMb = convertByteToMb(totalDown);
    const formatedAuditRatio = Math.round(auditRatio * 10) / 10;

    let upPercentage = 0;
    let downPercentage = 0;

    if (totalUpMb > totalDownMb) {
      upPercentage = 100;
      downPercentage = (totalDownMb / totalUpMb) * 100;
    } else {
      downPercentage = 100;
      upPercentage = (totalUpMb / totalDownMb) * 100;
    }

    return (
      <div className='flex h-[280px] w-full flex-col space-y-4 rounded-lg border border-border p-4 sm:h-[300px]'>
        <div className='text-xl sm:text-2xl'>Audits Ratio</div>
        <div className='flex flex-col space-y-3'>
          <div className='flex items-center justify-between space-x-7 tracking-wider'>
            <div style={{ width: `${upPercentage}%` }} className='h-[12px] max-w-[60%] rounded-full bg-primary' />
            <div className='flex basis-[20%] flex-col text-sm'>
              <div className='ml-auto flex'>
                {totalUpMb.toFixed(2)} <span className='ml-1'>Mb</span>
              </div>
              <div className='ml-auto flex space-x-1'>
                Done <ArrowUp size={20} />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-7 tracking-wider'>
            <div style={{ width: `${downPercentage}%` }} className='h-[12px] max-w-[60%] rounded-full bg-secondary' />
            <div className='flex basis-[20%] flex-col  text-sm'>
              <div className='ml-auto flex space-x-1'>
                Received <ArrowDown size={20} />
              </div>
              <div className='ml-auto flex'>
                {totalDownMb.toFixed(2)} <span className='ml-1'>Mb</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn('text-[65px] tracking-wider sm:text-[70px]', {
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
