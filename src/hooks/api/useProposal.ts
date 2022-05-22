import axios from "axios";
const path = `${process.env.REACT_APP_API_URL}/proposal`;

type ProposalType = {
  subProposalId?: string;
  mainProposalId?: string;
  managerAddress: string;
  type?: string;
};

export const useProposal = () => {
  const getProposalDB = async (managerAddr: string) => {
    const { data } = await axios.get(path + "/" + managerAddr);
    return data;
  };

  const createProposalDB = async (body: ProposalType) => {
    const { data } = await axios.post(path, body);
    return data;
  };
  return { getProposalDB, createProposalDB };
};
