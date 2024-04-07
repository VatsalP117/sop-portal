# SOP Portal
### HACKENZA 2023-24 Sem II
>By Team SemBack

<hr>

|Name|BITSid|
|----|------|
|[Nikhil Kudva](https://www.linkedin.com/in/nikhil-kudva-3a42bb239/)|2021A7PS2409G|
|[Ruchik Bakhai](https://www.linkedin.com/in/ruchik-bakhai/)|2021A7PS2054G|
|[Shubh Agarwal](https://www.linkedin.com/in/iamshubhagarwal/)|2021AAPS2770G|
|[Vatsal Patel](https://www.linkedin.com/in/vatsal-patel1/)|2021A7PS2460G|

<hr>

## [Problem Statement](https://docs.google.com/document/d/19SuRrZRu9lVcL61EMlKiNf8ZXJFisy8y3PxHM8UbFbc/edit#heading=h.4ry0k29a6lde)

## Overview

This web-based task management system facilitates the process of managing SOP/DOP/SAT projects within the Department of Computer Science & Information Systems (CSIS) at BITS (Birla Institute of Technology & Science) Pilani, K.K. Birla Goa Campus.

## Features

### Faculty Module

- **Faculty Upload Data:** Faculty members can upload project proposals and advertisements.
  - Advertise New: Faculty can submit new project proposals.
  - View Old Advertisement: Faculty can view previously published project advertisements.

### Student Module

- **Student View and Applying for Projects:**
  - User Authentication: Students can securely log in to the portal.
  - Updating Profile: Students can update their profile by updating their CGPA & Resume(through a link).
  - Accessing SOP/DOP/SAT Projects: Students can browse available projects.
  - Displaying Faculty and Advertisements: Showcase faculty and project advertisements.
  - Selecting Research Area: Students can choose their preferred research area.
  - Displaying Relevant Projects: Projects are dynamically filtered based on selected research areas.
  - Displaying Closed/Completed Projects of the faculties: Students can view the info for the closed/completed projects.
  - Displaying Applied Projects and their status: Students can view the applied project's name and status. 
  - Applying to Projects: Students can apply to projects by clicking the Apply button.

### Faculty Accepting Student Request

- **Accessing Student Applications:** Faculty can view applications from students.
- **Viewing Student Applications:** Faculty can review student applications.
- **Sorting Applications by CGPA:** Applications can be sorted based on students' CGPA.
- **Reviewing Student Applications:** Faculty can evaluate student applications through their linked resume.
- **Application Status:** Faculty can mark the student's application status.

## Database Tables

1. **Faculties:**
   This data table stores
     - Faculty name
     - Faculty email
     - List of projects created
   
2. **Students:**
   This data table stores
     - Student name
     - Student email
     - CGPA
     - Resume link
     - List of applied projects
   
3. **Projects:**
   This data table stores
     - Project Title
     - Project Description
     - Faculty
     - Status of Project (Open/Closed/Completed)
     - Tags: Research Area
     - Date Created
     - GPSRN
     - List of applied students
   
## Conclusion

The SOP/DOP/SAT Project Management System streamlines the process of managing academic projects, enhancing collaboration between faculty and students within the CSIS department.


<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.blender.org/" target="_blank" rel="noreferrer"> <img src="https://download.blender.org/branding/community/blender_community_badge_white.svg" alt="blender" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/gatsbyjs/gatsbyjs-icon.svg" alt="gatsby" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://ifttt.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/ifttt/ifttt-ar21.svg" alt="ifttt" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>
