import sqlite3

conn = sqlite3.connect('unified_portal.db')
cursor = conn.cursor()

print("📊 DATABASE TABLES:")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()
for table in tables:
    print(f"  📋 {table[0]}")

print("\n👤 USERS COUNT:")
cursor.execute('SELECT COUNT(*) FROM users')
print(f"  Users: {cursor.fetchone()[0]}")

print("\n📄 APPLICATIONS COUNT:")
try:
    cursor.execute('SELECT COUNT(*) FROM applications')
    print(f"  Applications: {cursor.fetchone()[0]}")
except:
    print("  Applications: 0 (table may not exist)")

print("\n🤖 RPA SUBMISSIONS COUNT:")
try:
    cursor.execute('SELECT COUNT(*) FROM rpa_submissions')
    print(f"  RPA Submissions: {cursor.fetchone()[0]}")
except:
    print("  RPA Submissions: 0 (table may not exist)")

print("\n📁 DOCUMENTS COUNT:")
try:
    cursor.execute('SELECT COUNT(*) FROM documents')
    print(f"  Documents: {cursor.fetchone()[0]}")
except:
    print("  Documents: 0 (table may not exist)")

conn.close()
print("\n✅ Database check complete!")