import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export interface IRootState { }

export const store = new Vuex.Store<IRootState>({
	mutations: {
		resetStore() {
			Object.keys(this.state).forEach((key: string) => {
				if (key !== 'UserStore') {
					const module: any = this.commit(key + '/RESETSTATE')
				}
			})
		}
	}
})

const createStore = (): Store<IRootState> => {
	return store
}

export default createStore