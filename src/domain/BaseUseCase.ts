
export interface BaseUseCase<TRequest, TResponse> {
    exec(requestObject: TRequest): Promise<TResponse>; 
}