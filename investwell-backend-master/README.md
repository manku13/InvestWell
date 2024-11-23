# InvestWell Project

## Overview:

The InvestWell project is a Django-based web application that provides users with the ability to manage their investment portfolios through a REST API. The application includes endpoints for retrieving and adding investments, which are associated with the user's PAN number.

---

## Model Structure:

The `Investment` model contains the following fields:

- **user_name**: The name of the user who made the investment (max length 255).
- **pan_number**: The unique PAN number of the user (max length 10).
- **fund_name**: The name of the investment fund (max length 255).
- **investment_type**: The type of the investment. Can be one of the following:
  - `EQUITY`: Equity Investment
  - `DEBT`: Debt Investment
  - `MUTUAL_FUND`: Mutual Fund Investment
  - `BONDS`: Bonds Investment
- **invested_amount**: The amount invested in the fund (Decimal with max digits 10 and 2 decimal places).
- **current_value**: The current value of the investment (Decimal with max digits 10 and 2 decimal places).
- **invested_date**: The date when the investment was made (DateField).
- **note**: Optional text field for any additional notes about the investment.

---

## Setup Instructions:

Follow these steps to set up and run the InvestWell project locally:

1. **Extract the zip file and open it in an IDE**:

   ```
   cd investwell
   ```

2. **Setup Env and Install Dependencies**:

   Ensure you have Python 3.8+ and `pip` installed. Then, create a virtual environment and install the dependencies:

   ### On Mac to create env

   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

   ### On Windows to create env

   ```
   use venv\Scripts\activate
   ```

   **Install the required Dependencies**

   Note: If any installation fails, you can manually download and install them, such as Django or Django REST framework

   ```
   pip3 install -r requirements.txt
   ```

3. **Configure Database**:

   By default, this project uses SQLite as the database, but you can change the database settings in `settings.py` if needed (though this isn't required for the assignment).

   Apply database migrations:

   ```
   python3 manage.py migrate
   ```

4. **Run the Server**:

   Start the Django development server:

   ```
   python3 manage.py runserver
   ```

The server should now be running at `http://127.0.0.1:8000/`.

---

## Endpoints:

You can test the endpoints using tools like Postman or cURL.

### Test the GET /investments/ Endpoint:

To retrieve investments for a specific PAN number, send a GET request:

```
curl --location --request GET 'http://127.0.0.1:8000/investments/?pan_number=XYZ1234567' \
--header 'Content-Type: application/json'
```

- **Query Parameters**:

  - **pan_number** (required): The PAN number of the user.

- **Response**:
  - **200 OK**: Returns a list of investments.

```json
[
  {
    "id": 2,
    "user_name": "Jane Doe",
    "pan_number": "XYZ1234567",
    "fund_name": "Global Equity Fund",
    "investment_type": "EQUITY",
    "invested_amount": "20000.00",
    "current_value": "22000.00",
    "invested_date": "2024-02-20",
    "note": "Invested for retirement"
  },
  {
    "id": 3,
    "user_name": "Jane Doe",
    "pan_number": "XYZ1234567",
    "fund_name": "XYZ Bond Fund",
    "investment_type": "BONDS",
    "invested_amount": "20000.00",
    "current_value": "22000.00",
    "invested_date": "2024-02-20",
    "note": "Bond investment with stable returns"
  }
]
```

- **400 Bad Request**: If the `pan_number` is missing.

```json
{
  "error": "PAN number is required"
}
```

- **404 Not Found**: If no investments are found for the given PAN number.

```json
{
  "error": "PAN verification failed, no investments found for this PAN."
}
```

### Test the POST /investments/add/ Endpoint:

To add a new investment, send a POST request with the required JSON data:

```
POST http://127.0.0.1:8000/investments/add/
```

### Request Body (JSON):

```json
{
  "user_name": "Tony Stark",
  "pan_number": "AYZ1234567",
  "fund_name": "XYZ Bond Fund",
  "investment_type": "BONDS",
  "invested_amount": 20000.0,
  "current_value": 22000.0,
  "invested_date": "2024-02-20",
  "note": "Bond investment with stable returns"
}
```

### Response:

- **201 Created**: The new investment is created successfully

```json
{
  "id": 4,
  "user_name": "Tony Stark",
  "pan_number": "AYZ1234567",
  "fund_name": "XYZ Bond Fund",
  "investment_type": "BONDS",
  "invested_amount": "20000.00",
  "current_value": "22000.00",
  "invested_date": "2024-02-20",
  "note": "Bond investment with stable returns"
}
```

- **400 Bad Request**: If the request body is invalid or missing required fields.

```json
{
  "error": "Invalid data, please check the input fields."
}
```

## Available Database

Once the setup is complete, perform a GET request using the following PAN numbers to retrieve the financial data for the respective users:

- "XYZ1234567"
- "ABC9876543"
- "XYZ9876543"
- "AYZ1234567"
- "TUV5678901"

This will allow you to access the users' financial information based on these PAN numbers in your local.

## Debugging & Troubleshooting

Stuck while following the steps? Don’t worry, we’ve all been there. The internet is your best friend—Google that error, check out Stack Overflow, or hit up the official docs. There’s a good chance someone else has already battled the same bug and won.

- python3 manage.py runserver
  python3: can't open file '/Users/xyz/frontend-assessment/manage.py': [Errno 2] No such file or directory

  ```
  cd investwell
  ```

- If you are facing issue while downloading dependencies from requirement.txt , download those dependency explicitly
