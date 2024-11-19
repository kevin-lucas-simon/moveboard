
export class ChunkRepository {
    private baseUrl = window.location.origin + '/chunk/';

    async get(name: string): Promise<string> {
        const response = await fetch(this.baseUrl + name + '.json');
        return await response.text();
    }
}
