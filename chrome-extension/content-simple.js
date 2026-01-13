// Simple DGVCL Auto-Fill Extension
console.log('🚀 DGVCL Auto-Fill Extension Started');

// Wait for page to load
window.addEventListener('load', function() {
  console.log('📄 Page loaded, checking URL...');
  
  // Check if we're on DGVCL portal
  if (window.location.hostname === 'portal.guvnl.in') {
    console.log('✅ On DGVCL portal');
    
    // Get data from URL
    const urlParams = new URLSearchParams(window.location.search);
    const mobile = urlParams.get('mobile');
    const discom = urlParams.get('discom');
    
    console.log('📦 URL Data:', { mobile, discom });
    
    if (mobile && discom) {
      console.log('✅ Data found, waiting 2 seconds for page elements...');
      
      // Wait 2 seconds for page to fully load
      setTimeout(function() {
        
        // STEP 1: Find Mobile field by placeholder "Mobile No"
        console.log('🔍 Looking for Mobile No field...');
        
        let mobileField = null;
        const allInputs = document.querySelectorAll('input');
        
        for (let i = 0; i < allInputs.length; i++) {
          const input = allInputs[i];
          const placeholder = input.placeholder || '';
          
          console.log('Checking input ' + i + ': placeholder="' + placeholder + '"');
          
          // Look for "Mobile No" placeholder specifically
          if (placeholder === 'Mobile No' || placeholder.toLowerCase() === 'mobile no') {
            mobileField = input;
            console.log('✅ Found Mobile No field at index ' + i);
            break;
          }
        }
        
        // Fill mobile field
        if (mobileField) {
          mobileField.focus();
          mobileField.value = mobile;
          mobileField.dispatchEvent(new Event('input', { bubbles: true }));
          mobileField.dispatchEvent(new Event('change', { bubbles: true }));
          mobileField.style.backgroundColor = '#90EE90';
          console.log('✅ Filled Mobile No:', mobile);
          
          setTimeout(function() {
            mobileField.style.backgroundColor = '';
          }, 3000);
        } else {
          console.error('❌ Mobile No field not found!');
        }
        
        // STEP 2: Find DISCOM dropdown
        console.log('🔍 Looking for DISCOM dropdown...');
        const discomDropdown = document.querySelector('select');
        
        if (discomDropdown) {
          const options = discomDropdown.options;
          for (let i = 0; i < options.length; i++) {
            if (options[i].text.includes(discom) || options[i].value.includes(discom)) {
              discomDropdown.selectedIndex = i;
              discomDropdown.dispatchEvent(new Event('change', { bubbles: true }));
              discomDropdown.style.backgroundColor = '#90EE90';
              console.log('✅ Selected DISCOM:', discom);
              
              setTimeout(function() {
                discomDropdown.style.backgroundColor = '';
              }, 3000);
              break;
            }
          }
        }
        
        // Show success notification
        const notification = document.createElement('div');
        notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:15px 25px;border-radius:10px;font-size:16px;z-index:999999;box-shadow:0 4px 20px rgba(0,0,0,0.3);';
        notification.textContent = '✅ Auto-filled: ' + mobile + ' / ' + discom;
        document.body.appendChild(notification);
        
        setTimeout(function() {
          notification.remove();
        }, 5000);
        
      }, 2000);
    }
  }
});

console.log('✅ Extension script loaded');
