import { BASEURL } from "../shared/config";
import { HttpMethod } from "../shared/enum";
import { IEntryRequest, IHttpOptions, IResponse } from '../shared/interface';


const sendRequest = async (endpoint: string, requestOptions: IHttpOptions) => {
	try {
		const response = await fetch(`${BASEURL}${endpoint}`, requestOptions);
		const data = await response.json();
		console.log(`Response from ${requestOptions.method} ${endpoint}: `, data);

		if (!response.ok) {
			throw new Error(data.message);
		}
		return {data};
	}	catch (e) {
		return {error: e.message};
	}
};

export const addEntry = async (req: IEntryRequest): Promise<IResponse> => {
	const endpoint = '/api/entries';
	const requestOptions = {
		method: HttpMethod.POST,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(req)
	};

	return sendRequest(endpoint, requestOptions);
};

export const getEntries = async (): Promise<IResponse> => {
	const endpoint = '/api/entries';
	const requestOptions = {
		method: HttpMethod.GET,
	};

	return sendRequest(endpoint, requestOptions);
};

export const deleteEntry = async (id: string): Promise<IResponse> => {
	const endpoint = `/api/entries/${id}`;
	const requestOptions = {
		method: HttpMethod.DELETE,
	};

	return sendRequest(endpoint, requestOptions);
};