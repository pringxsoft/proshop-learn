// fetchBaseQuery is the function that will allow us to make requests to our backend API.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// endpoints is an object that will contain all of our API endpoints. We don't have to manually fetch data from our API anymore. We can just call the endpoints object and it will automatically fetch the data for us.
export const apiSlice = createApi({
	baseQuery,
	tagTypes: ['Product', 'Order', 'User'],
	endpoints: builder => ({}),
});
