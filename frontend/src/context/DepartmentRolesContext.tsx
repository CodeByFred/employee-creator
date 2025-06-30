import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { DepartmentWithRoles } from "../types/types";
import { getAllDepartmentsWithRoles } from "../services/departmentService";

type DepartmentRolesContextType = {
  departments: DepartmentWithRoles[];
  rolesById: Record<number, { roleType: string; department: string }>;
};

const DepartmentRolesContext = createContext<DepartmentRolesContextType>({
  departments: [],
  rolesById: {},
});

export const DepartmentRolesProvider = ({ children }: { children: React.ReactNode }) => {
  const [departments, setDepartments] = useState<DepartmentWithRoles[]>([]);

  useEffect(() => {
    getAllDepartmentsWithRoles().then((data) => {
      if (data) {
        setDepartments(data);
      }
    });
  }, []);

  const rolesById = useMemo(() => {
    const map: Record<number, { roleType: string; department: string }> = {};
    departments.forEach((dept) => {
      dept.roles.forEach((role) => {
        map[role.roleId] = {
          roleType: role.roleType,
          department: dept.department,
        };
      });
    });
    return map;
  }, [departments]);

  return (
    <DepartmentRolesContext.Provider value={{ departments, rolesById }}>
      {children}
    </DepartmentRolesContext.Provider>
  );
};

export const useDepartmentRoles = () => useContext(DepartmentRolesContext);
