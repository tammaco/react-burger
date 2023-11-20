import PropTypes from 'prop-types';

const ingredientType = {
    data: PropTypes.shape({
        success: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.shape({
                _id: PropTypes.string,
                type: PropTypes.string,
                name: PropTypes.string,
                price: PropTypes.number,
                calories: PropTypes.number,
                carbohydrates: PropTypes.number,
                fat: PropTypes.number,
                proteins: PropTypes.number,
                image: PropTypes.string,
                image_large: PropTypes.string,
                image_mobile: PropTypes.string,
            }))
    })
};

export default ingredientType;