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

export const assignmentValidationMsg = {
    Title: {
        required: "Title is required",
    },
    TotalMarks: {
        required: "Total Marks is required",
        pattern : "This field must be a valid number."
    },
    StartedAt: {
        required: "This field is required",
    },
    EndedAt: {
        required: "This field is required",
    }
}

export const questionValidationMsg = {
    QuestionPart: {
        required: "Title is required",
    },
    Marks: {
        required: "Marks is required",
        pattern : "This field must be a valid number."
    }
}