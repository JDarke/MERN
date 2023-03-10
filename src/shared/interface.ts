import { HttpMethod } from "./enum";

export interface IHttpOptions {
	method: HttpMethod;
	headers?: { 'Content-Type': string };
	body?: string;
}

export interface IEntryBase {
	title: string;
    author: string;
	text: string;
	date: string;
	time: string;
}

export interface IResponse {
	data?: IEntry[];
	error?: string;
}

export interface IFileResponse {
	data?: string;
	error?: string;
}

export interface IEntry extends IEntryBase {
	_id: string;
}
