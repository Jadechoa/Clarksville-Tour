import { Outlet, Routes, Route } from "react-router-dom"
import { ReviewList } from "../reviews/ReviewList"

export const AdminViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                 <dix>I am a admin</dix>

                 <Outlet />
                </>
            }>
                 <Route path="reviews" element={<ReviewList />} />
            </Route>
                
        
    </Routes>
    )
}