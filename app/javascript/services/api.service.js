import axios from 'axios';
import Rails from 'rails-ujs';

export const get = url =>
  axios.get(url, {
    headers: { 'X-CSRF-Token': Rails.csrfToken() },
    withCredentials: true
  });

export const post = (url, payload) =>
  axios.post(
    url,
    { payload },
    {
      headers: { 'X-CSRF-Token': Rails.csrfToken() },
      withCredentials: true
    }
  );

export const patch = (url, payload) =>
  axios.patch(
    url,
    { payload },
    {
      headers: { 'X-CSRF-Token': Rails.csrfToken() },
      withCredentials: true
    }
  );
