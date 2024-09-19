"use client";
import CardDemo from "@/components/student-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense, useEffect } from "react";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModeToggle from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Comp from "@/components/test/comp";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import withAuth from "@/app/withAuth";
import Logout from "@/components/logout";
import { useState } from "react";
import { toast } from "sonner";

const Student = (props) => {
  const [studentDetails, setStudentDetails] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/student/getstudentprojects`, {
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setStudentDetails(data);
          console.log(data);
        });
      } else {
        //toast("Failed to fetch student details");
      }
    });
  }, []);

  const [cgpa, setCgpa] = useState();
  const [resume, setResume] = useState("");

  return (
    <div className="container flex h-[90vh] w-screen flex-row py-8 md:gap-4 lg:gap-6">
      <div className="student-data-section basis-1/4  flex flex-col gap-10">
        <div className="flex flex-col gap-4">
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
              <Logout />
            </CardHeader>
          </Card>
        </div>
        <Card className="projects-applied-card flex flex-col">
          <CardHeader>
            <CardTitle>Projects Applied</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 overflow-y-auto max-h-96">
            {studentDetails.map((project) => {
              const variant =
                project.status === "Accepted"
                  ? "default"
                  : project.status === "Rejected"
                  ? "destructive"
                  : "outine";
              return (
                <div className="flex flex-row items-center justify-start ">
                  <CardDescription className="basis-1/2">
                    {project.title}
                  </CardDescription>
                  <Badge variant={variant}> {project.status}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <div className="projects-section basis-3/4 ">
        <Comp />
      </div>
    </div>
  );
};

export default withAuth(Student, "student");
