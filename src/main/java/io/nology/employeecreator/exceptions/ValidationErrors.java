package io.nology.employeecreator.exceptions;

import java.util.*;

public class ValidationErrors {

    private final HashMap<String, List<String>> errors;

    public ValidationErrors() {
        this.errors = new HashMap<>();
    }

    public boolean hasErrors() {
        return !this.errors.isEmpty();
    }

    public void add(String field, String message) {
        this.errors.computeIfAbsent(field, k -> new ArrayList<>()).add(message);

    }

    public Map<String, List<String>> getErrors() {
        return Collections.unmodifiableMap(this.errors);
    }
}
