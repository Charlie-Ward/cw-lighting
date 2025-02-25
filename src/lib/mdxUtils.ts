//mdxUtils.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE


import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'projects');

type ProjectData = {
  slug: string;
  title: string;
  date: string;
  content: string;
  images: string[];
  location: string;
  roles: string;
  webDate: string;
  visible: boolean;
};

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory);
}

export function getProjectData(slug: string): ProjectData {
  const fullPath = path.join(projectsDirectory, slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Ensure the date is included in the returned object
  return {
    slug,
    ...data, // This should include the date if it's in the front matter
    content,
  } as ProjectData; // Cast to ProjectData type
}

export function getAllProjects(): ProjectData[] {
  const slugs = getProjectSlugs();
  const projects = slugs.map((slug) => getProjectData(slug));

  // Sort projects by date in descending order (latest first)
  return projects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}