import { BASEURL } from "../shared/config";
import { HttpMethod } from "../shared/enum";
import { IEntry, IEntryBase, IHttpOptions, IResponse } from '../shared/interface';

const sendRequest = async (endpoint: string, requestOptions: IHttpOptions): Promise<IResponse> => {
	// generic request handler
	try {
		const response = await fetch(`${BASEURL}${endpoint}`, requestOptions);
		const data: IEntry[] | Error = await response.json();
		console.log(`Response from ${requestOptions.method} ${endpoint}: `, data);

		if (!response.ok) {
			throw new Error((data as Error).message);
		}
		return {data: (data as IEntry[])};
	}	catch (e) {
		return {error: e.message};
	}
};

export const addEntry = async (req: IEntryBase): Promise<IResponse> => {
	const endpoint = '/api/entries';
	const requestOptions: IHttpOptions = {
		method: HttpMethod.POST,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(req)
	};

	return sendRequest(endpoint, requestOptions);
};

export const getEntries = async (): Promise<IResponse> => {
	const endpoint = '/api/entries';
	const requestOptions: IHttpOptions = {
		method: HttpMethod.GET,
	};

	return sendRequest(endpoint, requestOptions);
};

export const deleteEntry = async (id: string): Promise<IResponse> => {
	const endpoint = `/api/entries/${id}`;
	const requestOptions: IHttpOptions = {
		method: HttpMethod.DELETE,
	};

	return sendRequest(endpoint, requestOptions);
};

export const updateEntry = async (req: IEntry): Promise<IResponse> => {
	const endpoint = `/api/entries/${req._id}`;
	const requestOptions: IHttpOptions = {
		method: HttpMethod.PUT,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(req)
	};

	return sendRequest(endpoint, requestOptions);
};