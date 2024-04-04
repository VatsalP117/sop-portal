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

export default function Faculty() {
  return (
    <div className="container flex h-[90vh] w-screen flex-row py-8 md:gap-4 lg:gap-6">
      <div className="student-data-section basis-1/4  flex flex-col gap-10">
        <Card className="student-card flex flex-row items-center justify-center">
          <Avatar className="ml-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardHeader className="m-auto mr-4">
            <CardTitle>Vatsal Patel</CardTitle>
            <CardDescription className="font-bold">
              2021A7PS2460G
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="projects-applied-card flex flex-col">
          <CardHeader>
            <CardTitle>Projects Added</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge>Open</Badge>
            </div>
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge variant="outline">Closed</Badge>
            </div>
            <div className="flex flex-row items-center justify-start ">
              <CardDescription className="basis-1/2">
                Project Title
              </CardDescription>
              <Badge variant="destructive">Completed</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="projects-section basis-3/4 ">
        {/* <ModeToggle /> */}
        <Table>
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
        </Table>
      </div>
    </div>
  );
}
