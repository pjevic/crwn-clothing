import { createSelector } from "reselect";

const selectategoryReducer = (state) => state.categories;

export const selectCategories = createSelector([selectategoryReducer], (categoriesSlice) => categoriesSlice.categories);

export const selectCategoriesMap = createSelector(selectCategories, (categories) =>
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
