import { optionConstants } from './constants'
import { optionService } from '../_Service/optionService'

export const OptionsList = (Options, login) => {
    console.log(Options, "Options");
    return async (dispatch) =>
        new Promise((resolve, reject) => {

            dispatch({ type: optionConstants.OPTIONSLIST_REQUEST });

            optionService.optionList(Options).then(function (res) {
                if (login === "login") {
                    const iamge = res.data.docs[0];
                    console.log(iamge, "iamge")
                    return resolve(iamge);
                }
                else {
                    const Options = res.data.docs[0].valueobject;
                    console.log(Options, "Options")
                    dispatch({
                        type: optionConstants.OPTIONSLIST_SUCCESS,
                        payload: Options
                    });
                    return resolve(Options);
                }
            }, function (err) {
                dispatch({
                    type: optionConstants.OPTIONSLIST_FAILURE,
                    payload: err
                });
                return reject(err);
            })

        });

}