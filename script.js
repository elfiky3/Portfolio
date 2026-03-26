// Form validation script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    // Add input event listeners for real-time validation
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('Email');
    const messageInput = document.getElementById('messageInput');
    
    nameInput.addEventListener('input', function() {
        validateName(this);
    });
    
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });
    
    messageInput.addEventListener('input', function() {
        validateMessage(this);
    });
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName(nameInput);
        const isEmailValid = validateEmail(emailInput);
        const isMessageValid = validateMessage(messageInput);
        
        // If all validations pass
        if (isNameValid && isEmailValid && isMessageValid) {
            // Form is valid - you can submit it or show success message
            showSuccessMessage();
            // Uncomment the line below to actually submit the form
            // this.submit();
        }
    });
    
    // Validation functions
    function validateName(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove any existing error message
        removeErrorMessage(input);
        
        if (value === '') {
            isValid = false;
            errorMessage = 'Name is required';
        } else if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        } else if (value.length > 100) {
            isValid = false;
            errorMessage = 'Name must be less than 100 characters';
        } else if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Name should only contain letters and spaces';
        }
        
        if (!isValid) {
            showError(input, errorMessage);
        }
        
        return isValid;
    }
    
    function validateEmail(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove any existing error message
        removeErrorMessage(input);
        
        // Check if email is required and not empty
        if (value === '') {
            isValid = false;
            errorMessage = 'Email is required';
        } 
        // Check email format if not empty
        else {
            const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            
            if (!emailPattern.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address (e.g., name@example.com)';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Email address must be less than 100 characters';
            }
        }
        
        if (!isValid) {
            showError(input, errorMessage);
        }
        
        return isValid;
    }
    
    function validateMessage(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove any existing error message
        removeErrorMessage(input);
        
        if (value === '') {
            isValid = false;
            errorMessage = 'Message is required';
        } else if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        } else if (value.length > 1000) {
            isValid = false;
            errorMessage = 'Message must be less than 1000 characters';
        }
        
        if (!isValid) {
            showError(input, errorMessage);
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.style.display = 'block';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.color = '#dc3545';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${message}`;
        
        // Add error class to input
        input.classList.add('is-invalid');
        
        // Insert error message after the input
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    function removeErrorMessage(input) {
        // Remove error class from input
        input.classList.remove('is-invalid');
        
        // Remove any existing error message
        const errorMessage = input.parentNode.querySelector('.invalid-feedback');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function showSuccessMessage() {
        // Create or get success alert
        let successAlert = document.querySelector('.success-alert');
        
        if (!successAlert) {
            successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success success-alert';
            successAlert.style.marginBottom = '1rem';
            successAlert.style.padding = '0.75rem 1rem';
            successAlert.style.borderRadius = '0.375rem';
            successAlert.style.backgroundColor = '#d4edda';
            successAlert.style.border = '1px solid #c3e6cb';
            successAlert.style.color = '#155724';
            successAlert.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Message sent successfully! We'll get back to you within 24 hours.
            `;
            
            // Insert before the form
            form.parentNode.insertBefore(successAlert, form);
        }
        
        // Scroll to success message
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Clear form after successful submission
        // form.reset();
        
        // Optional: Remove success message after 5 seconds
        setTimeout(() => {
            if (successAlert) {
                successAlert.style.opacity = '0';
                setTimeout(() => {
                    if (successAlert) successAlert.remove();
                }, 300);
            }
        }, 5000);
    }
});

// Add custom CSS for validation styles
const style = document.createElement('style');
style.textContent = `
    .is-invalid {
        border-color: #dc3545 !important;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linecap='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(0.375em + 0.1875rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
    }
    
    .is-invalid:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .btn-send:disabled {
        opacity: 0.65;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);








const text = "  Mohamed Elfiky"
const el = document.getElementById("text")

let index = 0
let isDeleting = false

function typeEffect() {
    if (!isDeleting) {
        el.textContent = text.slice(0, index++)
        if (index > text.length) {
            isDeleting = true
            setTimeout(typeEffect, 2200)
            return
        }
    } else {
        el.textContent = text.slice(0, index--)
        if (index === 0) {
            isDeleting = false
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100)
}

typeEffect()