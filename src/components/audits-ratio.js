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

    return (
      <div className='flex h-[280px] w-full flex-col space-y-4 rounded-lg border border-border p-4 sm:h-[300px]'>
        <div className='text-xl sm:text-2xl'>Audits Ratio</div>
        <div className='flex flex-col space-y-3'>
          <div className='flex items-center justify-between space-x-7 tracking-wider'>
            <div className='h-[13px] w-full basis-[70%] rounded-full bg-primary sm:h-[15px]' />
            <div className='flex basis-[20%] flex-col text-sm sm:text-lg'>
              <div className='ml-auto flex'>
                {totalUpMb.toFixed(2)} <span className='ml-1'>Mb</span>
              </div>
              <div className='ml-auto flex space-x-1'>
                Done <ArrowUp />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between space-x-7 tracking-wider'>
            <div className='h-[13px] w-full basis-[70%] rounded-full bg-secondary sm:h-[15px]' />
            <div className='flex basis-[20%] flex-col  text-sm sm:text-lg'>
              <div className='ml-auto flex space-x-1'>
                Received <ArrowDown />
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
