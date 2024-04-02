import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "m@example.com",
      tags: "CS, ML, WEBD",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@yahoo.com",
      tags: "CS, ML, WEBD",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@gmail.com",
      tags: "CS, Civil",
    },
    // ...
  ];
}

export default async function Comp() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
