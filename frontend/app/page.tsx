"use client";
import React, { useEffect, useState } from "react";
import MultiSelect from "@/components/multi-select";

import { useRouter } from "next/navigation";

const TagSelector = () => {

  const router = useRouter();

  useEffect(() => {
    router.push('/login')
  },[])

  const [selectedTags, setSelectedTags] = useState([]);

  const options = [
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "tag3", label: "Tag 3" },
    // Add more options as needed
  ];

  const handleTagChange = (selected) => {
    setSelectedTags(selected.map((tag) => tag.value));
  };

  return (
    <>
    </>
  );
};

export default TagSelector;
