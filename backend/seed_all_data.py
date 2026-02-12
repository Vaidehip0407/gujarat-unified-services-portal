"""
Seed all data including services and grants
"""

import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.seed_data.seed_database import seed_database
from app.seed_data.seed_grants import seed_grants

def main():
    print("=" * 60)
    print("SEEDING DATABASE WITH ALL DATA")
    print("=" * 60)
    
    print("\n1. Seeding Services Data...")
    seed_database()
    
    print("\n2. Seeding Government Grants Data...")
    seed_grants()
    
    print("\n" + "=" * 60)
    print("✓ ALL DATA SEEDED SUCCESSFULLY")
    print("=" * 60)

if __name__ == "__main__":
    main()
