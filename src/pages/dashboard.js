import XpProgression from 'components/xp-progression';
import User from 'components/user';
import SkillsProgression from 'components/skills-progression';
import { TotalXp } from 'components/total-xp';
import { AuditsRatio } from 'components/audits-ratio';

export default function Dashboard() {
  return (
      <div className='max-w-screen-xl flex justify-center'>
        <div className='p-2 grid grid-cols-1 gap-y-5 mt-2'>
          <User />
          <TotalXp />
          <XpProgression />
          <SkillsProgression />
          <AuditsRatio />
        </div>
      </div>
  );
}
