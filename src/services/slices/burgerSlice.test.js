import { reducer }  from '../slices/burgerSlice';
import { addBun, addItem, deleteItem, reset, swapItems }  from '../slices/burgerSlice';

describe("tests for burgerSlice", () => {

    const initialState = {
        ingredients: [],
        bun: null,
        items: [],
        orderDetails: []
    };

    const bun =  {_id: "string",
        type: "bun",
        name: "string",
        price: 7,
        calories: 7,
        carbohydrates: 7,
        fat: 7,
        proteins: 7,
        image: "string",
        image_large: "string",
        image_mobile: "string"
    }

    const item =  {_id: "111",
            type: "item",
            name: "string",
            price: 7,
            calories: 7,
            carbohydrates: 7,
            fat: 7,
            proteins: 7,
            image: "string",
            image_large: "string",
            image_mobile: "string",
            key: "777"
    }

    test('should return the initial state', () => {
        expect(reducer(undefined, { })).toEqual(initialState)
    })

    test('should add bun to an empty list', () => {
        const previousState = initialState;

        expect(reducer(previousState, addBun(bun))).toEqual({ 
            ingredients: [...previousState.ingredients],
            bun: { ... bun, key: expect.any(String) },
            items: [...previousState.items],
            orderDetails: [...previousState.orderDetails, { _id: bun._id, quantity: 2, price: bun.price }]
        })
    })

    test('should replace existing bun', () => {
        const previousState = { ... initialState, 
        bun: {
            _id: "111",
            type: "bun",
            name: "string",
            price: 7,
            calories: 7,
            carbohydrates: 7,
            fat: 7,
            proteins: 7,
            image: "string",
            image_large: "string",
            image_mobile: "string",
            key: "111"
        },
        orderDetails: [{ _id: "111", quantity: 2, price: 7 }]
    }
    const bun =  
        {_id: "222",
            type: "bun",
            name: "string",
            price: 8,
            calories: 7,
            carbohydrates: 7,
            fat: 7,
            proteins: 7,
            image: "string",
            image_large: "string",
            image_mobile: "string"
        }

        expect(reducer(previousState, addBun(bun))).toEqual({ 
            ...previousState,
            bun: { ... bun, key: expect.any(String) },
            orderDetails: [...previousState.orderDetails, { _id: bun._id, quantity: 2, price: bun.price }]
        })
    })

    test('should add new item', () => {
        const previousState = initialState;

        expect(reducer(previousState, addItem(item))).toEqual({ 
            ...previousState,
            items: [...previousState.items, { ...item, key: expect.any(String)  }],
            orderDetails: [...previousState.orderDetails, { _id: item._id, quantity: 1, price: item.price }]
        })
    })

    test('should increase item quantity in order', () => {
        const previousState = { ...initialState,
            items: [item],
            orderDetails: [{ _id: item._id, quantity: 1, price: item.price }]
        };

        expect(reducer(previousState, addItem(item))).toEqual({ 
            ...previousState,
            items: [...previousState.items, { ...item, key: expect.any(String)  }],
            orderDetails: [{ _id: item._id, quantity: 2, price: item.price }]
        })
    })

    test('should remove item', () => {
        const previousState = { ...initialState,
            items: [item],
            orderDetails: [{ _id: item._id, quantity: 1, price: item.price }]
        };

        expect(reducer(previousState, deleteItem(item))).toEqual({ 
            ...previousState,
            items: [],
            orderDetails: []
        })
    })

    test('should reset state', () => {
        const previousState = {  
            ingredients: [],
            bun: bun,
            items: [item, 
                {_id: "222",
                    type: "item",
                    name: "string",
                    price: 8,
                    calories: 7,
                    carbohydrates: 7,
                    fat: 7,
                    proteins: 7,
                    image: "string",
                    image_large: "string",
                    image_mobile: "string",
                    key: "888"
                }
            ],
            orderDetails: [{ _id: item._id, quantity: 1, price: item.price }, { _id: bun._id, quantity: 2, price: bun.price }]
        };

        expect(reducer(previousState, reset())).toEqual(initialState)
    })

    test('should swap items', () => {
        const previousState = {  
            ingredients: [],
            bun: bun,
            items: [item, 
                {_id: "222",
                    type: "item",
                    name: "string",
                    price: 8,
                    calories: 7,
                    carbohydrates: 7,
                    fat: 7,
                    proteins: 7,
                    image: "string",
                    image_large: "string",
                    image_mobile: "string",
                    key: "888"
                }
            ],
            orderDetails: [
                { _id: item._id, quantity: 1, price: item.price }, 
                { _id: "222", quantity: 1, price: 8 },
                { _id: bun._id, quantity: 2, price: bun.price }]
        };

        expect(reducer(previousState, swapItems({ dragIndex: 0, dropIndex: 1 }))).toEqual({
            ...previousState,
            items: [
                {_id: "222",
                    type: "item",
                    name: "string",
                    price: 8,
                    calories: 7,
                    carbohydrates: 7,
                    fat: 7,
                    proteins: 7,
                    image: "string",
                    image_large: "string",
                    image_mobile: "string",
                    key: "888"
                },
                item,
            ]
        })
    })
});