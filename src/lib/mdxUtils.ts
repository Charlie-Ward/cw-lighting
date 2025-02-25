//mdxUtils.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE


import fs from 'fs';
import fsPromises from 'fs/promises';
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

export async function getProjectData(slug: string): Promise<ProjectData | null> {
  const fullPath = path.join(projectsDirectory, slug);

  try {
    await fsPromises.access(fullPath, fs.constants.F_OK);
  } catch (err) {
    console.error(`File not found: ${fullPath}`);
    return null;
  }

  const fileContents = await fsPromises.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...data,
    content,
  } as ProjectData;
}

export async function getAllProjects(): Promise<ProjectData[]> {
  const slugs = getProjectSlugs();
  const projects: ProjectData[] = [];

  // Use Promise.all to wait for all project data to be fetched
  const projectPromises = slugs.map(async (slug) => {
    const data = await getProjectData(slug);
    if (data) {
      projects.push(data);
    }
  });

  // Wait for all promises to resolve
  await Promise.all(projectPromises);

  // Sort projects by date in descending order (latest first)
  projects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return projects;
}