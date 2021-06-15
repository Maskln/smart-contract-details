export default interface IStoreResult<T> {
	isSuccess: boolean
	data: T
	errorInfo: string
}