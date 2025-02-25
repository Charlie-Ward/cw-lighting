// route.ts
// Copyright (C) 2025  Charlie Ward GPL v3
// Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import { NextResponse } from 'next/server';
import { getProjectData } from '../../../../lib/mdxUtils';

export async function GET(request: Request) {
  // Extract the slug from the request URL
  const { pathname } = new URL(request.url);
  const slug = pathname.split('/').pop(); // Get the last part of the URL as the slug

  // Check if slug is undefined
  if (!slug) {
    return NextResponse.json({ message: 'Slug not provided' }, { status: 400 });
  }

  try {
    const projectData = await getProjectData(slug);
    if (!projectData) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(projectData);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}