import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function AccountPage() {
    const {user, ready} = useContext(UserContext)

    if(!ready){
        return 'Loading...'
    }

    if(ready && !user){
        return <Navigate to={'/login'} />
    }

    
    return (
        <div>account page for {user?.name}</div>
    );
}