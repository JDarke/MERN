import { API_ENDPOINT} from "../shared/config";
import { HttpMethod } from "../shared/enum";
import { IEntry, IEntryBase, IFileResponse, IHttpOptions, IResponse } from '../shared/interface';

const sendRequest = async (endpoint: string, requestOptions: IHttpOptions): Promise<IResponse> => {
	// generic request handler
	try {
		const response = await fetch(endpoint, requestOptions);
		const data: IEntry[] | Error = await response.json();

		if (!response.ok) {
			throw new Error((data as Error).message);
		}
		return {data: (data as IEntry[])};
	}	catch (e) {
		return {error: e.message};
	}
};

export const addEntry = async (req: IEntryBase): Promise<IResponse> => {
	const requestOptions: IHttpOptions = {
		method: HttpMethod.POST,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(req)
	};

	return sendRequest(API_ENDPOINT, requestOptions);
};

export const getEntries = async (): Promise<IResponse> => {
	const requestOptions: IHttpOptions = {
		method: HttpMethod.GET,
	};

	return sendRequest(API_ENDPOINT, requestOptions);
};

export const deleteEntry = async (id: string): Promise<IResponse> => {
	const endpoint = `${API_ENDPOINT}/${id}`;
	const requestOptions: IHttpOptions = {
		method: HttpMethod.DELETE,
	};

	return sendRequest(endpoint, requestOptions);
};

export const updateEntry = async (req: IEntry): Promise<IResponse> => {
	const endpoint = `${API_ENDPOINT}/${req._id}`;
	const requestOptions: IHttpOptions = {
		method: HttpMethod.PUT,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(req)
	};

	return sendRequest(endpoint, requestOptions);
};

export const getPdf = async (id: string): Promise<IFileResponse> => {
	const requestOptions: IHttpOptions = {
		method: HttpMethod.GET,
	};
	try {
		const response = await fetch(`${API_ENDPOINT}/${id}`, requestOptions);
		const data: string | Error = await response.text();

		if (!response.ok) {
			throw new Error((data as unknown as Error).message);
		}
		return {data};
	}	catch (e) {
		return {error: e.message};
	}
};