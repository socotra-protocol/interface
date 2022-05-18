import { Layout } from "../../../core/Layout"
import { Card } from "../Card"

export const Explore = () => {
  return (
    <Layout>
      <div className="py-[48px] max-w-7xl mx-auto">
        <div className="text-[36px] font-semibold text-secondary-dark mb-[32px]">
          SubDAOs Explore
        </div>
        <div className="grid grid-cols-3 gap-[16px]">
          {Array.from({ length: 27 }).map((_, idx: number) => (
            <Card />
          ))}
        </div>
      </div>
    </Layout>
  )
}
