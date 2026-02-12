"""
Seed Government Grants Data
Government-grade grant schemes with proper details
"""

from datetime import datetime, timedelta
from app.models_grants import Grant, GrantStatus, GrantCategory, Ministry, GrantLevel
from app.database import SessionLocal

def seed_grants():
    db = SessionLocal()
    
    try:
        # Check if grants already exist
        existing_count = db.query(Grant).count()
        if existing_count > 0:
            print(f"✓ Grants already seeded ({existing_count} grants found)")
            return
        
        grants_data = [
            # Startup Grants
            {
                "name": "Startup India Seed Fund Scheme (SISFS)",
                "name_hindi": "स्टार्टअप इंडिया सीड फंड योजना",
                "scheme_number": "DPIIT/2021/SISFS",
                "category": GrantCategory.STARTUP,
                "ministry": Ministry.DPIIT,
                "level": GrantLevel.CENTRAL,
                "min_amount": 500000,
                "max_amount": 2000000,
                "amount_display": "₹5-20 Lakhs",
                "description": "Financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.",
                "description_hindi": "स्टार्टअप्स को प्रूफ ऑफ कॉन्सेप्ट, प्रोटोटाइप विकास, उत्पाद परीक्षण, बाजार प्रवेश और व्यावसायीकरण के लिए वित्तीय सहायता।",
                "objective": "To provide financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization.",
                "benefits": [
                    "Seed funding up to ₹20 lakhs",
                    "Validation support for proof of concept",
                    "Prototype development assistance",
                    "Market entry support",
                    "Mentorship from industry experts"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup"],
                    "registration": "DPIIT Recognized Startup",
                    "age": "Less than 2 years old",
                    "sector": "Technology, Innovation"
                },
                "eligibility_summary": "DPIIT recognized startups less than 2 years old",
                "required_documents": [
                    "DPIIT Recognition Certificate",
                    "Business Plan",
                    "Pitch Deck",
                    "Financial Projections",
                    "Founder Details",
                    "Bank Account Details"
                ],
                "status": GrantStatus.OPEN,
                "application_start_date": datetime.now() - timedelta(days=30),
                "application_end_date": datetime.now() + timedelta(days=60),
                "announcement_date": datetime.now() - timedelta(days=45),
                "official_website": "https://www.startupindia.gov.in/content/sih/en/startup-scheme/seed-fund-scheme.html",
                "tags": ["startup", "seed funding", "innovation", "technology"],
                "priority": 10
            },
            {
                "name": "Atal Innovation Mission (AIM)",
                "name_hindi": "अटल इनोवेशन मिशन",
                "scheme_number": "NITI/2021/AIM",
                "category": GrantCategory.TECHNOLOGY,
                "ministry": Ministry.DPIIT,
                "level": GrantLevel.CENTRAL,
                "min_amount": 500000,
                "max_amount": 1000000,
                "amount_display": "₹5-10 Lakhs",
                "description": "Support for innovation and entrepreneurship through incubation centers and technology development.",
                "objective": "To promote innovation and entrepreneurship ecosystem in India",
                "benefits": [
                    "Grant up to ₹10 lakhs",
                    "Incubation support",
                    "Mentorship programs",
                    "Networking opportunities"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup", "technology"],
                    "sector": "Technology, Innovation, R&D"
                },
                "eligibility_summary": "Tech startups working on innovative solutions",
                "required_documents": [
                    "Innovation Proposal",
                    "Technical Documentation",
                    "Team Details",
                    "Budget Plan"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=90),
                "tags": ["innovation", "technology", "incubation"],
                "priority": 9
            },
            
            # MSME Grants
            {
                "name": "Credit Guarantee Fund Scheme for Micro and Small Enterprises (CGFMSE)",
                "name_hindi": "सूक्ष्म और लघु उद्यमों के लिए ऋण गारंटी निधि योजना",
                "scheme_number": "MSME/2020/CGFMSE",
                "category": GrantCategory.MSME,
                "ministry": Ministry.MSME,
                "level": GrantLevel.CENTRAL,
                "min_amount": 1000000,
                "max_amount": 5000000,
                "amount_display": "₹10-50 Lakhs",
                "description": "Credit guarantee coverage to eligible lending institutions for collateral-free credit to MSMEs.",
                "description_hindi": "एमएसएमई को संपार्श्विक मुक्त ऋण के लिए पात्र ऋण संस्थानों को ऋण गारंटी कवरेज।",
                "objective": "To make available collateral-free credit to the micro and small enterprise sector",
                "benefits": [
                    "Collateral-free loans up to ₹50 lakhs",
                    "Credit guarantee coverage",
                    "Easy loan approval process",
                    "Lower interest rates"
                ],
                "eligibility_criteria": {
                    "business_type": ["msme"],
                    "registration": "MSME/Udyam Registration",
                    "turnover": "As per MSME definition"
                },
                "eligibility_summary": "MSME registered enterprises",
                "required_documents": [
                    "Udyam Registration Certificate",
                    "Business Plan",
                    "Financial Statements",
                    "Bank Statements",
                    "GST Registration"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=120),
                "official_website": "https://www.cgtmse.in/",
                "tags": ["msme", "credit", "collateral-free"],
                "priority": 10
            },
            {
                "name": "Technology Upgradation Fund Scheme (TUFS)",
                "name_hindi": "प्रौद्योगिकी उन्नयन निधि योजना",
                "scheme_number": "MSME/2021/TUFS",
                "category": GrantCategory.MANUFACTURING,
                "ministry": Ministry.MSME,
                "level": GrantLevel.CENTRAL,
                "min_amount": 500000,
                "max_amount": 1000000,
                "amount_display": "₹5-10 Lakhs",
                "description": "Financial assistance for technology upgradation in manufacturing sector.",
                "objective": "To facilitate technology upgradation in manufacturing industries",
                "benefits": [
                    "Subsidy on technology upgradation",
                    "Interest subsidy on loans",
                    "Technical guidance"
                ],
                "eligibility_criteria": {
                    "business_type": ["msme", "manufacturing"],
                    "sector": "Manufacturing"
                },
                "eligibility_summary": "Manufacturing MSMEs for technology upgradation",
                "required_documents": [
                    "MSME Certificate",
                    "Technology Upgradation Plan",
                    "Quotations",
                    "Financial Documents"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=75),
                "tags": ["manufacturing", "technology", "upgradation"],
                "priority": 8
            },
            
            # Women Entrepreneur Grants
            {
                "name": "Mahila Udyam Nidhi Scheme",
                "name_hindi": "महिला उद्यम निधि योजना",
                "scheme_number": "MSME/2020/MUN",
                "category": GrantCategory.WOMEN,
                "ministry": Ministry.WOMEN_CHILD,
                "level": GrantLevel.CENTRAL,
                "min_amount": 500000,
                "max_amount": 1000000,
                "amount_display": "₹5-10 Lakhs",
                "description": "Financial assistance to women entrepreneurs for starting or expanding their business.",
                "description_hindi": "महिला उद्यमियों को अपना व्यवसाय शुरू करने या विस्तार करने के लिए वित्तीय सहायता।",
                "objective": "To promote women entrepreneurship and economic empowerment",
                "benefits": [
                    "Loan up to ₹10 lakhs",
                    "Concessional interest rates",
                    "Training and mentorship",
                    "Marketing support"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup", "msme"],
                    "owner": "Women (51% ownership)",
                    "category": "Women Entrepreneur"
                },
                "eligibility_summary": "Women-owned businesses (51%+ ownership)",
                "required_documents": [
                    "Business Registration",
                    "Ownership Proof",
                    "Business Plan",
                    "Identity Proof",
                    "Address Proof"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=90),
                "tags": ["women", "entrepreneur", "empowerment"],
                "priority": 9
            },
            {
                "name": "Stand-Up India Scheme",
                "name_hindi": "स्टैंड-अप इंडिया योजना",
                "scheme_number": "DPIIT/2016/STANDUPINDIA",
                "category": GrantCategory.WOMEN,
                "ministry": Ministry.MSME,
                "level": GrantLevel.CENTRAL,
                "min_amount": 1000000,
                "max_amount": 10000000,
                "amount_display": "₹10 Lakhs - ₹1 Crore",
                "description": "Loans for SC/ST and Women entrepreneurs for greenfield enterprises in manufacturing, services or trading sector.",
                "description_hindi": "विनिर्माण, सेवा या व्यापार क्षेत्र में ग्रीनफील्ड उद्यमों के लिए एससी/एसटी और महिला उद्यमियों के लिए ऋण।",
                "objective": "To facilitate bank loans for setting up greenfield enterprises by SC/ST and Women entrepreneurs",
                "benefits": [
                    "Loan between ₹10 lakhs to ₹1 crore",
                    "Preferential interest rates",
                    "Handholding support",
                    "Credit guarantee coverage"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup", "msme"],
                    "owner": "SC/ST or Women",
                    "category": "SC/ST/Women",
                    "age": "Above 18 years"
                },
                "eligibility_summary": "SC/ST or Women entrepreneurs for new enterprises",
                "required_documents": [
                    "Caste Certificate (for SC/ST)",
                    "Identity Proof",
                    "Business Plan",
                    "Project Report",
                    "Bank Account Details"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=180),
                "official_website": "https://www.standupmitra.in/",
                "tags": ["women", "scst", "greenfield", "loan"],
                "priority": 10
            },
            
            # SC/ST Grants
            {
                "name": "National Scheduled Castes Finance and Development Corporation (NSFDC) Schemes",
                "name_hindi": "राष्ट्रीय अनुसूचित जाति वित्त और विकास निगम योजनाएं",
                "scheme_number": "NSFDC/2020/LOAN",
                "category": GrantCategory.SCST,
                "ministry": Ministry.SOCIAL_JUSTICE,
                "level": GrantLevel.CENTRAL,
                "min_amount": 500000,
                "max_amount": 2000000,
                "amount_display": "₹5-20 Lakhs",
                "description": "Concessional loans to SC entrepreneurs for income generating activities.",
                "description_hindi": "आय सृजन गतिविधियों के लिए एससी उद्यमियों को रियायती ऋण।",
                "objective": "To provide financial assistance to SC entrepreneurs for economic development",
                "benefits": [
                    "Concessional interest rates (4-6%)",
                    "Loan up to ₹20 lakhs",
                    "Skill development training",
                    "Marketing assistance"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup", "msme"],
                    "category": "Scheduled Caste",
                    "income": "Annual income below ₹3 lakhs"
                },
                "eligibility_summary": "SC entrepreneurs with annual income below ₹3 lakhs",
                "required_documents": [
                    "Caste Certificate",
                    "Income Certificate",
                    "Business Plan",
                    "Identity Proof",
                    "Bank Account Details"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=150),
                "official_website": "https://www.nsfdc.nic.in/",
                "tags": ["scst", "concessional", "loan"],
                "priority": 9
            },
            
            # Export Grants
            {
                "name": "Market Development Assistance (MDA) Scheme",
                "name_hindi": "बाजार विकास सहायता योजना",
                "scheme_number": "COMMERCE/2021/MDA",
                "category": GrantCategory.EXPORT,
                "ministry": Ministry.COMMERCE,
                "level": GrantLevel.CENTRAL,
                "min_amount": 200000,
                "max_amount": 500000,
                "amount_display": "₹2-5 Lakhs",
                "description": "Financial assistance for export promotion activities including trade fairs, buyer-seller meets, and market studies.",
                "objective": "To promote Indian exports through market development activities",
                "benefits": [
                    "Subsidy for trade fair participation",
                    "Market study assistance",
                    "Buyer-seller meet support",
                    "Export documentation help"
                ],
                "eligibility_criteria": {
                    "business_type": ["msme", "export"],
                    "registration": "IEC (Import Export Code)",
                    "sector": "Export-oriented"
                },
                "eligibility_summary": "Export-oriented businesses with IEC",
                "required_documents": [
                    "IEC Certificate",
                    "Export Performance",
                    "Business Registration",
                    "GST Registration"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=60),
                "tags": ["export", "trade", "international"],
                "priority": 7
            },
            
            # Technology Grants
            {
                "name": "Software Technology Parks of India (STPI) Scheme",
                "name_hindi": "सॉफ्टवेयर प्रौद्योगिकी पार्क योजना",
                "scheme_number": "MEITY/2020/STPI",
                "category": GrantCategory.TECHNOLOGY,
                "ministry": Ministry.MEITY,
                "level": GrantLevel.CENTRAL,
                "min_amount": 1000000,
                "max_amount": 2500000,
                "amount_display": "₹10-25 Lakhs",
                "description": "Support for IT/ITES companies for infrastructure and technology development.",
                "objective": "To promote software exports and IT industry development",
                "benefits": [
                    "Infrastructure support",
                    "Tax benefits",
                    "High-speed internet connectivity",
                    "Incubation facilities"
                ],
                "eligibility_criteria": {
                    "business_type": ["technology", "startup"],
                    "sector": "IT/ITES/Software"
                },
                "eligibility_summary": "IT/ITES companies and software startups",
                "required_documents": [
                    "Company Registration",
                    "Business Plan",
                    "Technical Proposal",
                    "Team Details"
                ],
                "status": GrantStatus.OPEN,
                "application_end_date": datetime.now() + timedelta(days=100),
                "official_website": "https://www.stpi.in/",
                "tags": ["technology", "software", "it"],
                "priority": 8
            },
            
            # Upcoming Grant
            {
                "name": "Digital India Innovation Fund",
                "name_hindi": "डिजिटल इंडिया इनोवेशन फंड",
                "scheme_number": "MEITY/2026/DIIF",
                "category": GrantCategory.TECHNOLOGY,
                "ministry": Ministry.MEITY,
                "level": GrantLevel.CENTRAL,
                "min_amount": 2000000,
                "max_amount": 5000000,
                "amount_display": "₹20-50 Lakhs",
                "description": "Funding for innovative digital solutions in governance, healthcare, education and agriculture.",
                "objective": "To promote digital innovation for social impact",
                "benefits": [
                    "Grant up to ₹50 lakhs",
                    "Mentorship from industry leaders",
                    "Government partnership opportunities",
                    "Pilot project support"
                ],
                "eligibility_criteria": {
                    "business_type": ["startup", "technology"],
                    "sector": "Digital Innovation"
                },
                "eligibility_summary": "Tech startups with innovative digital solutions",
                "required_documents": [
                    "Innovation Proposal",
                    "Prototype/Demo",
                    "Impact Assessment",
                    "Budget Plan"
                ],
                "status": GrantStatus.UPCOMING,
                "application_start_date": datetime.now() + timedelta(days=15),
                "application_end_date": datetime.now() + timedelta(days=105),
                "announcement_date": datetime.now() - timedelta(days=5),
                "tags": ["digital", "innovation", "social impact"],
                "priority": 10
            }
        ]
        
        # Add grants to database
        for grant_data in grants_data:
            grant = Grant(**grant_data)
            db.add(grant)
        
        db.commit()
        print(f"✓ Successfully seeded {len(grants_data)} government grants")
        
    except Exception as e:
        print(f"✗ Error seeding grants: {str(e)}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_grants()
