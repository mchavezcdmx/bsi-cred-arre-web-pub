export type ExampleType = {
    message: string,
    code: number
}

export interface ExampleRepository {
    getData(): Promise<ExampleType>;
}
