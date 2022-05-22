import axios from "axios";

export type PayoutType = {
  payoutId: string;
  memberAddress: string;
  isPaid: string;
  subdao?: SubDAOType;
  memberId: string;
  member?: MemberType;
};

export type MemberType = {
  memberAddress: string;
  subdaoId: string;
  subdao?: SubDAOType;
  payouts?: PayoutType[];
};

export type SubDAOType = {
  managerAddress: string;
  mainTokenAddress: string;
  subTokenAddress: string;
  domain?: string;
  voteProxyAddress?: string;
  members?: MemberType[];
};

const path = `${process.env.REACT_APP_API_URL}/subdao`;

export const useSubDAO = () => {
  const getSubDAO = async (managerAddr: string) => {
    console.log("get subdao");
    try {
      const { data } = await axios.get(path + "/" + managerAddr);
      console.log("subdata: ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const createSubDAO = async (body: SubDAOType) => {
    const { data } = await axios.post(path, body);
    return data;
  };
  return { getSubDAO, createSubDAO };
};
