import re
from typing import Dict, Any
from PIL import Image
import pytesseract
import io

class OCRService:
    """Service for extracting data from documents using OCR"""
    
    @staticmethod
    def extract_text_from_image(image_bytes: bytes) -> str:
        """Extract text from image using Tesseract OCR"""
        try:
            image = Image.open(io.BytesIO(image_bytes))
            # Use both English and Hindi for Indian documents
            text = pytesseract.image_to_string(image, lang='eng+hin')
            return text
        except Exception as e:
            print(f"OCR Error: {e}")
            return ""
    
    @staticmethod
    def extract_aadhaar_data(text: str) -> Dict[str, Any]:
        """Extract data from Aadhaar card text"""
        data = {}
        
        # Extract Aadhaar number (12 digits, may have spaces)
        aadhaar_pattern = r'\b\d{4}\s?\d{4}\s?\d{4}\b'
        match = re.search(aadhaar_pattern, text)
        if match:
            data['aadhaar_number'] = match.group().replace(' ', '')
        
        # Extract Name (usually after "Name" or before DOB)
        name_patterns = [
            r'(?:Name|नाम)[:\s]*([A-Za-z\s]+)',
            r'^([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
        ]
        for pattern in name_patterns:
            match = re.search(pattern, text, re.MULTILINE | re.IGNORECASE)
            if match:
                name = match.group(1).strip()
                if len(name) > 3 and len(name) < 50:
                    data['full_name'] = name
                    break
        
        # Extract DOB
        dob_patterns = [
            r'(?:DOB|Date of Birth|जन्म तिथि)[:\s]*(\d{2}[/-]\d{2}[/-]\d{4})',
            r'(\d{2}[/-]\d{2}[/-]\d{4})',
        ]
        for pattern in dob_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data['date_of_birth'] = match.group(1)
                break
        
        # Extract Gender
        gender_patterns = [
            r'(?:Gender|लिंग)[:\s]*(Male|Female|MALE|FEMALE|पुरुष|महिला)',
            r'\b(Male|Female|MALE|FEMALE)\b'
        ]
        for pattern in gender_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                gender = match.group(1).lower()
                if gender in ['male', 'पुरुष']:
                    data['gender'] = 'Male'
                elif gender in ['female', 'महिला']:
                    data['gender'] = 'Female'
                break
        
        # Extract Address
        address_patterns = [
            r'(?:Address|पता)[:\s]*(.+?)(?=\d{6}|\n\n|$)',
            r'(?:S/O|D/O|W/O|C/O)[:\s]*(.+?)(?=\d{6}|\n\n|$)',
        ]
        for pattern in address_patterns:
            match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
            if match:
                address = match.group(1).strip()
                address = re.sub(r'\s+', ' ', address)
                if len(address) > 10:
                    data['address'] = address[:200]
                    break
        
        # Extract Pincode (6 digits)
        pincode_pattern = r'\b(\d{6})\b'
        matches = re.findall(pincode_pattern, text)
        if matches:
            # Filter valid Gujarat pincodes (36xxxx, 37xxxx, 38xxxx, 39xxxx)
            for pin in matches:
                if pin.startswith(('36', '37', '38', '39')):
                    data['pincode'] = pin
                    break
            if 'pincode' not in data and matches:
                data['pincode'] = matches[-1]
        
        # Extract Father's Name
        father_patterns = [
            r'(?:S/O|Son of|पुत्र)[:\s]*([A-Za-z\s]+)',
            r'(?:Father|पिता)[:\s]*([A-Za-z\s]+)',
        ]
        for pattern in father_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                father_name = match.group(1).strip()
                if len(father_name) > 3:
                    data['father_name'] = father_name
                    break
        
        return data
    
    @staticmethod
    def extract_pan_data(text: str) -> Dict[str, Any]:
        """Extract data from PAN card text"""
        data = {}
        
        # Extract PAN number (AAAAA9999A format)
        pan_pattern = r'\b([A-Z]{5}\d{4}[A-Z])\b'
        match = re.search(pan_pattern, text)
        if match:
            data['pan_number'] = match.group(1)
        
        # Extract Name
        name_pattern = r'(?:Name|नाम)[:\s]*([A-Za-z\s]+)'
        match = re.search(name_pattern, text, re.IGNORECASE)
        if match:
            data['full_name'] = match.group(1).strip()
        
        # Extract Father's Name
        father_pattern = r"(?:Father|पिता)['\s]*(?:s)?[:\s]*(?:Name)?[:\s]*([A-Za-z\s]+)"
        match = re.search(father_pattern, text, re.IGNORECASE)
        if match:
            data['father_name'] = match.group(1).strip()
        
        # Extract DOB
        dob_pattern = r'(\d{2}[/-]\d{2}[/-]\d{4})'
        match = re.search(dob_pattern, text)
        if match:
            data['date_of_birth'] = match.group(1)
        
        return data
    
    @staticmethod
    def extract_electricity_bill_data(text: str) -> Dict[str, Any]:
        """Extract data from electricity bill"""
        data = {}
        
        # Service Number patterns
        service_patterns = [
            r'Service\s*No[.:\s]*(\d+)',
            r'Consumer\s*No[.:\s]*(\d+)',
            r'Account\s*No[.:\s]*(\d+)',
            r'Contract\s*Account[.:\s]*(\d+)',
        ]
        for pattern in service_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data['service_number'] = match.group(1)
                break
        
        # T-No pattern (Torrent Power specific)
        t_no_patterns = [
            r'T[-\s]*No[.:\s]*([A-Z0-9-]+)',
            r'Tariff\s*No[.:\s]*([A-Z0-9-]+)',
        ]
        for pattern in t_no_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data['t_no'] = match.group(1)
                break
        
        # Meter Number
        meter_pattern = r'Meter\s*No[.:\s]*([A-Z0-9]+)'
        match = re.search(meter_pattern, text, re.IGNORECASE)
        if match:
            data['meter_number'] = match.group(1)
        
        return data
    
    @staticmethod
    def extract_gas_bill_data(text: str) -> Dict[str, Any]:
        """Extract data from gas bill"""
        data = {}
        
        # Consumer Number
        consumer_patterns = [
            r'Consumer\s*No[.:\s]*(\d+)',
            r'CA\s*No[.:\s]*(\d+)',
            r'Customer\s*ID[.:\s]*(\d+)',
        ]
        for pattern in consumer_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data['consumer_number'] = match.group(1)
                break
        
        # BP Number (Adani Gas specific)
        bp_pattern = r'BP\s*No[.:\s]*(\d+)'
        match = re.search(bp_pattern, text, re.IGNORECASE)
        if match:
            data['bp_number'] = match.group(1)
        
        return data
    
    @staticmethod
    def extract_property_data(text: str) -> Dict[str, Any]:
        """Extract data from property documents"""
        data = {}
        
        # Survey Number
        survey_patterns = [
            r'Survey\s*No[.:\s]*([A-Z0-9/-]+)',
            r'सर्वे\s*नं[.:\s]*([A-Z0-9/-]+)',
        ]
        for pattern in survey_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                data['survey_number'] = match.group(1)
                break
        
        # Property ID
        prop_id_pattern = r'Property\s*ID[.:\s]*([A-Z0-9-]+)'
        match = re.search(prop_id_pattern, text, re.IGNORECASE)
        if match:
            data['property_id'] = match.group(1)
        
        # Khata Number
        khata_pattern = r'Khata\s*No[.:\s]*([A-Z0-9/-]+)'
        match = re.search(khata_pattern, text, re.IGNORECASE)
        if match:
            data['khata_number'] = match.group(1)
        
        return data

    def process_document(self, image_bytes: bytes, doc_type: str) -> Dict[str, Any]:
        """Process document and extract relevant data"""
        text = self.extract_text_from_image(image_bytes)
        
        if not text:
            return {"error": "Could not extract text from image"}
        
        extractors = {
            "aadhaar": self.extract_aadhaar_data,
            "pan": self.extract_pan_data,
            "electricity_bill": self.extract_electricity_bill_data,
            "gas_bill": self.extract_gas_bill_data,
            "property_doc": self.extract_property_data,
        }
        
        extractor = extractors.get(doc_type)
        if extractor:
            return extractor(text)
        
        return {"raw_text": text}

ocr_service = OCRService()
