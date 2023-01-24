export interface IEntryBase {
    title: string;
    author: string;
    text: string;
    date: string;
    time: string;
}
export interface IEntry extends IEntryBase {
    _id?: string;
}

export interface IRequest {
	body?: IEntry;
	params?: { id: string };
}

export interface IDB {
    mongoose: any;
    url: string;
    entry: any;
}
