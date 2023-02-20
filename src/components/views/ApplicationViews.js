import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"

export const ApplicationViews = () => {


    const localSiteUser = localStorage.getItem("site_user")
    const userObject = JSON.parse(localSiteUser)

    if (userObject.isAdmin) {
        return <AdminViews />
    }
    else {
        return <UserViews />
    }
}