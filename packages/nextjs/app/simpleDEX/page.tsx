"use client";

import { useState } from "react";
import { Address, AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const SimpleDEX = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [addLiquidityAmountA, setAddLiquidityAmountA] = useState("0");
  const [addLiquidityAmountB, setAddLiquidityAmountB] = useState("0");
  const [removeLiquidityAmountA, setRemoveLiquidityAmountA] = useState("0");
  const [removeLiquidityAmountB, setRemoveLiquidityAmountB] = useState("0");
  const [swapAmountA, setSwapAmountA] = useState("0");
  const [swapAmountB, setSwapAmountB] = useState("0");
  const [newOwner, setNewOwner] = useState("");

  // Read: getPrice
  const { data: price } = useScaffoldReadContract({
    contractName: "SimpleDEX",
    functionName: "getPrice",
    args: [tokenAddress],
  });

  // Write Functions
  const { writeContractAsync: addLiquidity } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: removeLiquidity } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: swapAforB } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: swapBforA } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: renounceOwnership } = useScaffoldWriteContract("SimpleDEX");
  const { writeContractAsync: transferOwnership } = useScaffoldWriteContract("SimpleDEX");

  // Handlers for write functions
  const handleAddLiquidity = async () => {
    try {
      await addLiquidity({
        functionName: "addLiquidity",
        args: [BigInt(addLiquidityAmountA), BigInt(addLiquidityAmountB)],
      });
      console.log("Liquidity added");
    } catch (e) {
      console.error("Error adding liquidity", e);
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      await removeLiquidity({
        functionName: "removeLiquidity",
        args: [BigInt(removeLiquidityAmountA), BigInt(removeLiquidityAmountB)],
      });
      console.log("Liquidity removed");
    } catch (e) {
      console.error("Error removing liquidity", e);
    }
  };

  const handleSwapAforB = async () => {
    try {
      await swapAforB({
        functionName: "swapAforB",
        args: [BigInt(swapAmountA)],
      });
      console.log("Swapped A for B");
    } catch (e) {
      console.error("Error swapping A for B", e);
    }
  };

  const handleSwapBforA = async () => {
    try {
      await swapBforA({
        functionName: "swapBforA",
        args: [BigInt(swapAmountB)],
      });
      console.log("Swapped B for A");
    } catch (e) {
      console.error("Error swapping B for A", e);
    }
  };

  const handleRenounceOwnership = async () => {
    try {
      await renounceOwnership({
        functionName: "renounceOwnership",
      });
      console.log("Ownership renounced");
    } catch (e) {
      console.error("Error renouncing ownership", e);
    }
  };

  const handleTransferOwnership = async () => {
    try {
      await transferOwnership({
        functionName: "transferOwnership",
        args: [newOwner],
      });
      console.log("Ownership transferred to", newOwner);
    } catch (e) {
      console.error("Error transferring ownership", e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
        <h1 className="text-2xl font-bold">SimpleDEX </h1>
        <Address address="0xFD471836031dc5108809D173A067e8486B9047A3"/>
      <div className="flex items-center gap-6 p-4">
        <h2 className="text-lg font-semibold">Token A</h2>
        <Address address="0x82e01223d51Eb87e16A03E24687EDF0F294da6f1" />
        <h2 className="text-lg font-semibold">Token B</h2>
        <Address address="0x2bdCC0de6bE1f7D2ee689a0342D76F52E8EFABa3" />
      </div>
         {/* Get Price */}
         <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
                <h2 className="text-lg font-semibold">Get Token Price</h2>
                <AddressInput
                  value={tokenAddress}
                  onChange={setTokenAddress}
                  placeholder="Token Address"
                />
                <p className="mt-2">Price: {price ? price.toString() : "Loading..."}</p>
              </div>

      <div className="flex items-center gap-6 p-4">
     

              {/* Add Liquidity */}
              <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
                <h2 className="text-lg font-semibold">Add Liquidity</h2>
                <IntegerInput
                  value={addLiquidityAmountA}
                  onChange={setAddLiquidityAmountA}
                  placeholder="Amount A"
                />
                <IntegerInput
                  value={addLiquidityAmountB}
                  onChange={setAddLiquidityAmountB}
                  placeholder="Amount B"
                />
                <button className="btn btn-accent mt-2" onClick={handleAddLiquidity}>
                  Add Liquidity
                </button>
              </div>

              {/* Remove Liquidity */}
              <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
                <h2 className="text-lg font-semibold">Remove Liquidity</h2>
                <IntegerInput
                  value={removeLiquidityAmountA}
                  onChange={setRemoveLiquidityAmountA}
                  placeholder="Amount A"
                />
                <IntegerInput
                  value={removeLiquidityAmountB}
                  onChange={setRemoveLiquidityAmountB}
                  placeholder="Amount B"
                />
                <button className="btn btn-warning mt-2" onClick={handleRemoveLiquidity}>
                  Remove Liquidity
                </button>
              </div>

      </div>
      

      <div className="flex items-center gap-6 p-4">
      {/* Swap A for B */}
      <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Swap A for B</h2>
        <IntegerInput
          value={swapAmountA}
          onChange={setSwapAmountA}
          placeholder="Amount A In"
        />
        <button className="btn btn-accent mt-2" onClick={handleSwapAforB}>
          Swap A for B
        </button>
      </div>
      <div className="flex items-center gap-6 p-4">
      {/* Swap B for A */}
      <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Swap B for A</h2>
        <IntegerInput
          value={swapAmountB}
          onChange={setSwapAmountB}
          placeholder="Amount B In"
        />
        <button className="btn btn-accent mt-2" onClick={handleSwapBforA}>
          Swap B for A
        </button>
      </div>
      </div>

  
      </div>

          {/* Transfer Ownership */}
          <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
        <h2 className="text-lg font-semibold">Transfer Ownership</h2>
        <AddressInput
          value={newOwner}
          onChange={setNewOwner}
          placeholder="New Owner Address"
        />
        <button className="btn btn-accent mt-2" onClick={handleTransferOwnership}>
          Transfer Ownership
        </button>

  
       </div>
            {/* Renounce Ownership */}
        <div className="card bg-primary text-primary-content w-96 p-4 shadow-lg">
          <h2 className="text-lg font-semibold">Renounce Ownership</h2>
          <button className="btn btn-error mt-2" onClick={handleRenounceOwnership}>
            Renounce Ownership
          </button>
        </div>
    </div>


      
  );
};

export default SimpleDEX;
