"use client";
import type { NextPage } from "next";
import { AddressInput, IntegerInput, InputBase, Address } from "~~/components/scaffold-eth";
import { useState } from "react";
import { useScaffoldReadContract, useScaffoldWriteContract, useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

const Token: NextPage = () => {
  const [addressA, setAddressA] = useState<string>();
  const [ammountToMintA, setAmmountToMintA] = useState<string | bigint>("");
  const [addressB, setAddressB] = useState<string>();
  const [ammountToMintB, setAmmountToMintB] = useState<string | bigint>("");
  const account = useAccount();
  const [spenderAddressA, setSpenderAddressA] = useState("");
  const [approvalAmountA, setApprovalAmountA] = useState<string>("");
  const [spenderAddressB, setSpenderAddressB] = useState("");
  const [approvalAmountB, setApprovalAmountB] = useState<string>("");
  const { data: deployedContractDataA } = useDeployedContractInfo("TokenA");
  const AA = deployedContractDataA?.address;
  const { data: deployedContractData } = useDeployedContractInfo("TokenB");
  const BB = deployedContractData?.address;

  // Token A
  const { data: tokenBalanceA } = useScaffoldReadContract({
    contractName: "TokenA",
    functionName: "balanceOf",
    args: [account?.address ?? ""],
  });

  const { writeContractAsync: mintTokensA } = useScaffoldWriteContract("TokenA");

  const handleMintA = async () => {
    try {
      await mintTokensA({
        functionName: "mint",
        args: [addressA, BigInt(ammountToMintA)],
      });
    } catch (e) {
      console.error("Error", e);
    }
  };

  const { writeContractAsync: approveSpenderA } = useScaffoldWriteContract("TokenA");

  const handleApproveA = async () => {
    try {
      await approveSpenderA({
        functionName: "approve",
        args: [spenderAddressA, BigInt(approvalAmountA)],
      });
      console.log(`Approved ${approvalAmountA} tokens for spender: ${spenderAddressA}`);
    } catch (e) {
      console.error("Error approving spender", e);
    }
  };

  // Token B
  const { data: tokenBalanceB } = useScaffoldReadContract({
    contractName: "TokenB",
    functionName: "balanceOf",
    args: [account?.address ?? ""],
  });

  const { writeContractAsync: mintTokensB } = useScaffoldWriteContract("TokenB");

  const handleMintB = async () => {
    try {
      await mintTokensB({
        functionName: "mint",
        args: [addressB, BigInt(ammountToMintB)],
      });
    } catch (e) {
      console.error("Error", e);
    }
  };

  const { writeContractAsync: approveSpenderB } = useScaffoldWriteContract("TokenB");

  const handleApproveB = async () => {
    try {
      await approveSpenderB({
        functionName: "approve",
        args: [spenderAddressB, BigInt(approvalAmountB)],
      });
      console.log(`Approved ${approvalAmountB} tokens for spender: ${spenderAddressB}`);
    } catch (e) {
      console.error("Error approving spender", e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-8">
        {/* Card for Token A */}
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Mint Token A</h2>
            <Address address={AA} />

            <label>Actual amount</label>
            <InputBase
              name="actualAmmont"
              disabled
              placeholder="actual amount"
              value={formatEther(tokenBalanceA || BigInt(0))}
            />
            <label>Amount to mint</label>
            <IntegerInput
              value={ammountToMintA}
              onChange={(updatedAmount) => setAmmountToMintA(updatedAmount)}
              placeholder="value (wei)"
            />
            <label>To</label>
            <AddressInput value={addressA} onChange={setAddressA} placeholder="Input your Address" />
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleMintA}>
                Mint
              </button>
            </div>

            <h2 className="card-title">Approve Spender</h2>
            <label>Amount</label>
            <IntegerInput
              value={approvalAmountA}
              onChange={(updatedAmount) => setApprovalAmountA(updatedAmount)}
              placeholder="value (wei)"
            />
            <label>To</label>
            <AddressInput
              value={spenderAddressA}
              onChange={setSpenderAddressA}
              placeholder="Input spender Address"
            />
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleApproveA}>
                Approve
              </button>
            </div>
          </div>
        </div>

        {/* Card for Token B */}
        <div className="card bg-secondary text-secondary-content w-96">
          <div className="card-body">
            <h2 className="card-title">Mint Token B</h2>
            <Address address={BB} />

            <label>Actual amount</label>
            <InputBase
              name="actualAmmont"
              disabled
              placeholder="actual amount"
              value={formatEther(tokenBalanceB || BigInt(0))}
            />
            <label>Amount to mint</label>
            <IntegerInput
              value={ammountToMintB}
              onChange={(updatedAmount) => setAmmountToMintB(updatedAmount)}
              placeholder="value (wei)"
            />
            <label>To</label>
            <AddressInput value={addressB} onChange={setAddressB} placeholder="Input your Address" />
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleMintB}>
                Mint
              </button>
            </div>

            <h2 className="card-title">Approve Spender</h2>
            <label>Amount</label>
            <IntegerInput
              value={approvalAmountB}
              onChange={(updatedAmount) => setApprovalAmountB(updatedAmount)}
              placeholder="value (wei)"
            />
            <label>To</label>
            <AddressInput
              value={spenderAddressB}
              onChange={setSpenderAddressB}
              placeholder="Input spender Address"
            />
            <div className="card-actions justify-end">
              <button className="btn" onClick={handleApproveB}>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Token;
