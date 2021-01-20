import { FormControl, AbstractControl } from '@angular/forms'

export const signInFormValidationMessages = {
    email: {
        required: "Email address is required",
    },
    password: {
        required: "Password is required",
    }
}

export const registrationFormValidationMessages = {
    Username: {
        required: "Username is required",
    },
    Email: {
        required: "Email address is required",
    },
    Password: {
        required: "Password is required",
    }
}

export const classroomValidationMsg = {
    Title: {
        required: "Title is required",
    }
}

export const classroomJoinValidationMsg = {
    IdClassrooms: {
        required: "Classroom Code is required",
        pattern : "This field must be a valid number."
    }
}