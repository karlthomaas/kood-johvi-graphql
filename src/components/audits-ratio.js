import { useQuery } from '@tanstack/react-query'
import { fetchGraphQL, getUserAudits } from 'lib/graphql/queries'

export const AuditsRatio = () => {
    const { data } = useQuery({
        queryKey: ['getAuditRatio'],
        queryFn: async () => fetchGraphQL(getUserAudits),
    })


    console.log("🚀 ~ AuditsRatio ~ data:", data)
    if (data) {
        return(
            <div className='h-[350px] w-full rounded-lg'>
            <div>audists</div>
            </div>
        )
    }
}