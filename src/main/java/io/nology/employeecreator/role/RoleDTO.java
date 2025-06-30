package io.nology.employeecreator.role;

import lombok.Getter;

@Getter
public class RoleDTO {
    private final Long roleId;
    private final RoleType roleType;

    public RoleDTO(Role role) {
        this.roleId = role.getRoleId();
        this.roleType = role.getRoleType();
    }
}
