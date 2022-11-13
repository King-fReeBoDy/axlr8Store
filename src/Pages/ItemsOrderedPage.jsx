import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ApprovedItems from "../Components/ApprovedItems";
import CancelledItems from "../Components/CancelledItems";
import PendingItems from "../Components/PendingItems";
import DataContext from "../Context/DataContext";

function ItemsOrderedPage() {
  const { url, loggedInUser } = useContext(DataContext);

  return (
    <section className="mt-10 p-2">
      <h1 className="text-center text-3xl font-semi-bold">ORDERS PAGE</h1>

      <div className="flex [&>*]:mx-3 text-lg justify-center">
        <p className="text-sky-500 ">APPROVED</p>
        <p>PENDING</p>
        <p>CANCELLED</p>
      </div>
    </section>
  );
}

export default ItemsOrderedPage;
