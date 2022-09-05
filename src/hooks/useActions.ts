import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
//
import { userActions } from "store/user/user.slice";

const AllActions = {
    ...userActions
}


const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(AllActions, dispatch)
}

export default useActions