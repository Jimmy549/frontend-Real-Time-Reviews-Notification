import React, { createContext, useContext, useReducer } from 'react';

const FilterContext = createContext();

// Filter reducer
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return {
        ...state,
        categories: action.payload
      };

    case 'TOGGLE_CATEGORY': {
      const category = action.payload;
      const isSelected = state.categories.includes(category);
      return {
        ...state,
        categories: isSelected
          ? state.categories.filter(c => c !== category)
          : [...state.categories, category]
      };
    }

    case 'SET_ORIGIN':
      return {
        ...state,
        origins: action.payload
      };

    case 'TOGGLE_ORIGIN': {
      const origin = action.payload;
      const isSelected = state.origins.includes(origin);
      return {
        ...state,
        origins: isSelected
          ? state.origins.filter(o => o !== origin)
          : [...state.origins, origin]
      };
    }

    case 'SET_FLAVOR':
      return {
        ...state,
        flavors: action.payload
      };

    case 'TOGGLE_FLAVOR': {
      const flavor = action.payload;
      const isSelected = state.flavors.includes(flavor);
      return {
        ...state,
        flavors: isSelected
          ? state.flavors.filter(f => f !== flavor)
          : [...state.flavors, flavor]
      };
    }

    case 'SET_QUALITIES':
      return {
        ...state,
        qualities: action.payload
      };

    case 'TOGGLE_QUALITY': {
      const quality = action.payload;
      const isSelected = state.qualities.includes(quality);
      return {
        ...state,
        qualities: isSelected
          ? state.qualities.filter(q => q !== quality)
          : [...state.qualities, quality]
      };
    }

    case 'SET_CAFFEINE':
      return {
        ...state,
        caffeine: action.payload
      };

    case 'TOGGLE_CAFFEINE': {
      const caffeine = action.payload;
      const isSelected = state.caffeine.includes(caffeine);
      return {
        ...state,
        caffeine: isSelected
          ? state.caffeine.filter(c => c !== caffeine)
          : [...state.caffeine, caffeine]
      };
    }

    case 'SET_ALLERGENS':
      return {
        ...state,
        allergens: action.payload
      };

    case 'TOGGLE_ALLERGEN': {
      const allergen = action.payload;
      const isSelected = state.allergens.includes(allergen);
      return {
        ...state,
        allergens: isSelected
          ? state.allergens.filter(a => a !== allergen)
          : [...state.allergens, allergen]
      };
    }

    case 'SET_ORGANIC':
      return {
        ...state,
        organic: action.payload
      };

    case 'SET_PRICE_RANGE':
      return {
        ...state,
        priceRange: action.payload
      };

    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload
      };

    case 'CLEAR_FILTERS':
      return initialState;

    default:
      return state;
  }
};

// Initial state
const initialState = {
  categories: [],
  origins: [],
  flavors: [],
  qualities: [],
  caffeine: [],
  allergens: [],
  organic: false,
  priceRange: { min: '', max: '' },
  sortBy: 'featured'
};

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, initialState);

  const setCategory = (categories) => {
    dispatch({ type: 'SET_CATEGORY', payload: categories });
  };

  const toggleCategory = (category) => {
    dispatch({ type: 'TOGGLE_CATEGORY', payload: category });
  };

  const setOrigin = (origins) => {
    dispatch({ type: 'SET_ORIGIN', payload: origins });
  };

  const toggleOrigin = (origin) => {
    dispatch({ type: 'TOGGLE_ORIGIN', payload: origin });
  };

  const setFlavor = (flavors) => {
    dispatch({ type: 'SET_FLAVOR', payload: flavors });
  };

  const toggleFlavor = (flavor) => {
    dispatch({ type: 'TOGGLE_FLAVOR', payload: flavor });
  };

  const setQualities = (qualities) => {
    dispatch({ type: 'SET_QUALITIES', payload: qualities });
  };

  const toggleQuality = (quality) => {
    dispatch({ type: 'TOGGLE_QUALITY', payload: quality });
  };

  const setCaffeine = (caffeine) => {
    dispatch({ type: 'SET_CAFFEINE', payload: caffeine });
  };

  const toggleCaffeine = (caffeine) => {
    dispatch({ type: 'TOGGLE_CAFFEINE', payload: caffeine });
  };

  const setAllergens = (allergens) => {
    dispatch({ type: 'SET_ALLERGENS', payload: allergens });
  };

  const toggleAllergen = (allergen) => {
    dispatch({ type: 'TOGGLE_ALLERGEN', payload: allergen });
  };

  const setOrganic = (organic) => {
    dispatch({ type: 'SET_ORGANIC', payload: organic });
  };

  const setPriceRange = (priceRange) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: priceRange });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const value = {
    filters,
    setCategory,
    toggleCategory,
    setOrigin,
    toggleOrigin,
    setFlavor,
    toggleFlavor,
    setQualities,
    toggleQuality,
    setCaffeine,
    toggleCaffeine,
    setAllergens,
    toggleAllergen,
    setOrganic,
    setPriceRange,
    setSortBy,
    clearFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};