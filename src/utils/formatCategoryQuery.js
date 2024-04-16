const formatCategoryQuery = (categories) => {

    let categoryQuery = `AND MCI_CATEGORY IN`;
    let categoryItems = ``;

    if (categories) {

        for (let index = 0; index < categories.length; index++) {
            const title = categories[index].value;

            if (index === 0) {
                categoryItems = `'${title}'`;
            } else {
                categoryItems += `, '${title}'`;
            }

        }

        categoryQuery += ` (${categoryItems})`;

    }

    return categories.length > 0 ? categoryQuery : []
}

export default formatCategoryQuery