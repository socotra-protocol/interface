import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Layout } from "../../../core/Layout"
import { useSocotraGraph } from "../../../hooks/useSocotraGraph"
import { Card } from "../Card"

export const Explore = () => {
  const navigate = useNavigate()
  const { branchs } = useSocotraGraph()

  const [list, setList] = useState<any[]>([])

  useEffect(() => {
    fetch()
  }, [])
  
  const fetch = async () => {
    const data = await branchs()
    console.log(data)
    setList(data)
  }

  return (
    <Layout>
      <div className="py-[48px] max-w-7xl mx-auto">
        <div className="text-[36px] font-semibold text-secondary-dark mb-[32px]">
          SubDAOs Explore
        </div>
        <div className="grid grid-cols-3 gap-[16px]">
          {list.map((item, idx: number) => (
            <Card
              key={`card-${idx}`}
              item={item}
              onClick={() => navigate(`/dashboard/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
