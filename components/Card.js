import React, { useEffect, useState } from "react";

export default function Card({ type, token }) {
  console.log(token);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function calculateTotal() {
      let url = `/pathao/rides?ride_type=${
        type == "cars" ? "2" : 1
      }&per_page=500000&status=COMPLETED&page=0`;
      if (type == "food") {
        url = "/pathao/foods/v2/orders?page_size=10000&status=delivered&page=1";
      }

      fetch(url, {
        headers: {
          "App-Agent": "ride/android/423",
          "Android-Os": "7.1.2",
          Authorization: `Bearer ${token}`,
          "City-Id": "1",
          "Country-Id": "1",
          "Accept-Encoding": "gzip, deflate",
          "User-Agent": "okhttp/3.14.9",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          //Calculate total
          if (type == "food") {
            let total = 0;
            data.results.forEach((food) => {
              total += food.total_amount;
            });
            setTotal(total);
          } else {
            if (!data.message) {
              let total = 0;
              data.forEach((ride) => {
                total += ride.fare;
              });
              setTotal(total);
            }
          }
        });
    }

    calculateTotal();
  }, []);

  return (
    <div className="flex gap-4 border  p-3 rounded-xl drop-shadow-2xl ">
      <img src={`/assets/${type}.png`} />
      <div>
        <h1 className="font-bold uppercase">{type}</h1>
        <span id={`totalSpent-${type}`}>Total Spent: Rs {total} </span>
      </div>
    </div>
  );
}
