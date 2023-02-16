import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { tokenStateAtom } from "@/atoms/tokenStateAtom";
import Card from "./Card";
import { ChartBarIcon } from "@heroicons/react/20/solid";

export default function Dashboard() {
  const [totalSpent, setTotalSpent] = useState(0);
  
  const [token, setToken] = useRecoilState(tokenStateAtom);
 

 



  useEffect(() => {
    setInterval(() => {
      function calculateTotal() {
        let ridesTotal = document
          .getElementById("totalSpent-rides")
          .innerText.split(" ")[3];
        console.log(ridesTotal);
        let carsTotal = document
          .getElementById("totalSpent-cars")
          .innerText.split(" ")[3];
        let foodTotal = document
          .getElementById("totalSpent-food")
          .innerText.split(" ")[3];
        const total =
          parseFloat(ridesTotal) +
          parseFloat(carsTotal) +
          parseFloat(foodTotal);

        setTotalSpent(total.toFixed(2));
      }
      calculateTotal();
    }, 1000);
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://pathao.com/np/wp-content/uploads/sites/7/2019/02/Pathao-logo.svg"
            alt="Your Company"
          />
        </div>
        <div className="md:flex justify-center gap-4">
          <Card type="rides" token={token.access_token.access_token} />
          <Card type="cars" token={token.access_token.access_token} />
          <Card type="food" token={token.access_token.access_token} />
        </div>
        <div className="flex gap-4 border  p-3 rounded-xl drop-shadow-2xl ">
          <ChartBarIcon className="h-5 w-5 text-accent " aria-hidden="true" />
          <div>
            <h1 className="font-bold">Total</h1>
            <span>Total Spent: Rs {totalSpent} </span>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button
            type="submit"
            className="group  relative flex justify-center rounded-md border border-transparent bg-accent py-2 px-4 text-sm font-medium text-white "
          >
            
          You Spent total of {totalSpent} on Pathao .
          </button>
        </div>
      </div>
    </div>
  );
}
