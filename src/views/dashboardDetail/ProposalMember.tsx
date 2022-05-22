import { useEffect, useRef, useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../components/Button";
import { useSnapshot } from "../../hooks/useSnapshot";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Modal } from "../../components/Modal";
import { Proposal, ProposalLink } from "./Proposal";
import { useWeb3React } from "@web3-react/core";
import { useProposal } from "../../hooks/api/useProposal";
import { useParams } from "react-router";

type Props = {
  proposalDB: any;
};
export const ProposalMember = ({ proposalDB }: Props) => {
  const { getProposal, vote, getVoter, getScores } = useSnapshot();
  const { account } = useWeb3React();

  const [proposal, setProposal] = useState<any>();

  const [mainProposal, setMainProposal] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [msgModal, setMsgModal] = useState<string>("");

  const [choices, setChoices] = useState<any>({});
  const [totalVp, setTotalVp] = useState<number>(0);
  const [meVote, setMeVote] = useState<number>();

  console.log(choices);

  useEffect(() => {
    if (account && proposalDB) {
      fetch();
    }
  }, [account, proposalDB]);

  const fetch = async () => {
    const data = await getProposal(proposalDB?.subProposalId);
    const mainData = await getProposal(proposalDB?.mainProposalId);
    setMainProposal(mainData);
    setProposal(data);
    const voter: any[] = await getVoter(proposalDB?.subProposalId);

    const totalVp = voter.reduce((total, item) => {
      return total + item.vp;
    }, 0);

    const choices: { [key: string]: number } = {};
    const scores: { [key: string]: number }[] = await getScores(
      data?.space?.id,
      data?.strategies,
      voter.map((item) => item.voter)
    );

    console.log(voter);

    let meVote: any = null;
    voter?.map((item) => {
      if (choices[item.choice] === undefined) {
        choices[item.choice] = 0;
      }
      console.log("a", item.voter, scores[0][item.voter]);
      choices[item.choice] = choices[item.choice] + scores[0][item.voter];
      if (item.voter.toLocaleLowerCase() === account!.toLocaleLowerCase()) {
        meVote = item.choice;
      }
      console.log("choices", choices);
    });

    console.log("s", scores);
    console.log(choices);
    setChoices(choices);
    setMeVote(meVote);
    setTotalVp(totalVp);
  };

  const handleVote = async (choice: number) => {
    setMsgModal("Waiting for transactions approval 1 of 1");
    setIsLoading(true);
    await vote(proposal?.space?.id, proposal?.id, choice + 1);
    setIsLoading(false);
    fetch();
  };
  if (!proposalDB) return <></>;
  return (
    <>
      <div className="bg-white-light border border-white-dark rounded-[16px] p-[36px] mb-[16px]">
        <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
          <ProposalLink
            label="Sub Snapshot Proposal ID :"
            className=""
            link={`https://snapshot.org/#/${proposal?.space?.id}/proposal/${proposal?.id}`}
            id={proposal?.id}
          />
          <ProposalLink
            label="Main Snapshot Proposal ID :"
            className=""
            link={`https://snapshot.org/#/${mainProposal?.space?.id}/proposal/${mainProposal?.id}`}
            id={mainProposal?.id}
          />
        </div>
        <div className="font-medium text-[16px] text-secondary mb-[8px]">
          Proposal Detail
        </div>
        <div className="text-[24px] font-medium text-secondary-dark mb-[8px]">
          {proposal?.title}
        </div>
        <div className="line-clamp-2 text-secondary mb-[16px]">
          {proposal?.body}
        </div>
        <div
          className={`grid grid-cols-${proposal?.choices.length} gap-[16px] `}
        >
          {proposal?.choices.map((c: string, i: number) => (
            <PrimaryButton
              key={`choice-${i}`}
              outlined={meVote !== i + 1}
              dark
              onClick={() => handleVote(i)}
              className="text-[16px] rounded-[16px] py-[24px]"
            >
              {meVote ? (
                <div className="flex justify-between items-center">
                  <div>{c}</div>
                  <div className="flex gap-[8px]">
                    <div className=" text-primary-light">
                      {choices[i + 1] || 0} {proposal?.symbol}
                    </div>
                    <div className=" text">
                      {choices[i + 1]
                        ? `${(choices[i + 1] * 100) / totalVp}%`
                        : "0%"}
                    </div>
                  </div>
                </div>
              ) : (
                c
              )}
            </PrimaryButton>
          ))}
        </div>
      </div>
      <Modal visible={isLoading}>
        <div className="bg-white-light h-[90px] w-[400px] rounded-[16px] p-4 border border-white-dark flex items-center justify-center gap-[8px]">
          <img alt="" src="/assets/loading.svg" className="h-[32px] w-[32px]" />
          <div className="text-[16px text-secondary">{msgModal}</div>
        </div>
      </Modal>
    </>
  );
};
