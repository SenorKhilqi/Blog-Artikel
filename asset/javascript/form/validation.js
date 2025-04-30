$(document).ready(function() {
    // Character counter for message field
    $('#message').on('input', function() {
        let currentLength = $(this).val().length;
        $('#messageCounter').text(currentLength + '/300');
    });

    // Form validation on submit
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Clear previous error messages
        $('.error-message').text('');
        let isValid = true;
        
        // Full Name validation
        const fullName = $('#fullName').val().trim();
        if (fullName === '') {
            $('#fullNameError').text('Nama Lengkap wajib diisi.');
            isValid = false;
        } else if (fullName.length > 50) {
            $('#fullNameError').text('Nama Lengkap maksimal 50 karakter.');
            isValid = false;
        }
        
        // Email validation
        const email = $('#email').val().trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === '') {
            $('#emailError').text('Email wajib diisi.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#emailError').text('Format Email tidak valid.');
            isValid = false;
        } else if (email.length > 50) {
            $('#emailError').text('Email maksimal 50 karakter.');
            isValid = false;
        }
        
        // Phone validation
        const phone = $('#phone').val().trim();
        const phoneRegex = /^\d+$/;
        if (phone === '') {
            $('#phoneError').text('Nomor Handphone wajib diisi.');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            $('#phoneError').text('Nomor Handphone hanya boleh berisi angka.');
            isValid = false;
        } else if (phone.length < 10) {
            $('#phoneError').text('Nomor Handphone minimal 10 digit.');
            isValid = false;
        } else if (phone.length > 15) {
            $('#phoneError').text('Nomor Handphone maksimal 15 digit.');
            isValid = false;
        }
        
        // Message validation
        const message = $('#message').val().trim();
        if (message === '') {
            $('#messageError').text('Pesan wajib diisi.');
            isValid = false;
        } else if (message.length > 300) {
            $('#messageError').text('Pesan maksimal 300 karakter.');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, let's just show a success message
            $('#formSuccess').fadeIn();
            
            // Reset form after successful submission
            setTimeout(function() {
                $('#contactForm')[0].reset();
                $('#messageCounter').text('0/300');
                $('#formSuccess').fadeOut();
            }, 3000);
        }
    });
    
    // Real-time validation for phone number (allow only digits)
    $('#phone').on('input', function() {
        let inputVal = $(this).val();
        
        // Replace non-digit characters with empty string
        let cleanedVal = inputVal.replace(/\D/g, '');
        
        // Update the input value if it was changed
        if (inputVal !== cleanedVal) {
            $(this).val(cleanedVal);
        }
    });
    
    // For all inputs, show validation message when blur (focus lost)
    $('.form-control').on('blur', function() {
        const id = $(this).attr('id');
        let isInputValid = true;
        let errorMessage = '';
        
        switch(id) {
            case 'fullName':
                const fullName = $(this).val().trim();
                if (fullName === '') {
                    errorMessage = 'Nama Lengkap wajib diisi.';
                    isInputValid = false;
                } else if (fullName.length > 50) {
                    errorMessage = 'Nama Lengkap maksimal 50 karakter.';
                    isInputValid = false;
                }
                break;
                
            case 'email':
                const email = $(this).val().trim();
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (email === '') {
                    errorMessage = 'Email wajib diisi.';
                    isInputValid = false;
                } else if (!emailRegex.test(email)) {
                    errorMessage = 'Format Email tidak valid.';
                    isInputValid = false;
                } else if (email.length > 50) {
                    errorMessage = 'Email maksimal 50 karakter.';
                    isInputValid = false;
                }
                break;
                
            case 'phone':
                const phone = $(this).val().trim();
                const phoneRegex = /^\d+$/;
                if (phone === '') {
                    errorMessage = 'Nomor Handphone wajib diisi.';
                    isInputValid = false;
                } else if (!phoneRegex.test(phone)) {
                    errorMessage = 'Nomor Handphone hanya boleh berisi angka.';
                    isInputValid = false;
                } else if (phone.length < 10) {
                    errorMessage = 'Nomor Handphone minimal 10 digit.';
                    isInputValid = false;
                } else if (phone.length > 15) {
                    errorMessage = 'Nomor Handphone maksimal 15 digit.';
                    isInputValid = false;
                }
                break;
                
            case 'message':
                const message = $(this).val().trim();
                if (message === '') {
                    errorMessage = 'Pesan wajib diisi.';
                    isInputValid = false;
                } else if (message.length > 300) {
                    errorMessage = 'Pesan maksimal 300 karakter.';
                    isInputValid = false;
                }
                break;
        }
        
        // Show error message if validation failed
        if (!isInputValid) {
            $(`#${id}Error`).text(errorMessage);
        } else {
            $(`#${id}Error`).text('');
        }
    });
});