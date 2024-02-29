import { useQuery } from '@tanstack/react-query';
import { countTotalSkills, countUserSkills } from 'lib/algorithms/skills-progression-algo';
import { fetchGraphQL, getProjects, getUserCompletedProjects } from 'lib/graphql/queries';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const filterSkills = (data, skills) => {
  return data.filter((data) => Object.prototype.hasOwnProperty.call(data.attrs, 'language') && skills.includes(data.attrs.language));
};

const reshapeDataToChart = (userSkills, skillsData) => {
  return Object.entries(skillsData).map(([key, value]) => ({
    language: key,
    value: userSkills[key] || 0,
    fullMark: value,
  }));
};

export default function SkillsProgression() {
  const skillsToShow = ['Go', 'Python', 'Java', 'JavaScript', 'Rust'];

  const { data: skillsData } = useQuery({
    queryKey: ['getSkills'],
    queryFn: async () => fetchGraphQL(getProjects),
  });

  const { data: userData } = useQuery({
    queryKey: ['getCompletedProjects'],
    queryFn: async () => fetchGraphQL(getUserCompletedProjects),
  });

  if (skillsData && userData) {
    const filteredSkillsData = filterSkills(skillsData.object, skillsToShow);
    const skillsCount = countTotalSkills(filteredSkillsData, skillsToShow);
    const userSkills = countUserSkills(filteredSkillsData, userData.progress);
    const chartData = reshapeDataToChart(userSkills, skillsCount);

    return (
      <div className='h-[300px] w-full rounded-md border border-border bg-card'>
        <ResponsiveContainer width='100%' height='100%'>
          <RadarChart cx='48%' cy='52%' margin={{ top: 10, right: 20, bottom: 10, left: 20 }} outerRadius={100} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='language' />
            <Radar name='User' dataKey='value' stroke='primary' fill='hsl(var(--primary))' opacity={0.9} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
