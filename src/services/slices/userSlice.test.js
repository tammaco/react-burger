import { reducer }  from '../slices/userSlice';
import { setUser, setIsAuthChecked, checkUserAuth }  from '../slices/userSlice';

describe("tests for userSlice", () => {
    const initialState = {
        user: null,
        isAuthChecked: false
    };

    test('should return the initial state', () => {
        expect(reducer(undefined, { })).toEqual(initialState)
    })

    test('should set user', () => {
        const previousState = initialState;
        const user = { "email": "test@mail.com", "name": "TestUser" };

        expect(reducer(previousState, setUser(user))).toEqual(
             {
                ...previousState, 
                user: user
            })
    })

    test('should set is auth checked', () => {
        const previousState = initialState;

        expect(reducer(previousState, checkUserAuth())).toEqual(
            {
                user: previousState.user, 
                isAuthChecked: true
            }
        )
    })

    test('should check user auth', () => {
        const value = true;
        const previousState = initialState;

        expect(reducer(previousState, setIsAuthChecked(value))).toEqual(
            {
                user: previousState.user, 
                isAuthChecked: value
            }
        )
    })
})