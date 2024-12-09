import { AdminContext } from "@/components/context/admin-context";
import { useContext } from "react";

export default function FindAdminContext() {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext not found");
    }
    const { loading, setLoading } = adminContext;



    return { loading, setLoading };
}


// utilisation dans les components client :
//  const { allUsers, setAllUsers } = FindAdminContext();