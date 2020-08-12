import axios from 'axios'
import _ from 'lodash'



class ApiWorker {
    constructor(){
		this.emailId = '';
    }

    get emailId() {
		// eslint-disable-next-line no-underscore-dangle
		return this._emailId;
	}

	set emailId(val) {
		// eslint-disable-next-line no-underscore-dangle
		this._emailId = val;
	}

    getResFrame = () => ({
		data: null,
		success: false,
		code: null,
		message: '',
		additionalInfo: ''
    });
    
    processError = e => {
		const result = this.getResFrame();
		if (_.get(e, 'Errors') && _.get(e, 'Errors').lenght !== 0) {
			result.message = _.get(e, 'Errors[0].Message');
			result.code = _.get(e, 'Errors[0].ErrorCode');
			result.additionalInfo = _.get(e, 'Errors[0].AdditionalInfo');
		} else if (e.message) {
			result.message = e.message;
			result.code = _.get(e, 'response.status') || 15;
			console.log(result)
		} else {
			result.message = 'something went wrong';
		}

		return result;
    };
    
    prepareData = data => {
		let result = {};
		result = {
			RequestHeader: {
				..._.get(data, 'RequestHeader'),
				EmailId: this.emailId
			}
		};

		return result;
	};
	ddd(){
		console.log("damn")
	}
// format:'json'
    send = async (method,url,body={},params={}) => {
		console.log(method)
		let result = this.getResFrame();
		let response = null;
		
		const updatedReqHeader = this.prepareData(body);
        const data = {...body}
        const opt = {
            method,
            url,
            data,
			params
        }
        try {
			response = await axios(opt);
			// if (_.get(response, 'status') === 200 && _.get(response, 'data.ResponseHeader.Succeeded')) {
			// 	result.success = _.get(response, 'data.ResponseHeader.Succeeded');
			// } else {
			// 	result = this.processError(_.get(response, 'data.ResponseHeader'));
			// }
			// result.data = _.omit(_.get(response, 'data'), ['ResponseHeader']);
			result = response
		} catch (e) {
			console.log(e)
			result = this.processError(e);
		}
		return result;
    }
}

export default new ApiWorker()