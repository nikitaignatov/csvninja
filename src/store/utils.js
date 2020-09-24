import _ from 'lodash';

/** Transposes the columns into rows */
export const columnsToRows = function(payload) {
    return _.zip.apply(_, payload);
};

/** Transposes the rows into columns */
export const rowsToColumns = function(payload) {
    return _.unzip.apply(payload);
};
