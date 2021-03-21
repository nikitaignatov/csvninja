import { parseCsv, toCsv } from "./Csv";

const leading_whitespace_csv = `"Letter","Frequency","Percentage","Hi"
"A",  24373121,  8.1,"X"
"B",   4762938,  1.6,"Y"
"C",   8982417,  3.0,"Z"`

const leading_whitespace_csv_expected = `Letter,Frequency,Percentage,Hi\r\nA,24373121,8.1,X\r\nB,4762938,1.6,Y\r\nC,8982417,3,Z`

const leading_whitespace_data_expected = {
    data: [
        ['A', 24373121, 8.1, 'X'],
        ['B', 4762938, 1.6, 'Y'],
        ['C', 8982417, 3, 'Z']
    ],
    errors: [],
    meta: {
        delimiter: ',',
        linebreak: '\n',
        aborted: false,
        truncated: false,
        cursor: 113,
        fields: ['Letter', 'Frequency', 'Percentage', 'Hi']
    }
}

test("parse data", () => {
    const data = parseCsv(leading_whitespace_csv)
    expect(data).toStrictEqual(leading_whitespace_data_expected);
});

test("trim leading whitespace before quoted values and headers", () => {
    const result = parseCsv(leading_whitespace_csv)
    const csv = toCsv([result.meta.fields].concat(result.data))
    expect(csv).toBe(leading_whitespace_csv_expected);
});