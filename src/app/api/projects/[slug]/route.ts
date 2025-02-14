// // route.ts
// // Copyright (C) 2025  Charlie Ward GPL v3
// // Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

// import { NextResponse } from 'next/server';
// import { getProjectData } from '../../../../lib/mdxUtils';

// export async function GET(request: Request, context: { params: { slug: string } }) {
//   // Directly access params.slug
//   const { slug } = context.params;

//   try {
//     const projectData = await getProjectData(slug); // Ensure this function returns a promise
//     if (!projectData) {
//       return NextResponse.json({ message: 'Project not found' }, { status: 404 });
//     }
//     return NextResponse.json(projectData);
//   } catch (error) {
//     console.error("Error fetching project:", error);
//     return NextResponse.error(); // Respond with a 500 status code
//   }
// }