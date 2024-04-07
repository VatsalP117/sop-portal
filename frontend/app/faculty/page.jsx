"use client";
import CardDemo from "@/components/student-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Comp2 from "@/components/test-faculty/comp";

import withAuth from "@/app/withAuth";

const Faculty = (props) => {
  return (
    <div className="container flex h-[90vh] w-screen flex-row py-8 md:gap-4 lg:gap-6">
      <div className="student-data-section basis-1/4  flex flex-col gap-10">
        <Card className="student-card flex flex-row items-center justify-center">
          <Avatar className="ml-6">
            <AvatarImage src={props.user.image} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardHeader className="m-auto mr-4">
            <CardTitle>{props.user.name}</CardTitle>
            <CardDescription className="font-bold">
              {props.user.email}
            </CardDescription>
          </CardHeader>
        </Card>

        <Button asChild>
          <Link href="/project/new">Add Project</Link>
        </Button>
      </div>
      <div className="projects-section basis-3/4 ">
        {/* <ModeToggle /> */}
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">S.No.</TableHead>
              <TableHead>Project Name</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead>Project Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1.</TableCell>
              <TableCell>Project Title 1</TableCell>
              <TableCell>Ram Prasad Joshi</TableCell>
              <TableCell>ML</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>
                <Button variant="secondary">Apply</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1.</TableCell>
              <TableCell>Project Title 1</TableCell>
              <TableCell>Ram Prasad Joshi</TableCell>
              <TableCell>ML</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>
                <Button variant="secondary">Apply</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">1.</TableCell>
              <TableCell>Project Title 1</TableCell>
              <TableCell>Ram Prasad Joshi</TableCell>
              <TableCell>ML</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>
                <Button variant="secondary">Apply</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
        <Comp2 />
      </div>
    </div>
  );
}

export default withAuth(Faculty,"faculty");
