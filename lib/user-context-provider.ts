import { UserContext } from "@/components/context/user-context";
import { useContext } from "react";

export default function FindUserContext() {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("UserContext not found");
    }
    const { currentUser, setCurrentUser } = userContext;



    return { currentUser, setCurrentUser };
}


// utilisation dans les components client :
//  const { currentUser, setCurrentUser } = FindUserContext();