import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import {ethers} from 'ethers'

extend("isSmartContractAddress", {
	computesRequired: true,
	// validate: value => value.length === 42 ? ethers.utils.isAddress(value): '',
	validate: value => ethers.utils.isAddress(value),
	message: "The address is not valid"
});

//Install VeeValidate rules
//with typescript
for (let [rule, validation] of Object.entries(rules)) {
	extend(rule, {
		...validation
	})
}

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)