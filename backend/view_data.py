import sqlite3
import json
from datetime import datetime

def format_datetime(dt_str):
    if dt_str:
        try:
            dt = datetime.fromisoformat(dt_str.replace('Z', '+00:00'))
            return dt.strftime('%d %b %Y, %I:%M %p')
        except:
            return dt_str
    return 'N/A'

conn = sqlite3.connect('unified_portal.db')
cursor = conn.cursor()

print("=" * 80)
print("🏛️  UNIFIED SERVICES PORTAL - DATABASE VIEWER")
print("=" * 80)

# Users Data
print("\n👤 USERS:")
print("-" * 50)
cursor.execute('SELECT id, email, full_name, mobile, city, aadhaar_number, created_at FROM users')
users = cursor.fetchall()
for user in users:
    print(f"ID: {user[0]}")
    print(f"Email: {user[1]}")
    print(f"Name: {user[2] or 'Not Set'}")
    print(f"Mobile: {user[3] or 'Not Set'}")
    print(f"City: {user[4] or 'Not Set'}")
    print(f"Aadhaar: {user[5] or 'Not Set'}")
    print(f"Registered: {format_datetime(user[6])}")
    print()

# Applications Data
print("\n📄 APPLICATIONS:")
print("-" * 50)
cursor.execute('SELECT id, service_type, application_type, status, form_data, external_reference, created_at FROM applications')
applications = cursor.fetchall()
for app in applications:
    print(f"App ID: {app[0]}")
    print(f"Service: {app[1].upper()}")
    print(f"Type: {app[2]}")
    print(f"Status: {app[3].upper()}")
    if app[4]:  # form_data
        try:
            form_data = json.loads(app[4])
            print(f"Form Data: {json.dumps(form_data, indent=2)}")
        except:
            print(f"Form Data: {app[4]}")
    print(f"Reference: {app[5] or 'Not Set'}")
    print(f"Created: {format_datetime(app[6])}")
    print()

# RPA Submissions
print("\n🤖 RPA SUBMISSIONS:")
print("-" * 50)
cursor.execute('SELECT id, application_id, target_website, status, confirmation_number, error_message, created_at FROM rpa_submissions')
rpa_subs = cursor.fetchall()
for rpa in rpa_subs:
    print(f"RPA ID: {rpa[0]}")
    print(f"App ID: {rpa[1]}")
    print(f"Website: {rpa[2].upper()}")
    print(f"Status: {rpa[3].upper()}")
    print(f"Confirmation: {rpa[4] or 'None'}")
    if rpa[5]:  # error_message
        print(f"Error: {rpa[5][:100]}...")
    print(f"Created: {format_datetime(rpa[6])}")
    print()

# Documents
print("\n📁 DOCUMENTS:")
print("-" * 50)
cursor.execute('SELECT id, doc_type, file_name, extracted_data, created_at FROM documents')
documents = cursor.fetchall()
for doc in documents:
    print(f"Doc ID: {doc[0]}")
    print(f"Type: {doc[1].upper()}")
    print(f"File: {doc[2] or 'Unknown'}")
    if doc[3]:  # extracted_data
        try:
            extracted = json.loads(doc[3])
            print(f"Extracted Data: {json.dumps(extracted, indent=2)}")
        except:
            print(f"Extracted Data: {doc[3]}")
    print(f"Uploaded: {format_datetime(doc[4])}")
    print()

# Service Accounts
print("\n⚡ ELECTRICITY ACCOUNTS:")
print("-" * 50)
cursor.execute('SELECT provider, service_number, t_no, consumer_name FROM electricity_accounts')
elec_accounts = cursor.fetchall()
for acc in elec_accounts:
    print(f"Provider: {acc[0] or 'Not Set'}")
    print(f"Service Number: {acc[1] or 'Not Set'}")
    print(f"T No: {acc[2] or 'Not Set'}")
    print(f"Consumer: {acc[3] or 'Not Set'}")
    print()

print("\n🔥 GAS ACCOUNTS:")
print("-" * 50)
cursor.execute('SELECT provider, consumer_number, bp_number, consumer_name FROM gas_accounts')
gas_accounts = cursor.fetchall()
for acc in gas_accounts:
    print(f"Provider: {acc[0] or 'Not Set'}")
    print(f"Consumer Number: {acc[1] or 'Not Set'}")
    print(f"BP Number: {acc[2] or 'Not Set'}")
    print(f"Consumer: {acc[3] or 'Not Set'}")
    print()

# Demo Government Data
print("\n🏛️ DEMO GOVERNMENT SUBMISSIONS:")
print("-" * 50)

# Torrent Power
print("⚡ TORRENT POWER:")
cursor.execute('SELECT confirmation_number, service_number, applicant_name, mobile, application_type, status, submitted_at FROM demo_torrent_applications')
demo_apps = cursor.fetchall()
for demo in demo_apps:
    print(f"  Confirmation: {demo[0]}")
    print(f"  Service Number: {demo[1]}")
    print(f"  Applicant: {demo[2]}")
    print(f"  Mobile: {demo[3]}")
    print(f"  Type: {demo[4]}")
    print(f"  Status: {demo[5]}")
    print(f"  Submitted: {format_datetime(demo[6])}")
    print()

# Adani Gas
print("🔥 ADANI GAS:")
cursor.execute('SELECT confirmation_number, consumer_number, applicant_name, mobile, application_type, status, submitted_at FROM demo_adani_gas_applications')
gas_apps = cursor.fetchall()
for demo in gas_apps:
    print(f"  Confirmation: {demo[0]}")
    print(f"  Consumer Number: {demo[1] or 'N/A'}")
    print(f"  Applicant: {demo[2]}")
    print(f"  Mobile: {demo[3]}")
    print(f"  Type: {demo[4]}")
    print(f"  Status: {demo[5]}")
    print(f"  Submitted: {format_datetime(demo[6])}")
    print()

# AMC Water
print("💧 AMC WATER:")
cursor.execute('SELECT confirmation_number, connection_id, zone, applicant_name, mobile, application_type, status, submitted_at FROM demo_amc_water_applications')
water_apps = cursor.fetchall()
for demo in water_apps:
    print(f"  Confirmation: {demo[0]}")
    print(f"  Connection ID: {demo[1] or 'N/A'}")
    print(f"  Zone: {demo[2]}")
    print(f"  Applicant: {demo[3]}")
    print(f"  Mobile: {demo[4]}")
    print(f"  Type: {demo[5]}")
    print(f"  Status: {demo[6]}")
    print(f"  Submitted: {format_datetime(demo[7])}")
    print()

# AnyRoR Gujarat
print("🏠 ANYROR GUJARAT:")
cursor.execute('SELECT confirmation_number, survey_number, district, applicant_name, mobile, application_type, status, submitted_at FROM demo_anyror_applications')
property_apps = cursor.fetchall()
for demo in property_apps:
    print(f"  Confirmation: {demo[0]}")
    print(f"  Survey Number: {demo[1]}")
    print(f"  District: {demo[2]}")
    print(f"  Applicant: {demo[3]}")
    print(f"  Mobile: {demo[4]}")
    print(f"  Type: {demo[5]}")
    print(f"  Status: {demo[6]}")
    print(f"  Submitted: {format_datetime(demo[7])}")
    print()

conn.close()
print("=" * 80)
print("✅ DATA VIEWING COMPLETE!")
print("=" * 80)