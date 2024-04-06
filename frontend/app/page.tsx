"use client";
import React, { useState } from "react";
import MultiSelect from "@/components/multi-select";

const TagSelector = () => {
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
    <div>
      <MultiSelect
        values={[
          { key: "Vatsal", value: "Vatsal" },
          { key: "Patel", value: "Patel" },
        ]}
      />
    </div>
  );
};

export default TagSelector;
