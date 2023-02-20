import { Route, Routes, Outlet } from "react-router-dom"
import { NavBar } from "../nav/NavBar"
import { NewReviewForm } from "../reviews/NewReviewForm"
import { ReviewList } from "../reviews/ReviewList"


export const UserViews = () => {
    return (
    <Routes>
        <Route path="/"
        element={
            <>
<ReviewList />
            <Outlet />
            
            </>
        }
        >
            <Route path="NewReview" element={<NewReviewForm />} />
        </Route>
    </Routes>
    
    )
}