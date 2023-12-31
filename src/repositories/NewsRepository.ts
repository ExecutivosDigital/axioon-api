export interface CreateNewsInterface {
	title: string;
	last_update: Date;
	url: string;
	users: {
		politician_id: string;
		sentimentAnalysis: number;
	}[];
}

export interface NewsRepository {
	createMany(data: CreateNewsInterface[]): Promise<void>;
}
