package io.nology.employeecreator.exceptions;

import lombok.Getter;

@Getter
public class ServiceValidationException extends Exception {

    private final ValidationErrors errors;

    public ServiceValidationException(ValidationErrors errors) {
        this.errors = errors;
    }
}