//send-email.ts
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import { FormData } from "@/app/contact/contact";

export function sendEmail(data: FormData) {
    const apiEndpoint = '/api/email';

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // Log the response for debugging
        console.log('Response:', res);
        return res.json(); // Attempt to parse as JSON
      })
      .then((response) => {
        alert(response.message);
      })
      .catch((err) => {
        alert(err);
      });
  }