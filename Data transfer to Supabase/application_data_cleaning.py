import pandas as pd
import re
import numpy as np

raw = pd.read_csv('candidate_raw_data.csv')
raw = raw.rename(columns={'id' : 'candidate_id'})

### BEGIN REMOVAL OF DUPLICATES ###

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

# Email formatting
raw['email'] = raw['email'].apply(lambda x: x.strip().lower()) # lowercase and strip
raw = raw.drop_duplicates(subset='email', keep='first')  # Keep the first occurrence of each email
raw = raw.drop_duplicates(subset='phone_number', keep='first')  # Keep the first occurrence of each phone number
### END REMOVAL OF DUPLICATES ###



# Renaming & adding missing columns
raw = raw.rename(columns={'pgk_delv_xp' : 'pkg_delv_xp'})
raw['dot_cert'] = False
raw['resume_url'] = ''
# Free response formatting
raw['truck_xp_desc'] = raw['truck_xp_desc'].apply(lambda x: x.strip() if isinstance(x, str) else x)
raw['previous_xp_description'] = raw['previous_xp_description'].apply(lambda x: x.strip() if isinstance(x, str) else x)

raw[['candidate_id', 'english', 'us_auth', 'license_three_years', 'dot_cert', 'clean_criminal_record', 'weight_acceptance', 'truck_xp', 'pkg_delv_xp', 'marijuana', 'start_timeframe', 'weekly_avalibility', 'clean_driving_record', 'resume_url', 'created_at', 'previous_xp_description', 'truck_xp_desc']].to_csv('application_data.csv', index=False)
print(len(raw))