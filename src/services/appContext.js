import React from 'react';
import { ingredientType } from '../utils/types'
import PropTypes from 'prop-types';

export const IngredientsContext = React.createContext(null);
export const TotalCostContext = React.createContext(null);

IngredientsContext.Provider.propTypes = ingredientType;

TotalCostContext.Provider.propTypes = {
    totalCost: PropTypes.number
}