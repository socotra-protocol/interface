import { Link, matchRoutes, useParams } from "react-router-dom"
import { MemberCard } from "../MemberCard"
import { MemberList } from "../MemberList"

export const DashboardDetailPage = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div>
      DashboardDetailPage {id}
      <div className="grid grid-cols-3 gap-[8px]">
        {Array.from({ length: 6 }).map((_, idx: number) => (
          <MemberCard key={`member-card-${idx}`} />
        ))}
      </div>
      <MemberList />
    </div>
  )
}
