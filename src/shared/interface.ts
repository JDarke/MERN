import { HttpMethod } from "./enum";

export interface IHttpOptions {
	method: HttpMethod;
	headers?: { 'Content-Type': string };
	body?: string;
}

export interface IEntryBase {
	title: string;
	text: string;
	date: string;
	time: string;
}

export interface IResponse {
	data?: IEntry[];
	error?: string;
}

export interface IEntry extends IEntryBase {
	_id: string;
}
