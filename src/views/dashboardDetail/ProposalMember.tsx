import { useEffect, useRef, useState } from "react"
import { PrimaryButton, SecondaryButton } from "../../components/Button"
import { useSnapshot } from "../../hooks/useSnapshot"
import * as am5 from "@amcharts/amcharts5"
import * as am5percent from "@amcharts/amcharts5/percent"
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
import { Modal } from "../../components/Modal"

export const ProposalMember = () => {
  const mock =
    "0x30de54437727cd516863f81bc3be7107a71305e444d59e8a1775a3fd0ac54b3c"

  const main =
    "0xf7963cc433f8c649e2f24eade26740ac40df98010670a38449d8a4ad8b78b58f"
  const { getProposal, vote } = useSnapshot()

  const [proposal, setProposal] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [msgModal, setMsgModal] = useState<string>("")

  useEffect(() => {
    fetch()
  }, [])

  const setChart = (data: any) => {
    let root = am5.Root.new("chartdiv")
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    )
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    )
    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    })

    series.slices.template.setAll({
      cornerRadius: 5,
    })

    series.ticks.template.setAll({
      forceHidden: true,
    })
    if (data?.votes === 0) {
      series.data.setAll(
        data?.choices.map((item: any, idx: number) => {
          return { value: 1, category: item }
        })
      )
    } else {
      series.data.setAll(
        data?.choices.map((item: any, idx: number) => {
          return { value: data?.scores[idx], category: item }
        })
      )
    }

    series.appear(100, 100)
  }

  const fetch = async () => {
    const data = await getProposal(mock)
    console.log(data)
    setProposal(data)
    setChart(data)
  }

  const handleVote = async (choice: number) => {
    setMsgModal("Waiting for transactions approval 1 of 1")
    setIsLoading(true)
    await vote(proposal?.space?.id, proposal?.id, choice + 1)
    setIsLoading(false)
    fetch()
  }
  return (
    <>
      <div className="bg-white-dark rounded-[16px] p-[36px] mb-[16px]">
        <div>
          <div className="flex justify-between items-center mb-[8px]">
            <div className="text-[20px] text-secondary-dark mb-[8px]">
              Proposal : {proposal?.title}
            </div>
            <div className="flex items-center gap-[16px]">
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://snapshot.org/#/${proposal?.space?.id}/proposal/${proposal?.id}`}
              >
                <PrimaryButton light>ReadMore</PrimaryButton>
              </a>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://snapshot.org/#/${proposal?.space?.id}/proposal/${main}`}
              >
                <PrimaryButton dark>Related</PrimaryButton>
              </a>
            </div>
          </div>
          <div id="chartdiv" style={{ width: "100%", height: "200px" }}></div>
          <div className="grid grid-cols-2 gap-[16px]">
            {proposal?.choices.map((c: string, i: number) => (
              <SecondaryButton
                key={`choice-${i}`}
                dark
                onClick={() => handleVote(i)}
                className="text-secondary-dark bg-white-light p-[16px] text-center text-[16px] rounded-[16px]"
              >
                {c}
              </SecondaryButton>
            ))}
          </div>
        </div>
      </div>
      <Modal visible={isLoading}>
        <div className="bg-white-light h-[90px] w-[400px] rounded-[16px] p-4 border border-white-dark flex items-center justify-center gap-[8px]">
          <img alt="" src="/assets/loading.svg" className="h-[32px] w-[32px]" />
          <div className="text-[16px text-secondary">{msgModal}</div>
        </div>
      </Modal>
    </>
  )
}
