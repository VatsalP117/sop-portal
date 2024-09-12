"use client";
import { Button } from "@/components/ui/button";

export default function Csv() {
  return (
    <div>
      <Button
        onClick={() => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hello`)
            .then((res) => res.text())
            .then((data) => {
              console.log(data);
              let link = document.createElement("a");
              link.setAttribute("href", data);
              link.setAttribute("download", "data.csv");
              document.body.appendChild(link);
              link.click();
            });
        }}
      >
        Download CSV
      </Button>
    </div>
  );
}
