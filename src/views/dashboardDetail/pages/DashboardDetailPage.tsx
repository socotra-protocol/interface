import { Link, matchRoutes, useParams } from "react-router-dom"
import { MemberCard } from "../../../components/MemberCard"
import { MemberInput } from "../../../components/MemberInput"

export const DashboardDetailPage = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>
      DashboardDetailPage {id}
      <div className="flex flex-col gap-[16px]">
        <div className="grid grid-cols-3 gap-[8px]">
          {Array.from({ length: 6 }).map((_, idx: number) => (
            <MemberCard key={`member-card-${idx}`} />
          ))}
        </div>
        <MemberInput />
      </div>
    </div>
  )
}
