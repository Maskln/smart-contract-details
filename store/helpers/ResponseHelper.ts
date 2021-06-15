import { AxiosResponse } from 'axios'
import IStoreResult from '~/store/IStoreResult'

const processResponse = function <T>(axiosResponse: AxiosResponse<any>) {
	const storeResponse: IStoreResult<any> = {
		isSuccess: false,
		data: axiosResponse.data,
		errorInfo: ''
	}

	if (axiosResponse.status === 200) {
		storeResponse.isSuccess = true
	}

	return storeResponse
}

const createFailResponse = function <t>(errorInfo: string) {
	const storeResponse: IStoreResult<any> = {
		isSuccess: false,
		data: null,
		errorInfo: errorInfo
	}

	return storeResponse
} 

export { processResponse, createFailResponse}