from fastapi import APIRouter, Depends, HTTPException, Form, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import (
    DemoTorrentApplication, 
    DemoAdaniGasApplication, 
    DemoAmcWaterApplication, 
    DemoAnyrorApplication
)
import random
import string
from datetime import datetime

router = APIRouter(prefix="/demo-govt", tags=["Demo Government"])

def generate_confirmation_number(prefix="TP"):
    """Generate fake confirmation number like TP2024001234"""
    return f"{prefix}{datetime.now().year}{random.randint(100000, 999999)}"

@router.get("/torrent-power", response_class=HTMLResponse)
def demo_torrent_power_form():
    """Demo Torrent Power website form with RPA auto-fill animation"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Torrent Power - Name Change Application</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                min-height: 100vh;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #ff6600;
            }
            .logo {
                color: #1e3c72;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .form-group {
                margin-bottom: 20px;
                position: relative;
            }
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
            }
            input, select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
            .submit-btn {
                background: linear-gradient(135deg, #ff6600 0%, #ff8533 100%);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
                margin-top: 20px;
            }
            .required {
                color: red;
            }
            .rpa-highlight {
                border: 3px solid #00ff00 !important;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5) !important;
                animation: pulse 1s infinite;
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
                50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
                100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
            }
            .rpa-status {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #007bff;
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                display: none;
            }
            .typing-animation {
                animation: typing 0.5s ease-in-out;
            }
            @keyframes typing {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        </style>
    </head>
    <body>
        <div class="rpa-status" id="rpaStatus">🤖 RPA Bot is filling form...</div>
        
        <div class="container">
            <div class="header">
                <div class="logo">⚡ TORRENT POWER</div>
                <div>Name Change Application Portal</div>
            </div>
            
            <form action="/demo-govt/torrent-power/submit" method="POST" id="applicationForm">
                <div class="form-group">
                    <label for="city">City <span class="required">*</span></label>
                    <select name="city" id="city" required>
                        <option value="">Select City</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Surat">Surat</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="serviceNumber">Service Number <span class="required">*</span></label>
                    <input type="text" name="serviceNumber" id="serviceNumber" 
                           placeholder="Enter your Service Number" required>
                </div>
                
                <div class="form-group">
                    <label for="tNo">T No <span class="required">*</span></label>
                    <input type="text" name="tNo" id="tNo" 
                           placeholder="Enter your T No" required>
                </div>
                
                <div class="form-group">
                    <label for="applicantName">Applicant Name <span class="required">*</span></label>
                    <input type="text" name="applicantName" id="applicantName" 
                           placeholder="Enter Full Name" required>
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile Number <span class="required">*</span></label>
                    <input type="tel" name="mobile" id="mobile" 
                           placeholder="Enter 10-digit Mobile Number" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" id="email" 
                           placeholder="Enter Email Address">
                </div>
                
                <div class="form-group">
                    <label for="applicationType">Application Type <span class="required">*</span></label>
                    <select name="applicationType" id="applicationType" required>
                        <option value="">Select Application Type</option>
                        <option value="name_change">Name Change</option>
                        <option value="address_change">Address Change</option>
                        <option value="mobile_update">Mobile Number Update</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn" id="submitBtn">
                    🚀 Submit Application
                </button>
            </form>
        </div>

        <script>
            // Check if we're in RPA mode (called from iframe)
            const urlParams = new URLSearchParams(window.location.search);
            const isRpaMode = urlParams.get('rpa') === 'true';
            const formDataParam = urlParams.get('data');
            
            if (isRpaMode && formDataParam) {
                // Parse form data from URL parameter
                try {
                    const parsedData = JSON.parse(decodeURIComponent(formDataParam));
                    setTimeout(() => startRpaAutoFill(parsedData), 1000);
                } catch (e) {
                    console.error('Failed to parse form data:', e);
                    // Fallback to sample data
                    setTimeout(() => startRpaAutoFill(null), 1000);
                }
            }

            function startRpaAutoFill(userData) {
                const rpaStatus = document.getElementById('rpaStatus');
                rpaStatus.style.display = 'block';
                
                // Use provided data or fallback to sample data
                const formData = userData || {
                    city: 'Ahmedabad',
                    serviceNumber: 'TP123456789',
                    tNo: 'T12345',
                    applicantName: 'John Doe',
                    mobile: '9876543210',
                    email: 'john@example.com',
                    applicationType: 'name_change'
                };

                // Map portal field names to form field names
                const fieldMapping = {
                    city: formData.city || 'Ahmedabad',
                    serviceNumber: formData.service_number || formData.serviceNumber || 'TP123456789',
                    tNo: formData.t_no || formData.tNo || 'T12345',
                    applicantName: formData.applicant_name || formData.applicantName || 'John Doe',
                    mobile: formData.mobile || '9876543210',
                    email: formData.email || 'john@example.com',
                    applicationType: formData.application_type || formData.applicationType || 'name_change'
                };

                // Step-by-step auto-fill with animation
                const steps = [
                    { field: 'city', delay: 1000, message: 'Selecting City...' },
                    { field: 'serviceNumber', delay: 2000, message: 'Filling Service Number...' },
                    { field: 'tNo', delay: 3000, message: 'Filling T Number...' },
                    { field: 'applicantName', delay: 4000, message: 'Filling Name...' },
                    { field: 'mobile', delay: 5000, message: 'Filling Mobile...' },
                    { field: 'email', delay: 6000, message: 'Filling Email...' },
                    { field: 'applicationType', delay: 7000, message: 'Selecting Application Type...' },
                    { field: 'submit', delay: 8000, message: 'Submitting Form...' }
                ];

                steps.forEach(step => {
                    setTimeout(() => {
                        rpaStatus.textContent = `🤖 ${step.message}`;
                        
                        if (step.field === 'submit') {
                            // Highlight submit button and submit
                            const submitBtn = document.getElementById('submitBtn');
                            submitBtn.classList.add('rpa-highlight');
                            setTimeout(() => {
                                document.getElementById('applicationForm').submit();
                            }, 1000);
                        } else {
                            // Fill and highlight field
                            const field = document.getElementById(step.field);
                            field.classList.add('rpa-highlight');
                            
                            if (field.tagName === 'SELECT') {
                                field.value = fieldMapping[step.field];
                            } else {
                                // Simulate typing
                                field.classList.add('typing-animation');
                                typeText(field, fieldMapping[step.field]);
                            }
                            
                            // Remove highlight after 1 second
                            setTimeout(() => {
                                field.classList.remove('rpa-highlight', 'typing-animation');
                            }, 1000);
                        }
                    }, step.delay);
                });
            }

            function typeText(element, text) {
                element.value = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    element.value += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        </script>
    </body>
    </html>
    """

@router.post("/torrent-power/submit")
def submit_torrent_application(
    city: str = Form(...),
    serviceNumber: str = Form(...),
    tNo: str = Form(...),
    applicantName: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(None),
    applicationType: str = Form(...),
    db: Session = Depends(get_db)
):
    """Process demo Torrent Power application submission"""
    
    # Generate confirmation number
    confirmation_number = generate_confirmation_number("TP")
    
    # Save to demo database
    demo_app = DemoTorrentApplication(
        confirmation_number=confirmation_number,
        service_number=serviceNumber,
        t_no=tNo,
        applicant_name=applicantName,
        mobile=mobile,
        email=email,
        application_type=applicationType,
        processing_notes=f"Application received for {applicationType} in {city}"
    )
    
    db.add(demo_app)
    db.commit()
    db.refresh(demo_app)
    
    # Return success page
    return HTMLResponse(f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application Submitted - Torrent Power</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                min-height: 100vh;
            }}
            .container {{
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                text-align: center;
            }}
            .success-icon {{
                font-size: 64px;
                color: #28a745;
                margin-bottom: 20px;
            }}
            .confirmation {{
                background: #d4edda;
                border: 1px solid #c3e6cb;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }}
            .conf-number {{
                font-size: 24px;
                font-weight: bold;
                color: #155724;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>Application Submitted Successfully!</h1>
            
            <div class="confirmation">
                <p><strong>Your Confirmation Number:</strong></p>
                <div class="conf-number">{confirmation_number}</div>
                <p><small>Please save this number for future reference</small></p>
            </div>
            
            <p>📧 A confirmation SMS/Email will be sent to your registered mobile/email.</p>
            <p>⏱️ Processing Time: 3-5 working days</p>
        </div>
    </body>
    </html>
    """)

# ==================== ADANI GAS DEMO SITE ====================

@router.get("/adani-gas", response_class=HTMLResponse)
def demo_adani_gas_form():
    """Demo Adani Gas website form with RPA auto-fill animation"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Adani Total Gas - Service Application</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
                min-height: 100vh;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #d32f2f;
            }
            .logo {
                color: #d32f2f;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .form-group {
                margin-bottom: 20px;
                position: relative;
            }
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
            }
            input, select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
            .submit-btn {
                background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
                margin-top: 20px;
            }
            .required {
                color: red;
            }
            .rpa-highlight {
                border: 3px solid #00ff00 !important;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5) !important;
                animation: pulse 1s infinite;
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
                50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
                100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
            }
            .rpa-status {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #007bff;
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                display: none;
            }
            .typing-animation {
                animation: typing 0.5s ease-in-out;
            }
            @keyframes typing {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        </style>
    </head>
    <body>
        <div class="rpa-status" id="rpaStatus">🤖 RPA Bot is filling form...</div>
        
        <div class="container">
            <div class="header">
                <div class="logo">🔥 ADANI TOTAL GAS</div>
                <div>PNG Service Application Portal</div>
            </div>
            
            <form action="/demo-govt/adani-gas/submit" method="POST" id="applicationForm">
                <div class="form-group">
                    <label for="city">City <span class="required">*</span></label>
                    <select name="city" id="city" required>
                        <option value="">Select City</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Surat">Surat</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="consumerNumber">Consumer Number</label>
                    <input type="text" name="consumerNumber" id="consumerNumber" 
                           placeholder="Enter Consumer Number (if existing customer)">
                </div>
                
                <div class="form-group">
                    <label for="bpNumber">BP Number</label>
                    <input type="text" name="bpNumber" id="bpNumber" 
                           placeholder="Enter BP Number (if available)">
                </div>
                
                <div class="form-group">
                    <label for="applicantName">Applicant Name <span class="required">*</span></label>
                    <input type="text" name="applicantName" id="applicantName" 
                           placeholder="Enter Full Name" required>
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile Number <span class="required">*</span></label>
                    <input type="tel" name="mobile" id="mobile" 
                           placeholder="Enter 10-digit Mobile Number" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" id="email" 
                           placeholder="Enter Email Address">
                </div>
                
                <div class="form-group">
                    <label for="applicationType">Application Type <span class="required">*</span></label>
                    <select name="applicationType" id="applicationType" required>
                        <option value="">Select Application Type</option>
                        <option value="name_change">Name Change</option>
                        <option value="new_connection">New PNG Connection</option>
                        <option value="cylinder_booking">Cylinder Booking</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn" id="submitBtn">
                    🚀 Submit Application
                </button>
            </form>
        </div>

        <script>
            // Check if we're in RPA mode (called from iframe)
            const urlParams = new URLSearchParams(window.location.search);
            const isRpaMode = urlParams.get('rpa') === 'true';
            const formDataParam = urlParams.get('data');
            
            if (isRpaMode && formDataParam) {
                // Parse form data from URL parameter
                try {
                    const parsedData = JSON.parse(decodeURIComponent(formDataParam));
                    setTimeout(() => startRpaAutoFill(parsedData), 1000);
                } catch (e) {
                    console.error('Failed to parse form data:', e);
                    // Fallback to sample data
                    setTimeout(() => startRpaAutoFill(null), 1000);
                }
            }

            function startRpaAutoFill(userData) {
                const rpaStatus = document.getElementById('rpaStatus');
                rpaStatus.style.display = 'block';
                
                // Use provided data or fallback to sample data
                const formData = userData || {
                    city: 'Ahmedabad',
                    consumerNumber: 'AG123456789',
                    bpNumber: 'BP987654321',
                    applicantName: 'John Doe',
                    mobile: '9876543210',
                    email: 'john@example.com',
                    applicationType: 'name_change'
                };

                // Map portal field names to form field names
                const fieldMapping = {
                    city: formData.city || 'Ahmedabad',
                    consumerNumber: formData.consumer_number || formData.consumerNumber || 'AG123456789',
                    bpNumber: formData.bp_number || formData.bpNumber || 'BP987654321',
                    applicantName: formData.applicant_name || formData.applicantName || 'John Doe',
                    mobile: formData.mobile || '9876543210',
                    email: formData.email || 'john@example.com',
                    applicationType: formData.application_type || formData.applicationType || 'name_change'
                };

                // Step-by-step auto-fill with animation
                const steps = [
                    { field: 'city', delay: 1000, message: 'Selecting City...' },
                    { field: 'consumerNumber', delay: 2000, message: 'Filling Consumer Number...' },
                    { field: 'bpNumber', delay: 3000, message: 'Filling BP Number...' },
                    { field: 'applicantName', delay: 4000, message: 'Filling Name...' },
                    { field: 'mobile', delay: 5000, message: 'Filling Mobile...' },
                    { field: 'email', delay: 6000, message: 'Filling Email...' },
                    { field: 'applicationType', delay: 7000, message: 'Selecting Application Type...' },
                    { field: 'submit', delay: 8000, message: 'Submitting Form...' }
                ];

                steps.forEach(step => {
                    setTimeout(() => {
                        rpaStatus.textContent = `🤖 ${step.message}`;
                        
                        if (step.field === 'submit') {
                            // Highlight submit button and submit
                            const submitBtn = document.getElementById('submitBtn');
                            submitBtn.classList.add('rpa-highlight');
                            setTimeout(() => {
                                document.getElementById('applicationForm').submit();
                            }, 1000);
                        } else {
                            // Fill and highlight field
                            const field = document.getElementById(step.field);
                            field.classList.add('rpa-highlight');
                            
                            if (field.tagName === 'SELECT') {
                                field.value = fieldMapping[step.field];
                            } else {
                                // Simulate typing
                                field.classList.add('typing-animation');
                                typeText(field, fieldMapping[step.field]);
                            }
                            
                            // Remove highlight after 1 second
                            setTimeout(() => {
                                field.classList.remove('rpa-highlight', 'typing-animation');
                            }, 1000);
                        }
                    }, step.delay);
                });
            }

            function typeText(element, text) {
                element.value = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    element.value += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        </script>
    </body>
    </html>
    """

@router.post("/adani-gas/submit")
def submit_adani_gas_application(
    city: str = Form(...),
    consumerNumber: str = Form(None),
    bpNumber: str = Form(None),
    applicantName: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(None),
    applicationType: str = Form(...),
    db: Session = Depends(get_db)
):
    """Process demo Adani Gas application submission"""
    
    # Generate confirmation number
    confirmation_number = generate_confirmation_number("AG")
    
    # Save to demo database
    demo_app = DemoAdaniGasApplication(
        confirmation_number=confirmation_number,
        consumer_number=consumerNumber,
        bp_number=bpNumber,
        applicant_name=applicantName,
        mobile=mobile,
        email=email,
        application_type=applicationType,
        processing_notes=f"Application received for {applicationType} in {city}"
    )
    
    db.add(demo_app)
    db.commit()
    db.refresh(demo_app)
    
    # Return success page
    return HTMLResponse(f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application Submitted - Adani Total Gas</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
                min-height: 100vh;
            }}
            .container {{
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                text-align: center;
            }}
            .success-icon {{
                font-size: 64px;
                color: #28a745;
                margin-bottom: 20px;
            }}
            .confirmation {{
                background: #d4edda;
                border: 1px solid #c3e6cb;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }}
            .conf-number {{
                font-size: 24px;
                font-weight: bold;
                color: #155724;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>Application Submitted Successfully!</h1>
            
            <div class="confirmation">
                <p><strong>Your Confirmation Number:</strong></p>
                <div class="conf-number">{confirmation_number}</div>
                <p><small>Please save this number for future reference</small></p>
            </div>
            
            <p>📧 A confirmation SMS/Email will be sent to your registered mobile/email.</p>
            <p>⏱️ Processing Time: 5-7 working days</p>
        </div>
    </body>
    </html>
    """)

# ==================== AMC WATER DEMO SITE ====================

@router.get("/amc-water", response_class=HTMLResponse)
def demo_amc_water_form():
    """Demo AMC Water website form with RPA auto-fill animation"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>AMC Water - Service Application</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #0277bd 0%, #03a9f4 100%);
                min-height: 100vh;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #0277bd;
            }
            .logo {
                color: #0277bd;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .form-group {
                margin-bottom: 20px;
                position: relative;
            }
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
            }
            input, select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
            .submit-btn {
                background: linear-gradient(135deg, #0277bd 0%, #03a9f4 100%);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
                margin-top: 20px;
            }
            .required {
                color: red;
            }
            .rpa-highlight {
                border: 3px solid #00ff00 !important;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5) !important;
                animation: pulse 1s infinite;
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
                50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
                100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
            }
            .rpa-status {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #007bff;
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                display: none;
            }
            .typing-animation {
                animation: typing 0.5s ease-in-out;
            }
            @keyframes typing {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        </style>
    </head>
    <body>
        <div class="rpa-status" id="rpaStatus">🤖 RPA Bot is filling form...</div>
        
        <div class="container">
            <div class="header">
                <div class="logo">💧 AMC WATER SUPPLY</div>
                <div>Ahmedabad Municipal Corporation</div>
            </div>
            
            <form action="/demo-govt/amc-water/submit" method="POST" id="applicationForm">
                <div class="form-group">
                    <label for="zone">Zone/Ward <span class="required">*</span></label>
                    <select name="zone" id="zone" required>
                        <option value="">Select Zone</option>
                        <option value="East Zone">East Zone</option>
                        <option value="West Zone">West Zone</option>
                        <option value="North Zone">North Zone</option>
                        <option value="South Zone">South Zone</option>
                        <option value="Central Zone">Central Zone</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="connectionId">Connection ID</label>
                    <input type="text" name="connectionId" id="connectionId" 
                           placeholder="Enter Connection ID (if existing customer)">
                </div>
                
                <div class="form-group">
                    <label for="applicantName">Applicant Name <span class="required">*</span></label>
                    <input type="text" name="applicantName" id="applicantName" 
                           placeholder="Enter Full Name" required>
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile Number <span class="required">*</span></label>
                    <input type="tel" name="mobile" id="mobile" 
                           placeholder="Enter 10-digit Mobile Number" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" id="email" 
                           placeholder="Enter Email Address">
                </div>
                
                <div class="form-group">
                    <label for="applicationType">Application Type <span class="required">*</span></label>
                    <select name="applicationType" id="applicationType" required>
                        <option value="">Select Application Type</option>
                        <option value="name_change">Name Change</option>
                        <option value="new_connection">New Water Connection</option>
                        <option value="complaint">Water Supply Complaint</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn" id="submitBtn">
                    🚀 Submit Application
                </button>
            </form>
        </div>

        <script>
            // Check if we're in RPA mode (called from iframe)
            const urlParams = new URLSearchParams(window.location.search);
            const isRpaMode = urlParams.get('rpa') === 'true';
            const formDataParam = urlParams.get('data');
            
            if (isRpaMode && formDataParam) {
                // Parse form data from URL parameter
                try {
                    const parsedData = JSON.parse(decodeURIComponent(formDataParam));
                    setTimeout(() => startRpaAutoFill(parsedData), 1000);
                } catch (e) {
                    console.error('Failed to parse form data:', e);
                    // Fallback to sample data
                    setTimeout(() => startRpaAutoFill(null), 1000);
                }
            }

            function startRpaAutoFill(userData) {
                const rpaStatus = document.getElementById('rpaStatus');
                rpaStatus.style.display = 'block';
                
                // Use provided data or fallback to sample data
                const formData = userData || {
                    zone: 'Central Zone',
                    connectionId: 'AMC123456',
                    applicantName: 'John Doe',
                    mobile: '9876543210',
                    email: 'john@example.com',
                    applicationType: 'name_change'
                };

                // Map portal field names to form field names
                const fieldMapping = {
                    zone: formData.zone || 'Central Zone',
                    connectionId: formData.connection_id || formData.connectionId || 'AMC123456',
                    applicantName: formData.applicant_name || formData.applicantName || 'John Doe',
                    mobile: formData.mobile || '9876543210',
                    email: formData.email || 'john@example.com',
                    applicationType: formData.application_type || formData.applicationType || 'name_change'
                };

                // Step-by-step auto-fill with animation
                const steps = [
                    { field: 'zone', delay: 1000, message: 'Selecting Zone...' },
                    { field: 'connectionId', delay: 2000, message: 'Filling Connection ID...' },
                    { field: 'applicantName', delay: 3000, message: 'Filling Name...' },
                    { field: 'mobile', delay: 4000, message: 'Filling Mobile...' },
                    { field: 'email', delay: 5000, message: 'Filling Email...' },
                    { field: 'applicationType', delay: 6000, message: 'Selecting Application Type...' },
                    { field: 'submit', delay: 7000, message: 'Submitting Form...' }
                ];

                steps.forEach(step => {
                    setTimeout(() => {
                        rpaStatus.textContent = `🤖 ${step.message}`;
                        
                        if (step.field === 'submit') {
                            // Highlight submit button and submit
                            const submitBtn = document.getElementById('submitBtn');
                            submitBtn.classList.add('rpa-highlight');
                            setTimeout(() => {
                                document.getElementById('applicationForm').submit();
                            }, 1000);
                        } else {
                            // Fill and highlight field
                            const field = document.getElementById(step.field);
                            field.classList.add('rpa-highlight');
                            
                            if (field.tagName === 'SELECT') {
                                field.value = fieldMapping[step.field];
                            } else {
                                // Simulate typing
                                field.classList.add('typing-animation');
                                typeText(field, fieldMapping[step.field]);
                            }
                            
                            // Remove highlight after 1 second
                            setTimeout(() => {
                                field.classList.remove('rpa-highlight', 'typing-animation');
                            }, 1000);
                        }
                    }, step.delay);
                });
            }

            function typeText(element, text) {
                element.value = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    element.value += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        </script>
    </body>
    </html>
    """

@router.post("/amc-water/submit")
def submit_amc_water_application(
    zone: str = Form(...),
    connectionId: str = Form(None),
    applicantName: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(None),
    applicationType: str = Form(...),
    db: Session = Depends(get_db)
):
    """Process demo AMC Water application submission"""
    
    # Generate confirmation number
    confirmation_number = generate_confirmation_number("AMC")
    
    # Save to demo database
    demo_app = DemoAmcWaterApplication(
        confirmation_number=confirmation_number,
        connection_id=connectionId,
        zone=zone,
        applicant_name=applicantName,
        mobile=mobile,
        email=email,
        application_type=applicationType,
        processing_notes=f"Application received for {applicationType} in {zone}"
    )
    
    db.add(demo_app)
    db.commit()
    db.refresh(demo_app)
    
    # Return success page
    return HTMLResponse(f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application Submitted - AMC Water</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #0277bd 0%, #03a9f4 100%);
                min-height: 100vh;
            }}
            .container {{
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                text-align: center;
            }}
            .success-icon {{
                font-size: 64px;
                color: #28a745;
                margin-bottom: 20px;
            }}
            .confirmation {{
                background: #d4edda;
                border: 1px solid #c3e6cb;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }}
            .conf-number {{
                font-size: 24px;
                font-weight: bold;
                color: #155724;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>Application Submitted Successfully!</h1>
            
            <div class="confirmation">
                <p><strong>Your Confirmation Number:</strong></p>
                <div class="conf-number">{confirmation_number}</div>
                <p><small>Please save this number for future reference</small></p>
            </div>
            
            <p>📧 A confirmation SMS/Email will be sent to your registered mobile/email.</p>
            <p>⏱️ Processing Time: 3-7 working days</p>
        </div>
    </body>
    </html>
    """)
# ==================== ANYROR GUJARAT DEMO SITE ====================

@router.get("/anyror-gujarat", response_class=HTMLResponse)
def demo_anyror_gujarat_form():
    """Demo AnyRoR Gujarat website form with RPA auto-fill animation"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>AnyRoR Gujarat - Property Services</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                min-height: 100vh;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 3px solid #2e7d32;
            }
            .logo {
                color: #2e7d32;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .form-group {
                margin-bottom: 20px;
                position: relative;
            }
            label {
                display: block;
                margin-bottom: 8px;
                font-weight: bold;
                color: #333;
            }
            input, select {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 16px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
            .submit-btn {
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                color: white;
                padding: 15px 30px;
                border: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                width: 100%;
                margin-top: 20px;
            }
            .required {
                color: red;
            }
            .rpa-highlight {
                border: 3px solid #00ff00 !important;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5) !important;
                animation: pulse 1s infinite;
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
                50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
                100% { box-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
            }
            .rpa-status {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #007bff;
                color: white;
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                display: none;
            }
            .typing-animation {
                animation: typing 0.5s ease-in-out;
            }
            @keyframes typing {
                0% { opacity: 0.5; }
                50% { opacity: 1; }
                100% { opacity: 0.5; }
            }
        </style>
    </head>
    <body>
        <div class="rpa-status" id="rpaStatus">🤖 RPA Bot is filling form...</div>
        
        <div class="container">
            <div class="header">
                <div class="logo">🏠 AnyRoR GUJARAT</div>
                <div>Revenue Department - Property Services</div>
            </div>
            
            <form action="/demo-govt/anyror-gujarat/submit" method="POST" id="applicationForm">
                <div class="form-group">
                    <label for="district">District <span class="required">*</span></label>
                    <select name="district" id="district" required>
                        <option value="">Select District</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Surat">Surat</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Rajkot">Rajkot</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="surveyNumber">Survey Number <span class="required">*</span></label>
                    <input type="text" name="surveyNumber" id="surveyNumber" 
                           placeholder="Enter Survey Number" required>
                </div>
                
                <div class="form-group">
                    <label for="propertyId">Property ID</label>
                    <input type="text" name="propertyId" id="propertyId" 
                           placeholder="Enter Property ID (if available)">
                </div>
                
                <div class="form-group">
                    <label for="applicantName">Applicant Name <span class="required">*</span></label>
                    <input type="text" name="applicantName" id="applicantName" 
                           placeholder="Enter Full Name" required>
                </div>
                
                <div class="form-group">
                    <label for="mobile">Mobile Number <span class="required">*</span></label>
                    <input type="tel" name="mobile" id="mobile" 
                           placeholder="Enter 10-digit Mobile Number" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" id="email" 
                           placeholder="Enter Email Address">
                </div>
                
                <div class="form-group">
                    <label for="applicationType">Application Type <span class="required">*</span></label>
                    <select name="applicationType" id="applicationType" required>
                        <option value="">Select Application Type</option>
                        <option value="name_transfer">Name Transfer</option>
                        <option value="mutation">Property Mutation</option>
                        <option value="tax_payment">Property Tax Payment</option>
                    </select>
                </div>
                
                <button type="submit" class="submit-btn" id="submitBtn">
                    🚀 Submit Application
                </button>
            </form>
        </div>

        <script>
            // Check if we're in RPA mode (called from iframe)
            const urlParams = new URLSearchParams(window.location.search);
            const isRpaMode = urlParams.get('rpa') === 'true';
            const formDataParam = urlParams.get('data');
            
            if (isRpaMode && formDataParam) {
                // Parse form data from URL parameter
                try {
                    const parsedData = JSON.parse(decodeURIComponent(formDataParam));
                    setTimeout(() => startRpaAutoFill(parsedData), 1000);
                } catch (e) {
                    console.error('Failed to parse form data:', e);
                    // Fallback to sample data
                    setTimeout(() => startRpaAutoFill(null), 1000);
                }
            }

            function startRpaAutoFill(userData) {
                const rpaStatus = document.getElementById('rpaStatus');
                rpaStatus.style.display = 'block';
                
                // Use provided data or fallback to sample data
                const formData = userData || {
                    district: 'Ahmedabad',
                    surveyNumber: '123/1/A',
                    propertyId: 'SD-45',
                    applicantName: 'John Doe',
                    mobile: '9876543210',
                    email: 'john@example.com',
                    applicationType: 'name_transfer'
                };

                // Map portal field names to form field names
                const fieldMapping = {
                    district: formData.city || formData.district || 'Ahmedabad',
                    surveyNumber: formData.survey_number || formData.surveyNumber || '123/1/A',
                    propertyId: formData.subdivision_number || formData.propertyId || 'SD-45',
                    applicantName: formData.applicant_name || formData.applicantName || 'John Doe',
                    mobile: formData.mobile || '9876543210',
                    email: formData.email || 'john@example.com',
                    applicationType: formData.application_type || formData.applicationType || 'name_transfer'
                };

                // Step-by-step auto-fill with animation
                const steps = [
                    { field: 'district', delay: 1000, message: 'Selecting District...' },
                    { field: 'surveyNumber', delay: 2000, message: 'Filling Survey Number...' },
                    { field: 'propertyId', delay: 3000, message: 'Filling Property ID...' },
                    { field: 'applicantName', delay: 4000, message: 'Filling Name...' },
                    { field: 'mobile', delay: 5000, message: 'Filling Mobile...' },
                    { field: 'email', delay: 6000, message: 'Filling Email...' },
                    { field: 'applicationType', delay: 7000, message: 'Selecting Application Type...' },
                    { field: 'submit', delay: 8000, message: 'Submitting Form...' }
                ];

                steps.forEach(step => {
                    setTimeout(() => {
                        rpaStatus.textContent = `🤖 ${step.message}`;
                        
                        if (step.field === 'submit') {
                            // Highlight submit button and submit
                            const submitBtn = document.getElementById('submitBtn');
                            submitBtn.classList.add('rpa-highlight');
                            setTimeout(() => {
                                document.getElementById('applicationForm').submit();
                            }, 1000);
                        } else {
                            // Fill and highlight field
                            const field = document.getElementById(step.field);
                            field.classList.add('rpa-highlight');
                            
                            if (field.tagName === 'SELECT') {
                                field.value = fieldMapping[step.field];
                            } else {
                                // Simulate typing
                                field.classList.add('typing-animation');
                                typeText(field, fieldMapping[step.field]);
                            }
                            
                            // Remove highlight after 1 second
                            setTimeout(() => {
                                field.classList.remove('rpa-highlight', 'typing-animation');
                            }, 1000);
                        }
                    }, step.delay);
                });
            }

            function typeText(element, text) {
                element.value = '';
                let i = 0;
                const typeInterval = setInterval(() => {
                    element.value += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(typeInterval);
                    }
                }, 50);
            }
        </script>
    </body>
    </html>
    """

@router.post("/anyror-gujarat/submit")
def submit_anyror_gujarat_application(
    district: str = Form(...),
    surveyNumber: str = Form(...),
    propertyId: str = Form(None),
    applicantName: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(None),
    applicationType: str = Form(...),
    db: Session = Depends(get_db)
):
    """Process demo AnyRoR Gujarat application submission"""
    
    # Generate confirmation number
    confirmation_number = generate_confirmation_number("ROR")
    
    # Save to demo database
    demo_app = DemoAnyrorApplication(
        confirmation_number=confirmation_number,
        survey_number=surveyNumber,
        property_id=propertyId,
        district=district,
        applicant_name=applicantName,
        mobile=mobile,
        email=email,
        application_type=applicationType,
        processing_notes=f"Application received for {applicationType} in {district}"
    )
    
    db.add(demo_app)
    db.commit()
    db.refresh(demo_app)
    
    # Return success page
    return HTMLResponse(f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Application Submitted - AnyRoR Gujarat</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px;
                background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);
                min-height: 100vh;
            }}
            .container {{
                background: white;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                text-align: center;
            }}
            .success-icon {{
                font-size: 64px;
                color: #28a745;
                margin-bottom: 20px;
            }}
            .confirmation {{
                background: #d4edda;
                border: 1px solid #c3e6cb;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }}
            .conf-number {{
                font-size: 24px;
                font-weight: bold;
                color: #155724;
                margin: 10px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-icon">✅</div>
            <h1>Application Submitted Successfully!</h1>
            
            <div class="confirmation">
                <p><strong>Your Confirmation Number:</strong></p>
                <div class="conf-number">{confirmation_number}</div>
                <p><small>Please save this number for future reference</small></p>
            </div>
            
            <p>📧 A confirmation SMS/Email will be sent to your registered mobile/email.</p>
            <p>⏱️ Processing Time: 15-30 working days</p>
        </div>
    </body>
    </html>
    """)