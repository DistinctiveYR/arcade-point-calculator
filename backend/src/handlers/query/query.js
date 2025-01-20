const { INTERNAL_SERVER_ERROR, QUERY_SUBMITTED, QUERY_FAILED } = require("../../constants/responseConstants")
const { INTERNAL_SERVER_ERROR_CODE, SUCCESS_CODE, CONFLICT_CODE, BAD_REQUEST_CODE } = require("../../constants/statusConstants")
const createResponse = require("../../helper/createResponse")
const { google } = require("googleapis");
const path = require("path");
const { SPREADSHEET_ID } = require("../../constants/constant");
const queryValidator = require("./queryValidator");
require('dotenv').config()

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, process.env.CREDENTIALS_PATH), 
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function query(req, res)
{
    try
    {
        console.info('body: ', req.body)
        const {error, value} = queryValidator(req.body)
        if(error)
        {
            const response = createResponse(error.details[0].message, BAD_REQUEST_CODE)
            return res.status(BAD_REQUEST_CODE).send(response)
        }

        const sheet = google.sheets({ version: 'v4', auth });

        const data = [
            new Date().toLocaleString(),
            value.email,
            value.category,
            value.description
        ]

        const getRows = await sheet.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: "Sheet1!A:A" // Get all rows in column A
        });

        const numRows = getRows.data.values ? getRows.data.values.length : 0;
        const nextRow = numRows + 1;

        const result = await sheet.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `Sheet1!A${nextRow}:D${nextRow}`, // Write data to the next available row
            valueInputOption: "RAW", // RAW or USER_ENTERED
            resource: {
              values: [data],
            },
        });

        console.info('result: ', result.data.updatedRows)

        if(result.data.updatedRows >= 1)
        {
            const response = createResponse(QUERY_SUBMITTED, SUCCESS_CODE)
            return res.status(SUCCESS_CODE).send(response)
        }

        const response = createResponse(QUERY_FAILED, CONFLICT_CODE)
        return res.status(CONFLICT_CODE).send(response)        
    }
    catch(error)
    {
        console.error('Error in query.js - ', error)
        const response = createResponse(INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_CODE)
        return res.status(INTERNAL_SERVER_ERROR_CODE).send(response)
    }
}

module.exports = query