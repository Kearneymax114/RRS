import pandas as pd
import re
import numpy as np

raw = pd.read_csv('candidate_raw_data.csv')

### Name Formatting ###
raw['first_name'] = raw['first_name'].apply(lambda x: x.strip().title())
raw['last_name'] = raw['last_name'].apply(lambda x: x.strip().title())

### Phone Numbers ###
#format phone numbers
def format_phone(phone):
    phone = str(phone)
    digits = re.sub(r'\D', '', phone)  # Remove non-digit characters

    if len(digits) == 11:
        return f"({digits[1:4]}) {digits[4:7]}-{digits[7:]}"
    elif len(digits) == 10:
        return f"({digits[0:3]}) {digits[3:6]}-{digits[6:]}"
    else:
        return np.nan

raw['phone_number'] = raw['phone_number'].apply(format_phone)


### Email ###
# Email formatting
raw['email'] = raw['email'].apply(lambda x: x.strip().lower()) # lowercase and strip

# #Email validation
# def is_valid_email(email):
#     pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
#     return bool(re.match(pattern, email))
# raw['valid_email'] = raw['email'].apply(is_valid_email)
# raw = raw[raw['valid_email'] == True].drop(columns='valid_email') # Keep only valid emails


# Check for duplicate emails
# duplicates = raw[raw.duplicated(subset='email', keep='first')]
# print (duplicates['email'])

raw = raw.drop_duplicates(subset='email', keep='first')  # Keep the first occurrence of each email
raw = raw.drop_duplicates(subset='phone_number', keep='first')  # Keep the first occurrence of each phone number
# print(raw[['first_name','last_name','email','phone_number']])

raw[['id', 'first_name', 'last_name', 'email', 'phone_number', 'created_at']].to_csv('candidate_data.csv', index=False)