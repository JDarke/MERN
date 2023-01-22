export interface IEntry {
    _id?: string;
    title: string;
    text: string;
    date: string;
    time: string;
}

export interface IRequest {
	body?: IEntry;
	params?: { id: string };
}

export interface IDB {
    mongoose: any;
    url: string;
    entries: any;
}
