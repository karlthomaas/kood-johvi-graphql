import XpProgression from 'components/xp-progression';
import SkillsProgression from 'components/skills-progression';
import { TotalXp } from 'components/total-xp';
import { AuditsRatio } from 'components/audits-ratio';
import { Navbar } from 'components/navbar';

export default function Dashboard() {
  return (
    <div className='mx-auto flex max-w-screen-lg flex-col'>
      <div className='mt-2 grid w-full grid-cols-1 gap-5 p-2 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='sm:col-span-2 lg:order-1 lg:col-span-3'>
          <Navbar />
        </div>
        <div className='sm:col-span-2 lg:order-2'>
          <TotalXp />
        </div>
        <div className='sm:col-span-2 lg:order-5 lg:col-span-1'>
          <XpProgression />
        </div>
        <div className='sm:col-span-2 lg:order-3 lg:col-span-1'>
          <AuditsRatio />
        </div>
        <div className='sm:col-span-2 lg:order-6'>
          <SkillsProgression />
        </div>
      </div>
    </div>
  );
}
